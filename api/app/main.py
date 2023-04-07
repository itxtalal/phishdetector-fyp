import httpagentparser

from fastapi import FastAPI, Depends, Request
from sqlalchemy import func
from sqlalchemy.orm import Session
from pydantic import BaseModel, AnyUrl
from url_normalize import url_normalize
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import urlparse

from app.db import get_db
from app.utils import analyze_url, lookup_url_in_blacklist
from app.models import PhishingSite, Detection

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"])


class AnalyzeRequestBody(BaseModel):
    url: AnyUrl


@app.post("/analyze")
async def analyze(
    request: Request, request_body: AnalyzeRequestBody, db: Session = Depends(get_db)
):
    url = url_normalize(request_body.url)

    user_agent = request.headers["User-Agent"]
    browser = "Not Detected"
    os = "Not Detected"
    if user_agent:
        parsed_user_agent = httpagentparser.detect(user_agent)
        browser = parsed_user_agent.get("browser", {}).get("name", "Not Detected")
        os = parsed_user_agent.get("os", {}).get("name", "Not Detected")

    blacklist_result = lookup_url_in_blacklist(url, db)

    if any(blacklist_result.values()):
        db.add(Detection(url=url, detection_type="blacklist", browser=browser, os=os))
        db.commit()
        return blacklist_result

    probabilities = analyze_url(url)

    if probabilities["phishing"] > probabilities["safe"]:
        # Add the site to blacklist
        parsed_url = urlparse(url)
        db.add(
            PhishingSite(
                domain=parsed_url.netloc,
                path=parsed_url.path,
                query=parsed_url.query,
            )
        )
        db.add(
            Detection(
                url=url,
                detection_type="prediction",
                browser=browser,
                os=os,
            )
        )
        db.commit()
        return {
            "phishing": True,
            "domain": True,
            "path": True,
            "query": True,
        }

    return {
        "phishing": False,
        "domain": False,
        "path": False,
        "query": False,
    }


@app.get("/statistics")
async def statistics(db: Session = Depends(get_db)):
    count_by_browser = (
        db.query(Detection.browser, func.count(Detection.id))
        .group_by(Detection.browser)
        .all()
    )
    count_by_os = (
        db.query(Detection.os, func.count(Detection.id)).group_by(Detection.os).all()
    )
    count_by_detection_type = (
        db.query(Detection.detection_type, func.count(Detection.id))
        .group_by(Detection.detection_type)
        .all()
    )

    return {
        "total_blacklisted_sites": db.query(PhishingSite).count(),
        "detections": {
            "total": db.query(Detection).count(),
            "by_browser": dict(count_by_browser),
            "by_os": dict(count_by_os),
            "by_detection_type": dict(count_by_detection_type),
        },
    }
