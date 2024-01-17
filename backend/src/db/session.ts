import mongoose from 'mongoose';
import SessionModel, { Session } from './models/session.model';

  /* Create Session */
  export const createSession = async (owner: mongoose.Types.ObjectId, code: string): Promise<Session | null> => {
    try {
      const newSession = await SessionModel.create({ owner: owner, code: code });
      return newSession;
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  };
  
  /* Get an session by code */
  export const getSessionByCode = async (sessionCode: string): Promise<Session | null> => {
    try {
      const session = await SessionModel.findOne({ id: sessionCode });
      return session;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  };
  
  /* Get an session by owner */
  export const getSessionByOwner = async (owner: mongoose.Types.ObjectId): Promise<Session | null> => {
    try {
      const session = await SessionModel.findOne({ owner: owner });
      return session;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  };
  
  /* Delete an session by code */
  export const deleteSessionByOwner = async (owner: mongoose.Types.ObjectId): Promise<Session | null> => {
    try {
      const deletedSession = await SessionModel.findOneAndDelete({ owner: owner });
      return deletedSession;
    } catch (error) {
      console.error('Error deleting session:', error);
      return null;
    }
  };