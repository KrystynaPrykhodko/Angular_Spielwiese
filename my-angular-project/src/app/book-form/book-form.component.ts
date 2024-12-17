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

  @Input() book: Book | null = null; // Eingabewert aus der übergeordneten Komponente

  // Formular-Gruppe
  bookForm = new FormGroup({
    title: new FormControl(''),
    publicationDate: new FormControl(''),
    author: new FormGroup({
      name: new FormControl(''),
      birthDate: new FormControl(''),
      nationality: new FormControl(''),
    }),
    genre: new FormControl(''),
    price: new FormControl(0),
  });

  // Aktualisiert das Formular, wenn die Eingabe (`book`) sich ändert
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.bookForm.patchValue({
        title: this.book.title,
        publicationDate: this.formatDate(this.book.publicationDate),
        author: {
          name: this.book.author.name,
          birthDate: this.formatDate(this.book.author.birthDate),
          nationality: this.book.author.nationality || '',
        },
        genre: this.book.genre || '',
        price: this.book.price || 0,
      });
    }
  }

  // Konvertiert das Datum in das Format YYYY-MM-DD
  private formatDate(date: Date | string): string {
    return date instanceof Date
      ? date.toISOString().split('T')[0]
      : new Date(date).toISOString().split('T')[0];
  }

  // Beim Absenden des Formulars
  handleSubmit(): void {
    if (this.bookForm.valid) {
      const updatedBook: Book = {
        id: this.book?.id || 0,
        title: this.bookForm.value.title || '',
        publicationDate: new Date(this.bookForm.value.publicationDate || ''),
        author: {
          id: this.book?.author?.id || 0, // Beibehaltung der ID
          name: this.bookForm.value.author?.name || '',
          birthDate: new Date(this.bookForm.value.author?.birthDate || ''),
          nationality: this.bookForm.value.author?.nationality || '',
        },
        genre: this.bookForm.value.genre || '',
        price: Number(this.bookForm.value.price) || 0,
      };

      // Dispatch zur Speicherung des aktualisierten Buches
      this.store.dispatch(BooksActions.saveBook({ book: updatedBook }));
    }
  }
}