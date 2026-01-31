# server.py
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
from main import finder_agent, app

# Keep MCP agent context globally
agent_app_context = None

# Lifespan context for startup/shutdown
@asynccontextmanager
async def lifespan(app_api: FastAPI):
    global agent_app_context
    # Start MCP agent once
    async with app.run() as agent_app:
        agent_app_context = agent_app.context
        print("✅ MCP agent is ready and running!")
        yield
        # shutdown happens automatically when exiting this block

# FastAPI app
app_api = FastAPI(title="University MCP Chatbot", lifespan=lifespan)

# CORS for React frontend
app_api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # change if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class QuestionRequest(BaseModel):
    question: str

# Endpoint
@app_api.post("/ask")
async def ask_question(req: QuestionRequest):
    global agent_app_context
    if agent_app_context is None:
        return {"answer": "Agent is starting, try again in a few seconds."}

    answer = await finder_agent(
        request=f"Read the file data/uetProspectus.pdf and answer: {req.question}",
        app_ctx=agent_app_context,
    )
    return {"answer": answer}
