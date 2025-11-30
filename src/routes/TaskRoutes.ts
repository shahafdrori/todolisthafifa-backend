import express from "express";
import { validateRequest } from "../helpers/ValidateRequest.ts";
import { TaskSchema } from "../schema/TaskSchema.ts";
import {
  addTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controller/task.ts";

const TasksRouter = express.Router();

TasksRouter.get("/all", getAllTasks);
TasksRouter.post("/add", validateRequest(TaskSchema), addTask);
TasksRouter.put("/update/:id", validateRequest(TaskSchema), updateTask);
TasksRouter.delete("/delete/:id", deleteTask);
TasksRouter.delete("/deleteAll", deleteAllTasks);

export default TasksRouter;
