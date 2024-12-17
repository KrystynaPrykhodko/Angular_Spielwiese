import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as BooksActions from '../store/books/books.actions';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnChanges {
  private store = inject(Store<AppState>);

  @Input() book: Book | null = null; // Das Buch kommt aus dem Input

  // Formular-Gruppe
  bookForm = new FormGroup({
    title: new FormControl(''),
    publicationDate: new FormControl(''),
    author: new FormGroup({
      name: new FormControl(''),
    }),
    genre: new FormControl(''),
    price: new FormControl(''),
  });

  // Reagiert auf Änderungen am @Input('book')
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.bookForm.patchValue(this.book); // Formular mit Buchdaten füllen
    }
  }

  // Buch speichern oder aktualisieren
  handleSubmit(): void {
    if (this.bookForm.valid) {
      const updatedBook: Book = {
        ...this.book, // bestehende ID und andere Eigenschaften
        ...this.bookForm.value, // neue Formularwerte
        author: {
          id: this.book?.author?.id || 0,
          name: this.bookForm.value.author.name,
          birthDate: this.book?.author?.birthDate || new Date(),
          nationality: this.book?.author?.nationality || '',
        },
      };

      // Dispatch Aktion zum Speichern
      this.store.dispatch(BooksActions.saveBook({ book: updatedBook }));
    }
  }
}