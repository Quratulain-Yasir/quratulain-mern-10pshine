import mongoose from 'mongoose' ;

 const noteSchema = new mongoose.Schema(
    { title: { type: String, required: true, trim: true, maxlength: 200 } , 
    content: { type: String, required: true },
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
     pinned: { type: Boolean, default: false }, 
     tags: [{ type: String }], }, 
     { timestamps: true }); 
    
    const NoteModel = mongoose.model.Note || mongoose.model('Note', noteSchema);
    export default NoteModel