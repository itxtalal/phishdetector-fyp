import httpagentparser
from datetime import datetime, timedelta
from typing import Optional, List


from fastapi import FastAPI, Depends, Request
from sqlalchemy import func
from sqlalchemy.orm import Session, aliased
from pydantic import BaseModel, AnyUrl
from url_normalize import url_normalize
from urllib.parse import urlparse
from fastapi_pagination import Page, add_pagination, paginate, Params

# from fastapi.middleware.cors import CORSMiddleware


from app.db import get_db
from app.utils import analyze_url, lookup_url_in_blacklist, get_url_params
from app.models import PhishingSite, Detection, Domain

app = FastAPI()
add_pagination(app)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


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
        if all(blacklist_result.values()):
            phishing_site = (
                db.query(PhishingSite).filter_by(**get_url_params(db, url)).first()
            )
        else:
            phishing_site = db.add(PhishingSite(**get_url_params(db, url)))
            db.commit()
        db.add(
            Detection(
                detection_type="blacklist",
                browser=browser,
                os=os,
                phishing_site=phishing_site,
            )
        )
        db.commit()
        return blacklist_result

    return {
        "phishing": False,
        "domain": False,
        "path": False,
        "query": False,
    }

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

    today = datetime.utcnow().date()
    detections_per_day = [0] * 7
    for i in range(7):
        day = today - timedelta(days=i)
        detections = (
            db.query(Detection)
            .filter(
                Detection.timestamp >= day,
                Detection.timestamp < day + timedelta(days=1),
            )
            .count()
        )
        detections_per_day[len(detections_per_day) - i - 1] = detections

    detections_last_month = [0] * 30
    for i in range(30):
        day = today - timedelta(days=i)
        detections = (
            db.query(Detection)
            .filter(
                Detection.timestamp >= day,
                Detection.timestamp < day + timedelta(days=1),
            )
            .count()
        )
        detections_last_month[len(detections_last_month) - i - 1] = detections

    start_of_current_month = today.replace(day=1)
    start_of_last_12_months = start_of_current_month - timedelta(days=365)

    detections_per_month = [0] * 12

    for i in range(12):
        start_of_month = start_of_last_12_months + timedelta(days=i * 30)
        end_of_month = start_of_last_12_months + timedelta(days=(i + 1) * 30)
        detections = (
            db.query(Detection)
            .filter(
                Detection.timestamp >= start_of_month,
                Detection.timestamp < end_of_month,
            )
            .count()
        )
        detections_per_month[i] = detections

    return {
        "total_blacklisted_sites": db.query(PhishingSite).count(),
        "detections": {
            "total": db.query(Detection).count(),
            "by_browser": dict(count_by_browser),
            "by_os": dict(count_by_os),
            "by_detection_type": dict(count_by_detection_type),
            "last_week": detections_per_day,
            "last_month": detections_last_month,
            "last_year": detections_per_month,
        },
    }


@app.get("/blacklist")
async def get_blacklist(
    session: Session = Depends(get_db),
    params: Params = Depends(),
    search: Optional[str] = None,
    response_model=Page[PhishingSite],
):

    # Create an alias for the Detection model to be used in the subquery
    DetectionAlias = aliased(Detection)

    # Define the subquery to get the last detection time for each domain
    subquery_last_detection = (
        session.query(
            DetectionAlias.phishing_site_id,
            func.max(DetectionAlias.timestamp).label("last_detection_time"),
        )
        .group_by(DetectionAlias.phishing_site_id)
        .subquery()
    )

    # Main query
    results = (
        session.query(
            Domain.id,
            Domain.name,
            func.coalesce(func.count(Detection.id), 0).label("total_detections"),
            func.coalesce(
                func.max(subquery_last_detection.c.last_detection_time), None
            ).label("last_detection_time"),
        )
        .outerjoin(PhishingSite, Domain.id == PhishingSite.domain_id)
        .outerjoin(Detection, PhishingSite.id == Detection.phishing_site_id)
        .outerjoin(
            subquery_last_detection,
            PhishingSite.id == subquery_last_detection.c.phishing_site_id,
        )
        .group_by(Domain.id)
    )

    if search:
        search = f"%{search}%"
        results = results.filter(
            Domain.name.ilike(search),
        )

    # Convert the results into the response model
    response = [
        {
            "id": row[0],
            "domain": row[1],
            "total_detections": row[2] or 0,
            "last_detection_date": row[3],
        }
        for row in results.all()
    ]

    # TODO: Avoid storing all data in memory, do all filtering in SQL
    return paginate(response, params=params)


class RemoveBlacklistRequestBody(BaseModel):
    domains: List[str]


@app.delete("/blacklist")
async def remove_blacklist(
    request: Request,
    request_body: RemoveBlacklistRequestBody,
    db: Session = Depends(get_db),
):
    subquery = (
        db.query(PhishingSite.id)
        .join(PhishingSite.domain)
        .filter(Domain.name.in_(request_body.domains))
        .subquery()
    )

    detections_deleted = (
        db.query(Detection)
        .filter(Detection.phishing_site_id.in_(subquery))
        .delete(synchronize_session="fetch")
    )

    deleted = (
        db.query(PhishingSite)
        .filter(PhishingSite.id.in_(subquery))
        .delete(synchronize_session="fetch")
    )

    db.commit()
    return {"detections_deleted": detections_deleted, "blacklist_deleted": deleted}
