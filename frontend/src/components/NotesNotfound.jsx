import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-blue-50 rounded-full p-8 mb-2">
        <NotebookIcon className="w-16 h-16 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900">No notes yet</h3>
      <p className="text-slate-600 leading-relaxed">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
      <Link 
        to="/create" 
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;