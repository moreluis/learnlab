import { HfInference } from '@huggingface/inference';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_ACCESS_TOKEN);

/**
 * This function splits a long string of text into parts.
 * @param {string} pText - The string to be divided.
 * @param {number} [pMinLength] - The length of each part (optional).
 * @returns {string[]} - A string array containing parts of the original text.
 */
function divideText(pText: string, pMinLength?: number): string[] {
    if (pText.length > 15000 && !pMinLength) pMinLength = Math.round(pText.length / 10);

    const minLength = pMinLength ?? 700;
    const parts: string[] = [];
    let startIndex = 0;

    pText = pText.replace(/\n/g, '');

    while (startIndex < pText.length) {
        parts.push(pText.substring(startIndex, startIndex + minLength + 1));

        startIndex = startIndex + minLength - ((1/5) * minLength);
    }
    
    return parts;
}

/**
 * This function retrieves text from a website.
 * @param {string} pText - The URL of the website.
 * @returns {string | null} - A string with the text or null, when an error occures.
 */
async function fetchWebsiteText(pUrl: string): Promise<string> {
    try {
        const response = await axios.get(pUrl);
        
        const $ = cheerio.load(response.data);
    
        const extractedText = $('body').text();
        
        const jsonSnippetIndex = extractedText.indexOf('(RLQ=window.RLQ||[])');
        
        let cleanedText = extractedText;

        if (jsonSnippetIndex !== -1) {
            cleanedText = extractedText.slice(0, jsonSnippetIndex);
        }

        return cleanedText.trim();
    } catch (error) {
      console.error('Error fetching or parsing the webpage:', error);
      throw error;
    }
}

/**
 * Generates flashcards by extracting information from a given URL using artificial intelligence.
 * @param {string} pUrl - The URL from which information will be extracted.
 * @returns {Promise<{ question: string; answer: string; }[]>} - A Promise that resolves to an array of objects containing a question (string) and an answer (string).
 */
async function generateCards(pUrl: string): Promise<{ question: string; answer: string; }[]> {
    try {
        const websiteText: string | null = await fetchWebsiteText(pUrl);

        if (websiteText === null) return [{
            question: "",
            answer: ""
        }];

        const context = divideText(websiteText);
        const cards: {question: string; answer: string}[] = [];

        /* Using for ... of instead of foreach, in order to handle errors better */
        for (const part of context) {
            let generationResult;
                generationResult = await hf.textGeneration({
                    model: process.env.HUGGINGFACE_MODEL || 'google/flan-t5-base',
                    inputs: `Generate a question about this: ${part}`,
                    parameters: {
                        max_new_tokens: 250,
                    },
                });

            let answerResult;
                answerResult = await hf.textGeneration({
                    model: process.env.HUGGINGFACE_MODEL || 'google/flan-t5-base',
                    inputs: `${generationResult?.generated_text} ${part}`,
                    parameters: {
                        max_new_tokens: 250,
                    },
                });

            /*console.log({
                question: generationResult.generated_text,
                answer: answerResult.generated_text,
            });*/

            cards.push({
                question: generationResult.generated_text,
                answer: answerResult.generated_text,
            });
        };

        return cards;
    } catch (error: any) {
        //console.log(error);
        return [{ question: "", answer: "" }];
    }
}

/**
 * Generates flashcards by extracting information from a provided text using artificial intelligence.
 * @param {string} pText - The URL from which information will be extracted.
 * @returns {Promise<{ question: string; answer: string; }[]>} - A Promise that resolves to an array of objects containing a question (string) and an answer (string).
 */
async function generateCardsByText(pText: string): Promise<{ question: string; answer: string; }[]> {
    try {
        const context = divideText(pText);
        const cards: {question: string; answer: string}[] = [];

        /* Using for ... of instead of foreach, in order to handle errors better */
        for (const part of context) {
            let generationResult;
                generationResult = await hf.textGeneration({
                    model: process.env.HUGGINGFACE_MODEL || 'google/flan-t5-base',
                    inputs: `Generate a question about this: ${part}`,
                    parameters: {
                        max_new_tokens: 250,
                    },
                });

            let answerResult;
                answerResult = await hf.textGeneration({
                    model: process.env.HUGGINGFACE_MODEL || 'google/flan-t5-base',
                    inputs: `${generationResult?.generated_text} ${part}`,
                    parameters: {
                        max_new_tokens: 250,
                    },
                });

            /*console.log({
                question: generationResult.generated_text,
                answer: answerResult.generated_text,
            });*/

            cards.push({
                question: generationResult.generated_text,
                answer: answerResult.generated_text,
            });
        };

        return cards;
    } catch (error: any) {
        //console.log(error);
        return [{ question: "", answer: "" }];
    }
}

export { generateCards, generateCardsByText };