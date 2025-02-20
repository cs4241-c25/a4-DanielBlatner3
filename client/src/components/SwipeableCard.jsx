import { useState, useRef } from "react";

const SwipeableCard = ({ card, onSave, onDiscard }) => {
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardRef = useRef(null);

    // Start tracking swipe (for both touch & mouse)
    const startSwipe = (clientX) => {
        if (isAnimating) return;
        setStartX(clientX);
        setIsSwiping(true);
    };

    // Move tracking (for both touch & mouse)
    const moveSwipe = (clientX) => {
        if (!isSwiping) return;
        setCurrentX(clientX - startX);
    };

    // End swipe, determine action
    const endSwipe = () => {
        if (!isSwiping) return;
        setIsSwiping(false);

        if (currentX > 100) {
            animateCard(500, () => onSave(card));
        } else if (currentX < -100) {
            animateCard(-500, () => onDiscard(card));
        } else {
            setCurrentX(0);
        }
    };

    const animateCard = (finalX, callback) => {
        setIsAnimating(true);
        cardRef.current.style.transition = "transform 0.3s ease-out";
        cardRef.current.style.transform = `translateX(${finalX}px)`;

        setTimeout(() => {
            callback();
            setCurrentX(0);
            setIsAnimating(false);

            cardRef.current.style.transition = "none";
            cardRef.current.style.transform = "translateX(0)"; // Reset position
        }, 300);
    };

    return (
        <div
            ref={cardRef}
            onTouchStart={(e) => startSwipe(e.touches[0].clientX)}
            onTouchMove={(e) => moveSwipe(e.touches[0].clientX)}
            onTouchEnd={endSwipe}
            onMouseDown={(e) => startSwipe(e.clientX)}
            onMouseMove={(e) => isSwiping && moveSwipe(e.clientX)}
            onMouseUp={endSwipe}
            onMouseLeave={endSwipe}
            style={{
                transform: `translateX(${currentX}px)`,
                transition: isSwiping ? "none" : "transform 0.3s ease-out",
                touchAction: "none",
                userSelect: "none",
                width: "300px",
                height: "400px",
                background: "white",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                position: "absolute",
                cursor: isSwiping ? "grabbing" : "grab",
            }}
        >
            <img src={card.imageUrl} alt={card.title} draggable="false"  style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
        </div>
    );
};

export default SwipeableCard;