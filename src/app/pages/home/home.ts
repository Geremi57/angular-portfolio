import { Component, signal } from '@angular/core';
import { HeroSectionComponent } from '../../hero-section/hero-section';
// import { NavbarComponent } from '../../nav-bar/nav-bar';
import { AboutSectionComponent } from '../../about-section/about-section';
import { ProjectsSectionComponent } from '../../projects-section/projects-section';
// import { BlogSectionComponent } from '../../blog-section/blog-section';
import { ServicesSectionComponent } from '../../services-section/services-section';
import { ContactSectionComponent} from '../../contact-section/contact-section';
import { FooterComponent } from '../../footer/footer';


@Component({
  selector: 'home',
  imports: [
    // NavbarComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ProjectsSectionComponent,
    ServicesSectionComponent,
    ContactSectionComponent,
],
  template: `
    <div class="p-1 bg-black">

     <!-- home.component.html -->
<app-hero-section></app-hero-section>
<section id="about" class="scroll-mt-20">
  <app-about-section></app-about-section>
</section>

<section id="projects" class="scroll-mt-20">
  <app-projects-section></app-projects-section>
</section>

<div class="text-center mt-12">
  <a routerLink="/blog"
     class="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-500 transform hover:scale-105 transition-all duration-300 group">
    <span>View All Articles</span>
    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" 
         fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
    </svg>
  </a>
</div>

<section id="services" class="scroll-mt-20">
  <app-services-section></app-services-section>
</section>

<section id="contact" class="scroll-mt-20">
  <app-contact-section></app-contact-section>
</section>
     
    </div>
  `,
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('portfolio');
}
