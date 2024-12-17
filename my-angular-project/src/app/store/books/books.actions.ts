import { createAction, props } from '@ngrx/store';	
import { Book } from '../../models/book.model';

// Load Books
export const loadBooks = createAction( '[Books] Load Books');

// Set loaded Books
export const setBooks = createAction(
    '[Books] Set Books',
    props<{ books: Book[] }>()
);

// Select a Book
export const selectBook = createAction(
    '[Books] Select Book',
    props<{ book: Book | null }>()
);

// Create or Update Book
export const saveBook = createAction(
    '[Books] Save Book',
    props<{ book: Book }>()
);

// Delete Book
export const deleteBook = createAction(
    '[Books] Delete Book',
    props<{ bookId: number }>()
);