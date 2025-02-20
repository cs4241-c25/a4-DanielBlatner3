import {useState, useEffect, useContext} from "react";
import {getCollection, deleteCard, getUser, renameCollection} from "../api";
import Navbar from "../components/Navbar.jsx";
import { AuthContext } from "../AuthContext.jsx";


const Collection = () => {
    const [savedCards, setSavedCards] = useState([]);
    const { user, setUser } = useContext(AuthContext);

    const [collectionName, setCollectionName] = useState(user.collectionName || "My Collection");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { user } = await getUser();
                setCollectionName(user.collectionName || "My Collection");
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    const handleRename = async () => {
        try {
            await renameCollection(collectionName);
            setUser({ ...user, collectionName });
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        fetchSavedCards();
    }, []);

    const fetchSavedCards = async () => {
        try {
            const response = await getCollection(user._id);
            setSavedCards(response.data);
        } catch (error) {
            console.error("Error fetching saved cards:", error);
        }
    };

    const handleDelete = async (cardId) => {
        try {
            await deleteCard(cardId);
            setSavedCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <div className="collection">
            <header>
                <Navbar/>
            </header>
            <main>

                <div className="collection-container">
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                value={collectionName}
                                onChange={(e) => setCollectionName(e.target.value)}
                            />
                            <button onClick={handleRename}>Save</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    ) : (
                        <h2 onClick={() => setIsEditing(true)}>{collectionName}</h2>
                    )}
                    {savedCards.length === 0 ? (
                        <p>You're Hellbent, go get some cards!</p>
                    ) : (
                        <div className="cards-grid">
                            {savedCards.map((card) => (
                                <div key={card._id} className="card-item">
                                    <img src={card.imageUrl} alt={card.title} className="card-image" />
                                    <div className="card-details">
                                        <h3>{card.title}</h3>
                                        <p>{card.description}</p>
                                        <button onClick={() => handleDelete(card._id)} className="delete-btn">
                                            ❌ Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>

        </div>

    );
};

export default Collection;