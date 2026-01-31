const API_URL = "http://localhost:8000/ask"; // <- must match FastAPI endpoint

export async function sendMessage(question) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }), // match FastAPI body model
  });

  if (!response.ok) throw new Error("Server error");

  const data = await response.json();
  return { answer: data.answer }; // MCP agent answer
}
