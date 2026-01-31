const API_URL = "http://localhost:8000/ask"; // FastAPI endpoint

export async function sendMessage(question) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }), // matches FastAPI Pydantic model
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return { answer: data.answer }; // MCP agent answer
  } catch (err) {
    console.error("Error calling MCP backend:", err);
    return { answer: "Sorry, there was an error reaching the server." };
  }
}
