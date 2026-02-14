import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  tags: string[];
  features: string[];
  imageUrl: string;
  thumbnailUrl: string;
  galleryImages: string[];
  codePreview: string[];
  liveLink: string;
  githubLink: string;
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="projects"
      class="relative py-16 md:py-32 bg-gradient-to-b from-blue-950 via-black to-gray-900 overflow-hidden"
    >
      <!-- Background Elements (kept same) -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0 opacity-5"
          style="background-image: 
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;"
        ></div>

        <div
          *ngFor="let snippet of floatingCode"
          [style.left]="snippet.x + '%'"
          [style.top]="snippet.y + '%'"
          [style.animationDelay]="snippet.delay + 's'"
          class="absolute text-blue-400/10 font-mono text-sm opacity-30 animate-float"
        >
          {{ snippet.code }}
        </div>

        <div
          class="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style="animation-delay: 2s"
        ></div>
      </div>

      <div class="relative z-10 container mx-auto px-4">
        <!-- Section Header - Reduced margin on mobile -->
        <div class="text-center mb-12 md:mb-20" [@fadeInUp]>
          <div class="inline-flex items-center justify-center space-x-2 mb-4">
            <div class="w-6 h-px bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            <span class="text-blue-400 font-medium tracking-wider text-sm md:text-base">PORTFOLIO</span>
            <div class="w-6 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
          </div>

          <h2 class="text-white text-2xl md:text-5xl font-bold mb-4 md:mb-6">
            Featured
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Projects</span
            >
          </h2>

          <p class="text-gray-400 text-base md:text-xl max-w-3xl mx-auto px-4">
            A collection of my latest work showcasing expertise in modern web development,
            innovative design, and problem-solving through technology.
          </p>
        </div>

        <!-- Projects Carousel -->
        <div class="relative max-w-6xl mx-auto">
          <!-- Navigation Arrows (hidden on mobile) -->
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

          <!-- Project Cards Container - Taller on mobile -->
          <div
            class="relative h-[650px] md:h-[600px] overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-900/20 via-black/40 to-gray-900/30 border border-blue-800/30 backdrop-blur-sm"
          >
            <div class="absolute inset-0">
              <!-- Active Project Display -->
              <div
                *ngIf="projects[currentIndex]"
                [@slideAnimation]="slideDirection"
                class="absolute inset-0"
              >
                <!-- Mobile Layout: Image on top, details below -->
                <div class="h-full flex flex-col lg:grid lg:grid-cols-2 gap-0">
                  <!-- Project Image - Smaller on mobile -->
                  <div
                    class="relative h-[200px] md:h-[250px] lg:h-full lg:min-h-[400px] overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-900 flex-shrink-0"
                  >
                    <!-- Main Image Display -->
                    <div class="absolute inset-0">
                      <img 
                        [src]="getCurrentImage()" 
                        [alt]="currentProject?.title || 'Project screenshot'"
                        class="w-full h-full object-cover object-top"
                        loading="lazy"
                        (error)="handleImageError($event)"
                      />
                    </div>
                    
                    <!-- Dark Overlay - Lighter on mobile -->
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-black/30 lg:from-blue-900/50 lg:to-black/50"></div>
                    
                    <!-- Image Navigation Arrows (if multiple images) - Smaller on mobile -->
                    <div *ngIf="hasMultipleImages()" 
                         class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-2 lg:px-4 z-30">
                      <button 
                        (click)="prevImage(); $event.stopPropagation()"
                        class="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors duration-300 flex items-center justify-center text-sm lg:text-base"
                        [disabled]="isLoading"
                      >
                        ←
                      </button>
                      <button 
                        (click)="nextImage(); $event.stopPropagation()"
                        class="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors duration-300 flex items-center justify-center text-sm lg:text-base"
                        [disabled]="isLoading"
                      >
                        →
                      </button>
                    </div>
                    
                    <!-- Image Counter - Smaller on mobile -->
                    <div *ngIf="hasMultipleImages()" 
                         class="absolute top-2 right-2 lg:top-4 lg:right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-30">
                      {{ currentImageIndex + 1 }} / {{ getGalleryImageCount() }}
                    </div>
                    
                    <!-- Image Thumbnails Dots - Smaller on mobile -->
                    <div *ngIf="hasMultipleImages()" 
                         class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 lg:space-x-2 z-30">
                      <button 
                        *ngFor="let image of getGalleryImages(); let i = index; trackBy: trackByIndex"
                        (click)="currentImageIndex = i; $event.stopPropagation()"
                        class="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-all duration-300"
                        [class.w-3]="currentImageIndex === i"
                        [class.lg:w-4]="currentImageIndex === i"
                        [class.bg-blue-400]="currentImageIndex === i"
                        [class.bg-white/50]="currentImageIndex !== i"
                        [class.hover:bg-white/80]="currentImageIndex !== i"
                      ></button>
                    </div>
                    
                    <!-- Tags Overlay - Hide on mobile, show on desktop -->
                    <div class="hidden lg:flex absolute top-4 left-4 z-20 flex-wrap gap-2">
                      <div
                        *ngFor="let tag of currentProject?.tags || []"
                        class="px-3 py-1 bg-blue-900/80 backdrop-blur-sm rounded-full text-xs text-blue-300 border border-blue-700/30"
                      >
                        {{ tag }}
                      </div>
                    </div>

                    <!-- Loading Spinner -->
                    <div *ngIf="isLoading" 
                         class="absolute inset-0 flex items-center justify-center bg-black/50 z-40">
                      <div class="w-8 h-8 lg:w-10 lg:h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>

                  <!-- Project Details - Scrollable on mobile with less padding -->
                  <div
                    class="flex-1 p-4 md:p-6 lg:p-12 flex flex-col bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm overflow-y-auto"
                  >
                    <!-- Tags - Show on mobile here instead of on image -->
                    <div class="flex flex-wrap gap-1.5 mb-3 lg:hidden">
                      <div
                        *ngFor="let tag of currentProject?.tags || []"
                        class="px-2 py-0.5 bg-blue-900/60 backdrop-blur-sm rounded-full text-xs text-blue-300 border border-blue-700/30"
                      >
                        {{ tag }}
                      </div>
                    </div>

                    <!-- Project Header - Smaller text on mobile -->
                    <div class="mb-4 lg:mb-6">
                      <div class="flex items-center space-x-2 mb-2 lg:mb-4">
                        <span
                          class="px-2 py-0.5 lg:px-3 lg:py-1 bg-blue-900/50 border border-blue-700/30 rounded-full text-xs lg:text-sm text-blue-300"
                        >
                          {{ currentProject?.category || 'Project' }}
                        </span>
                        <span class="text-gray-400 text-xs lg:text-sm">{{ currentProject?.year || '' }}</span>
                      </div>

                      <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-4">
                        {{ currentProject?.title || 'Project Title' }}
                      </h3>

                      <p class="text-gray-300 text-sm lg:text-base leading-relaxed line-clamp-3 lg:line-clamp-none">
                        {{ currentProject?.description || 'Project description goes here.' }}
                      </p>
                    </div>

                    <!-- Technologies Used - Smaller chips on mobile -->
                    <div class="mb-4 lg:mb-8">
                      <h4 class="text-base lg:text-lg font-semibold text-blue-300 mb-2 lg:mb-3">Technologies</h4>
                      <div class="flex flex-wrap gap-1.5 lg:gap-2">
                        <div
                          *ngFor="let tech of currentProject?.technologies || []"
                          class="px-2 py-1 lg:px-3 lg:py-1.5 bg-blue-900/40 border border-blue-700/20 rounded-lg text-xs lg:text-sm text-blue-300 hover:bg-blue-800/40 hover:border-blue-500/30 transition-colors duration-300"
                        >
                          {{ tech }}
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons - Stack on mobile -->
                    <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-auto pt-4 lg:pt-6">
                      <a
                        *ngIf="currentProject?.liveLink"
                        [href]="currentProject?.liveLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold text-sm lg:text-base hover:from-blue-500 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
                      >
                        <span>Live Preview</span>
                        <svg
                          class="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300"
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
                        *ngIf="currentProject?.githubLink"
                        [href]="currentProject?.githubLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-2.5 lg:px-6 lg:py-3 border-2 border-blue-400/30 rounded-lg font-semibold text-sm lg:text-base hover:border-blue-400/50 hover:bg-blue-900/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
                      >
                        <span class="text-cyan-500">View Code</span>
                        <i class="fa-brands fa-github text-cyan-400"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Indicators (Dots) - Moved up a bit on mobile -->
            <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              <button
                *ngFor="let project of projects; let i = index; trackBy: trackByIndex"
                (click)="goToProject(i)"
                [class]="
                  currentIndex === i
                    ? 'w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 ring-4 ring-blue-400/20'
                    : 'w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors duration-300'
                "
              >
                <span class="sr-only">Go to project {{ i + 1 }}</span>
              </button>
            </div>
          </div>

          <!-- Mobile Navigation - Improved spacing -->
          <div class="flex justify-center space-x-6 mt-12 lg:hidden">
            <button
              (click)="prevProject()"
              class="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-900/80 backdrop-blur-sm border border-blue-700/30 text-blue-300 hover:text-white hover:bg-blue-800/80 hover:border-blue-500/50 active:scale-95 transition-all duration-300 flex items-center justify-center"
            >
              <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>

            <div class="flex items-center space-x-1">
              <span class="text-blue-400 font-bold text-sm lg:text-base">{{ currentIndex + 1 }}</span>
              <span class="text-gray-400 text-sm lg:text-base">/</span>
              <span class="text-gray-400 text-sm lg:text-base">{{ projects.length }}</span>
            </div>

            <button
              (click)="nextProject()"
              class="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-900/80 backdrop-blur-sm border border-blue-700/30 text-blue-300 hover:text-white hover:bg-blue-800/80 hover:border-blue-500/50 active:scale-95 transition-all duration-300 flex items-center justify-center"
            >
              <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        <!-- View All Projects CTA - Smaller on mobile -->
        <div class="text-center mt-16 lg:mt-20" [@fadeInUp]="{ value: '', params: { delay: '0.3s' } }">
          <div class="inline-flex items-center space-x-2 lg:space-x-4">
            <div class="w-12 lg:w-24 h-px bg-gradient-to-r from-blue-600/30 to-cyan-600/30"></div>
            <button
              class="px-6 py-3 lg:px-8 lg:py-4 border-2 border-blue-400/30 rounded-lg lg:rounded-xl font-semibold text-sm lg:text-base hover:border-blue-400/50 hover:bg-blue-900/30 transform hover:scale-105 transition-all duration-300 group"
            >
              <span class="text-blue-300 group-hover:text-white">View All Projects</span>
              <svg
                class="w-4 h-4 lg:w-5 lg:h-5 inline-block ml-1 lg:ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
            <div class="w-12 lg:w-24 h-px bg-gradient-to-l from-blue-600/30 to-cyan-600/30"></div>
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
      /* Add line-clamp utility */
      .line-clamp-3 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
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
  currentImageIndex = 0;
  slideDirection: 'increment' | 'decrement' = 'increment';
  autoSlideInterval: any;
  isPaused = false;
  isLoading = false;

  floatingCode = [
    { x: 5, y: 10, delay: 0, code: '<div class="container">' },
    { x: 85, y: 15, delay: 3, code: 'const project = {};' },
    { x: 15, y: 85, delay: 6, code: 'ng serve --open' },
    { x: 75, y: 80, delay: 2, code: 'npm run build' },
    { x: 45, y: 25, delay: 4, code: 'export class Project {' },
    { x: 55, y: 65, delay: 5, code: 'import { Component }' },
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'Space LLM Support AI Chat Assistant',
      category: 'AI Application',
      year: '2024',
      description: 'An intelligent AI chat assistant built with Angular and integrated with OpenRouter API. Features include voice input, template-based conversations, and file upload capabilities.',
      technologies: ['Golang', 'Angular 17', 'OpenRouter API', 'TypeScript', 'Tailwind CSS', 'Web Speech API'],
      tags: ['AI', 'Chat', 'Voice'],
      features: [
        'Real-time AI responses',
        'Voice input support',
        'Conversation templates',
        'File upload & analysis',
        'Markdown rendering'
      ],
      imageUrl: 'assets/projects/images/llm/Space-llm.png',
      thumbnailUrl: 'assets/projects/images/llm/Space-llm.png',
      galleryImages: [
        'assets/projects/images/llm/Space-llm.png',
        'assets/projects/images/llm/template-llm.png',
        'assets/projects/images/llm/upload-llm.png',
        'assets/projects/images/llm/voice-llm.png'
      ],
      codePreview: [
        'async sendMessage() {',
        '  this.isLoading = true;',
        '  try {',
        '    const response = await this.openRouterService',
        '      .chat(this.messages);',
        '    this.addResponse(response);',
        '  } finally {',
        '    this.isLoading = false;',
        '  }',
        '}',
      ],
      liveLink: 'https://github.com/Geremi57/space-llm',
      githubLink: 'https://github.com/Geremi57/space-llm',
    },
    {
      id: 2,
      title: 'PurpleHeyz Education Platform',
      category: 'Social Application',
      year: '2024',
      description: 'A modern Learning application for QA learning with FlashCards and progression tracking',
      technologies: ['React', 'Golang', 'Node.Js', 'Render Web Service', 'TailwindCss'],
      tags: ['Education', 'Community', 'Tracking'],
      features: [
        'User profiles',
        'Interactive cards',
        'Real-time updates',
        'Engagement analytics',
        'Responsive design'
      ],
      imageUrl: 'assets/projects/images/ph/purpleHeyz.png',
      thumbnailUrl: 'assets/projects/images/ph/purpleHeyz.png',
      galleryImages: [
        'assets/projects/images/ph/purpleHeyz.png',
        'assets/projects/images/ph/details-card.png',
        'assets/projects/images/ph/answer-ph.png'
      ],
      codePreview: [
        '@Component({',
        '  selector: \'app-profile-card\',',
        '  template: `...`',
        '})',
        'export class ProfileCardComponent {',
        '  @Input() user: User;',
        '  @Output() interact = new EventEmitter();',
        '}',
      ],
      liveLink: 'https://purple-heyz.netlify.app/',
      githubLink: 'https://github.com/Geremi57/FlashNotes',
    },
    {
      id: 3,
      title: 'Real Estate Platform',
      category: 'Real Estate',
      year: '2023-2024',
      description: 'A comprehensive real estate platform for property listings, with advanced filtering, property details, and interactive sliders for property search.',
      technologies: ['Golang', 'Google Maps API', 'Render web service', 'Resend Email API', 'JavaScript'],
      tags: ['Real Estate', 'Maps', 'Filters'],
      features: [
        'Property listings',
        'Advanced filters',
        'Interactive maps',
        'Price sliders',
        'Property details view'
      ],
      imageUrl: 'assets/projects/images/ra/Real-Estate.png',
      thumbnailUrl: 'assets/projects/images/ra/Real-Estate.png',
      galleryImages: [
        'assets/projects/images/ra/Real-Estate.png',
        'assets/projects/images/ra/apartments.png',
        'assets/projects/images/ra/details-ra.png',
        'assets/projects/images/ra/sliders-ra.png'
      ],
      codePreview: [
        'interface Property {',
        '  id: string;',
        '  title: string;',
        '  price: number;',
        '  location: GeoPoint;',
        '  features: string[];',
        '}',
      ],
      liveLink: 'https://www.broaderrealtors.co.ke/',
      githubLink: 'https://github.com/Geremi57/broader-real_estate',
    }
  ];

  get currentProject(): Project | undefined {
    return this.projects[this.currentIndex];
  }

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
    }, 5000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextProject() {
    this.slideDirection = 'increment';
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
    this.resetImageIndex();
  }

  prevProject() {
    this.slideDirection = 'decrement';
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
    this.resetImageIndex();
  }

  goToProject(index: number) {
    this.slideDirection = index > this.currentIndex ? 'increment' : 'decrement';
    this.currentIndex = index;
    this.resetImageIndex();
  }

  resetImageIndex() {
    this.currentImageIndex = 0;
  }

  nextImage() {
    const galleryCount = this.getGalleryImageCount();
    if (galleryCount > 1) {
      this.isLoading = true;
      setTimeout(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % galleryCount;
        this.isLoading = false;
      }, 300);
    }
  }

  prevImage() {
    const galleryCount = this.getGalleryImageCount();
    if (galleryCount > 1) {
      this.isLoading = true;
      setTimeout(() => {
        this.currentImageIndex = (this.currentImageIndex - 1 + galleryCount) % galleryCount;
        this.isLoading = false;
      }, 300);
    }
  }

  hasMultipleImages(): boolean {
    return this.getGalleryImageCount() > 1;
  }

  getGalleryImageCount(): number {
    return this.currentProject?.galleryImages?.length || 0;
  }

  getGalleryImages(): string[] {
    return this.currentProject?.galleryImages || [];
  }

  getCurrentImage(): string {
    if (this.currentProject?.galleryImages?.length) {
      return this.currentProject.galleryImages[this.currentImageIndex];
    }
    return this.currentProject?.imageUrl || 'assets/projects/images/fallback.png';
  }

  handleImageError(event: any) {
    console.error('Image failed to load:', event.target.src);
    event.target.src = 'assets/projects/images/fallback.png';
  }

  trackByIndex(index: number): number {
    return index;
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