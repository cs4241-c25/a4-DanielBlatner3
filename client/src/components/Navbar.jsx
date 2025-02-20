import { useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";
import { Link } from "react-router-dom";


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar shadow-sm">
            <div className="container d-flex justify-content-between align-items-center w-100">
                {user && (
                    <div className="user-info d-flex align-items-center">
                        <h1 className="navbar-title m-0">Tinder Wall</h1>
                        <img src={user.avatar} alt={user.username} className="user-avatar" />
                        <span className="username">{user.username}</span>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <Link to={`/collection/${user._id}`} className="nav-link">Saved Cards</Link>
                        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;