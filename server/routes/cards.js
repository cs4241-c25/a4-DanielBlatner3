import express from "express";
import Card from "../models/Card.js";
import { ensureAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, async (req, res) => {
    const cards = await Card.find();
    res.json(cards);
});

router.post("/save", ensureAuthenticated, async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const newCard = new Card({ title, description, imageUrl, userId: req.user._id });
    await newCard.save();
    res.json(newCard);
});

router.get("/collection/:userId", ensureAuthenticated, async (req, res) => {
   try{
       const {userId} = req.params;
       const saved = await Card.find({userId: userId});
       res.json(saved);
   }catch(err){
       console.error(err);
       res.status(500).json({error: err});
   }
});

router.put("/collection/rename", ensureAuthenticated, async (req, res) => {
    const { newName } = req.body;

    if (!newName) {
        return res.status(400).json({ error: "New name required" });
    }

    try {
        req.user.collectionName = newName;
        await req.user.save();
        res.json({ message: "Collection name successfully updated", collectionName: newName });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
    await Card.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
});

export default router;