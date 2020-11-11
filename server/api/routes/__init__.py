from api import app
from . import test

# Secure Routes
app.include_router(test.router, tags=['Generate Acronyms'], prefix='/test')
