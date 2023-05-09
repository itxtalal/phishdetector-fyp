from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_analyze_valid_url():
    # test with a valid url that is not in the blacklist
    request_body = {"url": "https://google.com"}
    response = client.post("/analyze", json=request_body)
    assert response.status_code == 200
    assert response.json() == {
        "phishing": False,
        "domain": False,
        "path": False,
        "query": False,
    }


def test_analyze_blacklisted_url():
    # test with a url that is in the blacklist
    request_body = {"url": "https://example.com"}
    response = client.post("/analyze", json=request_body)
    assert response.status_code == 200
    assert response.json() == {
        "phishing": True,
        "domain": True,
        "path": False,
        "query": False,
    }


def test_analyze_empty_request_body():
    # test with an empty request body
    request_body = {}
    response = client.post("/analyze", json=request_body)
    assert response.status_code == 422


def test_analyze_invalid_url():
    # test with an invalid url
    request_body = {"url": "invalid_url"}
    response = client.post("/analyze", json=request_body)
    assert response.status_code == 422
