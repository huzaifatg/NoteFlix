import Note from '../models/Note.js';

export async function getAllNotes(req, res){
    try {
        const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      console.log("Note not found"); // Debugging log
      return res.status(404).json({ message: "Note not found" });
    }

    console.log("Note owner (from DB):", note.user); // Debugging log
    console.log("Authenticated user (from req.user):", req.user._id); // Debugging log

    if (note.user.toString() !== req.user._id.toString()) {
      console.log("User not authorized to view this note"); // Debugging log
      return res.status(401).json({ message: "Not authorized to view this note" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({
            user: req.user, // Add this line to link the note to the authenticated user
            title,
            content,
        });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params; // Extract note ID from the route params
    const { title, content } = req.body; // Extract updated fields from the request body

    try {
        // Find the note by ID
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        console.log("Authenticated user:", req.user); // Log the authenticated user
        console.log("Note owner:", note.user); // Log the note owner

        // Check if the authenticated user owns the note
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this note" });
        }

        // Update the note
        note.title = title || note.title;
        note.content = content || note.content;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function deleteNote(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        console.log("Authenticated user:", req.user); // Log the authenticated user
        console.log("Note owner:", note.user); // Log the note owner

        // Check if the authenticated user owns the note
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this note" });
        }

        // Delete the note
        await Note.deleteOne({ _id: req.params.id }); // Use deleteOne instead of remove
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error in deleteNote controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}