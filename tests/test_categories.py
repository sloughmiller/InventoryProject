def test_create_category(client,access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.post("/categories/", json={
        "name": "Tools",
        "description": "Hand tools and power tools"
    }, headers=headers)
    assert response.status_code == 200
    assert response.json()["name"] == "Tools"

def test_get_categories(client):
    response = client.get("/categories/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
