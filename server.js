
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Task Schema

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: { virtuals: true }
    }
);

// Task Model
const Task = mongoose.model("Task", taskSchema);

// GET - Fetch all tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Add new task

app.post("/api/tasks", async (req, res) => {
    try {
        const title = req.body.title;

        // Check empty task
        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Task title cannot be empty"
            });
        }

        const newTask = new Task({
            title: title.trim()
        });

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);

    } catch (error) {
        console.error("Add Task Error:", error.message);

        res.status(500).json({
            message: "Something went wrong while adding task"
        });
    }
});


// PUT - Update task

app.put("/api/tasks/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                completed: req.body.completed
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(updatedTask);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE - Delete task
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });


