from fastapi import FastAPI
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI(docs_url='/', title='FallHack 2020 Api')

# from .database import db

# app.add_event_handler("startup", db.connect)
# app.add_event_handler("shutdown", db.disconnect)

from . import routes

from . import sockets
app.mount('/ws', sockets.sio_app)