import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BlogPageComponent } from './pages/blog-page/blog-page';

export const routes: Routes = [
 
  {
    path: '',
    component: Home,
    title: 'home component'
  },
  {
    path: 'blog',
    component: BlogPageComponent,
    title: "blog-page"
  },
];
