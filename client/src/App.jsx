import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import AuthRoute from "./components/AuthRoute.jsx";
import Collection from "./pages/Collection.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={
                    <AuthRoute>
                        <Dashboard />
                    </AuthRoute>
                    } />

                    <Route path="/login" element={
                        <Login />
                    }/>

                    <Route path="/dashboard" element={
                        <AuthRoute>
                            <Dashboard />
                        </AuthRoute>
                    } />

                    <Route path="/collection/:userId" element={
                        <AuthRoute>
                            <Collection />
                        </AuthRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;