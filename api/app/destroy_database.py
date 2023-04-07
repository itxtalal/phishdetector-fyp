from app.db import Base, engine
from app.models import PhishingSite, Detection

Base.metadata.drop_all(
    bind=engine,
    tables=[
        PhishingSite.__table__,
        Detection.__table__,
    ],
)
