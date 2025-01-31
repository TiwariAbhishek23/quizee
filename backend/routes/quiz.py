from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form, WebSocket, WebSocketDisconnect
import os
from services.question_generator import generate_quiz_questions, generate_questions_from_pdf

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

quiz_router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@quiz_router.get("/generate-quiz")
def generate_questions_from_topic(topic: str, num_questions: int = 5):
    try:
        questions = generate_quiz_questions(topic, num_questions)
        questions_array = [[q["question"], q["options"], q["answer"]]for q in questions["questions"]]
        return questions_array
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@quiz_router.post("/upload-pdf")
def generate_questions_from_pdf(file: UploadFile, num_questions: int = 5):
    try:
        file_path = f"{UPLOAD_DIR}/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        questions = generate_questions_from_pdf(file_path, num_questions)
        os.remove(file_path)

        return {"questions": questions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


active_connections = {}

@quiz_router.websocket('/ws/{quiz_code}')
async def upload_questions(websocket: WebSocket, quiz_code: str):
    await websocket.accept()
    if quiz_code not in active_connections:
        active_connections[quiz_code] = []
    
    active_connections[quiz_code].append(websocket)

    print(f"New WebSocket connection for quiz: {quiz_code}")

    try:
        while True:
            data = await websocket.receive_text()
            print(f"Received in quiz {quiz_code}: {data}")  # Log received data
            
            # Echo response for now (modify as needed)
            await websocket.send_text(f"Received in quiz {quiz_code}: {data}")

    except WebSocketDisconnect:
        active_connections[quiz_code].remove(websocket)

        if not active_connections[quiz_code]:  # Cleanup if no active clients
            del active_connections[quiz_code]
        print(f"WebSocket connection closed for quiz {quiz_code} by exception")

    finally:
        await websocket.close()
        print(f"WebSocket connection closed for quiz {quiz_code}")

@quiz_router.websocket('/ws/leaderboard/{quiz_code}')
async def leaderboard_ws(websocket: WebSocket, quiz_code: str):
    """ WebSocket connection for real-time leaderboard updates. """
    await websocket.accept()

    if quiz_code not in active_connections:
        active_connections[quiz_code] = []
    
    active_connections[quiz_code].append(websocket)

    try:
        while True:
            data = await websocket.receive_text()  # Just to keep connection alive
            print(f"Received from {quiz_code}: {data}")

    except WebSocketDisconnect:
        print(f"Client disconnected from {quiz_code}")
        active_connections[quiz_code].remove(websocket)

        if not active_connections[quiz_code]:  # Remove if no more connections
            del active_connections[quiz_code]

    finally:
        await websocket.close()