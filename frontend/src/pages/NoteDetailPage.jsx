import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import Input from "../components/ui/Input.jsx";
import TextArea from "../components/ui/TextArea.jsx";
import Button from "../components/ui/Button.jsx";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in. Please log in to view this note.");
        navigate("/login");
        return;
      }

      try {
        console.log("Fetching note with ID:", id);
        console.log("Token from localStorage:", token); // Debugging log

        const res = await api.get(`/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer token authentication
          },
        });

        console.log("Fetched note data:", res.data); // Debugging log
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetchNote:", error.response?.data || error.message); // Debugging log

        if (error.response?.status === 401) {
          toast.error("You are not authorized to view this note. Please log in again.");
          navigate("/login");
        } else {
          toast.error("Failed to fetch the note");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete the note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and Content cannot be empty");
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await api.put(`/notes/${id}`, note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in handleSave", error);
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-600 font-medium">
          Failed to load the note. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Notes
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            <Trash2Icon className="w-5 h-5" />
            Delete Note
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <Input
                type="text"
                placeholder="Note Title"
                value={note?.title || ""}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-2xl font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Content
              </label>
              <TextArea
                placeholder="Write your note here..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none min-h-96 leading-relaxed"
                value={note?.content || ""}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Link 
                to="/" 
                className="px-6 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </Link>
              <Button
                disabled={saving}
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;