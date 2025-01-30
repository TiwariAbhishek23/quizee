from fastapi import FastAPI
from config.settings import Settings
from routes import auth

def include_router(app):
    return app.include_router(auth)

def start_application():
    app = FastAPI(title=Settings.PROJECT_TITLE, version=Settings.PROJECT_VERSION)
    # include_router(app)
    return app

app = start_application()