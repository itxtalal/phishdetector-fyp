from datetime import date, timedelta
from unittest.mock import MagicMock
from main import app
from models import Detection, PhishingSite
from sqlalchemy.orm import Session

client = TestClient(app)


def test_statistics():
    # mock the database session and query results
    db_mock = MagicMock(spec=Session)
    db_mock.query(Detection).count.return_value = 10
    db_mock.query(PhishingSite).count.return_value = 5
    db_mock.query(Detection.browser, func.count(Detection.id)).group_by(
        Detection.browser
    ).all.return_value = [
        ("Chrome", 4),
        ("Firefox", 3),
        ("Safari", 2),
    ]
    db_mock.query(Detection.os, func.count(Detection.id)).group_by(
        Detection.os
    ).all.return_value = [
        ("Windows", 6),
        ("macOS", 3),
        ("iOS", 1),
    ]
    db_mock.query(Detection.detection_type, func.count(Detection.id)).group_by(
        Detection.detection_type
    ).all.return_value = [
        ("blacklist", 7),
        ("phishing", 3),
    ]
    db_mock.query(Detection).filter().count.side_effect = [2, 4, 1, 0, 1, 2, 0]

    # call the endpoint and check the response
    response = client.get("/statistics")
    assert response.status_code == 200
    assert response.json() == {
        "total_blacklisted_sites": 5,
        "detections": {
            "total": 10,
            "by_browser": {"Chrome": 4, "Firefox": 3, "Safari": 2},
            "by_os": {"Windows": 6, "macOS": 3, "iOS": 1},
            "by_detection_type": {"blacklist": 7, "phishing": 3},
            "last_week": [2, 4, 1, 0, 1, 2, 0],
        },
    }
