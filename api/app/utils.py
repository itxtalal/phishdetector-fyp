import requests
import json
from urllib.parse import urlparse

from app.models import PhishingSite

ML_API_URL = "http://ml:8001/predict"


def analyze_url(url: str) -> dict:
    data = {"url": url}

    # Set the headers to send JSON data
    headers = {"Content-Type": "application/json"}

    # Make the POST request
    response = requests.post(ML_API_URL, data=json.dumps(data), headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        # Convert the response JSON to a Python dictionary
        response_dict = response.json()
        return response_dict["probabilities"]
    else:
        raise Exception("API request failed")


def lookup_url_in_blacklist(url: str, db) -> dict:

    parsed_url = urlparse(url)
    domain_matched_sites = db.query(PhishingSite).filter_by(domain=parsed_url.netloc)

    if not domain_matched_sites.first():
        return {
            "phishing": False,
            "domain": False,
            "path": False,
            "query": False,
        }

    path_matched_sites = domain_matched_sites.filter_by(path=parsed_url.path)
    if not path_matched_sites.first():
        return {
            "phishing": True,
            "domain": True,
            "path": False,
            "query": False,
        }

    query_matched_sites = path_matched_sites.filter_by(query=parsed_url.query)
    if not query_matched_sites.first():
        return {
            "phishing": True,
            "domain": True,
            "path": True,
            "query": False,
        }

    return {
        "phishing": True,
        "domain": True,
        "path": True,
        "query": True,
    }
