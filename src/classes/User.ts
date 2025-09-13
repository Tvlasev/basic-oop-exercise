import type { Book } from "./Book.ts";

export class User {
  public name: string;
  public email: string;
  public maxBorrow: number;

  public borrowedBooks: string[] = [];

  public history: string[] = [];

  constructor(name: string, email: string, maxBorrow: number = 3) {
    this.name = name;
    this.email = email;
    this.maxBorrow = maxBorrow;
  }

  borrowBook(book: Book): boolean {
    if (this.borrowedBooks.length >= this.maxBorrow) {
      console.log(`${this.name} cannot borrow more books.`);
      return false;
    }
    this.borrowedBooks.push(book.title);
    this.history.push(book.title);
    return true;
  }

  returnBook(bookTitle: string): void {
    this.borrowedBooks = this.borrowedBooks.filter(t => t !== bookTitle);
  }
}
