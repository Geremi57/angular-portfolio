import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="relative flex min-h-screen items-center overflow-hidden bg-[#050914] text-slate-100"
      [style.backgroundImage]="'url(' + heroBg + ')'"
      [style.backgroundSize]="'cover'"
      [style.backgroundPosition]="'center'"
    >
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050914]/90 via-[#050914]/60 to-transparent"></div>

      <div class="relative mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div class="max-w-xl">
          <div class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-300/70">
            <span class="h-px w-8 bg-blue-400/40"></span>
            Portfolio · 2026
          </div>

          <h1 class="mt-6 font-sans text-4xl font-medium leading-[1] tracking-tight text-slate-50 sm:text-5xl lg:text-[3.25rem]">
            High Performance
            <br />
            <span class="bg-gradient-to-r from-blue-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Engineering.
            </span>
          </h1>

          <p class="mt-5 max-w-lg text-base leading-relaxed text-slate-400">
            Full-stack developer building scalable, accessible, and performant web applications.
          </p>

          <div class="mt-7 flex flex-wrap items-center gap-3">
            <button class="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white">
              View Projects →
            </button>
            <button class="rounded-full border border-blue-400/30 bg-blue-950/30 px-6 py-3 text-sm font-medium text-blue-100">
              Contact Me
            </button>
          </div>

          <div class="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-300/50">Stack</span>
            <span *ngFor="let tech of technologies"
              class="font-mono text-xs text-blue-200/80 transition-colors hover:text-blue-200">
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  heroBg = 'assets/geremi-logo-intertwining-black-and-blue-hues-throughout-the-text-name-geremi-in-bold-sans-serif-ty-927774892.jpeg';
  particles: Array<{ x: number; y: number; delay: number }> = [];
  hoverState: string | null = null;

  technologies = [
    { name: 'Angular', icon: 'fab fa-angular' },
    { name: 'JavaScript', icon: 'fab fa-js' },
    { name: 'Tailwind CSS', icon: 'fab fa-css3-alt' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'UI/UX', icon: 'fas fa-paint-brush' },
    { name: 'Golang', icon: 'fa-brands fa-golang' }
  ];

  ngOnInit() {
    this.generateParticles();
  }

  ngOnDestroy() {}

  generateParticles() {
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
      });
    }
  }

  setHover(state: string | null) {
    this.hoverState = state;
  }
}