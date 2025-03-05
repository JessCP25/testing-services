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
    path: 'people',
    loadComponent: () =>
      import('./components/people/people.component').then(
        (c) => c.PeopleComponent
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
