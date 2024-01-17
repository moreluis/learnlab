import mongoose from 'mongoose';
import NoteModel, { Note } from './models/note.model';

  /* Create note */
  export const createNote = async (owner: mongoose.Types.ObjectId, title: string, content?: string, directory?: string): Promise<Note | null> => {
    try {
      const newNote = await NoteModel.create({ title, content, directory, owner });
      return newNote;
    } catch (error) {
      console.error('Error creating Note:', error);
      return null;
    }
  };

  /* Get all notes by owner */
  export const getNotesByOwner = async (owner: mongoose.Types.ObjectId): Promise<Note[] | null> => {
    try {
      const note = await NoteModel.find({ owner });
      return note;
    } catch (error) {
      console.error('Error getting Note:', error);
      return null;
    }
  };

  /* Get a note by id */
  export const getNoteById = async (NoteId: mongoose.Types.ObjectId): Promise<Note | null> => {
    try {
      const note = await NoteModel.findById(NoteId)
      return note;
    } catch (error) {
      console.error('Error getting Note:', error);
      return null;
    }
  };

  /* Update a note by id */
  export const updateNoteById = async (NoteId: mongoose.Types.ObjectId, updatedFields: Partial<Note>): Promise<Note | null> => {
    try {
      const updatedNote = await NoteModel.findByIdAndUpdate(NoteId, updatedFields, {
        new: true,
      });
      return updatedNote;
    } catch (error) {
      console.error('Error updating Note:', error);
      throw error;
    }
  };

  /* Delete a Note by id */
  export const deleteNoteById = async (NoteId: mongoose.Types.ObjectId): Promise<Note | null> => {
    try {
      const deletedNote = await NoteModel.findOneAndDelete({ _id: NoteId });
      return deletedNote;
    } catch (error) {
      console.error('Error deleting Note:', error);
      return null;
    }
  };