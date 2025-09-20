import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './lib/authContext.jsx';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignUpPage.jsx';
import Navbar from './components/Navbar.jsx';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    console.log("Is user logged in:", isLoggedIn); // Debugging log
    return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <div className="relative h-full w-full">
            <Navbar /> {/* Navbar is rendered globally here */}
            <Toaster />
            <Routes>
                <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                <Route path="/create" element={<PrivateRoute><CreatePage /></PrivateRoute>} />
                <Route path="/note/:id" element={<PrivateRoute><NoteDetailPage /></PrivateRoute>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </div>
    );
};

const AppWrapper = () => (
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);

export default AppWrapper;