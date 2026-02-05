import { Routes } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section';
import { NavbarComponent } from './nav-bar/nav-bar';
import { AboutSectionComponent } from './about-section/about-section';
import { ProjectsSectionComponent } from './projects-section/projects-section';
import { BlogSectionComponent } from './blog-section/blog-section';
import { ServicesSectionComponent } from './services-section/services-section';
import { ContactSectionComponent } from './contact-section/contact-section';
import { FooterComponent } from './footer/footer';

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
    title: 'about section',
  },
  {
    path: 'projects-section',
    component: ProjectsSectionComponent,
    title: 'project sections',
  },
  {
    path: 'blog-section',
    component: BlogSectionComponent,
    title: 'blog section',
  },
  {
    path: 'services-section',
    component: ServicesSectionComponent,
    title: 'services section',
  },
  {
    path: 'contact-section',
    component: ContactSectionComponent,
    title: 'contact section',
  },
  {
    path: 'footer section',
    component: FooterComponent,
    title: 'footer section'
  }
];
