from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, AnyUrl

from app.models import PhishingSite
from app.db import get_db


app = FastAPI()


class AnalyzeRequestBody(BaseModel):
    url: AnyUrl


@app.post("/")
async def analyze(request_body: AnalyzeRequestBody, db: Session = Depends(get_db)):
    phishing_site = db.query(PhishingSite).filter_by(url=request_body.url).first()
    if phishing_site:
        return {"phishing": True}
    else:
        return {"phishing": False}
