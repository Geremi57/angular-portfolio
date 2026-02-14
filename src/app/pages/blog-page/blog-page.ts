import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  fullContent?: string;
  tags: string[];
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  imageUrl?: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
  };
  comments?: Comment[];
  likes?: number;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-gray-900 via-black to-blue-950">
      <!-- Hero Section -->
      <section class="relative pt-32 pb-20 overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute inset-0">
          <div class="absolute inset-0 opacity-10"
               style="background-image: 
                      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                      linear-gradient(0deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
                      background-size: 40px 40px;">
          </div>
          
          <!-- Floating code snippets -->
          <div *ngFor="let text of floatingText"
               [style.left]="text.x + '%'"
               [style.top]="text.y + '%'"
               [style.animationDelay]="text.delay + 's'"
               class="absolute text-blue-400/10 font-mono text-sm opacity-20 animate-float pointer-events-none">
            {{ text.content }}
          </div>
        </div>

        <div class="relative z-10 container mx-auto px-4">
          <!-- Header -->
          <div class="text-center max-w-4xl mx-auto" [@fadeInUp]>
            <div class="inline-flex items-center justify-center space-x-2 mb-4">
              <div class="w-12 h-px bg-gradient-to-r from-blue-400 to-cyan-400"></div>
              <span class="text-blue-400 font-medium tracking-wider text-sm md:text-base">INSIGHTS & ARTICLES</span>
              <div class="w-12 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
            </div>

            <h1 class="text-4xl md:text-6xl font-bold mb-6 text-white">
              Latest
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Blog Posts
              </span>
            </h1>

            <p class="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Deep dives into web development, software architecture, and the latest tech trends
            </p>

            <!-- Search Bar -->
            <div class="max-w-2xl mx-auto">
              <div class="relative group">
                <input
                  type="text"
                  placeholder="Search articles..."
                  (input)="onSearch($event)"
                  class="w-full px-6 py-4 bg-gray-900/60 border border-blue-800/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 pl-14 pr-12"
                />
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                  {{ filteredPosts.length }} articles
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Filter -->
      <section class="py-6 border-t border-b border-blue-800/20 sticky top-16 bg-gray-900/80 backdrop-blur-md z-40">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <button
              *ngFor="let category of ['all', ...categories]"
              (click)="filterByCategory(category)"
              [class]="selectedCategory === category ? 
                       'px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white font-medium shadow-lg shadow-blue-500/25' : 
                       'px-4 py-2 bg-gray-900/40 border border-blue-800/30 rounded-lg text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-300'"
              [@scaleIn]="'enter'"
            >
              {{ category === 'all' ? 'All Posts' : category }}
            </button>
          </div>
        </div>
      </section>

      <!-- Featured Post -->
      <section *ngIf="featuredPost && selectedCategory === 'all'" class="py-12" [@fadeInUp]>
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="relative group cursor-pointer" (click)="openPost(featuredPost)">
              <!-- Glow effect -->
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              
              <!-- Featured Card -->
              <div class="relative bg-gradient-to-br from-gray-900 to-blue-950 border-2 border-blue-500/30 rounded-2xl overflow-hidden">
                <div class="grid lg:grid-cols-2">
                  <!-- Featured Image -->
                  <div class="relative h-64 lg:h-auto overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-900 to-cyan-900">
                      <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-32 h-32 rounded-full border-4 border-blue-500/30 bg-blue-800/40 flex items-center justify-center">
                          <svg class="w-16 h-16 text-blue-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Featured Badge -->
                    <div class="absolute top-4 left-4">
                      <span class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-sm font-bold text-white shadow-lg">
                        ⭐ Featured Post
                      </span>
                    </div>

                    <!-- Reading Time -->
                    <div class="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span class="text-sm text-white">{{ featuredPost.readTime }}</span>
                    </div>
                  </div>

                  <!-- Featured Content -->
                  <div class="p-8 lg:p-10">
                    <div class="flex items-center gap-3 mb-4">
                      <span class="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
                        {{ featuredPost.category }}
                      </span>
                      <span class="text-gray-400 text-sm">{{ featuredPost.date }}</span>
                    </div>

                    <h2 class="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                      {{ featuredPost.title }}
                    </h2>

                    <p class="text-gray-300 mb-6 text-lg leading-relaxed">
                      {{ featuredPost.summary }}
                    </p>

                    <div class="flex flex-wrap gap-2 mb-6">
                      <span *ngFor="let tag of featuredPost.tags"
                            class="px-3 py-1 bg-blue-900/40 border border-blue-700/20 rounded-lg text-sm text-blue-300">
                        #{{ tag }}
                      </span>
                    </div>

                    <div class="flex items-center justify-between pt-6 border-t border-blue-800/30">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                          <span class="text-lg font-bold text-white">{{ featuredPost.author.avatar }}</span>
                        </div>
                        <div>
                          <p class="text-white font-medium">{{ featuredPost.author.name }}</p>
                          <p class="text-sm text-gray-400">{{ featuredPost.author.role }}</p>
                        </div>
                      </div>

                      <button class="flex items-center gap-2 text-blue-400 hover:text-cyan-300 transition-colors group/btn">
                        <span class="font-medium">Read Full Article</span>
                        <svg class="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Blog Posts Grid -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <!-- Grid Header -->
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-bold text-white">
              {{ selectedCategory === 'all' ? 'Latest Articles' : selectedCategory }}
            </h2>
            <div class="flex items-center gap-2">
              <span class="text-gray-400">{{ filteredPosts.length }} articles</span>
              <select (change)="sortPosts($event)" 
                      class="bg-gray-900/60 border border-blue-800/30 rounded-lg px-3 py-1 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50">
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          <!-- Posts Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div *ngFor="let post of paginatedPosts; let i = index"
                 [@staggerItem]="'enter'"
                 [style.animation-delay]="i * 100 + 'ms'"
                 class="group cursor-pointer"
                 (click)="openPost(post)">
              
              <!-- Blog Card -->
              <article class="h-full bg-gradient-to-br from-gray-900/80 to-blue-950/80 backdrop-blur-sm border border-blue-800/30 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-blue-500/10">
                
                <!-- Card Header -->
                <div class="relative h-48 overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-900">
                  <div class="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                    <div class="w-20 h-20 rounded-full border-4 border-blue-500/30 bg-blue-800/40 flex items-center justify-center">
                      <svg class="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>

                  <!-- Category Badge -->
                  <div class="absolute top-3 left-3">
                    <span class="px-2 py-1 bg-blue-900/80 backdrop-blur-sm border border-blue-700/30 rounded-full text-xs font-medium text-blue-300">
                      {{ post.category }}
                    </span>
                  </div>
                </div>

                <!-- Card Content -->
                <div class="p-5">
                  <!-- Meta Info -->
                  <div class="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span>{{ post.date }}</span>
                    <span>{{ post.readTime }}</span>
                  </div>

                  <!-- Title -->
                  <h3 class="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {{ post.title }}
                  </h3>

                  <!-- Summary -->
                  <p class="text-gray-400 text-sm mb-3 line-clamp-2">
                    {{ post.summary }}
                  </p>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-1 mb-4">
                    <span *ngFor="let tag of post.tags.slice(0, 2)"
                          class="px-2 py-0.5 bg-blue-900/40 border border-blue-700/20 rounded text-xs text-blue-300">
                      #{{ tag }}
                    </span>
                    <span *ngIf="post.tags.length > 2"
                          class="px-2 py-0.5 bg-blue-900/40 border border-blue-700/20 rounded text-xs text-blue-300">
                      +{{ post.tags.length - 2 }}
                    </span>
                  </div>

                  <!-- Author & Read More -->
                  <div class="flex items-center justify-between pt-3 border-t border-blue-800/20">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                        <span class="text-xs font-bold text-white">{{ post.author.avatar }}</span>
                      </div>
                      <span class="text-xs text-gray-400">{{ post.author.name }}</span>
                    </div>
                    
                    <span class="text-blue-400 hover:text-cyan-300 transition-colors text-sm font-medium flex items-center gap-1">
                      Read
                      <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <!-- Load More Button -->
          <div *ngIf="hasMorePosts" class="text-center mt-12">
            <button (click)="loadMore()"
                    class="px-8 py-4 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-20">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto">
            <div class="bg-gradient-to-r from-blue-900/30 via-black/50 to-cyan-900/30 border border-blue-800/30 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
              <div class="text-center mb-8">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">Never Miss an Article</h3>
                <p class="text-gray-400">Get the latest posts delivered straight to your inbox</p>
              </div>

              <form (ngSubmit)="subscribeNewsletter()" class="space-y-4">
                <div class="flex flex-col md:flex-row gap-3">
                  <input type="email"
                         [(ngModel)]="email"
                         name="email"
                         placeholder="Enter your email"
                         class="flex-1 px-6 py-3 bg-gray-900/60 border border-blue-800/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300">
                  <button type="submit"
                          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300">
                    Subscribe
                  </button>
                </div>
                <p class="text-xs text-gray-500 text-center">No spam. Unsubscribe anytime.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Blog Post Modal -->
    <div *ngIf="selectedPost" 
         class="fixed inset-0 z-50 overflow-y-auto"
         [@modalAnimation]="'enter'">
      
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/80 backdrop-blur-sm"
           (click)="closeModal()"></div>
      
      <!-- Modal Content -->
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div class="relative bg-gradient-to-b from-gray-900 to-blue-950 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-500/30 shadow-2xl">
          
          <!-- Modal Header -->
          <div class="sticky top-0 bg-gray-900/80 backdrop-blur-md border-b border-blue-800/30 p-6 flex justify-between items-center z-10">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <span class="text-white font-bold">{{ selectedPost.author.avatar }}</span>
              </div>
              <div>
                <h4 class="text-white font-medium">{{ selectedPost.author.name }}</h4>
                <p class="text-sm text-gray-400">{{ selectedPost.author.role }}</p>
              </div>
            </div>
            <button (click)="closeModal()"
                    class="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 md:p-8">
            <!-- Post Meta -->
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
                {{ selectedPost.category }}
              </span>
              <span class="text-gray-400 text-sm">{{ selectedPost.date }}</span>
              <span class="text-cyan-400 text-sm">{{ selectedPost.readTime }}</span>
            </div>

            <!-- Title -->
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
              {{ selectedPost.title }}
            </h2>

            <!-- Featured Image Placeholder -->
            <div class="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-900">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-32 h-32 rounded-full border-4 border-blue-500/30 bg-blue-800/40 flex items-center justify-center animate-pulse">
                  <svg class="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Full Content -->
            <div class="prose prose-invert max-w-none">
              <p class="text-gray-300 text-lg leading-relaxed mb-6">
                {{ selectedPost.summary }}
              </p>
              
              <div class="space-y-4 text-gray-300">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h3 class="text-2xl font-bold text-white mt-8 mb-4">Key Takeaways</h3>
                <ul class="list-disc pl-6 space-y-2">
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                  <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
                  <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco</li>
                </ul>
                <div class="bg-blue-900/30 border-l-4 border-blue-500 p-4 my-6 rounded">
                  <p class="text-blue-300 italic">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  </p>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-8 pt-6 border-t border-blue-800/30">
              <span *ngFor="let tag of selectedPost.tags"
                    class="px-3 py-1 bg-blue-900/40 border border-blue-700/20 rounded-lg text-sm text-blue-300">
                #{{ tag }}
              </span>
            </div>

            <!-- Engagement Section -->
            <div class="flex items-center justify-between mt-8 pt-6 border-t border-blue-800/30">
              <div class="flex items-center gap-6">
                <button class="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <span>{{ selectedPost.likes || 124 }} likes</span>
                </button>
                <button class="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  <span>24 comments</span>
                </button>
              </div>
              <button class="text-blue-400 hover:text-cyan-300 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      33% { transform: translateY(-15px) rotate(1deg); }
      66% { transform: translateY(8px) rotate(-1deg); }
    }
    .animate-float {
      animation: float 25s ease-in-out infinite;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .prose {
      max-width: 65ch;
      color: #9ca3af;
    }
    .prose h3 {
      color: white;
      font-weight: 600;
    }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerItem', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
        animate('0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BlogPageComponent implements OnInit {
  blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Mastering Angular 16: New Features and Best Practices',
      summary: 'Explore the latest features in Angular 16 including signals, improved hydration, and new control flow syntax. Learn how to implement them in your projects for better performance.',
      content: 'Full content here...',
      tags: ['Angular', 'TypeScript', 'Frontend', 'Web Dev'],
      category: 'Tutorial',
      date: 'Dec 15, 2023',
      readTime: '8 min read',
      featured: true,
      likes: 234,
      author: {
        name: 'Geremi Wanga',
        avatar: 'GW',
        role: 'Senior Angular Developer',
        bio: 'Passionate about Angular and modern web technologies'
      }
    },
    {
      id: 2,
      title: 'Building Scalable Applications with Micro Frontends',
      summary: 'A comprehensive guide to implementing micro frontend architecture using Angular and modern web technologies. Learn how to split large applications into manageable pieces.',
      content: 'Full content here...',
      tags: ['Architecture', 'Micro Frontends', 'Scalability', 'Angular'],
      category: 'Architecture',
      date: 'Nov 28, 2023',
      readTime: '12 min read',
      featured: true,
      likes: 189,
      author: {
        name: 'Geremi Wanga',
        avatar: 'GW',
        role: 'Senior Angular Developer'
      }
    },
    {
      id: 3,
      title: 'Optimizing Angular Performance with Lazy Loading',
      summary: 'Learn advanced techniques for lazy loading modules, components, and assets to improve your Angular application performance. Real-world examples and benchmarks included.',
      tags: ['Performance', 'Optimization', 'Angular', 'Web Dev'],
      content: 'Full content here...',
      category: 'Performance',
      date: 'Nov 10, 2023',
      readTime: '6 min read',
      featured: false,
      likes: 156,
      author: {
        name: 'Geremi Wanga',
        avatar: 'GW',
        role: 'Senior Angular Developer'
      }
    },
    {
      id: 4,
      title: 'Understanding RxJS: Operators and Patterns',
      summary: 'Deep dive into RxJS operators and reactive patterns. Learn how to handle complex async operations with ease.',
      tags: ['RxJS', 'Reactive', 'TypeScript'],
      content: 'Full content here...',
      category: 'Tutorial',
      date: 'Oct 25, 2023',
      readTime: '10 min read',
      featured: false,
      likes: 145,
      author: {
        name: 'Geremi Wanga',
        avatar: 'GW',
        role: 'Senior Angular Developer'
      }
    },
    {
      id: 5,
      title: 'State Management in Modern Angular Apps',
      summary: 'Compare different state management solutions for Angular: NgRx, Akita, and simple services. Choose the right one for your project.',
      tags: ['State Management', 'NgRx', 'Architecture'],
      content: 'Full content here...',
      category: 'Architecture',
      date: 'Oct 12, 2023',
      readTime: '9 min read',
      featured: false,
      likes: 178,
      author: {
        name: 'Geremi Wanga',
        avatar: 'GW',
        role: 'Senior Angular Developer'
      }
    },
    {
      id: 6,
      title: 'CSS Grid vs Flexbox: When to Use What',
      summary: 'A practical guide to choosing between CSS Grid and Flexbox for your layouts. Real examples and use cases.',
      tags: ['CSS', 'Frontend', 'Design'],
      content: 'Full content here...',
      category: 'Design',
      date: 'Sep 30, 2023',
      readTime: '7 min read',
      featured: false,
      likes: 134,
      author: {
        name: 'Geremi Wanga',
        avatar: 'GW',
        role: 'Senior Angular Developer'
      }
    },
    {
      id: 7,
      title: 'Testing Angular Applications: Best Practices',
      summary: 'Learn how to write effective tests for Angular components, services, and pipes. Unit tests, integration tests, and e2e testing covered.',
      tags: ['Testing', 'Angular', 'Best Practices'],
      content: 'Full content here...',
      category: 'Tutorial',
      date: 'Sep 15, 2023',
      readTime: '11 min read',
      featured: false,
      likes: 167,
      author: {
        name: 'Geremi Wanga',
        avatar: 'GW',
        role: 'Senior Angular Developer'
      }
    },
    {
      id: 8,
      title: 'WebAssembly: The Future of Web Development',
      summary: 'Explore WebAssembly and how it can be used with Angular to run high-performance code in the browser.',
      tags: ['WebAssembly', 'Performance', 'Future Tech'],
      content: 'Full content here...',
      category: 'Technology',
      date: 'Sep 5, 2023',
      readTime: '8 min read',
      featured: true,
      likes: 212,
      author: {
        name: 'Geremi Wanga',
        avatar: 'GW',
        role: 'Senior Angular Developer'
      }
    }
  ];

  floatingText = [
    { x: 5, y: 10, delay: 0, content: 'async/await' },
    { x: 90, y: 15, delay: 2, content: '@Component()' },
    { x: 10, y: 85, delay: 4, content: 'Observable' },
    { x: 85, y: 80, delay: 1, content: 'NgModule' },
    { x: 45, y: 20, delay: 3, content: 'TypeScript' },
    { x: 60, y: 70, delay: 5, content: 'Directive' },
    { x: 75, y: 30, delay: 2.5, content: 'RxJS' },
    { x: 25, y: 45, delay: 4.5, content: 'Signal' }
  ];

  categories: string[] = [];
  selectedCategory: string = 'all';
  filteredPosts: BlogPost[] = [];
  paginatedPosts: BlogPost[] = [];
  featuredPost: BlogPost | undefined;
  selectedPost: BlogPost | null = null;
  email: string = '';
  postsPerPage = 6;
  currentPage = 1;
  sortBy: string = 'latest';

  get hasMorePosts(): boolean {
    return this.paginatedPosts.length < this.filteredPosts.length;
  }

  ngOnInit() {
    this.categories = [...new Set(this.blogPosts.map(post => post.category))];
    this.featuredPost = this.blogPosts.find(post => post.featured);
    this.filterPosts();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.filterPosts();
  }

  filterPosts() {
    let posts = this.selectedCategory === 'all' 
      ? this.blogPosts.filter(post => !post.featured)
      : this.blogPosts.filter(post => post.category === this.selectedCategory && !post.featured);
    
    this.filteredPosts = this.sortPostsArray(posts);
    this.updatePaginatedPosts();
  }

  sortPosts(event: any) {
    this.sortBy = event.target.value;
    this.filteredPosts = this.sortPostsArray([...this.filteredPosts]);
    this.updatePaginatedPosts();
  }

  sortPostsArray(posts: BlogPost[]): BlogPost[] {
    switch(this.sortBy) {
      case 'oldest':
        return posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'popular':
        return posts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      default: // 'latest'
        return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  updatePaginatedPosts() {
    this.paginatedPosts = this.filteredPosts.slice(0, this.currentPage * this.postsPerPage);
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      this.filteredPosts = this.blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.summary.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.category.toLowerCase().includes(searchTerm)
      );
      this.updatePaginatedPosts();
    } else {
      this.filterPosts();
    }
  }

  openPost(post: BlogPost) {
    this.selectedPost = post;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedPost = null;
    document.body.style.overflow = 'auto';
  }

  loadMore() {
    this.currentPage++;
    this.updatePaginatedPosts();
  }

  subscribeNewsletter() {
    if (this.email && this.validateEmail(this.email)) {
      console.log('Subscribing email:', this.email);
      // Show success message
      alert('Thanks for subscribing!');
      this.email = '';
    } else {
      alert('Please enter a valid email address');
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}