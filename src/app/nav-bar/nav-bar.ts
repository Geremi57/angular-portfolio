// navbar.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Navigation Bar -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-blue-950 to-black border-b border-blue-800/30 backdrop-blur-md bg-opacity-90"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-2">
            <div
              class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center"
            >
              <span class="font-bold text-white text-xl">GW</span>
            </div>
            <span
              class="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
            >
              Geremi Wanga
            </span>
          </div>

          <!-- Desktop Navigation - Hidden on mobile -->
          <div class="hidden lg:flex items-center space-x-1">
            <ng-container *ngFor="let item of navItems">
              <!-- Regular Nav Items -->
              <div *ngIf="!item.dropdown" class="relative">
                <a
                  [routerLink]="item.route"
                  [fragment]="item.fragment"
                  routerLinkActive="text-blue-400 bg-blue-900/30"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="px-4 py-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 transition-all duration-300 flex items-center space-x-1 group"
                >
                  <span>{{ item.label }}</span>
                  <span
                    *ngIf="item.icon"
                    class="group-hover:rotate-12 transition-transform duration-300"
                    >→</span
                  >
                </a>
              </div>

              <!-- Dropdown Items -->
              <div
                *ngIf="item.dropdown"
                class="relative"
                (mouseenter)="openDropdown(item.id)"
                (mouseleave)="closeDropdown(item.id)"
              >
                <button
                  class="px-4 py-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 transition-all duration-300 flex items-center space-x-1 group"
                >
                  <span>{{ item.label }}</span>
                  <svg
                    [class]="activeDropdown === item.id ? 'rotate-180' : ''"
                    class="w-4 h-4 transition-transform duration-300"
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
                </button>

                <!-- Dropdown Menu -->
                <div
                  *ngIf="activeDropdown === item.id"
                  [@dropdownAnimation]
                  class="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-lg border border-blue-800/30 rounded-lg shadow-2xl shadow-blue-900/30 overflow-hidden"
                >
                  <div
                    *ngFor="let dropdownItem of item.dropdown"
                    class="border-b border-blue-800/10 last:border-b-0"
                  >
                    <a
                      [href]="dropdownItem.href"
                      class="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-blue-900/30 transition-all duration-200 flex items-center space-x-2 group/item"
                    >
                      <div
                        class="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                      ></div>
                      <span>{{ dropdownItem.label }}</span>
                      <svg
                        class="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover/item:translate-x-0"
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
                    </a>
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- CTA Button -->
            <a
  [routerLink]="['/']"
  fragment="contact"
  (mouseenter)="buttonHover = true"
  (mouseleave)="buttonHover = false"
  class="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 flex items-center space-x-2"
>

              <span>Contact</span>
              <svg
                [@arrowAnimation]="buttonHover"
                class="w-4 h-4"
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
</a>
          </div>

          <!-- Mobile Menu Button -->
          <button
            (click)="toggleMobileMenu()"
            class="lg:hidden p-2 rounded-lg hover:bg-blue-900/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label="Toggle menu"
          >
            <div class="relative w-6 h-6">
              <span
                [class]="isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'"
                class="absolute left-0 w-6 h-0.5 bg-blue-400 transition-all duration-300"
              ></span>
              <span
                [class]="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
                class="absolute top-1/2 -translate-y-1/2 left-0 w-6 h-0.5 bg-blue-400 transition-all duration-300"
              ></span>
              <span
                [class]="isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-1'"
                class="absolute left-0 w-6 h-0.5 bg-blue-400 transition-all duration-300"
              ></span>
            </div>
          </button>
        </div>

        <!-- Mobile Menu - Hidden by default -->
        <div
          *ngIf="isMobileMenuOpen"
          [@mobileMenuAnimation]
          class="lg:hidden z-50 border-t border-blue-800/30 mt-2 rounded-lg overflow-visible"
        >
          <div class="py-2">
            <ng-container *ngFor="let item of navItems">
              <!-- Regular Mobile Items -->
              <div *ngIf="!item.dropdown" class="border-b border-blue-800/10 last:border-b-0">
                <a
                  [routerLink]="item.route"
                  [fragment]="item.fragment"
                  (click)="closeMobileMenu()"
                  routerLinkActive="text-blue-400 bg-blue-900/30"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-blue-900/30 transition-all duration-200 flex items-center space-x-2 group"
                >
                  <span>{{ item.label }}</span>
                  <svg
                    class="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                </a>
              </div>

              <!-- Mobile Dropdown Items -->
              <div *ngIf="item.dropdown" class="border-b border-blue-800/10 last:border-b-0">
                <button
                  (click)="toggleMobileDropdown(item.id)"
                  class="w-full px-4 py-3 text-left text-gray-300 hover:text-blue-400 hover:bg-blue-900/30 transition-all duration-200 flex items-center justify-between"
                >
                  <span>{{ item.label }}</span>
                  <svg
                    [class]="activeMobileDropdown === item.id ? 'rotate-180' : ''"
                    class="w-4 h-4 transition-transform duration-300"
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
                </button>

                <!-- Mobile Dropdown Content -->
                <div
                  *ngIf="activeMobileDropdown === item.id"
                  class="bg-gray-800/50 border-t border-blue-800/10"
                >
                  <div
                    *ngFor="let dropdownItem of item.dropdown"
                    class="border-b border-blue-800/5 last:border-b-0"
                  >
                    <a
                      [href]="dropdownItem.href"
                      (click)="closeMobileMenu()"
                      class="block pl-8 pr-4 py-3 text-gray-400 hover:text-blue-400 hover:bg-blue-900/30 transition-all duration-200 text-sm flex items-center space-x-2 group"
                    >
                      <div
                        class="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>
                      <span>{{ dropdownItem.label }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- Mobile CTA Button -->
            <div class="px-4 py-3 border-t border-blue-800/10">
              <a
  [routerLink]="['/']"
  fragment="contact"
  (click)="closeMobileMenu()"
  class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold flex items-center justify-center space-x-2"
>

                <span>Get In Touch</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Background blur for mobile menu -->
      
    </nav>

    <!-- Spacer for fixed navbar -->
    <div class="h-16 lg:h-20"></div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.5);
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(59, 130, 246, 0.5);
        border-radius: 2px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(59, 130, 246, 0.8);
      }
    `,
  ],
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' }),
        animate(
          '200ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' })
        ),
      ]),
    ]),
    trigger('mobileMenuAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0, transform: 'translateY(-20px)' }),
        animate(
          '300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, height: '*', transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '250ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 0, height: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
    trigger('arrowAnimation', [
      transition('false => true', [
        animate(
          '300ms ease-out',
          keyframes([
            style({ transform: 'translateX(0)', offset: 0 }),
            style({ transform: 'translateX(4px)', offset: 0.7 }),
            style({ transform: 'translateX(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  activeDropdown: string | null = null;
  activeMobileDropdown: string | null = null;
  buttonHover = false;

  navItems = [
  {
    id: 'home',
    label: 'Home',
    route: '/',
    icon: true,
    fragment: 'home',
  },
  {
    id: 'projects',
    label: 'Projects',
    route: '/',
    icon: true,
    fragment: 'projects',
  },
  {
    id: 'services',
    label: 'Services',
    fragment: 'services',
    dropdown: [
      { label: 'Web Development', href: '#web-dev' },
      { label: 'UI/UX Design', href: '#ui-ux' },
      { label: 'Consulting', href: '#consulting' },
      { label: 'Training', href: '#training' },
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    fragment: 'portfolio',
    dropdown: [
      { label: 'Recent Work', href: '#recent' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Client Projects', href: '#client' },
      { label: 'Personal Projects', href: '#personal' },
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
    route: '/blog',        // Change this from '/' to '/blog'
    icon: true,
    fragment: '',           // Remove the fragment since it's a separate page
  },
  {
    id: 'about',
    label: 'About',
    route: '/',
    icon: true,
    fragment: 'about',
  },
];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Close mobile menu when resizing to desktop
    if (window.innerWidth >= 1024) {
      this.closeMobileMenu();
      this.activeMobileDropdown = null;
    }
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(event: MouseEvent) {
    // Close dropdown if clicking outside
    const target = event.target as HTMLElement;
    if (window.innerWidth >= 1024 && !target.closest('.relative') && this.activeDropdown) {
      this.closeDropdown();
    }
  }

  ngOnInit() {
    // Add any initialization logic here
  }

  openDropdown(id: string) {
    this.activeDropdown = id;
  }

  closeDropdown(id?: string) {
    setTimeout(() => {
      if (id === this.activeDropdown) {
        this.activeDropdown = null;
      }
    }, 150);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.activeMobileDropdown = null;
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.activeMobileDropdown = null;
  }

  toggleMobileDropdown(id: string) {
    this.activeMobileDropdown = this.activeMobileDropdown === id ? null : id;
  }
}
