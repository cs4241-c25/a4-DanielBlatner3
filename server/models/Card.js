import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Card", CardSchema);