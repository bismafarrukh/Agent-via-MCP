import { useState, useEffect, useRef } from "react"
import { sendMessage } from "../services/api"
import MessageBubble from "./MessageBubble"
import { Send, Bot, User, Sparkles, Loader2, Paperclip, Mic, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatWindow() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [showExamples, setShowExamples] = useState(true)
    const messagesEndRef = useRef(null)

    // Welcome message
    useEffect(() => {
        setMessages([
            {
                role: "bot",
                content: "Hello! I'm your UET Department Information Assistant. I can answer questions about departments, programs, faculty, and admission requirements based on the UET Prospectus. How can I help you today?",
                timestamp: new Date(),
                agent: "welcome"
            }
        ])
    }, [])

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom()
    }, [messages, loading])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = {
            role: "user",
            content: input,
            timestamp: new Date()
        }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setLoading(true)
        setShowExamples(false)

        try {
            const data = await sendMessage(input)

            const botMessage = {
                role: "bot",
                content: data.answer,
                citations: data.citations,
                agent: data.agent,
                timestamp: new Date()
            }

            setMessages((prev) => [...prev, botMessage])
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
                    timestamp: new Date(),
                    error: true
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleExampleClick = (example) => {
        setInput(example)
    }

    const toggleRecording = () => {
        setIsRecording(!isRecording)
        // In a real app, you would integrate with Web Speech API here
    }

    const exampleQuestions = [
        "What departments are available at UET?",
        "Tell me about Computer Science programs",
        "What are the admission requirements?",
        "Which departments offer PhD programs?",
        "Tell me about the Electrical Engineering faculty"
    ]

    return (
        <div className="flex flex-col h-[85vh] max-w-4xl mx-auto bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">

            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="relative"
                        >
                            <Bot size={28} />
                            <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                        <div>
                            <h2 className="font-bold text-lg">UET Department Assistant</h2>
                            <p className="text-sm text-blue-100">Powered by MCP AI Agent</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${loading ? 'bg-yellow-500' : 'bg-green-500'}`}>
                            {loading ? 'Processing...' : 'Online'}
                        </div>
                        <Sparkles size={20} className="text-yellow-300" />
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/30">
                <AnimatePresence>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                        >
                            <MessageBubble message={msg} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {showExamples && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                    >
                        <div className="flex items-center mb-3">
                            <Sparkles size={18} className="text-blue-500 mr-2" />
                            <h3 className="font-medium text-gray-800">Try asking about:</h3>
                            <button
                                onClick={() => setShowExamples(false)}
                                className="ml-auto text-gray-500 hover:text-gray-700"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {exampleQuestions.map((question, idx) => (
                                <motion.button
                                    key={idx}
                                    onClick={() => handleExampleClick(question)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 text-sm bg-white rounded-full border border-blue-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                >
                                    {question}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 size={20} className="text-blue-600" />
                        </motion.div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">Processing your question...</p>
                            <p className="text-sm text-gray-600">Searching through UET Prospectus data</p>
                        </div>
                        <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-blue-500 rounded-full"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white/80 backdrop-blur-sm">
                <div className="flex items-end gap-3">
                    <div className="flex-1 relative">
                        <textarea
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Ask about UET departments, programs, or faculty..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            rows={Math.min(3, Math.max(1, input.split('\n').length))}
                            maxLength={500}
                        />
                        <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleRecording}
                                className={`p-1.5 rounded-full ${isRecording ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <Mic size={18} />
                            </motion.button>
                            <span className="text-xs text-gray-500">
                                {input.length}/500
                            </span>
                        </div>
                    </div>

                    <motion.button
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                        whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                        whileTap={{ scale: input.trim() ? 0.95 : 1 }}
                        className={`p-3 rounded-xl ${!input.trim() || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg'} text-white flex items-center justify-center min-w-[44px] min-h-[44px]`}
                    >
                        {loading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <Send size={20} />
                        )}
                    </motion.button>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="text-gray-500 flex items-center">
                        <Paperclip size={14} className="mr-1" />
                        <span>I can answer questions based on UET Prospectus PDF</span>
                    </div>
                    <div className="text-gray-500">
                        Press <kbd className="px-2 py-1 bg-gray-100 rounded border">Enter</kbd> to send • <kbd className="px-2 py-1 bg-gray-100 rounded border">Shift+Enter</kbd> for new line
                    </div>
                </div>
            </div>

            {/* Recording Indicator */}
            <AnimatePresence>
                {isRecording && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-3 h-3 bg-white rounded-full"
                        />
                        <span className="font-medium">Listening... Speak now</span>
                        <button
                            onClick={toggleRecording}
                            className="ml-2 text-white hover:text-gray-200"
                        >
                            <X size={18} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}