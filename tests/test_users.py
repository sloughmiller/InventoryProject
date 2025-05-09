from uuid import uuid4

def test_create_user(client, access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    email = f"testuser_{uuid4()}@example.com"
    response = client.post("/users/", json={
        "username": "testuser",
        "email": email,
        "password": "testpass"
    },headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == email

def test_duplicate_user(client, access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    email = f"user_{uuid4()}@example.com"
    # Create the first user
    response1 = client.post("/users/", json={
        "username": "testuser1",
        "email": email,
        "password": "testpass"
    },headers=headers)
    assert response1.status_code == 200

    # Attempt to create duplicate user (same email)
    response2 = client.post("/users/", json={
        "username": "testuser2",
        "email": email,
        "password": "testpass"
    })
    assert response2.status_code == 400

def test_get_users(client):
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
