import pytest

def test_login_success(client, db_session, test_user):
    response = client.post("/login", data={"username": test_user.username, "password": "testpassword"})
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_wrong_password(client, db_session, test_user):
    response = client.post("/login", data={"username": test_user.username, "password": "wrongpassword"})
    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect username or password"

def test_login_nonexistent_user(client, db_session):
    response = client.post("/login", data={"username": "nouser", "password": "testpassword"})
    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect username or password"
