import uvicorn
import config
from api import app

if __name__ == '__main__':
    uvicorn.run('server:app', host=config.HOST, port=config.PORT, reload=True)