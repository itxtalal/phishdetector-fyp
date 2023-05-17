from app.db import Base, engine
from app.models import PhishingSite, Detection, Domain

Base.metadata.drop_all(
    bind=engine,
    tables=[
        PhishingSite.__table__,
        Detection.__table__,
        Domain.__table__,
    ],
)
