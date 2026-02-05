// footer.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="relative bg-gradient-to-b from-blue-950 to-black border-t border-blue-800/30">
      <!-- Animated background pattern -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute inset-0"
          style="background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.2) 1px, transparent 0);
                    background-size: 30px 30px;"
        ></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <!-- Brand & Description -->
          <div class="space-y-4" [@fadeInUp]>
            <div class="flex items-center space-x-2">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center"
              >
                <i class="fas fa-code text-white text-lg"></i>
              </div>
              <span
                class="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
              >
                GeremiWanga
              </span>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">
              Crafting exceptional digital experiences with modern technologies. Let's build
              something amazing together.
            </p>
            <div class="flex space-x-3">
              <a
                *ngFor="let social of socialLinks"
                [href]="social.link"
                target="_blank"
                class="w-8 h-8 rounded-lg bg-blue-900/50 border border-blue-700/30 flex items-center justify-center text-blue-300 hover:text-white hover:bg-blue-800/50 hover:border-blue-500/50 hover:scale-110 transition-all duration-300"
              >
                <i [class]="social.icon" class="text-sm"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div [@fadeInUp]="{ value: '', params: { delay: '0.1s' } }">
            <h3 class="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul class="space-y-3">
              <li *ngFor="let link of quickLinks">
                <a
                  [routerLink]="link.route"
                  class="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <i
                    class="fas fa-chevron-right text-blue-500/50 text-xs group-hover:translate-x-1 transition-transform duration-300"
                  ></i>
                  <span class="text-sm">{{ link.label }}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div [@fadeInUp]="{ value: '', params: { delay: '0.2s' } }">
            <h3 class="text-lg font-bold text-white mb-4">Services</h3>
            <ul class="space-y-3">
              <li *ngFor="let service of services">
                <a
                  [href]="service.link"
                  class="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <i
                    class="fas fa-arrow-right text-blue-500/50 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300"
                  ></i>
                  <span class="text-sm">{{ service.name }}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div [@fadeInUp]="{ value: '', params: { delay: '0.3s' } }">
            <h3 class="text-lg font-bold text-white mb-4">Get In Touch</h3>
            <ul class="space-y-4">
              <li class="flex items-start space-x-3">
                <i class="fas fa-envelope text-blue-400 mt-1"></i>
                <span class="text-gray-400 text-sm">hello@johndeveloper.com</span>
              </li>
              <li class="flex items-start space-x-3">
                <i class="fas fa-phone text-blue-400 mt-1"></i>
                <span class="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li class="flex items-start space-x-3">
                <i class="fas fa-map-marker-alt text-blue-400 mt-1"></i>
                <span class="text-gray-400 text-sm">San Francisco, CA</span>
              </li>
            </ul>

            <!-- Newsletter -->
            <div class="mt-6">
              <h4 class="text-sm font-semibold text-blue-300 mb-2">Stay Updated</h4>
              <div class="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  class="flex-1 px-4 py-2 bg-blue-900/30 border border-blue-700/30 rounded-l-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                />
                <button
                  class="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-r-lg text-white hover:from-blue-500 hover:to-cyan-400 transition-all duration-300"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="mt-8 md:mt-12 pt-8 border-t border-blue-800/30">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <!-- Copyright -->
            <div class="text-center md:text-left">
              <p class="text-gray-500 text-sm">
                © {{ currentYear }} GeremiWanga. All rights reserved.
              </p>
            </div>

            <!-- Legal Links -->
            <div class="flex flex-wrap justify-center gap-4 md:gap-6">
              <a
                *ngFor="let legal of legalLinks"
                [href]="legal.link"
                class="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-300"
              >
                {{ legal.label }}
              </a>
            </div>

            <!-- Back to Top -->
            <button
              (click)="scrollToTop()"
              class="flex items-center space-x-2 text-blue-300 hover:text-blue-400 transition-colors duration-300 group"
            >
              <span class="text-sm">Back to Top</span>
              <i
                class="fas fa-arrow-up group-hover:-translate-y-1 transition-transform duration-300"
              ></i>
            </button>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 text-xs">
            Made with <i class="fas fa-heart text-blue-500 mx-1"></i> using Angular & Tailwind CSS
          By yours truly
        </p>
      </div>

      <!-- Floating elements -->
      <div class="absolute bottom-4 right-4 opacity-10">
        <i class="fas fa-code text-6xl text-blue-400 animate-pulse"></i>
      </div>
      <div class="absolute top-4 left-4 opacity-10">
        <i class="fas fa-cog text-4xl text-cyan-400 animate-spin-slow"></i>
      </div>`,
  styles: [
    `
      :host {
        display: block;
      }
      @keyframes spin-slow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .animate-spin-slow {
        animation: spin-slow 20s linear infinite;
      }
    `,
  ],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { name: 'GitHub', link: 'https://github.com/johndeveloper', icon: 'fab fa-github' },
    { name: 'LinkedIn', link: 'https://linkedin.com/in/johndeveloper', icon: 'fab fa-linkedin-in' },
    { name: 'Twitter', link: 'https://twitter.com/johndeveloper', icon: 'fab fa-twitter' },
    { name: 'Dribbble', link: 'https://dribbble.com/johndeveloper', icon: 'fab fa-dribbble' },
  ];

  quickLinks = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Projects', route: '/projects' },
    { label: 'Services', route: '/services' },
    { label: 'Contact', route: '/contact' },
    { label: 'Blog', route: '/blog' },
  ];

  services = [
    { name: 'Web Development', link: '#services' },
    { name: 'UI/UX Design', link: '#services' },
    { name: 'Mobile Apps', link: '#services' },
    { name: 'E-Commerce', link: '#services' },
    { name: 'API Development', link: '#services' },
    { name: 'Consulting', link: '#services' },
  ];

  legalLinks = [
    { label: 'Privacy Policy', link: '/privacy' },
    { label: 'Terms of Service', link: '/terms' },
    { label: 'Cookie Policy', link: '/cookies' },
    { label: 'Disclaimer', link: '/disclaimer' },
  ];

  ngOnInit() {
    // Initialization if needed
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Button feedback
    const button = event?.target as HTMLElement;
    const parentButton = button.closest('button');
    if (parentButton) {
      parentButton.classList.add('text-blue-400');
      setTimeout(() => {
        parentButton.classList.remove('text-blue-400');
      }, 1000);
    }
  }
}
