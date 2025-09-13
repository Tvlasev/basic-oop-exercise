export type BookCategory = "Fiction" | "Non-Fiction" | "Fantasy" | undefined;

export class Book {
  #title: string;
  #author: string;
  #publicationYear: number;
  #available: boolean = true;

  public category: BookCategory;

  constructor(title: string, author: string, publicationYear: number) {
    this.#title = title;
    this.#author = author;
    this.#publicationYear = publicationYear;
    this.category = undefined;
  }

  get title(): string { return this.#title; }
  get author(): string { return this.#author; }
  get publicationYear(): number { return this.#publicationYear; }
  get available(): boolean { return this.#available; }

  checkout(): void { this.#available = false; }
  returnBack(): void { this.#available = true; }

  displayInfo(): string {
    return `Title: ${this.#title}, Author: ${this.#author}, Year: ${this.#publicationYear}, Available: ${this.#available}`;
  }
}

export class FictionBook extends Book {
  public category: BookCategory = "Fiction";
  public subgenre: string;

  constructor(title: string, author: string, year: number, subgenre: string) {
    super(title, author, year);
    this.subgenre = subgenre;
  }

  override displayInfo(): string {
    return `${super.displayInfo()}, Category: ${this.category}, Subgenre: ${this.subgenre}`;
  }
}

export class NonFictionBook extends Book {
  public category: BookCategory = "Non-Fiction";
  public field: string;

  constructor(title: string, author: string, year: number, field: string) {
    super(title, author, year);
    this.field = field;
  }

  override displayInfo(): string {
    return `${super.displayInfo()}, Category: ${this.category}, Field: ${this.field}`;
  }
}

export class FantasyBook extends Book {
  public category: BookCategory = "Fantasy";
  public world: string;

  constructor(title: string, author: string, year: number, world: string) {
    super(title, author, year);
    this.world = world;
  }

  override displayInfo(): string {
    return `${super.displayInfo()}, Category: ${this.category}, World: ${this.world}`;
  }
}
