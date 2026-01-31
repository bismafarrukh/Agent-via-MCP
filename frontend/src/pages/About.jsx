import { motion } from "framer-motion"
import {
    Code2,
    Server,
    Brain,
    Shield,
    BookOpen,
    Github,
    Users,
    Zap,
    ChevronRight,
    ExternalLink
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom";

export default function About() {
    const [activeTech, setActiveTech] = useState(null)

    const techStack = [
        {
            name: "React",
            description: "Frontend library for building interactive user interfaces",
            icon: <Code2 className="w-6 h-6" />,
            color: "bg-blue-500",
            borderColor: "border-blue-200",
            textColor: "text-blue-700"
        },
        {
            name: "FastAPI",
            description: "Modern Python web framework for building APIs",
            icon: <Server className="w-6 h-6" />,
            color: "bg-green-500",
            borderColor: "border-green-200",
            textColor: "text-green-700"
        },
        {
            name: "LLama",
            description: "Lightweight yet powerful language model for NLP tasks",
            icon: <Brain className="w-6 h-6" />,
            color: "bg-purple-500",
            borderColor: "border-purple-200",
            textColor: "text-purple-700"
        },
        {
            name: "MCP",
            description: "Model Context Protocol for agent architecture",
            icon: <Zap className="w-6 h-6" />,
            color: "bg-orange-500",
            borderColor: "border-orange-200",
            textColor: "text-orange-700"
        }
    ]

    const features = [
        {
            title: "Strict Context Guardrails",
            description: "Only answers department-related questions from the UET Prospectus",
            icon: <Shield className="w-8 h-8" />
        },
        {
            title: "PDF-Based Knowledge",
            description: "Information extracted directly from official UET documents",
            icon: <BookOpen className="w-8 h-8" />
        },
        {
            title: "Student-Focused",
            description: "Designed to assist prospective and current UET students",
            icon: <Users className="w-8 h-8" />
        }
    ]

    const projectDetails = [
        { label: "Project Type", value: "NLP Class Project" },
        { label: "Institution", value: "University of Engineering & Technology" },
        { label: "Data Source", value: "UET Prospectus PDF" },
        { label: "Response Accuracy", value: "Department-specific only" }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8 md:px-8 md:py-12">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">
                        About the UET Department Chatbot
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        An intelligent NLP-powered assistant specifically designed to provide accurate
                        department information from the University of Engineering & Technology prospectus.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Project Overview */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Project Overview</h2>
                                    <p className="text-gray-600">NLP Class Project - Spring 2024</p>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                                This chatbot represents a cutting-edge application of Natural Language Processing
                                in academic environments. Built around an{' '}
                                <span className="font-semibold text-blue-600">MCP-based AI Agent</span>,
                                it intelligently retrieves and processes information exclusively from the
                                UET Prospectus to answer department-related queries with precision.
                            </p>

                            {/* Project Details Grid */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {projectDetails.map((detail, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                                        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                                    >
                                        <div className="text-sm text-gray-500 mb-1">{detail.label}</div>
                                        <div className="font-semibold text-gray-800">{detail.value}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Guardrail Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 md:p-8 border border-red-100"
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mr-4">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Guardrail System</h2>
                                    <p className="text-gray-600">Strict content boundaries enforced</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-red-500 mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-bold text-red-700 mb-1">Strict Domain Limitation</h3>
                                        <p className="text-gray-700">
                                            The chatbot is programmed to answer <strong>only department-related questions</strong>.
                                            All other queries are respectfully declined to maintain focus and accuracy.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-red-500 mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-bold text-red-700 mb-1">Source-Verified Information</h3>
                                        <p className="text-gray-700">
                                            All responses are cross-referenced with the official UET Prospectus PDF,
                                            ensuring information accuracy and reliability.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-white/80 rounded-xl border border-red-200">
                                    <p className="text-center font-bold text-lg text-red-600">
                                        ⚠️ Will NOT answer: General knowledge, personal advice, or non-department topics
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Tech Stack & Features */}
                    <div className="space-y-8">
                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                                <Zap className="w-6 h-6 text-yellow-500 mr-3" />
                                Tech Stack
                            </h2>

                            <div className="space-y-4">
                                {techStack.map((tech, idx) => (
                                    <motion.button
                                        key={idx}
                                        onClick={() => setActiveTech(activeTech === idx ? null : idx)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${tech.borderColor} ${activeTech === idx ? 'ring-2 ring-offset-2 ' + tech.color.replace('bg-', 'ring-') : ''
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-lg ${tech.color} flex items-center justify-center mr-4`}>
                                                <div className="text-white">
                                                    {tech.icon}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className={`font-bold text-lg ${tech.textColor}`}>{tech.name}</h3>
                                                <p className="text-gray-600 text-sm">{tech.description}</p>
                                            </div>
                                        </div>

                                        {/* Expanded Description */}
                                        <motion.div
                                            initial={false}
                                            animate={{ height: activeTech === idx ? 'auto' : 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-3 mt-3 border-t border-gray-200">
                                                <p className="text-gray-700 text-sm">
                                                    {tech.name === 'React' && 'Powering the responsive frontend interface with real-time updates.'}
                                                    {tech.name === 'FastAPI' && 'Handling API requests and managing the NLP pipeline efficiently.'}
                                                    {tech.name === 'Gemma 3' && 'Providing the natural language understanding capabilities.'}
                                                    {tech.name === 'MCP' && 'Enabling intelligent agent architecture and context management.'}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Key Features */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-100"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Features</h2>

                            <div className="space-y-6">
                                {features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                                        className="flex items-start"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 flex-shrink-0">
                                            <div className="text-white">
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                                            <p className="text-gray-600 text-sm">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white"
                        >
                            <h3 className="text-xl font-bold mb-3">Ready to Explore?</h3>
                            <p className="mb-6 text-blue-100">
                                Start chatting with the UET Department Assistant to get accurate information about programs and departments.
                            </p>

                            <div className="space-y-3">

                                <Link to="/chat" className="block">
                                    <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 mr-2" />
                                        Open Chatbot
                                    </button>
                                </Link>


                                <button className="w-full bg-transparent border-2 border-white/30 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center">
                                    <Github className="w-5 h-5 mr-2" />
                                    View Source Code
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mt-12 pt-8 border-t border-gray-200 text-center"
                >
                    <p className="text-gray-600">
                        This project demonstrates the practical application of NLP and AI agents in educational contexts.
                        Developed as part of the Natural Language Processing course at UET.
                    </p>
                    <div className="flex items-center justify-center mt-4 space-x-4 text-gray-500">
                        <span className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Academic Project
                        </span>
                        <span>•</span>
                        <span>Fall 2025</span>
                        <span>•</span>
                        <span>Version 1.0</span>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}