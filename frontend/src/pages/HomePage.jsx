import { useEffect, useState } from 'react';
import { useAuth } from '../lib/authContext'; // Import the useAuth hook
import RateLimitedUI from '../components/RateLimitedUI';
import { toast } from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios.js';
import NotesNotFound from '../components/NotesNotfound';
import { Search, StickyNote, Calendar, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const { token } = useAuth(); // Get the token from AuthContext
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, oldest, title

  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) {
        toast.error("You are not logged in. Please log in to view your notes.");
        return;
      }

      try {
        console.log("Token:", token); // Debugging log
        const res = await api.get("/notes", {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from AuthContext
          },
        });
        console.log("API Response:", res.data); // Debugging log
        setNotes(res.data);
        setIsRateLimited(false); // Reset rate limiting after success
      } catch (error) {
        console.log("Error fetching notes:", error); // Debugging log
        console.log("Error response:", error.response); // Debugging log
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [token]); // Only depend on the token

  // Filter and sort notes
  const filteredAndSortedNotes = notes
    .filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  // Calculate stats
  const totalNotes = notes.length;
  const notesThisWeek = notes.filter(note => {
    const noteDate = new Date(note.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return noteDate >= weekAgo;
  }).length;

  return (
    <div className='space-y-8'>
      {isRateLimited && <RateLimitedUI />}
      
      {/* Hero Section with Stats */}
      {!loading && notes.length > 0 && (
        <div className='bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-8 border border-slate-200 shadow-sm'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-slate-900 mb-2'>
                Your Notes
              </h1>
              <p className='text-slate-600'>
                Organize your thoughts, ideas, and reminders
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className='flex gap-4'>
              <div className='bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-200'>
                <div className='flex items-center gap-2'>
                  <StickyNote className='w-5 h-5 text-blue-600' />
                  <div>
                    <div className='text-2xl font-bold text-slate-900'>{totalNotes}</div>
                    <div className='text-xs text-slate-600'>Total Notes</div>
                  </div>
                </div>
              </div>
              <div className='bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-200'>
                <div className='flex items-center gap-2'>
                  <TrendingUp className='w-5 h-5 text-purple-600' />
                  <div>
                    <div className='text-2xl font-bold text-slate-900'>{notesThisWeek}</div>
                    <div className='text-xs text-slate-600'>This Week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className='flex flex-col md:flex-row gap-4'>
            {/* Search */}
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
              <input
                type='text'
                placeholder='Search notes by title or content...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-900 placeholder:text-slate-400'
              />
            </div>

            {/* Sort Dropdown */}
            <div className='relative'>
              <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none' />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='pl-11 pr-10 py-3 bg-white border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-900 appearance-none cursor-pointer min-w-[180px]'
              >
                <option value='recent'>Most Recent</option>
                <option value='oldest'>Oldest First</option>
                <option value='title'>Alphabetical</option>
              </select>
              <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
                <svg className='w-5 h-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Results Count */}
          {searchQuery && (
            <div className='mt-4 text-sm text-slate-600'>
              Found {filteredAndSortedNotes.length} {filteredAndSortedNotes.length === 1 ? 'note' : 'notes'} matching "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className='flex flex-col items-center justify-center py-20'>
          <div className='w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4'></div>
          <div className='text-slate-600 font-medium'>Loading your notes...</div>
        </div>
      )}

      {/* Empty State */}
      {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}
      
      {/* No Search Results */}
      {notes.length > 0 && filteredAndSortedNotes.length === 0 && !loading && (
        <div className='flex flex-col items-center justify-center py-20'>
          <div className='bg-slate-100 rounded-full p-6 mb-4'>
            <Search className='w-12 h-12 text-slate-400' />
          </div>
          <h3 className='text-xl font-semibold text-slate-900 mb-2'>No notes found</h3>
          <p className='text-slate-600 mb-6'>Try adjusting your search query</p>
          <button
            onClick={() => setSearchQuery('')}
            className='px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all'
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Notes Grid */}
      {filteredAndSortedNotes.length > 0 && !isRateLimited && (
        <div>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold text-slate-700'>
              {searchQuery ? 'Search Results' : 'All Notes'}
            </h2>
            <span className='text-sm text-slate-500'>
              {filteredAndSortedNotes.length} {filteredAndSortedNotes.length === 1 ? 'note' : 'notes'}
            </span>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredAndSortedNotes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;