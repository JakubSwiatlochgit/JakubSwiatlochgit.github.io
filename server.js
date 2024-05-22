import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

const app = express();

// Dodaj obsługę CORS
app.use(cors());
app.use(json()); // Dodaj obsługę JSON w zapytaniach

connect("mongodb://localhost:27017/TodoList");

const TaskSchema = new Schema({
  desc: String,
  isDaily: Boolean,
  category: String,
});

const TaskModel = model("tasks", TaskSchema);

// // Utwórz przykładowe zadania
// const initialTasks = [
//   { desc: "Wstań z łóżka", isDaily: true, category: "Home" },
//   { desc: "Idź się umyć", isDaily: false, category: "Home" },
//   { desc: "Wyjdź z domu", isDaily: true, category: "Outside" },
//   { desc: "Wyjdź na spacer z psem", isDaily: true, category: "Pets" },
// ];

// // Wstaw przykładowe zadania do bazy danych
// TaskModel.insertMany(initialTasks)
//   .then(() => {
//     console.log("Przykładowe zadania zostały dodane do bazy danych.");
//   })
//   .catch((error) => {
//     console.error("Błąd podczas dodawania przykładowych zadań:", error);
//   });

app.get("/getTasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find().exec();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/addTask", async (req, res) => {
  try {
    const { desc, isDaily, category } = req.body;
    const newTask = new TaskModel({ desc, isDaily, category });
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
    const { desc } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { desc }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
