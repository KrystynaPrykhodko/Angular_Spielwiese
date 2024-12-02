import { Component } from '@angular/core';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-table',
  imports: [],
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
}];
}