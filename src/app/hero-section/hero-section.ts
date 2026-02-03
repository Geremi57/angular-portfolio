// hero-section.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white overflow-hidden"
    >
      <!-- Animated background elements -->
      <div class="absolute inset-0">
        <!-- Floating particles -->
        <div
          *ngFor="let particle of particles"
          [style.left]="particle.x + '%'"
          [style.top]="particle.y + '%'"
          [style.animationDelay]="particle.delay + 's'"
          class="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-float"
        ></div>

        <!-- Grid overlay -->
        <div
          class="absolute inset-0 opacity-5"
          style="background-image: linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;"
        ></div>
      </div>

      <!-- Glowing orbs -->
      <div
        class="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style="animation-delay: 2s"
      ></div>

      <div class="relative z-10 container mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <!-- Left Content -->
          <div class="lg:w-1/2" [@fadeInUp]>
            <div
              class="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-blue-900/30 rounded-full border border-blue-500/20"
            >
              <span class="w-2 h-2 bg-blue-400 rounded-full animate-ping"></span>
              <span class="text-sm font-medium text-blue-300">Available for opportunities</span>
            </div>

            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span class="block">Crafting Digital</span>
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
              >
                Experiences
              </span>
            </h1>

            <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Full-stack developer specializing in modern web technologies. Building performant,
              accessible, and visually stunning applications that push the boundaries of user
              experience.
            </p>

            <div class="flex flex-wrap gap-4 mb-10">
              <div
                *ngFor="let tech of technologies"
                class="px-4 py-2 bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-500/20"
              >
                <span class="text-blue-300 font-medium">{{ tech }}</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4">
              <button
                (mouseenter)="setHover('primary')"
                (mouseleave)="setHover(null)"
                [class]="
                  hoverState === 'primary'
                    ? 'px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold transform transition-all duration-300 scale-105 shadow-lg shadow-blue-500/30'
                    : 'px-8 py-4 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30'
                "
              >
                View Projects
                <span class="ml-2" [@spin]="hoverState === 'primary'">→</span>
              </button>

              <button
                (mouseenter)="setHover('secondary')"
                (mouseleave)="setHover(null)"
                [class]="
                  hoverState === 'secondary'
                    ? 'px-8 py-4 border-2 border-blue-400/50 rounded-lg font-semibold backdrop-blur-sm bg-blue-900/20 transform transition-all duration-300 scale-105'
                    : 'px-8 py-4 border-2 border-blue-400/30 rounded-lg font-semibold backdrop-blur-sm bg-blue-900/10 transform transition-all duration-300 hover:scale-105 hover:bg-blue-900/20'
                "
              >
                Contact Me
              </button>
            </div>
          </div>

          <!-- Right Content - Profile/Visual -->
          <div class="lg:w-1/2 relative" [@fadeInUp]="{ value: '', params: { delay: '0.2s' } }">
            <div class="relative mx-auto max-w-md">
              <!-- Profile card/visual -->
              <div
                class="relative bg-gradient-to-br from-blue-900/40 to-black/40 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/20 shadow-2xl"
              >
                <div
                  class="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 border-blue-500/30"
                >
                  <!-- Placeholder for profile image - replace with actual image -->
                  <div
                    class="w-full h-full bg-gradient-to-br from-blue-800 to-cyan-700 flex items-center justify-center"
                  >
                    <svg class="w-32 h-32 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-4">
                  <div
                    *ngFor="let stat of stats"
                    class="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20 hover:bg-blue-900/50 transition-colors duration-300"
                  >
                    <div class="text-2xl font-bold text-blue-300">{{ stat.value }}</div>
                    <div class="text-sm text-gray-400">{{ stat.label }}</div>
                  </div>
                </div>
              </div>

              <!-- Floating elements around profile -->
              <div
                class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl opacity-20 animate-float"
                style="animation-delay: 1s"
              ></div>
              <div
                class="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full opacity-20 animate-float"
                style="animation-delay: 2s"
              ></div>
            </div>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div class="flex flex-col items-center">
            <span class="text-sm text-blue-300 mb-2">Explore more</span>
            <div class="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center">
              <div class="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Animated lines -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer"
      ></div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      @keyframes float {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        33% {
          transform: translateY(-20px) rotate(5deg);
        }
        66% {
          transform: translateY(10px) rotate(-5deg);
        }
      }
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      .animate-float {
        animation: float 20s ease-in-out infinite;
      }
      .animate-shimmer {
        animation: shimmer 3s linear infinite;
      }
    `,
  ],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('spin', [
      transition('false => true', [
        animate(
          '300ms ease-out',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: 0 }),
            style({ transform: 'rotate(90deg)', offset: 0.5 }),
            style({ transform: 'rotate(0deg)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  particles: Array<{ x: number; y: number; delay: number }> = [];
  hoverState: string | null = null;

  technologies = ['Angular', 'TypeScript', 'Tailwind CSS', 'Node.js', 'UI/UX'];

  stats = [
    { value: '50+', label: 'Projects' },
    { value: '4+', label: 'Years Exp' },
    { value: '100%', label: 'Satisfaction' },
  ];

  ngOnInit() {
    this.generateParticles();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  generateParticles() {
    // Generate random particles for background
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
