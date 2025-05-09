import pytest
import uuid
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import Base, get_db
from app.core.config import settings
from app import crud, schemas
from app.core.auth import create_access_token

DATABASE_TEST_URL = settings.database_test_url or "sqlite:///./test.db"
engine = create_engine(DATABASE_TEST_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Run once per session: clean DB at the start
@pytest.fixture(scope="session", autouse=True)
def reset_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    # Optional cleanup after session:
    Base.metadata.drop_all(bind=engine)

# ✅ Provide FastAPI test client with DB override
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

# ✅ Provide standalone DB session for test setup
@pytest.fixture(scope="function")
def db_session():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Create a unique test user per test function
@pytest.fixture(scope="function")
def test_user(db_session):
    unique_id = uuid.uuid4().hex[:8]
    user_data = schemas.UserCreate(
        username=f"testuser_{unique_id}",
        email=f"test_{unique_id}@example.com",
        password="testpassword"
    )
    user = crud.user.create_user(db_session, user_data)
    return user

# ✅ Generate a valid token for the test user
@pytest.fixture(scope="function")
def access_token(test_user):
    token = create_access_token({"sub": test_user.username})
    return token

# ✅ Create a combined fixture: client + user + token
@pytest.fixture(scope="function")
def client_and_user():
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()
    app.dependency_overrides[get_db] = override_get_db

    db = TestingSessionLocal()
    unique_id = uuid.uuid4().hex[:8]
    user_data = schemas.UserCreate(
        username=f"testuser_{unique_id}",
        email=f"test_{unique_id}@example.com",
        password="testpassword"
    )
    user = crud.user.create_user(db, user_data)
    token = create_access_token({"sub": user.username})
    db.close()

    with TestClient(app) as c:
        yield c, user, token
