import csv

from app.db import SessionLocal, Base, engine
from app.models import PhishingSite
from url_normalize import url_normalize

Base.metadata.create_all(bind=engine)

session = SessionLocal()

# Load data from a CSV file
with open("app/dataset.csv", "r") as file:
    reader = csv.reader(file)
    headers = next(reader)
    for row in reader:
        data = PhishingSite(url=url_normalize(row[0]))
        session.add(data)

session.commit()
