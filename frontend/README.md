# UET Department Information Chatbot

A modern web application built with React and FastAPI that provides an interactive chatbot interface for accessing University of Engineering and Technology (UET) department information.

## Features

- **Interactive Chat Interface**: Real-time conversation with an AI-powered chatbot
- **Department Information**: Access to comprehensive UET department data
- **Modern UI**: Clean, responsive design with smooth animations
- **FastAPI Backend**: High-performance Python API for data processing
- **Gemma 3 Integration**: Advanced language model for natural language understanding

## Tech Stack

### Frontend
- **React 19**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icon library

### Backend
- **FastAPI**: Modern Python web framework
- **Gemma 3**: Lightweight language model
- **MCP (Model Context Protocol)**: Agent architecture protocol

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Python 3.8+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mcp/frontend
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Backend Setup
1. Navigate to the backend directory (assuming it's in a separate folder)
2. Install Python dependencies
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI server
   ```bash
   uvicorn main:app --reload
   ```

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AgentInfo.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── CitationBox.jsx
│   │   └── MessageBubble.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Chat.jsx
│   │   └── About.jsx
│   ├── services/          # API services
│   │   └── api.js
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Home Page**: Landing page with project overview
2. **Chat Page**: Interactive chatbot interface
3. **About Page**: Project information and tech stack details

