import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // Prevent navigation
    console.log("Delete button clicked for note ID:", id);

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 relative overflow-hidden"
    >
      {/* Gradient left border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600" />
      
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-slate-900 pr-16">{note.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{note.content}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-400">
            {formatDate(new Date(note.createdAt))}
          </span>
        </div>
      </div>
      
      {/* Actions - Hidden by default, shown on hover */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Navigate to edit
          }}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          title="Edit note"
        >
          <PenSquareIcon className="w-4 h-4 text-slate-600" />
        </button>
        <button
          onClick={(e) => handleDelete(e, note._id)}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete note"
        >
          <Trash2Icon className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </Link>
  );
};

export default NoteCard;