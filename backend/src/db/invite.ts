import mongoose from 'mongoose';
import InviteModel, { Invite } from './models/invite.model';

  /* Create Invite */
  export const createInvite = async (code: string, owner: mongoose.Types.ObjectId): Promise<Invite | null> => {
    try {
      const newInvite = await InviteModel.create({ code, owner });
      return newInvite;
    } catch (error) {
      console.error('Error creating invite:', error);
      return null;
    }
  };
  
  /* Get an invite by code */
  export const getInviteByCode = async (inviteCode: string): Promise<Invite | null> => {
    try {
      const invite = await InviteModel.findOne({ code: inviteCode });
      return invite;
    } catch (error) {
      console.error('Error getting invite:', error);
      return null;
    }
  };
  
  /* Get invites by owner */
  export const getInvitesByOwner = async (owner: mongoose.Types.ObjectId): Promise<Invite[] | null> => {
    try {
      const invite = await InviteModel.find({ owner: owner });
      return invite;
    } catch (error) {
      console.error('Error getting invite:', error);
      return null;
    }
  };
  
  /* Delete an invite by code */
  export const deleteInviteByCode = async (inviteCode: string): Promise<Invite | null> => {
    try {
      const deletedInvite = await InviteModel.findOneAndDelete({ code: inviteCode });
      return deletedInvite;
    } catch (error) {
      console.error('Error deleting invite:', error);
      return null;
    }
  };