FROM python:3.9@sha256:af38b5d60e73a971088774fd9de87621f5425a55813970ea74357bb2de

WORKDIR /model

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ENV PYTHONPATH "${PYTHONPATH}:/model"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]

