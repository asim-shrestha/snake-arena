FROM python:3.9

WORKDIR /server

# Install dependencies
COPY ./server/requirements.txt .
RUN pip install -r requirements.txt

# Copy rest of files
COPY ./server /server

ARG PORT

CMD python3 server.py
