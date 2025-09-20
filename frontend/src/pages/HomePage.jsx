import { useEffect, useState } from 'react';
import { useAuth } from '../lib/authContext'; // Import the useAuth hook
import RateLimitedUI from '../components/RateLimitedUI';
import { toast } from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios.js';
import NotesNotFound from '../components/NotesNotfound';

const HomePage = () => {
  const { token } = useAuth(); // Get the token from AuthContext
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className='min-h-screen'>
      {isRateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;