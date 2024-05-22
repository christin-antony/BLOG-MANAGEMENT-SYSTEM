import express from 'express';
import router from './router/router.js';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); 
const port = 1009;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

app.use("/", router);

mongoose.connect("mongodb+srv://christin:ouHLMYZXHEP6B58i@cluster0.golc87t.mongodb.net/Blogdb")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    });

app.listen(port, () => {
    console.log("Server started on port", port);
});
