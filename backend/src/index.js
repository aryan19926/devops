import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/todos", async (_req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const text = req.body?.text?.trim();

  if (!text) {
    return res.status(400).json({ message: "Text is required." });
  }

  const todo = await Todo.create({ text });
  todo.save();
  console.log("todo created");
  return res.status(201).json(todo);
});

app.patch("/api/todos/:id", async (req, res) => {
  const updates = {};

  if (typeof req.body.text === "string") {
    updates.text = req.body.text.trim();
  }

  if (typeof req.body.done === "boolean") {
    updates.done = req.body.done;
  }

  const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found." });
  }

  return res.json(todo);
});

app.delete("/api/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found." });
  }

  return res.status(204).send();
});

app.use((err, _req, res, _next) => {
  console.error(err);

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: "Invalid todo id." });
  }

  return res.status(500).json({ message: "Internal server error." });
});

async function start() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing in the environment.");
  }

  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
