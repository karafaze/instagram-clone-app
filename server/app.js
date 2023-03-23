const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const app = express();
require("dotenv").config();

const authRoutes = require('./routes/auth');

app.use(express.json());

mongoose.set("strictQuery", true);
mongoose
    .connect(
        `mongodb+srv://karafaze:${process.env.MONGO_PWD}@cluster0.rfoiyja.mongodb.net/instagram-clone`
    )
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch((err) => console.log(`Failed to connect to MongoDB : ${err}.`));

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({
        username: "karafaze",
    });
});

app.use("/auth", authRoutes);

module.exports = app;
