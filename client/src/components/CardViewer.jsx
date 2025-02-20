import { useState, useEffect } from "react";
import SwipeableCard from "./SwipeableCard";
import useCards from "../hooks/useCards.js";
import {saveCard} from "../api.js";

const CardViewer = () => {
    const {currentCard, fetchCard} = useCards();
    const [savedCards, setSavedCards] = useState([]);
    const [cardCache, setCardCache] = useState([]);

    // Fetch initial 3 cards
    useEffect(() => {
        const initializeCache = async () => {
            for (let i = 0; i < 3; i++) {
                await fetchNewCard();
            }
        };

        initializeCache();
    }, []);

    useEffect(() => {
        if (currentCard) {
            setCardCache((prevCache) => {
                const updatedCache = [...prevCache, currentCard];
                if (updatedCache.length > 3) {
                    updatedCache.pop();
                }
                return updatedCache;
            });
        }
    }, [currentCard]);

    const handleSave = async (card) => {
        setCardCache((prevCache) => prevCache.slice(1));
        try {
            const response = await saveCard(card);
            if (response?.data) {
                setSavedCards((prev) => [...prev, response.data]);
            }
        } catch (error) {
            console.error("Error saving card:", error);
        }
        updateCache();
    };

    const handleDiscard = () => {
        setCardCache((prevCache) => prevCache.slice(1));
        updateCache();
    };

    const updateCache = async () => {
        const newCard = await fetchCard();
        if (newCard) {
            setCardCache((prevCache) => [...prevCache, newCard]);
        }
    };

    const fetchNewCard = async () => {
        await fetchCard();
    };

    return (
        <div className="card-viewer">

            <div className="card-container">
                {cardCache.length > 0 && (
                    <div className="card-wrapper">
                        <SwipeableCard
                            card={cardCache[0]}
                            onSave={handleSave}
                            onDiscard={handleDiscard}
                        />
                    </div>
                )}
                {cardCache.length > 1 && (
                    <div className="card-wrapper">
                        <SwipeableCard
                            card={cardCache[1]}
                            onSave={handleSave}
                            onDiscard={handleDiscard}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardViewer;