import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { Book } from '../models/book.model';
import { BookFormComponent } from '../book-form/book-form.component';
import { AppState } from '../store/app.state';
import * as BooksActions from '../store/books/books.actions';
import { selectAllBooks, selectCurrentBook } from '../store/books/books.selectors';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, BookFormComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  private store = inject(Store<AppState>);

  books$ = this.store.select(selectAllBooks); // Bücher aus dem Store
  selectedBook$ = this.store.select(selectCurrentBook); // Aktuell ausgewähltes Buch aus dem Store

  ngOnInit(): void {
    // Lade Bücher beim Start der Komponente
    this.store.dispatch(BooksActions.loadBooks());
  }

  // Buch editieren (Dispatch zum Setzen des ausgewählten Buches)
  editBook(book: Book): void {
    this.store.dispatch(BooksActions.selectBook({ book }));
  }

  // Neues Buch erstellen
  createBook(): void {
    const newBook: Book = {
      id: 0, // Temporäre ID
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

  // Buch löschen
  deleteBook(book: Book): void {
    this.store.dispatch(BooksActions.deleteBook({ bookId: book.id }));
  }

  // Modal schließen
  closeModal(): void {
    this.store.dispatch(BooksActions.selectBook({ book: null }));
  }

  // trackBy-Funktion für *ngFor zur Optimierung
  trackByBookId(index: number, book: Book): number {
    return book.id;
  }
}