import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import About from "./pages/About"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
