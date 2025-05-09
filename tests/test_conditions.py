def test_create_condition(client, client_and_user):
    client, user, access_token = client_and_user
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.post("/conditions/", json={
        "name": "New",
        "description": "Brand new condition"
    },headers=headers)
    assert response.status_code == 200
    assert response.json()["name"] == "New"

def test_get_conditions(client):
    response = client.get("/conditions/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
