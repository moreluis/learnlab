export default interface NoteObject {
    _id: string;
    title: string;
    content: string;
    directory: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}