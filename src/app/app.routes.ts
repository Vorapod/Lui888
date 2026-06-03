import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Lui Villa | Luxury Vacation Rental'
  },
  {
    path: 'property',
    loadComponent: () => import('./pages/property-details/property-details.component').then(m => m.PropertyDetailsComponent),
    title: 'Property Details | Lui Villa'
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Gallery | Lui Villa'
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent),
    title: 'Pricing | Lui Villa'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us | Lui Villa'
  },
  { path: '**', redirectTo: '' }
];
