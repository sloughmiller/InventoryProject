def test_create_item(client, client_and_user):
    client, user, access_token = client_and_user
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.post("/items/", json={
        "name": "Hammer",
        "description": "Steel hammer",
        "barcode": "111111",
        "value": 15.99,
        "category_id": 1,
        "location_id": 1,
        "condition_id": 1,
        "owner_id": 1
    }, headers=headers)
    assert response.status_code == 200
    assert response.json()["name"] == "Hammer"

def test_get_items(client):
    response = client.get("/items/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
