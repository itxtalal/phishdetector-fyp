import csv

from app.db import SessionLocal, Base, engine
from app.models import PhishingSite

Base.metadata.create_all(bind=engine)

# Load data from a CSV file
with open("app/dataset.csv", "r") as file:
    reader = csv.reader(file)
    headers = next(reader)
    for row in reader:
        data = PhishingSite(url=row[0])
        SessionLocal.add(data)

SessionLocal.commit()
