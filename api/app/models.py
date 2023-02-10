from sqlalchemy import Column, Integer, String

from app.db import Base


class PhishingSite(Base):
    __tablename__ = "phishing_sites"

    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String)
    path = Column(String)
    query = Column(String)
