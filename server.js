import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

const app = express();

// Dodaj obsługę CORS
app.use(cors());
app.use(json()); // Dodaj obsługę JSON w zapytaniach

connect("mongodb://localhost:27017/TodoList");

const TaskSchema = new Schema({
  task: String,
});

const TaskModel = model("tasks", TaskSchema);

app.get("/getTasks", async (req, res) => {
  try {
    console.log("elo1")
    const tasks = await TaskModel.find().exec();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/addTask", async (req, res) => {
  try {
    const { task, isDaily, category } = req.body;
    const newTask = new TaskModel({ task, isDaily, category });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/updateTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { task }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
