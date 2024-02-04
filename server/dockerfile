FROM python:latest

WORKDIR /src

COPY requirements.txt requirements.txt

ENV PYTHONUNBUFFERED=1

RUN pip3 install -r requirements.txt

CMD ["python3", "app.py"]