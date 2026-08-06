import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connentDB from "./db.js";
import { getHome, getHealth } from "./controllers/health.js";
import { postProject, deleteProject, getProjects } from "./controllers/newProjects.js";
import { postCertificate, getCertificates } from "./controllers/addCertificate.js";
import { createMessage } from "./controllers/message.js";
import ImageKit from "@imagekit/nodejs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const PORT = process.env.PORT || 8080;

app.get("/", getHome);
app.get("/health", getHealth);

app.get('/auth', function (req, res) {
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});

app.post("/project", postProject)
app.delete("/delete/:id", deleteProject)
app.get("/fetchproject", getProjects)
app.post("/certificate", postCertificate)
app.get("/fetchcertificate", getCertificates)
app.post("/message", createMessage)

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);

    connentDB();
});