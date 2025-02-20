import axios from "axios";

const API = axios.create({ baseURL: "https://a3-danielblatner3.onrender.com", withCredentials: true });

export const loginWithGithub = () => (window.location.href = "https://a3-danielblatner3.onrender.com/auth/github");
export const logout = () => API.post("/auth/logout").then(() => {
    // Redirect to homepage after successful logout
    window.location.href = "https://a3-daniel-blatner3.vercel.app/";
})
    .catch((error) => {
        console.error("Logout failed:", error);
    });
export const getUser = () => API.get("/auth/status");
export const saveCard = (card) => API.post("/cards/save", card);
export const deleteCard = (id) => API.delete(`/cards/${id}`);
export const getCollection = (userID) => API.get(`/cards/collection/${userID}`);
export const renameCollection = (newName) => API.put(`/cards/collection/rename`, { newName });