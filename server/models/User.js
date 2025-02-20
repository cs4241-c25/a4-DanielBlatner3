import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    githubId: String,
    username: String,
    avatar: String,
    collectionName: {type: String, default: "My Collection"}
});

export default mongoose.model("User", UserSchema);