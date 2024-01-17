export default function isOlderThanYesterday(date: Date): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
    return date < yesterday;
}