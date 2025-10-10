import noteModel from "../models/noteModel.js";

// Create Notes Api
const createNote = async (req, res) => {
  try {
    const { title, content, pinned, tags } = req.body;

    const userId = req.user.id;
    console.log(userId);
    const noteData = {
      title,
      content,
      user: userId,
      pinned: pinned ?? false,
      tags: tags ?? [],
    };
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const newnote = new noteModel(noteData);
    const note = await newnote.save();
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating note",
      error: error.message,
    });
  }
};

// Read Notes Api
const getNotes = async (req ,res) => {
  try {
    const userId = req.user.id;
    const notes = await noteModel.find({ user:userId }).sort({ createdAt : -1 })
  res.status(200).json({
 success: true, 
 data: notes
})
  } catch (error) {
     res.status(500).json({
      success: false,
      message: "Error Reading note",
      error: error.message,
    });
  }
}

// Update /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content, pinned, tags } = req.body;
    const note = await noteModel.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      { title, content, pinned, tags }
    );
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or not authorized",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating note",
      error: error.message,
    });
  }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const note = await noteModel.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or not authorized",
      });
    }
    res.status(201).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting note",
      error: error.message,
    });
  }
};

export { createNote, updateNote, deleteNote , getNotes };
