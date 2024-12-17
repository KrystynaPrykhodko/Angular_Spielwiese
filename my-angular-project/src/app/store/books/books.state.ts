import { Book } from '../../models/book.model';

export interface BooksState {
  books: Book[];
  selectedBook: Book | null;
}

export const initialBooksState: BooksState = {
  books: [],
  selectedBook: null
};