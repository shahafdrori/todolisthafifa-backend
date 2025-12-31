// @ts-nocheck

import { getTasksCollection } from "../DB/connection.ts";
import { ObjectId } from "mongodb";
const collection = getTasksCollection();
import express from "express";

export const getAllTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const tasks = await collection.find().toArray();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
export const addTask = async (req: express.Request, res: express.Response) => {
  try {
    const newTask = {
      name: req.body.name || "No Name",
      subject: req.body.subject,
      priority: req.body.priority,
      date: req.body.date ? new Date(req.body.date) : null,
      coordinates: {
        latitude: req.body.coordinates?.latitude,
        longitude: req.body.coordinates?.longitude,
      },
    };

    const result = await collection.insertOne(newTask);
    res.status(201).json({
      message: "Task added successfully",
      taskId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add task" });
  }
};
export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  console.log("Deleting task with id:", id);
  try {
    const query = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { _id: id };
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteAllTasks = async (req: express.Request, res: express.Response) => {
  if (!collection) {
    return res.status(500).json({ message: "DB not initialized" });
  }

  try {
    const result = await collection.deleteMany({});

    return res.status(200).json({
      deletedCount: result.deletedCount ?? 0,
      message: "Tasks deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateTask = async (req: express.Request, res: express.Response) => {
  if (!collection) {
    return res.status(500).json({ message: "DB not initialized" });
  }

  const { id } = req.params;
  const updatedData = req.body;

  try {
    const query = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { _id: id };

    const result = await collection.updateOne(query, { $set: updatedData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("Error updating task:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

