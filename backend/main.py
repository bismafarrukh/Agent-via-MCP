"""
Hello World MCP-Agent with LLaMA 3
This example demonstrates:
- Creating a standalone MCPApp
- Defining a finder agent that reads files (filesystem server)
- Attaching LLaMA 3 as the LLM
- Running locally
"""

import asyncio
import os
import requests
import yaml
from typing import Optional
from pathlib import Path

from mcp_agent.app import MCPApp
from mcp_agent.agents.agent import Agent
from mcp_agent.core.context import Context as AppContext
from mcp_agent.workflows.llm.augmented_llm import AugmentedLLM
from groq import Groq
import PyPDF2


# --------- LLaMA 3 Augmented LLM Wrapper ---------

class Llama3AugmentedLLM:
    def __init__(self, agent=None):  # fixed constructor

        self.agent = agent
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY")) 

    async def generate_str(self, message: str) -> str:
        chat = self.client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": message}],
        )
        return chat.choices[0].message.content



# --------- MCPApp ---------
app = MCPApp(
    name="hello_world_llama3",
    description="Hello World MCPApp using LLaMA 3",
)


def extract_text_from_pdf(pdf_path: str) -> str:
    if not Path(pdf_path).exists():
        return "PDF file not found."
    
    text = ""
    with open(pdf_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text


# --------- Finder Agent with PDF chunking ---------
@app.tool()
async def finder_agent(request: str, app_ctx: Optional[AppContext] = None) -> str:
    logger = app_ctx.app.logger
    logger.info(f"finder_agent called with request: {request}")

    # Extract PDF text
    pdf_path = "data/uetProspectus.pdf"
    pdf_text = extract_text_from_pdf(pdf_path)

    if not pdf_text:
        return "Information not found in the provided document."

    # Split PDF into smaller chunks to avoid token limits
    def chunk_text(text: str, max_chars: int = 1500):
        chunks = []
        start = 0
        while start < len(text):
            end = start + max_chars
            chunks.append(text[start:end])
            start = end
        return chunks

    pdf_chunks = chunk_text(pdf_text)

    # Create agent
    agent = Agent(
        name="university_assistant",
        instruction=(
            "You are a University Assistant Chatbot.\n"
            "Answer questions using ONLY the information present in the PDF text provided.\n"
            "If the information is not found, respond with: "
            "'Information not found in the provided document.'"
        ),
        server_names=["filesystem"],
        context=app_ctx,
    )

    async with agent:
        llm = await agent.attach_llm(Llama3AugmentedLLM)

        answers = []
        for idx, chunk in enumerate(pdf_chunks):
            prompt = (
                f"PDF Chunk {idx+1}:\n{chunk}\n\n"
                f"Question:\n{request}\n"
                "Answer ONLY using the content above. "
                "If the content is not relevant, reply with nothing."
            )
            answer = await llm.generate_str(message=prompt)
            answers.append(answer.strip())

        # Combine all chunk answers into one final response
        relevant_answers = [a for a in answers if a]

        if not relevant_answers:
            return "Information not found in the provided document."

        # Combine and summarize chunk answers into ONE concise answer
        summary_prompt = (
            "You are a helpful university assistant. "
            "Here are partial answers from multiple PDF chunks:\n\n"
            + "\n".join(relevant_answers)
            + "\n\nPlease provide ONE concise, clear answer to the question, "
            "without repeating information."
        )
        final_answer = await llm.generate_str(message=summary_prompt)
        return final_answer




# # --------- Main function ---------
# async def main():
#     async with app.run() as agent_app:
#         # Example: read a university PDF
#         pdf_answer = await finder_agent(
#             request=(
#                 "Read the file data/university_prospectus.pdf and answer:\n"
#                 "What academic programs does the university offer?"
#             ),
#             app_ctx=agent_app.context,
#         )

#         print("University chatbot response:")
#         print(pdf_answer)


# if __name__ == "__main__":
#     asyncio.run(main())
