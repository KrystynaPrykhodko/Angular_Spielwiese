import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnChanges{
  @Input() book: any;

  bookForm = new FormGroup({
    title: new FormControl(''),
    publicationDate: new FormControl(''),
    author: new FormGroup(''),
    gende: new FormControl(''),
    price: new FormControl('')
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.bookForm.patchValue(this.book); // Aktualisiert das Formular mit den Buchdaten
    }
  }

  handleSubmit() {
    console.log(this.bookForm.value);
  }
}



