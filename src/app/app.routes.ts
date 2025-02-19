import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'person',
    loadComponent: () =>
      import('./components/person/person.component').then(
        (c) => c.PersonComponent
      ),
  },
  {
    path: 'pico-preview',
    loadComponent: () =>
      import('./components/pico-preview/pico-preview.component').then(
        (c) => c.PicoPreviewComponent
      ),
  },
];
