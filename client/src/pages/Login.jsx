import { loginWithGithub } from "../api.js";

export default function Login() {
    return (
        <div className="login-container">
            <h1>Welcome to Tinder Wall</h1>
            <p>The collection builder tool, built for CS4241 WebWare @ WPI</p>
            <p>Built in the MERN stack using Bootstrap 5 for styling.</p>
            <p>This is a fan-created page, all cards and images associated with Magic: The Gathering are property of Wizards of the Coast.</p>
            <p>Made by <a href="https://danielblatner.com">Daniel Blatner</a></p>
            <button onClick={loginWithGithub}>Login with GitHub</button>
        </div>
    );
}