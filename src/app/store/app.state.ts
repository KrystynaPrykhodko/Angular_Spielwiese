import { ActionReducerMap } from '@ngrx/store';
import { BooksState } from './books/books.state';
import { booksReducer } from './books/books.reducer';

export interface AppState {
  books: BooksState;
}

export const reducers: ActionReducerMap<AppState> = {
  books: booksReducer,
};