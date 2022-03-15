import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";

class NotesService {
  async deleteNote(noteId, userId) {
    const note = await dbContext.Notes.findById(noteId)
    if (note.creatorId.toString() != userId) {
      throw new Forbidden("not your note to delete")
    }
    const removeNote = await dbContext.Notes.findByIdAndDelete(noteId)
    return `deleted ${removeNote}`
  }
  async getNotes(projectId) {
    const notes = await dbContext.Notes.find({ projectId }).populate('creator', 'name picture')
    return notes
  }
  async createNote(body) {
    const newNote = await dbContext.Notes.create(body)
    await newNote.populate('creator', 'id name picture')
    return newNote
  }

}

export const notesService = new NotesService();