from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from app.db import Base


class PhishingSite(Base):
    __tablename__ = "phishing_sites"

    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String)
    path = Column(String)
    query = Column(String)


class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    url = Column(String)
    browser = Column(String)
    detection_type = Column(String)
    os = Column(String)
