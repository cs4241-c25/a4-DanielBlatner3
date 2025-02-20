import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import "./passport-config.js"

import MongoStore from "connect-mongo";


import authRoutes from "./routes/auth.js";
import cardRoutes from "./routes/cards.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "https://a3-daniel-blatner3.vercel.app", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(session({
    secret: process.env.SESSION_SECRET || "testKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Use the MongoDB URI from Render environment variables
        collectionName: "sessions",
        ttl: 24 * 60 * 60,
    }),
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/auth", authRoutes);
app.use("/cards", cardRoutes);

app.listen(8080, () => console.log("Server running on port 8080"));