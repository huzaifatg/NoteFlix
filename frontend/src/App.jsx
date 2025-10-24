import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './lib/authContext.jsx';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignUpPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Navbar from './components/Navbar.jsx';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
    const { isLoggedIn } = useAuth();
    
    return (
        <>
            <Navbar />
            <Toaster 
                position="top-right"
                toastOptions={{
                    className: 'font-medium',
                    duration: 3000,
                    style: {
                        background: '#FFFFFF',
                        color: '#0F172A',
                        border: '1px solid #E2E8F0',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    },
                }}
            />
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/landing" />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/home" element={
                    <div className="relative min-h-screen w-full bg-slate-50">
                        <main className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
                            <PrivateRoute><HomePage /></PrivateRoute>
                        </main>
                    </div>
                } />
                <Route path="/create" element={
                    <div className="relative min-h-screen w-full bg-slate-50">
                        <main className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
                            <PrivateRoute><CreatePage /></PrivateRoute>
                        </main>
                    </div>
                } />
                <Route path="/note/:id" element={
                    <div className="relative min-h-screen w-full bg-slate-50">
                        <main className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
                            <PrivateRoute><NoteDetailPage /></PrivateRoute>
                        </main>
                    </div>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </>
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