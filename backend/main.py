from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import route_questions, route_quiz, route_websocket, route_auth
from config.settings import Settings
from database.sessions import engine
from database.baseClass import Base

def include_router(app):
    app.include_router(route_auth.login_router, prefix="/auth", tags=["Auth"])
    app.include_router(route_quiz.quiz_router, prefix="/quiz", tags=["Quiz"])
    app.include_router(route_websocket.ws_router, prefix="/ws", tags=["WebSocket"])
    app.include_router(route_questions.question_router, prefix="/questions", tags=["Questions"])

def configure_database():
    Base.metadata.create_all(bind=engine)

def config_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

def start_application():
    app = FastAPI(title=Settings.PROJECT_TITLE, version=Settings.PROJECT_VERSION)
    include_router(app)
    configure_database()
    config_cors(app)
    return app

app = start_application()