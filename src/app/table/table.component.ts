import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Book } from '../models/book.model';
import { AppState } from '../store/app.state';
import * as BooksActions from '../store/books/books.actions';
import { selectAllBooks, selectCurrentBook } from '../store/books/books.selectors';
import { BookFormComponent } from '../book-form/book-form.component_';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, BookFormComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  private store = inject(Store<AppState>); // Zugriff auf den NgRx Store

  books$ = this.store.select(selectAllBooks); // Bücher aus dem Store
  selectedBook$ = this.store.select(selectCurrentBook); // Aktuelles Buch aus dem Store

  // Edit Book: Dispatch Aktion zum Setzen des ausgewählten Buchs
  editBook(book: Book): void {
    this.store.dispatch(BooksActions.selectBook({ book }));
  }

  // Create Book: Ein leeres Buch erstellen und auswählen
  createBook(): void {
    const newBook: Book = {
      id: 0,
      title: '',
      publicationDate: new Date(),
      author: {
        id: 0,
        name: '',
        birthDate: new Date(),
        nationality: '',
      },
      genre: '',
      price: 0,
    };
    this.store.dispatch(BooksActions.selectBook({ book: newBook }));
  }

  // Delete Book: Dispatch Aktion zum Löschen eines Buches
  deleteBook(book: Book): void {
    this.store.dispatch(BooksActions.deleteBook({ bookId: book.id }));
  }

  // Close Modal: Entfernt das ausgewählte Buch
  closeModal(): void {
    this.store.dispatch(BooksActions.selectBook({ book: null }));
  }
}