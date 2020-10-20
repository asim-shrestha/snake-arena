FROM python:3.8

#RUN pip3 install pika==1.1.0
#RUN pip3 install pyzmq==19.0.1

WORKDIR /web

# Install dependencies

COPY ./web /web

# for ZeroMQ server
#EXPOSE 5555

CMD python3 hello.py
