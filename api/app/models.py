from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship

from app.db import Base


class PhishingSite(Base):
    __tablename__ = "phishing_sites"

    id = Column(Integer, primary_key=True, index=True)
    path = Column(String)
    query = Column(String)

    domain_id = Column(Integer, ForeignKey("domains.id"))
    domain = relationship("Domain", back_populates="phishing_sites")

    detections = relationship(
        "Detection", back_populates="phishing_site", cascade="all, delete-orphan"
    )


class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    browser = Column(String)
    detection_type = Column(String)
    os = Column(String)

    phishing_site_id = Column(Integer, ForeignKey("phishing_sites.id"))
    phishing_site = relationship("PhishingSite", back_populates="detections")


class Domain(Base):
    __tablename__ = "domains"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    whitelisted = Column(Boolean, default=False)
    phishing_sites = relationship("PhishingSite", back_populates="domain")

    @classmethod
    def get_or_create(cls, db, domain_name):
        domain = db.query(Domain).filter(Domain.name == domain_name).first()
        if domain:
            return domain
        else:
            domain = Domain(name=domain_name)
            db.add(domain)
            db.commit()
            return domain
