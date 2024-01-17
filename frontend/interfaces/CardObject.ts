export default interface CardObject {
    _id: string;
    question: string;
    answer: string;
    stack: String[];
    owner: string;
    next?: string;
    createdAt: Date;
    updatedAt: Date;
}