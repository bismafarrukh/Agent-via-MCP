import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, BookOpen, ArrowRight, Users, Cpu } from "lucide-react";

export default function Home() {
    const [animatedText, setAnimatedText] = useState("");
    const fullText = "UET Department Information Chatbot";

    useEffect(() => {
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i <= fullText.length) {
                setAnimatedText(fullText.substring(0, i));
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);

        return () => clearInterval(typingEffect);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>

                {/* Animated floating elements */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-4 h-4 bg-blue-300 rounded-full opacity-20"
                        initial={{ y: 0, x: Math.random() * 100 }}
                        animate={{
                            y: [0, -20, 0],
                            x: [
                                Math.random() * 100,
                                Math.random() * 100 + 50,
                                Math.random() * 100,
                            ],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                        }}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-4xl w-full">
                {/* Header with animation */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <motion.div
                                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                                animate={{ rotateY: [0, 360] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                                <MessageSquare size={36} className="text-white" />
                            </motion.div>
                            <motion.div
                                className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-md"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Cpu size={18} className="text-white" />
                            </motion.div>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 leading-tight">
                        {animatedText}
                        <span className="inline-block w-1 h-12 ml-1 bg-blue-500 align-middle animate-pulse"></span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-2">
                        Your AI Assistant for University of Engineering & Technology
                    </p>
                </motion.div>

                {/* Main content card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-10 border border-white/50"
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-gray-800">
                                Intelligent Department Information
                            </h2>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                An advanced NLP project powered by an{" "}
                                <strong className="text-blue-600">MCP-based AI Agent</strong>
                                that extracts knowledge directly from the UET Prospectus PDF.
                                Get accurate, up-to-date information about departments, courses,
                                and programs.
                            </p>

                            <div className="flex items-center mb-4 text-gray-700">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                    <BookOpen size={16} className="text-green-600" />
                                </div>
                                <span>
                                    Answers <strong>only department-related questions</strong>
                                </span>
                            </div>

                            <div className="flex items-center text-gray-700">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                    <Users size={16} className="text-purple-600" />
                                </div>
                                <span>
                                    Designed for students, faculty, and prospective applicants
                                </span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                    <MessageSquare size={18} className="text-blue-600" />
                                </span>
                                Sample Questions You Can Ask:
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "What programs does the Computer Science department offer?",
                                    "Tell me about the Electrical Engineering faculty.",
                                    "What are the admission requirements for Mechanical Engineering?",
                                    "Which departments offer PhD programs?",
                                ].map((question, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start p-3 bg-white rounded-lg shadow-sm border-l-4 border-blue-400"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                    >
                                        <span className="text-blue-500 font-bold mr-2">
                                            {index + 1}.
                                        </span>
                                        <span className="text-gray-700">{question}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Action buttons with animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            to="/chat"
                            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center">
                                <MessageSquare className="mr-3" size={22} />
                                Start Chatting with AI
                                <ArrowRight
                                    className="ml-3 group-hover:translate-x-2 transition-transform"
                                    size={20}
                                />
                            </span>

                            {/* Button animation effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            to="/about"
                            className="group border-2 border-gray-300 bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center hover:border-blue-400 transition-colors"
                        >
                            <BookOpen className="mr-3" size={22} />
                            Learn About Project
                            <motion.div
                                className="w-0 group-hover:w-5 h-0.5 bg-blue-500 ml-3"
                                initial={false}
                                animate={{ width: 0 }}
                                whileHover={{ width: 20 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Stats or features section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                >
                    {[
                        { label: "PDF Pages", value: "30+", color: "text-blue-600" },
                        { label: "Departments", value: "20+", color: "text-purple-600" },
                        { label: "AI Accuracy", value: "98%", color: "text-green-600" },
                        { label: "Response Time", value: "<2s", color: "text-yellow-600" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/50"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                                {stat.value}
                            </div>
                            <div className="text-gray-600 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center text-gray-500 mt-12 text-sm"
                >
                    Powered by MCP (Model Context Protocol) & Natural Language Processing
                </motion.p>
            </div>
        </div>
    );
}
