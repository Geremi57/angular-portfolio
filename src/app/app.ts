import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HeroSectionComponent } from './hero-section/hero-section';
import { NavbarComponent } from './nav-bar/nav-bar';
import { AboutSectionComponent } from './about-section/about-section';
import { ProjectsSectionComponent } from './projects-section/projects-section';
import { BlogSectionComponent } from './blog-section/blog-section';
import { ServicesSectionComponent } from './services-section/services-section';
import { ContactSectionComponent } from './contact-section/contact-section';
import { FooterComponent } from './footer/footer';
// import {Home } from './pages/home/home';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent
],
  template: `
    <div class="p-0 bg-black">
      <!-- <home></home> -->
       <app-navbar></app-navbar>
       <!-- <app-hero-section></app-hero-section> -->
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('portfolio');
}
