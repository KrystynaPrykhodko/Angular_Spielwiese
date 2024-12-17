export interface Author {
    id: number; // Eindeutige ID des Autors
    name: string; // Name des Autors
    birthDate: Date; // Geburtsdatum
    nationality?: string; // (Optional) Nationalität des Autors
  }
  
  export interface Book {
    id: number; // Eindeutige ID des Buches
    title: string; // Titel des Buches
    publicationDate: Date; // Veröffentlichungsdatum
    author: Author; // Verknüpfung zum Autor
    genre?: string; // (Optional) Genre des Buches
    price?: number; // (Optional) Preis des Buches
  }