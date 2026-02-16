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

      <div class="relative z-10 container mx-auto px-4 py-6 md:py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <!-- Brand & Description -->
          <div class="space-y-3" [@fadeInUp]>
            <div class="flex items-center space-x-2">
              <div
                class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center"
              >
                <i class="fas fa-code text-white text-sm"></i>
              </div>
              <span
                class="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
              >
                GeremiWanga
              </span>
            </div>
            <p class="text-gray-400 text-xs leading-relaxed">
              Crafting exceptional digital experiences with modern technologies.
            </p>
            <div class="flex space-x-2">
              <a
                *ngFor="let social of socialLinks"
                [href]="social.link"
                target="_blank"
                class="w-7 h-7 rounded-lg bg-blue-900/50 border border-blue-700/30 flex items-center justify-center text-blue-300 hover:text-white hover:bg-blue-800/50 hover:border-blue-500/50 hover:scale-110 transition-all duration-300"
              >
                <i [class]="social.icon" class="text-xs"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div [@fadeInUp]="{ value: '', params: { delay: '0.1s' } }">
            <h3 class="text-md font-bold text-white mb-3">Quick Links</h3>
            <ul class="space-y-2">
              <li *ngFor="let link of quickLinks">
                <a
                  [routerLink]="link.route"
                  fragment="{{ link.fragment }}"
                  class="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group text-sm"
                >
                  <i
                    class="fas fa-chevron-right text-blue-500/50 text-xs group-hover:translate-x-1 transition-transform duration-300"
                  ></i>
                  <span>{{ link.label }}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div [@fadeInUp]="{ value: '', params: { delay: '0.2s' } }">
            <h3 class="text-md font-bold text-white mb-3">Get In Touch</h3>
            <ul class="space-y-2">
              <li class="flex items-start space-x-2">
                <i class="fas fa-envelope text-blue-400 text-xs mt-1"></i>
                <a href="mailto:wangageremi725@gmail.com" class="text-gray-400 hover:text-blue-400 text-xs transition-colors duration-300">
                  wangageremi725@gmail.com
                </a>
              </li>
              <li class="flex items-start space-x-2">
                <i class="fas fa-phone text-blue-400 text-xs mt-1"></i>
                <a href="tel:+254742545572" class="text-gray-400 hover:text-blue-400 text-xs transition-colors duration-300">
                  +254 742545572
                </a>
              </li>
              <li class="flex items-start space-x-2">
                <i class="fas fa-map-marker-alt text-blue-400 text-xs mt-1"></i>
                <span class="text-gray-400 text-xs">Kisumu, Kenya</span>
              </li>
            </ul>
            
            <!-- Availability Badge -->
            <div class="mt-3 flex items-center space-x-2">
              <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span class="text-green-400 text-xs font-medium">Available for work</span>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="mt-6 pt-4 border-t border-blue-800/30">
          <div class="flex flex-col md:flex-row justify-between items-center gap-3">
            <!-- Copyright -->
            <div class="text-center md:text-left">
              <p class="text-gray-500 text-xs">
                © {{ currentYear }} GeremiWanga. All rights reserved.
              </p>
            </div>

            <!-- Legal Links -->
            <div class="flex flex-wrap justify-center gap-3 md:gap-4">
              <a
                *ngFor="let legal of legalLinks"
                [routerLink]="legal.route"
                class="text-gray-500 hover:text-blue-400 text-xs transition-colors duration-300"
              >
                {{ legal.label }}
              </a>
            </div>

            <!-- Back to Top -->
            <button
              (click)="scrollToTop()"
              class="flex items-center space-x-1.5 text-blue-300 hover:text-blue-400 transition-colors duration-300 group"
            >
              <span class="text-xs">Back to Top</span>
              <i
                class="fas fa-arrow-up text-xs group-hover:-translate-y-1 transition-transform duration-300"
              ></i>
            </button>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="mt-3 text-center">
          <p class="text-gray-600 text-[10px]">
            Made with <i class="fas fa-heart text-blue-500 mx-0.5"></i> using Angular & Tailwind CSS
            By yours truly
          </p>
        </div>
      </div>

      <!-- Floating elements -->
      <div class="absolute bottom-2 right-2 opacity-5">
        <i class="fas fa-code text-4xl text-blue-400 animate-pulse"></i>
      </div>
      <div class="absolute top-2 left-2 opacity-5">
        <i class="fas fa-cog text-3xl text-cyan-400 animate-spin-slow"></i>
      </div>
    </footer>
  `,
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
    { name: 'GitHub', link: 'https://github.com/Geremi57', icon: 'fab fa-github' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/geremi-wanga-g2018wtk/', icon: 'fab fa-linkedin-in' },
    { name: 'Twitter', link: 'https://x.com/GrizzyK89124', icon: 'fab fa-twitter' },
  ];

  quickLinks = [
    { label: 'Home', route: '/', fragment: '' },
    { label: 'About', route: '/', fragment: 'about' },
    { label: 'Projects', route: '/', fragment: 'projects' },
    { label: 'Services', route: '/', fragment: 'services' },
    { label: 'Contact', route: '/', fragment: 'contact' },
    { label: 'Blog', route: '/blog', fragment: '' }
  ];

  legalLinks = [
    { label: 'Privacy Policy', route: '/privacy' },
    { label: 'Terms of Service', route: '/terms' },
    { label: 'Cookie Policy', route: '/cookies' },
    { label: 'Disclaimer', route: '/disclaimer' },
  ];

  ngOnInit() {
    // Add smooth scroll behavior for anchor links
    if (typeof window !== 'undefined') {
      this.setupAnchorScrolling();
    }
  }

  setupAnchorScrolling() {
    // Handle initial load with hash in URL
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
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
      }, 500);
    }
  }
}