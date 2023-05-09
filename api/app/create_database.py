import csv
from urllib.parse import urlparse

from app.db import SessionLocal, Base, engine
from app.models import PhishingSite, Domain
from url_normalize import url_normalize

Base.metadata.create_all(bind=engine)

session = SessionLocal()

# Load data from a CSV file
with open("app/dataset.csv", "r") as file:
    reader = csv.reader(file)
    headers = next(reader)
    for row in reader:
        normalized_url = url_normalize(row[0])
        parsed_url = urlparse(normalized_url)

        data = PhishingSite(
            domain=Domain.get_or_create(session, parsed_url.netloc),
            path=parsed_url.path,
            query=parsed_url.query,
        )
        session.add(data)

session.commit()
