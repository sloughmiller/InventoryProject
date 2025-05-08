def test_create_item(client):
    response = client.post("/items/", json={
        "name": "Hammer",
        "description": "Steel hammer",
        "barcode": "111111",
        "value": 15.99,
        "category_id": 1,
        "location_id": 1,
        "condition_id": 1,
        "owner_id": 1
    })
    assert response.status_code == 200
    assert response.json()["name"] == "Hammer"

def test_get_items(client):
    response = client.get("/items/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
