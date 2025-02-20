//import useCards from "../hooks/useCards.js";
//import Card from "../components/Card.jsx";
import CardViewer from "../components/CardViewer.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Dashboard() {

    return (
        <div className="dashboard">
            <header>
                <Navbar/>
            </header>
            <main>
                <CardViewer />
            </main>
        </div>
    );
}