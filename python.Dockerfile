FROM python:3.8

WORKDIR /web
#RUN pip3 install pika==1.1.0
#RUN pip3 install pyzmq==19.0.1

# Install dependencies


COPY ./web /web

CMD python3 web.py
