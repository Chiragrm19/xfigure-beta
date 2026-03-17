# NexusAI - The Unified AI Router

NexusAI is a full-stack web application that intelligently routes your queries to the most suitable AI model (ChatGPT, Claude, Perplexity, Gemini, Grok, DeepSeek). 

## Features
- **Intelligent Routing**: Automatically classifies intents (coding, finance, math, web search, etc.) and routes them to the best AI.
- **Premium Interface**: Apple-inspired dark mode aesthetics with glassmorphism, Framer Motion animations, and syntax highlighting.
- **Full Stack**: React + Vite frontend, Express + Node.js backend.
- **Supabase Integration**: User auth, chat history, and encrypted API key storage ready to be wired up.

## Quick Start

### 1. Database Setup
Create a new project on [Supabase](https://supabase.com). Run the contents of `supabase-schema.sql` in your SQL Editor to create the tables.

### 2. Environment Variables
In the `backend` folder, duplicate `.env.example` as `.env` and fill in your keys:
```
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

OPENAI_API_KEY=your_openai_api_key
# ... add other AI keys
```

In the `frontend` folder, create a `.env` file for Vite:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run the Backend
```bash
cd backend
npm install
node server.js
```
The server will run on port `5000`.

### 4. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
The app will be available on `http://localhost:5173`.
