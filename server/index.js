import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connentDB from "./db.js";
import { getHome, getHealth } from "./controllers/health.js";
import { postProject, deleteProject } from "./controllers/newProjects.js";
import { createMessage } from "./controllers/message.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", getHome);
app.get("/health", getHealth);

app.post("/project", postProject)
app.delete("/delete/:id", deleteProject)
app.post("/message", createMessage)

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);

    connentDB();
});