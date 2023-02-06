from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, AnyUrl
from url_normalize import url_normalize

from app.models import PhishingSite
from app.db import get_db


app = FastAPI()


class AnalyzeRequestBody(BaseModel):
    url: AnyUrl


@app.post("/analyze")
async def analyze(request_body: AnalyzeRequestBody, db: Session = Depends(get_db)):
    url = url_normalize(request_body.url)
    phishing_site = db.query(PhishingSite).filter_by(url=url).first()
    if phishing_site:
        return {"phishing": True}
    else:
        return {"phishing": False}
