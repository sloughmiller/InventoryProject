def test_create_user(client):
    response = client.post("/users/", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpass"
    })
    assert response.status_code == 200
    assert response.json()["email"] == "testuser@example.com"

def test_duplicate_user(client):
    response = client.post("/users/", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpass"
    })
    assert response.status_code == 400

def test_get_users(client):
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
