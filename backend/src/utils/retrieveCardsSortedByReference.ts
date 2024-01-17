import { Types } from "mongoose";
import { getCardById, getCardsByOwner } from "../db/card";
import { Card } from "../db/models/card.model";

/**
 * Sorts an array of cards by establishing a reference chain among the objects using specified keys.
 * 
 * @param {mongoose.Types.ObjectId} owner The owner of the cards to be sorted.
 * @param {String[]} stack The stack the cards are inside.
 * @returns {Card[]} Returns a sorted array of cards based on their reference chain.
 */
async function retrieveCardsSortedByReference(owner: Types.ObjectId, stack: String): Promise<Card[] | undefined> {
    const result: Card[] = [];
    const arr = await getCardsByOwner(owner);

    if (!arr) return;

    for (const card of arr) {
        const referencedBy: boolean = arr.some(arrObj => arrObj.next?.equals(card._id));
        if (!referencedBy && (card.stack[0] === stack[0] || card.stack[0] === stack)) result[0] = card;
    }

    if (!result[0]) return;

    let currentExists: boolean = true;

    while (currentExists) {
        const nextId = result[result.length - 1].next;
        if (!nextId) break;

        const next = await getCardById(nextId)
        if (!next) break;

        result.push(next);
        currentExists = !!next.next;
    }

    return result;
}

export default retrieveCardsSortedByReference;