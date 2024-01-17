import mongoose from 'mongoose';
import CardModel, { Card } from './models/card.model';

  /* Create card */
  export const createCard = async (owner: mongoose.Types.ObjectId, question: string, answer: string, stack: String[], next?: mongoose.Types.ObjectId | null): Promise<Card | null> => {
    try {
      const newCard = await CardModel.create({ owner, question, answer, stack, next });
      return newCard;
    } catch (error) {
      console.error('Error creating Card:', error);
      return null;
    }
  };

  /* Get all cards by owner */
  export const getCardsByOwner = async (owner: mongoose.Types.ObjectId): Promise<Card[] | null> => {
    try {
      const card = await CardModel.find({ owner });
      return card;
    } catch (error) {
      console.error('Error getting Card:', error);
      return null;
    }
  };

  /* Get a card by id */
  export const getCardById = async (CardId: mongoose.Types.ObjectId): Promise<Card | null> => {
    try {
      const card = await CardModel.findById(CardId)
      return card;
    } catch (error) {
      console.error('Error getting Card:', error);
      return null;
    }
  };

  /* Update a card by id */
  export const updateCardById = async (CardId: mongoose.Types.ObjectId, updatedFields: Partial<Card>): Promise<Card | null> => {
    try {
      const updatedCard = await CardModel.findByIdAndUpdate(CardId, updatedFields, {
        new: true,
      });
      return updatedCard;
    } catch (error) {
      console.error('Error updating Card:', error);
      throw error;
    }
  };

  /* Unset the "next field" on a card by id */
  export const unsetNextFieldOnCardById = async (CardId: mongoose.Types.ObjectId): Promise<Card | null> => {
    try {
      const updatedCard = await CardModel.findByIdAndUpdate(CardId, { $unset: {
        next: 1,
      }});
      return updatedCard;
    } catch (error) {
      console.error('Error updating Card:', error);
      throw error;
    }
  };

  /* Delete a Card by id */
  export const deleteCardById = async (CardId: mongoose.Types.ObjectId): Promise<Card | null> => {
    try {
      const deletedCard = await CardModel.findOneAndDelete({ _id: CardId });
      return deletedCard;
    } catch (error) {
      console.error('Error deleting Card:', error);
      return null;
    }
  };