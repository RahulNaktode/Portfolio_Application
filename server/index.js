import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connentDB from "./db.js";
import { getHome, getHealth } from "./controllers/health.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", getHome);
app.get("/health", getHealth);

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);

    connentDB();
});