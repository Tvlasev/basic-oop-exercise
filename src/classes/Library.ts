// library.ts
import type { Book } from "./Book.ts";
import type { User } from "./User.ts";

export class Library {
  #books: Book[] = [];
  #reservations: Map<string, User[]> = new Map();

  addBook(book: Book): void {
    this.#books.push(book);
  }

  removeBook(title: string): void {
    this.#books = this.#books.filter(b => b.title !== title);
  }

  listBooks(): void {
    if (this.#books.length === 0) {
      console.log("Library is empty.");
      return;
    }
    this.#books.forEach(b => console.log(b.displayInfo()));
  }

  checkoutBook(title: string, user?: User): void {
    const book = this.#books.find(b => b.title === title);
    if (!book) {
      console.log(`Book "${title}" not found.`);
      return;
    }

    if (book.available) {
      if (user) {
        if (user.borrowBook(book)) {
          book.checkout();
          console.log(`${user.name} borrowed "${title}".`);
        }
      } else {
        book.checkout();
        console.log(`Checked out "${title}".`);
      }
    } else {
      if (user) this.reserveBook(title, user);
      else console.log(`"${title}" is not available.`);
    }
  }

  returnBook(title: string, user?: User): void {
    const book = this.#books.find(b => b.title === title);
    if (!book) return;

    if (!book.available) book.returnBack();
    if (user) user.returnBook(title);
    console.log(`${user ? user.name : "Someone"} returned "${title}".`);

    const queue = this.#reservations.get(title);
    if (queue && queue.length > 0) {
      const nextUser = queue.shift()!;
      this.checkoutBook(title, nextUser);
    }
  }

  reserveBook(title: string, user: User): void {
    if (!this.#reservations.has(title)) this.#reservations.set(title, []);
    this.#reservations.get(title)!.push(user);
    console.log(`${user.name} reserved "${title}".`);
  }

  getBookByTitle(title: string): Book | undefined { return this.#books.find(b => b.title === title); }
  getAllBooks(): Book[] { return this.#books; }
  getReservationsFor(title: string): User[] { return [...(this.#reservations.get(title) || [])]; }
}
