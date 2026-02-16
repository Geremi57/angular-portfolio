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
