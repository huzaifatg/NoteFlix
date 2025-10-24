import { Link } from 'react-router';
import { PlusIcon, BookText } from 'lucide-react';
import { useAuth } from '../lib/authContext';

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        // Force navigation to landing page after logout
        window.location.href = '/landing';
    };

    return (
        <header className='bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <Link to={isLoggedIn ? '/home' : '/landing'} className='flex items-center gap-3 group'>
                        <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md'>
                            <BookText className='w-6 h-6 text-white' />
                        </div>
                        <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300'>
                            Note<span className='text-purple-600'>Flix</span>
                        </span>
                    </Link>
                    <div className='flex items-center gap-3'>
                        {isLoggedIn ? (
                            <>
                                <Link 
                                    to='/create' 
                                    className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95'
                                >
                                    <PlusIcon className='w-4 h-4' />
                                    <span className='font-medium'>New Note</span>
                                </Link>
                                
                                <button 
                                    onClick={handleLogout}
                                    className='px-4 py-2 text-red-600 hover:text-red-700 font-medium hover:bg-red-50 rounded-lg transition-all border border-red-200 hover:border-red-300'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to='/login' 
                                    className='px-4 py-2 text-slate-700 hover:text-slate-900 font-medium hover:bg-slate-50 rounded-lg transition-all'
                                >
                                    Login
                                </Link>
                                <Link 
                                    to='/signup' 
                                    className='inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95'
                                >
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