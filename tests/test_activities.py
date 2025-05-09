def test_create_activity(client, access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.post("/activities/", json={
        "item_id": 1,
        "user_id": 1,
        "action": "added",
        "details": "Added new hammer to inventory"
    }, headers=headers)
    assert response.status_code == 200


def test_get_activities(client):
    response = client.get("/activities/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
