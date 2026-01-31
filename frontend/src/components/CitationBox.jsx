export default function CitationBox({ citations }) {
  return (
    <div className="mt-2 text-xs text-gray-600">
      <strong>Sources:</strong>
      <ul className="list-disc ml-4">
        {citations.map((c, i) => (
          <li key={i}>
            Page {c.page} – UET Prospectus
          </li>
        ))}
      </ul>
    </div>
  )
}
