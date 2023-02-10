from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, AnyUrl
from url_normalize import url_normalize
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import urlparse

from app.models import PhishingSite
from app.db import get_db


app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"])


class AnalyzeRequestBody(BaseModel):
    url: AnyUrl


@app.post("/analyze")
async def analyze(request_body: AnalyzeRequestBody, db: Session = Depends(get_db)):
    url = url_normalize(request_body.url)
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
