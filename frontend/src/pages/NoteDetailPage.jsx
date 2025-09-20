import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

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
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p className="text-center text-error">
          Failed to load the note. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note?.title || ""}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note?.content || ""}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;