def test_protected_route_requires_token(client):
    response = client.post("/items/", json={"name": "Test item"})
    assert response.status_code == 401

def test_protected_route_with_token(client, db_session, test_user, client_and_user):
    client, user, access_token = client_and_user
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.get("/users/", headers=headers)
    assert response.status_code == 200
