import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';
import Input from '../components/ui/Input.jsx';
import TextArea from '../components/ui/TextArea.jsx';
import Button from '../components/ui/Button.jsx';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating note:", error);
      if (error?.response?.status === 429) {
        toast.error("Slow down! You're creating notes too quickly!", { duration: 4000, icon: '⚠️' });
      } else {
        toast.error("Failed to create note. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='max-w-3xl mx-auto'>
        <Link to={"/"} className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors'>
          <ArrowLeftIcon className='w-5 h-5' />
          Back to Notes
        </Link>
        <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-8'>
          <h2 className='text-2xl font-bold text-slate-900 mb-6'>Create a New Note</h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Title
              </label>
              <Input 
                type="text" 
                placeholder='Enter note title' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-lg"
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Content
              </label>
              <TextArea
                placeholder='Write your note here...'
                className='w-full border border-slate-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none min-h-64 leading-relaxed'
                value={content} 
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Link 
                to="/" 
                className="px-6 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </Link>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Note"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage