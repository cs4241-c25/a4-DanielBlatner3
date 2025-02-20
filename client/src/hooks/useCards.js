import { useState, useEffect } from "react";
import axios from "axios";

export default function useCards() {
    const [currentCard, setCurrentCard] = useState(null);

    const fetchCard = async () => {
        try {
            const { data } = await axios.get("https://api.scryfall.com/cards/random");
            setCurrentCard({
                id: data.id,
                title: data.name,
                description: data.oracle_text || "No oracle text available.",
                imageUrl: data.image_uris?.normal || data.card_faces?.[0]?.image_uris?.normal,
            });
            console.log("Fetched card:", data);
        } catch (error) {
            console.error("Error fetching card:", error);
        }
    };

    useEffect(() => {
        fetchCard();
    }, []);

    return { currentCard, fetchCard };
}