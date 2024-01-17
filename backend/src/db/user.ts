import mongoose from 'mongoose';
import { DeleteResult } from 'mongodb';
import UserModel, { User } from './models/user.model';
import InviteModel, { Invite } from './models/invite.model';
import NoteModel from './models/note.model';

  /* Create user */
  export const createUser = async (name: string, password: string, invitedBy?: mongoose.Types.ObjectId): Promise<User | null> => {
    try {
      let newUser = await UserModel.create({ name, password, invitedBy, view: 1 });

      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  };

  /* Get all users */
  export const getAllUsers = async (): Promise<User[] | null> => {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  };
  
  /* Get a user by name */
  export const getUserByName = async (username: string): Promise<User | null> => {
    try {
      const user = await UserModel.findOne({ name: username });
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  };

  /* Get a user by id */
  export const getUserById = async (userId: mongoose.Types.ObjectId): Promise<User | null> => {
    try {
      const user = await UserModel.findById(userId)
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  };

  /* Update a user by id */
  export const updateUserById = async (userId: mongoose.Types.ObjectId, updatedFields: Partial<User>): Promise<User | null> => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedFields, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  /* Delete a user by id */
  export const deleteUserById = async (userId: mongoose.Types.ObjectId): Promise<[User, DeleteResult, DeleteResult] | null> => {
    try {
      const deletedUser = await UserModel.findOneAndDelete({ _id: userId });
      const deletedInvites = await InviteModel.deleteMany({ owner: userId });
      const deletedNotes = await NoteModel.deleteMany({ owner: userId });
      return [deletedUser!, deletedInvites, deletedNotes];
    } catch (error) {
      console.error('Error deleting user:', error);
      return null;
    }
  };