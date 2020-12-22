import uvicorn
import config
from api import app

print(config.PORT)
if __name__ == '__main__':
    uvicorn.run('server:app', host=config.HOST, port=config.PORT, reload=True)