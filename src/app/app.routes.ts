import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ContactSectionComponent } from './contact-section/contact-section';

export const routes: Routes = [
 
  {
    path: '',
    component: Home,
    title: 'home component'
  },
  {
    path: 'contact',
    component: ContactSectionComponent,
    title: "contact section"
  }
];
