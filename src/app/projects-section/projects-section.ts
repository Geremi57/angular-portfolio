// projects-section.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="projects"
      class="relative py-20 md:py-32 bg-gradient-to-b from-blue-950 via-black to-gray-900 overflow-hidden"
    >
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <!-- Animated circuit board pattern -->
        <div
          class="absolute inset-0 opacity-5"
          style="background-image: 
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;"
        ></div>

        <!-- Floating code snippets -->
        <div
          *ngFor="let snippet of floatingCode"
          [style.left]="snippet.x + '%'"
          [style.top]="snippet.y + '%'"
          [style.animationDelay]="snippet.delay + 's'"
          class="absolute text-blue-400/10 font-mono text-sm opacity-30 animate-float"
        >
          {{ snippet.code }}
        </div>

        <!-- Glowing orbs -->
        <div
          class="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style="animation-delay: 2s"
        ></div>
      </div>

      <div class="relative z-10 container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-16 md:mb-20" [@fadeInUp]>
          <div class="inline-flex items-center justify-center space-x-2 mb-4">
            <div class="w-6 h-px bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            <span class="text-blue-400 font-medium tracking-wider">PORTFOLIO</span>
            <div class="w-6 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
          </div>

          <h2 class="text-white text-3xl md:text-5xl font-bold mb-6  ">
            Featured
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Projects</span
            >
          </h2>

          <p class="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            A collection of my latest work showcasing expertise in modern web development,
            innovative design, and problem-solving through technology.
          </p>
        </div>

        <!-- Projects Carousel -->
        <div class="relative max-w-6xl mx-auto">
          <!-- Navigation Arrows -->
          <button
            (click)="prevProject()"
            class="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 rounded-full bg-blue-900/80 backdrop-blur-sm border border-blue-700/30 text-blue-300 hover:text-white hover:bg-blue-800/80 hover:border-blue-500/50 hover:scale-110 active:scale-95 transition-all duration-300 items-center justify-center z-20 group"
          >
            <svg
              class="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          <button
            (click)="nextProject()"
            class="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 rounded-full bg-blue-900/80 backdrop-blur-sm border border-blue-700/30 text-blue-300 hover:text-white hover:bg-blue-800/80 hover:border-blue-500/50 hover:scale-110 active:scale-95 transition-all duration-300 items-center justify-center z-20 group"
          >
            <svg
              class="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>

          <!-- Project Cards Container -->
          <div
            class="relative h-[500px] md:h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/20 via-black/40 to-gray-900/30 border border-blue-800/30 backdrop-blur-sm"
          >
            <div class="absolute inset-0">
              <!-- Active Project Display -->
              <div
                *ngIf="projects[currentIndex]"
                [@slideAnimation]="slideDirection"
                class="absolute inset-0"
              >
                <div class="h-full grid lg:grid-cols-2 gap-0">
                  <!-- Project Image/Visual -->
                  <div
                    class="relative h-full min-h-[300px] md:min-h-[400px] overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-900"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-black/50 z-10"
                    ></div>
                    <div class="absolute inset-0 flex items-center justify-center p-8">
                      <div class="relative w-full h-full max-w-2xl mx-auto">
                        <!-- Mockup Device Frame -->
                        <div
                          class="absolute inset-0 border-8 border-blue-800/30 rounded-3xl pointer-events-none"
                        ></div>
                        <div
                          class="absolute inset-4 border-4 border-blue-600/20 rounded-2xl pointer-events-none"
                        ></div>

                        <!-- Project Screenshot Placeholder -->
                        <div
                          class="absolute inset-8 bg-gradient-to-br from-blue-800/30 to-cyan-800/30 rounded-xl overflow-hidden"
                        >
                          <!-- Animated code preview -->
                          <div class="absolute inset-0 p-6 font-mono text-sm">
                            <div
                              *ngFor="let line of projects[currentIndex].codePreview; let i = index"
                              class="text-blue-300/30 mb-1 flex items-center"
                            >
                              <span class="w-8 text-right pr-2 text-blue-400/50">{{ i + 1 }}</span>
                              <span class="text-blue-300/40">{{ line }}</span>
                            </div>
                          </div>

                          <!-- Interactive elements overlay -->
                          <div class="absolute bottom-4 right-4 flex space-x-2">
                            <div
                              *ngFor="let tag of projects[currentIndex].tags.slice(0, 3)"
                              class="px-3 py-1 bg-blue-900/70 backdrop-blur-sm rounded-full text-xs text-blue-300 border border-blue-700/30"
                            >
                              {{ tag }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Project Details -->
                  <div
                    class="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm"
                  >
                    <!-- Project Header -->
                    <div class="mb-6">
                      <div class="inline-flex items-center space-x-2 mb-4">
                        <span
                          class="px-3 py-1 bg-blue-900/50 border border-blue-700/30 rounded-full text-sm text-blue-300"
                        >
                          {{ projects[currentIndex].category }}
                        </span>
                        <span class="text-gray-400 text-sm">{{ projects[currentIndex].year }}</span>
                      </div>

                      <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                        {{ projects[currentIndex].title }}
                      </h3>

                      <p class="text-gray-300 mb-6 leading-relaxed">
                        {{ projects[currentIndex].description }}
                      </p>
                    </div>

                    <!-- Technologies Used -->
                    <div class="mb-8">
                      <h4 class="text-lg font-semibold text-blue-300 mb-3">Technologies</h4>
                      <div class="flex flex-wrap gap-2">
                        <div
                          *ngFor="let tech of projects[currentIndex].technologies"
                          class="px-3 py-1.5 bg-blue-900/40 border border-blue-700/20 rounded-lg text-sm text-blue-300 hover:bg-blue-800/40 hover:border-blue-500/30 transition-colors duration-300"
                        >
                          {{ tech }}
                        </div>
                      </div>
                    </div>

                    <!-- Project Features -->
                    <!-- <div class="mb-8">
                      <h4 class="text-lg font-semibold text-blue-300 mb-3">Key Features</h4>
                      <ul class="space-y-2">
                        <li *ngFor="let feature of projects[currentIndex].features"
                            class="flex items-start space-x-3">
                          <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" 
                               fill="none" 
                               stroke="currentColor" 
                               viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span class="text-gray-300">{{feature}}</span>
                        </li>
                      </ul>
                    </div> -->

                    <!-- Action Buttons -->
                    <div class="flex flex-wrap gap-4 mt-auto pt-6">
                      <a
                        [href]="projects[currentIndex].liveLink"
                        target="_blank"
                        class="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 group"
                      >
                        <span>Live Preview</span>
                        <svg
                          class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          ></path>
                        </svg>
                      </a>

                      <a
                        [href]="projects[currentIndex].githubLink"
                        target="_blank"
                        class="px-6 py-3 border-2 border-blue-400/30 rounded-lg font-semibold hover:border-blue-400/50 hover:bg-blue-900/30 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 group"
                      >
                        <span class="text-cyan-500">View Code</span>
                        <i class="fa-brands fa-github" style="color: rgba(116, 192, 252, 1);"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Indicators (Dots) -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              <button
                *ngFor="let project of projects; let i = index"
                (click)="goToProject(i)"
                [class]="
                  currentIndex === i
                    ? 'w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 ring-4 ring-blue-400/20'
                    : 'w-3 h-3 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors duration-300'
                "
              >
                <span class="sr-only">Go to project {{ i + 1 }}</span>
              </button>
            </div>

            <!-- Project Thumbnails (Bottom Carousel) -->
            <!-- <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-6 px-4">
              <div class="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
                <button *ngFor="let project of projects; let i = index"
                        (click)="goToProject(i)"
                        [class]="currentIndex === i ? 
                                 'flex-shrink-0 w-32 md:w-48 h-20 rounded-xl border-2 border-blue-400/50 bg-blue-900/30 backdrop-blur-sm transform scale-105' :
                                 'flex-shrink-0 w-32 md:w-48 h-20 rounded-xl border border-blue-800/30 bg-blue-900/20 backdrop-blur-sm hover:bg-blue-800/30 hover:border-blue-500/30 transition-all duration-300'">
                  <div class="w-full h-full p-3 flex flex-col justify-center">
                    <div class="text-xs md:text-sm font-semibold text-white truncate">{{project.title}}</div>
                    <div class="text-xs text-blue-300 truncate">{{project.category}}</div>
                    <div class="flex items-center space-x-1 mt-1">
                      <div *ngFor="let dot of [0,1,2]"
                           [class]="currentIndex === i ? 'w-1.5 h-1.5 rounded-full bg-blue-400' : 'w-1.5 h-1.5 rounded-full bg-blue-600/50'"></div>
                    </div>
                  </div>
                </button>
              </div>
            </div> -->
          </div>

          <!-- Mobile Navigation -->
          <div class="flex justify-center space-x-6 mt-8 lg:hidden">
            <button
              (click)="prevProject()"
              class="w-12 h-12 rounded-full bg-blue-900/80 backdrop-blur-sm border border-blue-700/30 text-blue-300 hover:text-white hover:bg-blue-800/80 hover:border-blue-500/50 active:scale-95 transition-all duration-300 flex items-center justify-center"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>

            <div class="flex items-center space-x-1">
              <span class="text-blue-400 font-bold">{{ currentIndex + 1 }}</span>
              <span class="text-gray-400">/</span>
              <span class="text-gray-400">{{ projects.length }}</span>
            </div>

            <button
              (click)="nextProject()"
              class="w-12 h-12 rounded-full bg-blue-900/80 backdrop-blur-sm border border-blue-700/30 text-blue-300 hover:text-white hover:bg-blue-800/80 hover:border-blue-500/50 active:scale-95 transition-all duration-300 flex items-center justify-center"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- View All Projects CTA -->
        <div class="text-center mt-16" [@fadeInUp]="{ value: '', params: { delay: '0.3s' } }">
          <div class="inline-flex items-center space-x-4">
            <div class="w-24 h-px bg-gradient-to-r from-blue-600/30 to-cyan-600/30"></div>
            <button
              class="px-8 py-4 border-2 border-blue-400/30 rounded-xl font-semibold hover:border-blue-400/50 hover:bg-blue-900/30 transform hover:scale-105 transition-all duration-300 group"
            >
              <span class="text-blue-300 group-hover:text-white">View All Projects</span>
              <svg
                class="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
            <div class="w-24 h-px bg-gradient-to-l from-blue-600/30 to-cyan-600/30"></div>
          </div>
        </div>
      </div>
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
          transform: translateY(-15px) rotate(2deg);
        }
        66% {
          transform: translateY(8px) rotate(-2deg);
        }
      }
      .animate-float {
        animation: float 20s ease-in-out infinite;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `,
  ],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class ProjectsSectionComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  slideDirection: 'increment' | 'decrement' = 'increment';
  autoSlideInterval: any;
  isPaused = false;

  floatingCode = [
    { x: 5, y: 10, delay: 0, code: '<div class="container">' },
    { x: 85, y: 15, delay: 3, code: 'const project = {};' },
    { x: 15, y: 85, delay: 6, code: 'ng serve --open' },
    { x: 75, y: 80, delay: 2, code: 'npm run build' },
    { x: 45, y: 25, delay: 4, code: 'export class Project {' },
    { x: 55, y: 65, delay: 5, code: 'import { Component }' },
  ];

  projects = [
    {
      id: 1,
      title: 'Enterprise Dashboard',
      category: 'Web Application',
      year: '2023',
      description:
        'A comprehensive analytics dashboard built with Angular and D3.js for real-time data visualization and business intelligence.',
      technologies: ['Angular 15', 'TypeScript', 'D3.js', 'Tailwind CSS', 'NgRx', 'REST API'],
      tags: ['Enterprise', 'Analytics', 'Real-time'],
      features: [
        'Real-time data visualization with interactive charts',
        'Role-based access control with multi-level permissions',
        'Customizable dashboard with drag-and-drop widgets',
        'Export functionality for reports (PDF, Excel)',
        'Dark/light theme with system detection',
      ],
      codePreview: [
        'export class DashboardComponent {',
        '  private dataStream: Subscription;',
        '  charts: ChartConfig[] = [];',
        '  ',
        '  ngOnInit() {',
        '    this.loadRealTimeData();',
        '    this.initializeCharts();',
        '  }',
        '  ',
        '  private initializeCharts() {',
        '    // D3.js visualization setup',
        '    this.createLineChart();',
        '    this.createBarChart();',
        '  }',
        '}',
      ],
      liveLink: 'https://demo-enterprise-dashboard.com',
      githubLink: 'https://github.com/username/enterprise-dashboard',
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      category: 'Full-Stack Solution',
      year: '2023',
      description:
        'Modern e-commerce platform with Angular frontend, Node.js backend, and PostgreSQL database. Features include cart management, payment integration, and admin dashboard.',
      technologies: ['Angular', 'Node.js', 'Express', 'PostgreSQL', 'Stripe API', 'Redis'],
      tags: ['E-commerce', 'Payment', 'Full-stack'],
      features: [
        'Secure payment processing with Stripe integration',
        'Real-time inventory management',
        'User reviews and ratings system',
        'Advanced product filtering and search',
        'Order tracking and history',
      ],
      codePreview: [
        '@Injectable({',
        "  providedIn: 'root'",
        '})',
        'export class CartService {',
        '  private items: CartItem[] = [];',
        '  ',
        '  addToCart(product: Product): void {',
        '    const existing = this.items.find(',
        '      item => item.id === product.id',
        '    );',
        '    ',
        '    if (existing) {',
        '      existing.quantity++;',
        '    } else {',
        '      this.items.push({',
        '        ...product,',
        '        quantity: 1',
        '      });',
        '    }',
        '  }',
        '}',
      ],
      liveLink: 'https://demo-ecommerce-store.com',
      githubLink: 'https://github.com/username/ecommerce-platform',
    },
    {
      id: 3,
      title: 'Health & Fitness Tracker',
      category: 'Mobile-First PWA',
      year: '2024',
      description:
        'Progressive Web Application for tracking workouts, nutrition, and health metrics. Features offline functionality and mobile-optimized interface.',
      technologies: ['Angular PWA', 'Ionic', 'Chart.js', 'IndexedDB', 'Service Workers'],
      tags: ['PWA', 'Health', 'Mobile'],
      features: [
        'Offline functionality with service workers',
        'Workout tracking with exercise library',
        'Nutrition calculator and meal planning',
        'Progress charts and statistics',
        'Push notifications for workout reminders',
      ],
      codePreview: [
        '@NgModule({',
        '  declarations: [AppComponent],',
        '  imports: [',
        '    ServiceWorkerModule.register(',
        "      'ngsw-worker.js', {",
        '        enabled: environment.production,',
        '        registrationStrategy: ',
        "          'registerWhenStable:30000'",
        '      }',
        '    )',
        '  ]',
        '})',
        'export class AppModule {}',
      ],
      liveLink: 'https://demo-fitness-tracker.com',
      githubLink: 'https://github.com/username/fitness-tracker',
    },
    {
      id: 4,
      title: 'AI Content Generator',
      category: 'AI Integration',
      year: '2024',
      description:
        'AI-powered content generation platform integrating OpenAI API with custom Angular interface for creating marketing content, blogs, and social media posts.',
      technologies: ['Angular 16', 'OpenAI API', 'NgRx', 'Material UI', 'Firebase'],
      tags: ['AI', 'Content', 'Marketing'],
      features: [
        'Integration with OpenAI GPT-4 API',
        'Template-based content generation',
        'Content history and version control',
        'Export to multiple formats (HTML, Markdown, PDF)',
        'Collaborative editing features',
      ],
      codePreview: [
        'async generateContent(prompt: string) {',
        '  const response = await this.openaiService',
        '    .createCompletion({',
        '      model: "gpt-4",',
        '      prompt: prompt,',
        '      max_tokens: 2000',
        '    });',
        '  ',
        '  return response.data.choices',
        '    .map(choice => choice.text)',
        "    .join('');",
        '}',
      ],
      liveLink: 'https://demo-ai-content.com',
      githubLink: 'https://github.com/username/ai-content-generator',
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
        this.nextProject();
      }
    }, 5000); // Change project every 5 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextProject() {
    this.slideDirection = 'increment';
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }

  prevProject() {
    this.slideDirection = 'decrement';
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }

  goToProject(index: number) {
    this.slideDirection = index > this.currentIndex ? 'increment' : 'decrement';
    this.currentIndex = index;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isPaused = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isPaused = false;
  }
}
