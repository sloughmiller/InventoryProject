def test_create_location(client,access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.post("/locations/", json={
        "name": "Garage",
        "description": "Main garage"
    }, headers=headers)
    assert response.status_code == 200
    assert response.json()["name"] == "Garage"

def test_get_locations(client):
    response = client.get("/locations/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
