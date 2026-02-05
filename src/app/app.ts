import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HeroSectionComponent } from './hero-section/hero-section';
import { NavbarComponent } from './nav-bar/nav-bar';
import { AboutSectionComponent } from './about-section/about-section';
import { ProjectsSectionComponent } from './projects-section/projects-section';
import { BlogSectionComponent } from './blog-section/blog-section';
import { ServicesSectionComponent } from './services-section/services-section';
import { ContactSectionComponent} from './contact-section/contact-section';
import { FooterComponent } from './footer/footer';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ProjectsSectionComponent,
    BlogSectionComponent,
    ServicesSectionComponent,
    ContactSectionComponent,
    FooterComponent
],
  template: `
    <div class="p-4 bg-black">
      <app-navbar></app-navbar>
      <app-hero-section></app-hero-section>
      <app-about-section></app-about-section>
      <app-projects-section></app-projects-section>
      <app-blog-section></app-blog-section>
      <app-services-section></app-services-section>
      <app-contact-section></app-contact-section>
      <app-footer></app-footer>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('portfolio');
}
