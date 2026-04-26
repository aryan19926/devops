# Simple Full-Stack To-Do App

This repo contains a very small full-stack to-do app for learning DevOps basics.

## Structure

- `frontend`: React app built with Vite
- `backend`: Express API with MongoDB using Mongoose

## Run locally

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Set `MONGODB_URI` in `.env`. Example:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/todo_app
PORT=5001
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Default frontend env:

```bash
VITE_API_URL=http://localhost:5001/api
```

## API

- `GET /api/todos`
- `POST /api/todos`
- `PATCH /api/todos/:id`
- `DELETE /api/todos/:id`
