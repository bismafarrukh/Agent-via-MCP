import CitationBox from "./CitationBox"
import AgentInfo from "./AgentInfo"

export default function MessageBubble({ message }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl p-3 rounded-lg ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <p>{message.content}</p>

        {!isUser && message.citations && (
          <CitationBox citations={message.citations} />
        )}

        {!isUser && message.agent && (
          <AgentInfo agent={message.agent} />
        )}
      </div>
    </div>
  )
}
