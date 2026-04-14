import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Definimos la URL de la API vieja para que no use la del puerto 8080
    { provide: 'API_URL', useValue: 'http://localhost:8081' }
  ]
};
