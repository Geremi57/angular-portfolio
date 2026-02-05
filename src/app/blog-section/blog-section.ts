// blog-section.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="blog"
      class="relative py-20 md:py-32 bg-gradient-to-b from-gray-900 via-black to-blue-950 overflow-hidden"
    >
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <!-- Animated writing pattern -->
        <div
          class="absolute inset-0 opacity-5"
          style="background-image: 
                    repeating-linear-gradient(0deg, 
                      transparent, 
                      transparent 2px, 
                      rgba(59, 130, 246, 0.1) 2px, 
                      rgba(59, 130, 246, 0.1) 4px),
                    repeating-linear-gradient(90deg, 
                      transparent, 
                      transparent 2px, 
                      rgba(59, 130, 246, 0.1) 2px, 
                      rgba(59, 130, 246, 0.1) 4px);
                    background-size: 40px 40px;"
        ></div>

        <!-- Floating text elements -->
        <div
          *ngFor="let text of floatingText"
          [style.left]="text.x + '%'"
          [style.top]="text.y + '%'"
          [style.animationDelay]="text.delay + 's'"
          class="absolute text-blue-400/5 font-serif text-lg md:text-xl opacity-30 animate-float pointer-events-none"
        >
          {{ text.content }}
        </div>

        <!-- Glowing accent corners -->
        <div class="absolute top-0 right-0 w-64 h-64">
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          ></div>
        </div>
        <div class="absolute bottom-0 left-0 w-64 h-64">
          <div
            class="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          ></div>
        </div>
      </div>

      <div class="relative z-10 container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-16 md:mb-20" [@fadeInUp]>
          <div class="inline-flex items-center justify-center space-x-2 mb-4">
            <div class="w-8 h-px bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            <span class="text-blue-400 font-medium tracking-wider">INSIGHTS & ARTICLES</span>
            <div class="w-8 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
          </div>

          <h2 class="text-3xl md:text-5xl font-bold mb-6 text-white">
            Latest
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Blog Posts</span
            >
          </h2>

          <p class="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Explore my thoughts on web development, design patterns, and emerging technologies
            through in-depth articles and tutorials.
          </p>
        </div>

        <!-- Blog Cards Container -->
        <div class="relative">
          <!-- Scrollable Cards -->
          <div class="relative">
            <!-- Left Gradient Fade (Desktop) -->
            <div
              class="hidden lg:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent z-10 pointer-events-none"
            ></div>

            <!-- Right Gradient Fade (Desktop) -->
            <div
              class="hidden lg:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-950 via-blue-950/95 to-transparent z-10 pointer-events-none"
            ></div>

            <!-- Blog Cards Grid -->
            <div
              #blogContainer
              class="flex lg:grid lg:grid-cols-3 lg:gap-8 overflow-x-auto lg:overflow-x-visible pb-8 lg:pb-0"
              [style.transform]="isDragging ? 'scale(0.99)' : 'scale(1)'"
            >
              <div
                *ngFor="let post of blogPosts; let i = index"
                [@staggerItem]="'enter'"
                [style.animation-delay]="i * 100 + 'ms'"
                class="flex-shrink-0 w-full lg:w-auto lg:flex-shrink lg:flex-grow"
              >
                <!-- Blog Card -->
                <article class="group h-full relative mx-4 lg:mx-0">
                  <!-- Card Glow Effect -->
                  <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 group-hover:duration-200"
                  ></div>

                  <!-- Main Card -->
                  <div
                    class="relative h-full bg-gradient-to-br from-gray-900/80 to-blue-950/80 backdrop-blur-sm border border-blue-800/30 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:translate-y-[-4px]"
                  >
                    <!-- Card Header (Image Area) -->
                    <div
                      class="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-900"
                    >
                      <!-- Featured Image Placeholder -->
                      <div class="absolute inset-0 flex items-center justify-center">
                        <div
                          class="w-24 h-24 rounded-full border-4 border-blue-500/30 bg-blue-800/40 flex items-center justify-center"
                        >
                          <svg
                            class="w-12 h-12 text-blue-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <!-- Image Overlay -->
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent"
                      ></div>

                      <!-- Category Badge -->
                      <div class="absolute top-4 left-4">
                        <span
                          class="px-3 py-1.5 bg-blue-900/80 backdrop-blur-sm border border-blue-700/30 rounded-full text-xs font-medium text-blue-300"
                        >
                          {{ post.category }}
                        </span>
                      </div>

                      <!-- Date Badge -->
                      <div class="absolute top-4 right-4 flex items-center space-x-1">
                        <svg
                          class="w-4 h-4 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span class="text-xs text-blue-300">{{ post.date }}</span>
                      </div>

                      <!-- Reading Time -->
                      <div class="absolute bottom-4 left-4">
                        <div class="flex items-center space-x-1">
                          <svg
                            class="w-4 h-4 text-cyan-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <span class="text-xs text-cyan-300">{{ post.readTime }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Card Content -->
                    <div class="p-6 md:p-8">
                      <!-- Title -->
                      <h3
                        class="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2"
                      >
                        {{ post.title }}
                      </h3>

                      <!-- Summary -->
                      <p class="text-gray-400 mb-4 text-sm md:text-base line-clamp-2">
                        {{ post.summary }}
                      </p>

                      <!-- Tags -->
                      <div class="flex flex-wrap gap-2 mb-6">
                        <span
                          *ngFor="let tag of post.tags"
                          class="px-2.5 py-1 bg-blue-900/40 border border-blue-700/20 rounded-lg text-xs text-blue-300 hover:bg-blue-800/40 hover:border-blue-500/30 transition-colors duration-300 cursor-pointer"
                        >
                          #{{ tag }}
                        </span>
                      </div>

                      <!-- Read More Button -->
                      <div
                        class="flex items-center justify-between pt-4 border-t border-blue-800/20 group-hover:border-blue-500/30 transition-colors duration-300"
                      >
                        <div class="flex items-center space-x-3">
                          <!-- Author Avatar -->
                          <div
                            class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center"
                          >
                            <span class="text-xs font-bold text-white">JD</span>
                          </div>
                          <span class="text-sm text-gray-400">John Developer</span>
                        </div>

                        <button
                          (click)="readMore(post.id)"
                          class="flex items-center space-x-2 text-blue-400 hover:text-cyan-300 group/button transition-colors duration-300"
                        >
                          <span class="text-sm font-medium">Read More</span>
                          <svg
                            class="w-5 h-5 transform group-hover/button:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <!-- Hover Effect Indicator -->
                    <div
                      class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    ></div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <!-- Scroll Indicators (Mobile) -->
          <div class="lg:hidden flex justify-center space-x-2 mt-6">
            <div
              *ngFor="let post of blogPosts; let i = index"
              [class]="
                currentCardIndex === i
                  ? 'w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300'
                  : 'w-2 h-2 rounded-full bg-gray-600'
              "
            ></div>
          </div>
        </div>

        <!-- View All Button -->
        <div class="text-center mt-16" [@fadeInUp]="{ value: '', params: { delay: '0.3s' } }">
          <button
            class="px-8 py-4 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-500 transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
          >
            <!-- Shimmer effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
            ></div>

            <span class="relative z-10 flex items-center space-x-3">
              <svg
                class="w-6 h-6 group-hover:rotate-180 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
              <span>View All Articles</span>
              <svg
                class="w-6 h-6 group-hover:rotate-180 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
          </button>
        </div>

        <!-- Newsletter Subscription -->
        <div class="mt-20" [@fadeInUp]="{ value: '', params: { delay: '0.5s' } }">
          <div class="max-w-2xl mx-auto">
            <div
              class="bg-gradient-to-r from-blue-900/30 via-black/50 to-cyan-900/30 border border-blue-800/30 rounded-2xl p-8 md:p-10 backdrop-blur-sm"
            >
              <div class="text-center mb-8">
                <div
                  class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                <p class="text-gray-400">
                  Subscribe to get notified about new articles and tutorials
                </p>
              </div>

              <form (ngSubmit)="subscribeNewsletter()" class="space-y-4">
                <div class="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    
                    name="email"
                    placeholder="Enter your email"
                    class="flex-1 px-6 py-3 bg-gray-900/60 border border-blue-800/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />

                  <button
                    type="submit"
                    class="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300"
                  >
                    Subscribe
                  </button>
                </div>
                <p class="text-xs text-gray-500 text-center">No spam. Unsubscribe at any time.</p>
              </form>
            </div>
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
          transform: translateY(-10px) rotate(1deg);
        }
        66% {
          transform: translateY(5px) rotate(-1deg);
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
        animation: float 25s ease-in-out infinite;
      }
      .animate-shimmer {
        animation: shimmer 2s linear infinite;
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      /* Custom scrollbar for blog cards */
      .blog-scroll::-webkit-scrollbar {
        height: 8px;
      }
      .blog-scroll::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.3);
        border-radius: 4px;
      }
      .blog-scroll::-webkit-scrollbar-thumb {
        background: linear-gradient(to right, rgba(59, 130, 246, 0.5), rgba(6, 182, 212, 0.5));
        border-radius: 4px;
      }
      .blog-scroll::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(6, 182, 212, 0.8));
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
    trigger('staggerItem', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
        animate(
          '0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        ),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(
          '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class BlogSectionComponent implements OnInit {
  blogPosts = [
    {
      id: 1,
      title: 'Mastering Angular 16: New Features and Best Practices',
      summary:
        'Explore the latest features in Angular 16 and learn how to implement them in your projects for better performance and developer experience.',
      tags: ['Angular', 'TypeScript', 'Frontend'],
      category: 'Tutorial',
      date: 'Dec 15, 2023',
      readTime: '8 min read',
      featured: true,
    },
    {
      id: 2,
      title: 'Building Scalable Applications with Micro Frontends',
      summary:
        'A comprehensive guide to implementing micro frontend architecture using Angular and modern web technologies.',
      tags: ['Architecture', 'Micro Frontends', 'Scalability'],
      category: 'Architecture',
      date: 'Nov 28, 2023',
      readTime: '12 min read',
      featured: true,
    },
    {
      id: 3,
      title: 'Optimizing Angular Performance with Lazy Loading',
      summary:
        'Learn advanced techniques for lazy loading modules, components, and assets to improve your Angular application performance.',
      tags: ['Performance', 'Optimization', 'Angular'],
      category: 'Performance',
      date: 'Nov 10, 2023',
      readTime: '6 min read',
      featured: false,
    },
    {
      id: 4,
      title: 'State Management Patterns in Modern Angular Apps',
      summary:
        'Comparing different state management solutions and patterns for complex Angular applications.',
      tags: ['State Management', 'NgRx', 'RxJS'],
      category: 'Patterns',
      date: 'Oct 22, 2023',
      readTime: '10 min read',
      featured: true,
    },
    {
      id: 5,
      title: 'Creating Beautiful UIs with Tailwind CSS and Angular',
      summary:
        'How to leverage the power of Tailwind CSS to build stunning, responsive interfaces in Angular applications.',
      tags: ['Tailwind', 'UI/UX', 'Design'],
      category: 'Design',
      date: 'Oct 5, 2023',
      readTime: '7 min read',
      featured: false,
    },
    {
      id: 6,
      title: 'Testing Strategies for Enterprise Angular Applications',
      summary:
        'A deep dive into testing methodologies and tools for maintaining high-quality Angular codebases.',
      tags: ['Testing', 'Jasmine', 'Cypress'],
      category: 'Testing',
      date: 'Sep 18, 2023',
      readTime: '11 min read',
      featured: true,
    },
  ];

  floatingText = [
    { x: 10, y: 15, delay: 0, content: 'async/await' },
    { x: 85, y: 20, delay: 2, content: 'Component()' },
    { x: 15, y: 75, delay: 4, content: 'Observable' },
    { x: 75, y: 70, delay: 1, content: 'NgModule' },
    { x: 45, y: 25, delay: 3, content: 'TypeScript' },
    { x: 55, y: 65, delay: 5, content: 'Directive' },
  ];

  currentCardIndex = 0;
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  email = '';

  ngOnInit() {
    this.startAutoScroll();
  }

  startAutoScroll() {
    // Auto-scroll blog cards on mobile (optional feature)
    if (window.innerWidth < 1024) {
      setInterval(() => {
        this.currentCardIndex = (this.currentCardIndex + 1) % this.blogPosts.length;
        this.scrollToCard(this.currentCardIndex);
      }, 5000);
    }
  }

  readMore(postId: number) {
    console.log('Reading post:', postId);
    // In a real app, you would navigate to the blog post detail page
    // this.router.navigate(['/blog', postId]);

    // Show visual feedback
    const button = event?.target as HTMLElement;
    if (button) {
      button.classList.add('text-cyan-300');
      setTimeout(() => {
        button.classList.remove('text-cyan-300');
      }, 1000);
    }
  }

  scrollToCard(index: number) {
    this.currentCardIndex = index;
    const container = document.querySelector('[blogContainer]');
    if (container) {
      const card = container.children[index] as HTMLElement;
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }

  subscribeNewsletter() {
    if (this.email && this.validateEmail(this.email)) {
      console.log('Subscribing email:', this.email);
      // In a real app, you would send this to your backend

      // Show success feedback
      const button = document.querySelector('button[type="submit"]') as HTMLElement;
      const originalText = button.textContent;
      button.textContent = 'Subscribed!';
      button.classList.add('bg-green-600', 'hover:bg-green-500');
      button.classList.remove(
        'from-blue-600',
        'to-cyan-500',
        'hover:from-blue-500',
        'hover:to-cyan-400'
      );

      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-600', 'hover:bg-green-500');
        button.classList.add(
          'from-blue-600',
          'to-cyan-500',
          'hover:from-blue-500',
          'hover:to-cyan-400'
        );
        this.email = '';
      }, 3000);
    } else {
      // Show error feedback
      const input = document.querySelector('input[type="email"]') as HTMLInputElement;
      input.classList.add('border-red-500/50', 'ring-2', 'ring-red-500/20');
      setTimeout(() => {
        input.classList.remove('border-red-500/50', 'ring-2', 'ring-red-500/20');
      }, 2000);
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Reset auto-scroll on resize
    this.currentCardIndex = 0;
  }

  // Optional: Drag functionality for mobile scrolling
  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    const container = document.querySelector('[blogContainer]') as HTMLElement;
    if (container) {
      this.startX =
        ('touches' in event ? event.touches[0].pageX : event.pageX) - container.offsetLeft;
      this.scrollLeft = container.scrollLeft;
    }
  }

  doDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const container = document.querySelector('[blogContainer]') as HTMLElement;
    if (container) {
      const x = ('touches' in event ? event.touches[0].pageX : event.pageX) - container.offsetLeft;
      const walk = (x - this.startX) * 2;
      container.scrollLeft = this.scrollLeft - walk;
    }
  }

  endDrag() {
    this.isDragging = false;
  }
}
