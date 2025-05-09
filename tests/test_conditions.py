def test_create_condition(client, access_token):
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
