// recommendation.ts
import type { Library } from "./Library.ts";
import type { User } from "./User.ts";
import type { Book } from "./Book.ts";

export class RecommendationSystem {
  getRecommendations(
    user: User,
    library: Library,
    opts: { max?: number } = {}
  ): string[] {
    const { max = 5 } = opts;

    const toBook = (t: string): Book | undefined => library.getBookByTitle(t);
    const historyBooks = user.history.map(toBook).filter((b): b is Book => !!b);

    const likedCategories = new Set(historyBooks.map(b => b.category).filter(Boolean));
    const likedAuthors = new Set(historyBooks.map(b => b.author).filter(Boolean));

    const candidates = library.getAllBooks().filter(b => b.available);

    const scored = candidates
      .map(b => {
        let score = 0;
        if (b.category && likedCategories.has(b.category)) score += 2;
        if (b.author && likedAuthors.has(b.author)) score += 1;
        return { book: b, score };
      })
      .filter(x => x.score > 0);

    scored.sort(
      (a, b) =>
        b.score - a.score ||
        b.book.publicationYear - a.book.publicationYear
    );

    return scored.slice(0, max).map(({ book }) => book.displayInfo());
  }
}
