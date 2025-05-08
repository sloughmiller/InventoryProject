def test_create_condition(client):
    response = client.post("/conditions/", json={
        "name": "New",
        "description": "Brand new condition"
    })
    assert response.status_code == 200
    assert response.json()["name"] == "New"

def test_get_conditions(client):
    response = client.get("/conditions/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
