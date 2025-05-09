import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import Base, get_db
from app.core.config import settings
from app import crud, schemas
from app.core.auth import create_access_token

# Use the test database URL
TEST_DATABASE_URL = settings.test_database_url or "sqlite:///./test.db"

# Create test database engine + session
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Reset the database before each test session
@pytest.fixture(scope="session", autouse=True)
def reset_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield


# Provide FastAPI test client with overridden DB
@pytest.fixture(scope="function")
def client():
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as c:
        yield c


# Provide a fresh DB session for test setup
@pytest.fixture(scope="function")
def db_session():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create a test user
@pytest.fixture
def test_user(db_session):
    user_data = schemas.UserCreate(
        username="testuser", email="test@example.com", password="testpassword"
    )
    user = crud.user.create_user(db_session, user_data)
    return user


# Provide a valid access token for the test user
@pytest.fixture
def access_token(test_user):
    token = create_access_token({"sub": test_user.username})
    return token
