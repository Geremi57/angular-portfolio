import { Routes } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section';
import { NavbarComponent } from './nav-bar/nav-bar';
import { AboutSectionComponent } from './about-section/about-section';
import { ProjectsSectionComponent } from './projects-section/projects-section';

export const routes: Routes = [
  {
    path: 'hero-section',
    component: HeroSectionComponent,
    title: 'Hero Section',
  },
  {
    path: 'nav-bar',
    component: NavbarComponent,
    title: 'Navigation Bar',
  },
  {
    path: 'about-section',
    component: AboutSectionComponent,
    title: 'about section'
  },
  {
    path: 'projects-section',
    component: ProjectsSectionComponent,
    title: 'project sections'
  }
];
