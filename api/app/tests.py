from fastapi.testclient import TestClient
from app.main import app  # Import your actual FastAPI application instance

client = TestClient(app)


def test_analyze_endpoint():
    response = client.post("/analyze", json={"url": "https://www.example.com"})
    assert response.status_code == 200
    # You can also assert the structure of the response or any other detail about the response
    assert "phishing" in response.json()
    assert "domain" in response.json()
    assert "path" in response.json()
    assert "query" in response.json()


def test_statistics_endpoint():
    response = client.get("/statistics")
    assert response.status_code == 200
    # You can also assert the structure of the response or any other detail about the response
    assert "total_blacklisted_sites" in response.json()
    assert "detections" in response.json()


def test_get_blacklist_endpoint():
    response = client.get("/blacklist")
    assert response.status_code == 200
    # If you know any expected data, you can also assert that it is present in the response


def test_remove_blacklist_endpoint():
    response = client.delete("/blacklist", json={"domains": ["www.example.com"]})
    assert response.status_code == 200
    # If you know any expected data, you can also assert that it is present in the response
    assert "detections_deleted" in response.json()
    assert "blacklist_deleted" in response.json()
