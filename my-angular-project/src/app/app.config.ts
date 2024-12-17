import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store'; // Import für NgRx Store
import { reducers } from './store/app.state'; // Importiere die Reducer für den Store

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), // Router bereitstellen
    provideStore(reducers) // NgRx Store bereitstellen
  ]
};
