// strengths-section.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="strengths"
      class="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-blue-950 overflow-hidden"
    >
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <!-- Matrix-like code rain effect (subtle) -->
        <div class="absolute inset-0 opacity-5">
          <div
            *ngFor="let code of codeRain; let i = index"
            [style.left]="code.x + '%'"
            [style.top]="code.y + '%'"
            [style.animationDelay]="code.delay + 's'"
            class="absolute text-blue-500/30 font-mono text-xs animate-rain"
          >
            {{ code.symbol }}
          </div>
        </div>

        <!-- Circuit board pattern -->
        <div
          class="absolute inset-0 opacity-5"
          style="background-image: 
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(0deg, rgba(59, 130, 246, 0.8) 1px, transparent 1px);
                    background-size: 40px 40px;"
        ></div>

        <!-- Animated glowing orbs -->
        <div
          class="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
        ></div>
        <div
          class="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style="animation-delay: 2s"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"
          style="animation-delay: 1s"
        ></div>
      </div>

      <div class="relative z-10 container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-16 md:mb-20" [@fadeInUp]>
          <div class="inline-flex items-center justify-center space-x-2 mb-4">
            <div class="w-8 h-px bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            <span class="text-blue-400 font-medium tracking-wider">CORE COMPETENCIES</span>
            <div class="w-8 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
          </div>

          <h2 class="text-white text-3xl md:text-5xl font-bold mb-6">
            Engineering
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Strengths
            </span>
          </h2>

          <p class="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Built on a foundation of algorithmic thinking, system design, and relentless attention
            to detail. Here's what I bring to every project.
          </p>
        </div>

        <!-- Carousel Navigation -->
        <div
          class="flex justify-between items-center mb-8"
          [@fadeInUp]="{ value: '', params: { delay: '0.1s' } }"
        >
          <div class="flex items-center space-x-2">
            <span class="text-sm text-blue-300">Discover my strengths</span>
            <div class="w-12 h-px bg-gradient-to-r from-blue-400 to-cyan-400"></div>
          </div>

          <div class="flex space-x-3">
            <button
              (click)="prevSlide()"
              (mouseenter)="pauseAutoSlide()"
              (mouseleave)="resumeAutoSlide()"
              class="w-10 h-10 rounded-full bg-blue-900/50 border border-blue-700/30 text-blue-300 hover:text-white hover:bg-blue-800/50 hover:border-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            >
              <i
                class="fas fa-chevron-left group-hover:-translate-x-1 transition-transform duration-300"
              ></i>
            </button>
            <button
              (click)="nextSlide()"
              (mouseenter)="pauseAutoSlide()"
              (mouseleave)="resumeAutoSlide()"
              class="w-10 h-10 rounded-full bg-blue-900/50 border border-blue-700/30 text-blue-300 hover:text-white hover:bg-blue-800/50 hover:border-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            >
              <i
                class="fas fa-chevron-right group-hover:translate-x-1 transition-transform duration-300"
              ></i>
            </button>
          </div>
        </div>

        <!-- Carousel Container -->
      <!-- Carousel Container -->
<div
  class="relative overflow-hidden"
  [@fadeInUp]="{ value: '', params: { delay: '0.2s' } }"
>
  <div
    class="flex transition-transform duration-700 ease-out"
    [style.transform]="'translateX(-' + currentIndex * 100 + '%)'"
  >
    <div
      *ngFor="let strength of strengths; let i = index"
      class="w-full flex-shrink-0 px-4"
    >
      <!-- Strength Card -->
      <div class="relative group">
        <!-- Card Glow Effect -->
        <div
          class="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"
        ></div>

        <!-- Main Card -->
        <div
          class="relative bg-gradient-to-br from-gray-900 via-blue-950/90 to-black border border-blue-800/30 rounded-2xl overflow-hidden"
        >
          <!-- Animated Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div
              class="absolute inset-0"
              [style.background]="
                'radial-gradient(circle at 30% 50%, ' +
                strength.glowColor +
                ' 0%, transparent 50%)'
              "
            ></div>
          </div>

          <!-- Card Header with Icon -->
          <div class="relative p-8 pb-6 border-b border-blue-800/20">
            <div class="flex items-start justify-between">
              <!-- Icon with animated ring -->
              <div class="relative">
                <div
                  class="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-blue-700/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                >
                  <i [class]="strength.icon" class="text-3xl text-blue-400"></i>
                </div>
                <div
                  class="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-30 blur transition-opacity duration-500"
                ></div>
              </div>

              <!-- Index Badge -->
              <div class="px-3 py-1 bg-blue-900/60 rounded-full border border-blue-700/30">
                <span class="text-xs font-mono text-blue-300">0{{ i + 1 }}</span>
              </div>
            </div>

            <!-- Title -->
            <h3
              class="text-2xl font-bold text-white mt-4 group-hover:text-blue-300 transition-colors duration-300"
            >
              {{ strength.title }}
            </h3>

            <!-- Description -->
            <p class="text-gray-400 text-sm mt-2 leading-relaxed">
              {{ strength.description }}
            </p>
          </div>

          <!-- Card Body -->
          <div class="relative p-8">
            <!-- Key Features -->
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
                <i class="fas fa-cog text-xs mr-2 animate-spin-slow"></i>
                Key Capabilities
              </h4>
              <ul class="space-y-3">
                <li
                  *ngFor="let feature of strength.features"
                  class="flex items-start space-x-3 group/feature"
                >
                  <div class="mt-1">
                    <i
                      class="fas fa-chevron-right text-xs text-blue-400/50 group-hover/feature:text-blue-400 group-hover/feature:translate-x-1 transition-all duration-300"
                    ></i>
                  </div>
                  <span class="text-sm text-gray-300">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- Technologies -->
            <div>
              <h4 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
                <i class="fas fa-code text-xs mr-2"></i>
                Tech Stack
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  *ngFor="let tech of strength.technologies"
                  class="px-3 py-1.5 bg-blue-900/40 border border-blue-700/20 rounded-lg text-xs text-blue-300 hover:bg-blue-800/40 hover:border-blue-500/30 hover:scale-105 transition-all duration-300 cursor-default"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Animated Progress Bar -->
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"
            ></div>
          </div>

          <!-- Decorative Corner Elements -->
          <div
            class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-3xl"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-tr-3xl"
          ></div>
        </div>
      </div>
    </div>
  </div>

</div>

        <!-- Carousel Indicators -->
        <div
          class="flex justify-center mt-8 space-x-3"
          [@fadeInUp]="{ value: '', params: { delay: '0.3s' } }"
        >
          <button
            *ngFor="let strength of strengths; let i = index"
            (click)="goToSlide(i)"
            (mouseenter)="pauseAutoSlide()"
            (mouseleave)="resumeAutoSlide()"
            class="group"
          >
            <div
              [class]="
                currentIndex === i
                  ? 'w-10 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full'
                  : 'w-6 h-2 bg-blue-900/50 rounded-full hover:bg-blue-700/50 transition-all duration-300'
              "
            ></div>
          </button>
        </div>

        <!-- Slide Counter -->
        <div
          class="text-center mt-4 text-sm text-gray-500"
          [@fadeInUp]="{ value: '', params: { delay: '0.4s' } }"
        >
          <span class="text-blue-400 font-bold">{{ currentIndex + 1 }}</span>
          <span> / {{ strengths.length }}</span>
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute bottom-10 right-10 opacity-20">
        <i class="fas fa-bolt text-6xl text-blue-400 animate-pulse"></i>
      </div>
      <div class="absolute top-10 left-10 opacity-20">
        <i
          class="fas fa-code-branch text-6xl text-cyan-400 animate-pulse"
          style="animation-delay: 1s"
        ></i>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      @keyframes rain {
        0% {
          transform: translateY(-100%);
          opacity: 0;
        }
        10% {
          opacity: 0.3;
        }
        90% {
          opacity: 0.3;
        }
        100% {
          transform: translateY(100vh);
          opacity: 0;
        }
      }
      @keyframes spin-slow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .animate-rain {
        animation: rain 15s linear infinite;
      }
      .animate-spin-slow {
        animation: spin-slow 3s linear infinite;
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
  ],
})
export class ServicesSectionComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  autoSlideInterval: any;
  isPaused = false;

  codeRain = [
    { x: 10, y: -10, delay: 0, symbol: '010' },
    { x: 25, y: -20, delay: 2, symbol: '101' },
    { x: 40, y: -15, delay: 4, symbol: '110' },
    { x: 55, y: -25, delay: 1, symbol: '011' },
    { x: 70, y: -30, delay: 3, symbol: '001' },
    { x: 85, y: -5, delay: 5, symbol: '100' },
    { x: 15, y: -40, delay: 2.5, symbol: '111' },
    { x: 45, y: -50, delay: 4.5, symbol: '000' },
    { x: 65, y: -60, delay: 1.5, symbol: '010' },
    { x: 95, y: -70, delay: 3.5, symbol: '101' },
  ];

  strengths = [
    {
      title: 'Algorithmic Problem Solving',
      description:
        'Deep understanding of algorithms and data structures, with practical implementation experience in low-level languages.',
      icon: 'fas fa-brain',
      glowColor: '#3b82f6',
      features: [
        'C programming with manual memory management',
        'Go concurrency patterns and problem solving',
        'Complex algorithm implementation (push-swap, sorting)',
        'Data structure optimization',
        'Computational thinking approach',
      ],
      technologies: ['C', 'Go', 'Algorithms', 'Data Structures', 'Big O'],
    },
    {
      title: 'Vanilla JavaScript Engineering',
      description:
        'Building sophisticated applications from scratch without frameworks, mastering core web fundamentals.',
      icon: 'fas fa-code',
      glowColor: '#06b6d4',
      features: [
        'Pure DOM manipulation and rendering',
        'LocalStorage-based state management',
        'Modular architecture patterns',
        'Custom event systems',
        'Performance optimization techniques',
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Web APIs', 'ES6+'],
    },
    {
      title: 'Full-Stack Architecture',
      description:
        'Designing and implementing complete systems with clean separation of concerns and scalable patterns.',
      icon: 'fas fa-layer-group',
      glowColor: '#8b5cf6',
      features: [
        'RESTful API design and implementation',
        'JWT authentication & authorization',
        'Frontend-backend integration',
        'State management patterns',
        'Database schema design',
      ],
      technologies: ['Angular', 'Node.js', 'TypeScript', 'Express', 'MongoDB'],
    },
    {
      title: 'Peer-Driven Development',
      description:
        'Thriving in collaborative, code-review intensive environments that demand clarity and quality.',
      icon: 'fas fa-users',
      glowColor: '#ef4444',
      features: [
        'Structured peer code reviews',
        'Technical presentations',
        'Pair programming expertise',
        'Debugging under pressure',
        'Continuous feedback integration',
      ],
      technologies: ['Git', 'Linux', 'CLI', 'Debugging', 'Code Review'],
    },
    {
      title: 'System Design & Architecture',
      description:
        'Creating scalable, maintainable systems with thoughtful component separation and clear boundaries.',
      icon: 'fas fa-sitemap',
      glowColor: '#10b981',
      features: [
        'Modular component architecture',
        'Service layer abstraction',
        'Scalable project structure',
        'Performance-first design',
        'Technical documentation',
      ],
      technologies: ['UML', 'Design Patterns', 'SOLID', 'Clean Code', 'Documentation'],
    },
    {
      title: 'Problem Deconstruction',
      description:
        'Breaking complex problems into manageable pieces with systematic analysis and planning.',
      icon: 'fas fa-puzzle-piece',
      glowColor: '#f59e0b',
      features: [
        'Requirements analysis',
        'Edge case identification',
        'Solution prototyping',
        'Iterative refinement',
        'Technical specification writing',
      ],
      technologies: ['Flowcharts', 'Pseudocode', 'Testing', 'Documentation'],
    },
  ];

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  pauseAutoSlide() {
    this.isPaused = true;
  }

  resumeAutoSlide() {
    this.isPaused = false;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.strengths.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.strengths.length) % this.strengths.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.pauseAutoSlide();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.resumeAutoSlide();
  }
}
