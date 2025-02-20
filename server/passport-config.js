import passport from "passport";
import GitHubStrategy from "passport-github2";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "https://a3-danielblatner3.onrender.com/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id });
                if (!user) {
                    user = new User({
                        githubId: profile.id,
                        username: profile.username,
                        avatar: profile.photos[0].value,
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    console.log("Serializing User:", user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("Deserializing User:", id);
    try {
        const user = await User.findById(id);
        if (!user) {
            console.log("User Not Found During Deserialization");
            return done(null, false);
        }
        console.log("Found User in DB:", user);
        done(null, user);
    } catch (err) {
        console.error("Error in Deserialization:", err);
        done(err);
    }
});