import json
from locust import HttpUser, task


class PhishDetectorTest(HttpUser):
    @task
    def index_file(self):
        self.client.post("/analyze", data=json.dumps({"url": "https://google.com"}))
