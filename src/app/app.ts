import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HeroSectionComponent } from './hero-section/hero-section';
import { NavbarComponent } from './nav-bar/nav-bar';
import { AboutSectionComponent } from './about-section/about-section';
import { ProjectsSectionComponent } from './projects-section/projects-section';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HeroSectionComponent, AboutSectionComponent, ProjectsSectionComponent],
  template: `
    <div class="p-4 bg-black">
      <app-navbar></app-navbar>
      <app-hero-section></app-hero-section>
      <app-about-section></app-about-section>
      <app-projects-section></app-projects-section>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('portfolio');
}
