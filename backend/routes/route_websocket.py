from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict, List
from datetime import datetime

ws_router = APIRouter()

active_quiz_connections: Dict[str, List[WebSocket]] = {}
leaderboard: Dict[str, dict] = {}

@ws_router.websocket("/{quiz_id}/question")
async def quiz_websocket(websocket: WebSocket, quiz_id: str):
    """WebSocket for live quiz synchronization."""
    await websocket.accept()

    if quiz_id not in active_quiz_connections:
        active_quiz_connections[quiz_id] = []

    active_quiz_connections[quiz_id].append(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            print(f"Received data: {data}")

            question = data.get("question")
            options = data.get("options")
            answer = data.get("answer")

            # Broadcast question to all clients
            disconnected_clients = []
            for ws in active_quiz_connections[quiz_id]:
                try:
                    await ws.send_json({
                        "type": "question",
                        "question": question,
                        "options": options,
                        "correct": answer
                    })
                except WebSocketDisconnect:
                    disconnected_clients.append(ws)
            
            # Remove disconnected clients safely
            for ws in disconnected_clients:
                active_quiz_connections[quiz_id].remove(ws)

    except WebSocketDisconnect:
        print(f"WebSocket disconnected for quiz {quiz_id}")
    finally:
        if websocket in active_quiz_connections.get(quiz_id, []):
            active_quiz_connections[quiz_id].remove(websocket)

        # If no connections are left, delete the quiz entry
        if not active_quiz_connections.get(quiz_id):
            del active_quiz_connections[quiz_id]

@ws_router.websocket("/{quiz_id}/leaderboard")
async def leaderboard_websocket(websocket: WebSocket, quiz_id: str):
    """WebSocket for live leaderboard synchronization."""
    await websocket.accept()

    if quiz_id not in active_quiz_connections:
        active_quiz_connections[quiz_id] = []
    
    active_quiz_connections[quiz_id].append(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            uid = data.get("uid")
            name = data.get("name")
            correct = data.get("correct")
            
            print(f"Received leaderboard data: {data}")

            if uid not in leaderboard:
                leaderboard[uid] = {
                    "name": name,
                    "score": 0,
                    "join_time": datetime.now().strftime('%H:%M:%S'),
                    "attempted": 0
                }

            else:
                leaderboard[uid]["score"] += 5 if correct else -2
                leaderboard[uid]["attempted"] += 1

            sorted_leaderboard = dict(
                sorted(leaderboard.items(), key=lambda item: item[1]["score"], reverse=True)
            )

            disconnected_clients = []
            for ws in active_quiz_connections[quiz_id]:
                try:
                    await ws.send_json({
                        "type": "leaderboard_update",
                        "data": sorted_leaderboard
                    })
                except WebSocketDisconnect:
                    disconnected_clients.append(ws)

            for ws in disconnected_clients:
                active_quiz_connections[quiz_id].remove(ws)

    except WebSocketDisconnect:
        print(f"Leaderboard WebSocket disconnected for quiz {quiz_id}")
        active_quiz_connections.clear()
        leaderboard.clear()
    finally:
        if websocket in active_quiz_connections.get(quiz_id, []):
            active_quiz_connections[quiz_id].remove(websocket)
            leaderboard.clear()

        # If no connections are left, delete the quiz entry
        if not active_quiz_connections.get(quiz_id):
            del active_quiz_connections[quiz_id]
            leaderboard.clear()
