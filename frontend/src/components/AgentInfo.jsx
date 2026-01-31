export default function AgentInfo({ agent }) {
  return (
    <details className="mt-2 text-xs text-gray-500">
      <summary className="cursor-pointer">
        🔧 Agent Reasoning
      </summary>
      <p>Tool Used: {agent.tool}</p>
      <p>Action: {agent.action}</p>
    </details>
  )
}
