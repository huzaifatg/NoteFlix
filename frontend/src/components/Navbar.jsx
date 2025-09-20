import React from 'react';
import { Link, useNavigate } from 'react-router'; // Corrected import
import { PlusIcon } from 'lucide-react';
import { useAuth } from '../lib/authContext'; // Import the useAuth hook

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <header className='bg-base-300 border-b border-base-content/10'>
            <div className='mx-auto max-w-6xl p-4'>
                <div className='flex items-center justify-between'>
                    <Link to='/' className='text-2xl font-bold text-primary font-mono tracking-tight'>
                        NoteFlix
                    </Link>
                    <div className='flex items-center gap-4'>
                        {isLoggedIn ? (
                            // If user is logged in
                            <>
                                <Link to={'/create'} className='btn btn-primary'>
                                    <PlusIcon className='size-5' />
                                    <span>New Note</span>
                                </Link>
                                <button onClick={handleLogout} className='btn btn-ghost'>
                                    Logout
                                </button>
                            </>
                        ) : (
                            // If user is not logged in
                            <>
                                <Link to={'/login'} className='btn btn-ghost'>
                                    Login
                                </Link>
                                <Link to={'/signup'} className='btn btn-primary'>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;