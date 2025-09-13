// main.ts - demo runner
import { Book, FictionBook, NonFictionBook, FantasyBook } from "./classes/Book.js"
import { Library } from "./classes/Library.js";
import { User } from "./classes/User.js";
import { RecommendationSystem } from "./classes/Recommendation.js";

const lib = new Library();

// add some books
lib.addBook(new Book("Clean Code", "Robert C. Martin", 2008));
lib.addBook(new NonFictionBook("Sapiens", "Yuval Noah Harari", 2011, "History"));
lib.addBook(new FictionBook("Dune", "Frank Herbert", 1965, "Sci-Fi"));
lib.addBook(new FantasyBook("The Hobbit", "J.R.R. Tolkien", 1937, "Middle-earth"));
lib.addBook(new FictionBook("Neuromancer", "William Gibson", 1984, "Cyberpunk"));
lib.addBook(new FantasyBook("Mistborn", "Brandon Sanderson", 2006, "Scadrial"));

console.log("\nAll Books:");
lib.listBooks();

const petar = new User("Petar", "Petar@gmail.com");
const ivan = new User("Ivan", "Ivan@gmail.com");

lib.checkoutBook("Dune", petar);     // Petar borrows Dune
lib.checkoutBook("Dune", ivan);       // Ivan reserves Dune
lib.checkoutBook("Sapiens", petar);  // Petar borrows Sapiens

console.log("\n------------After checkouts------------");
lib.listBooks();

// Petar returning Dune, so Dune should be borrowed to Ivan
lib.returnBook("Dune", petar);

console.log("\n------------After Petar returns Dune, Dune goes to Ivan-------------");
lib.listBooks();

// Recommendations for Petar based on his history (Dune)
const rec = new RecommendationSystem();
const recsForPetar = rec.getRecommendations(petar, lib, { max: 3 });
console.log("\n----------Recommendations for Petar-----------");
recsForPetar.forEach(r => console.log(r));
