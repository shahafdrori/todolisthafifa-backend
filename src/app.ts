import express from "express";
import { connectToDB } from "./DB/connection.ts";
import { env } from "process";
import indexRouter from "./index.ts";
import cors from "cors";

const app = express();
const port = env.PORT;

app.use(express.json());
app.use(cors());
app.use(indexRouter);

app.listen(port, async () => {
  await connectToDB();
  try {
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Error connecting:", error);
  }
});
