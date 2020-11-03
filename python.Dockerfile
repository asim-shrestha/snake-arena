FROM python:3.8

WORKDIR /server
#RUN pip3 install pika==1.1.0
#RUN pip3 install pyzmq==19.0.1

# Install dependencies


COPY ./server /server

CMD python3 server.py
