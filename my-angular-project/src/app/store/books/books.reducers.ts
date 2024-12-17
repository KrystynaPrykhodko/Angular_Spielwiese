import { createReducer, on } from '@ngrx/store';
import { initialBooksState } from './books.state';
import * as BooksActions from './books.actions';

export const booksReducer = createReducer(
  initialBooksState,

  // Set Books
  on(BooksActions.setBooks, (state, { books }) => ({
    ...state,
    books,
  })),

  // Select Book
  on(BooksActions.selectBook, (state, { book }) => ({
    ...state,
    selectedBook: book,
  })),

  // Save Book
  on(BooksActions.saveBook, (state, { book }) => {
    const updatedBooks = state.books.map((b) =>
      b.id === book.id ? book : b
    );

    return {
      ...state,
      books: book.id === 0 ? [...state.books, { ...book, id: Date.now() }] : updatedBooks,
      selectedBook: null,
    };
  }),

  // Delete Book
  on(BooksActions.deleteBook, (state, { bookId }) => ({
    ...state,
    books: state.books.filter((book) => book.id !== bookId),
  }))
);