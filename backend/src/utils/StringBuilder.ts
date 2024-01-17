export default class StringBuilder {
    private content: string[];
  
    constructor() {
      this.content = [];
    }
  
    append(text: string): void {
      this.content.push(text);
    }
  
    toString(): string {
      return this.content.join('');
    }
}