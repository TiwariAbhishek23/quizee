from fastapi import FastAPI
from config import settings
from routes import router

def include_router(app):
    return app.include_router(router)

def configure_database(app):
    database.Base.metadata.create_all(bind=database.engine)

def start_application():
    app = FastAPI(title=settings.PROJECT_TITLE, version=settings.PROJECT_VERSION)
    include_router(app)
    configure_database(app)
    return app

app = start_application()