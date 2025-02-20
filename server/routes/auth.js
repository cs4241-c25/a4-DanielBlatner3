import express from "express";
import passport from "passport";
import mongoose from "mongoose";

const router = express.Router();

router.get("/github", passport.authenticate("github"));

router.get("/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res, next) => {

        req.login(req.user, (err) => {
            if (err) return next(err);

            req.session.save(() => {
                res.cookie("connect.sid", req.sessionID, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.redirect("https://a3-daniel-blatner3.vercel.app/dashboard");
            });
        });
    }
);

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

router.get("/status", async (req, res) => {
    const SessionModel = mongoose.connection.collection("sessions");

    try {
        const storedSession = await SessionModel.findOne({ _id: `session:${req.sessionID}` });
        console.log("MongoDB Stored Session:", storedSession);
    } catch (err) {
        console.error("Error Retrieving Session from MongoDB:", err);
    }

    res.json({ user: req.user || null });
});

router.get("/user", (req, res) => {
    res.json(req.user || null);
});

export default router;