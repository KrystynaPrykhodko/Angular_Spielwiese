import { Component } from '@angular/core';
import { DatePipe, CurrencyPipe} from '@angular/common';
import { Book } from '../models/book.model';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-table',
  standalone: true, // Standalone-Komponente aktivieren
  imports: [DatePipe, CurrencyPipe, BookFormComponent], // Importieren der Pipes (for ''date'' and ''currency'')
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  books: Book[] = [
    {
      id: 1,
      title: 'Angular for Beginners',
      publicationDate: new Date('2020-01-01'),
      author: {
        id: 1, 
        name: 'Max Mustermann', 
        birthDate: new Date('1990-01-01'), 
        nationality: 'Deutsch'
      },
      genre: 'Tutorial',
      price: 29.99
    },
    {
      id: 2,
      title: 'Advanced Angular',
      publicationDate: new Date(2023, 3, 15),
      author: {
        id: 2,
        name: 'Jane Smith',
        birthDate: new Date(1975, 8, 14),
        nationality: 'US',
      },
      genre: 'Programming',
      price: 39.99,
    }
  ];

  
  selectedBook: Book | null = null; // Speichert das ausgewählte Buch
  
  editBook(book: Book): void {
    this.selectedBook = book; // Speichert das Buch und öffnet das Modal
  }

  createBook(): void {
    this.selectedBook = {
      id: 0, // Temporär oder generisch
      title: '',
      publicationDate: null as any as Date,
      author: {
        id: 0,
        name: '',
        birthDate: null as any as Date,
        nationality: '',
      },
      genre: '',
      price: 0,
    }; // Leeres Buch-Objekt
  }

  deleteBook(book: Book): void {
    console.log('Delete book', book);
  }

  closeModal(): void {
    this.selectedBook = null; // Schließt das Modal
  }
}