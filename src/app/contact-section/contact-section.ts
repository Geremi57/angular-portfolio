// contact-section.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild,
} from '@angular/animations';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section
      id="contact"
      class="relative py-20 md:py-32 bg-gradient-to-b from-blue-950 via-black to-gray-900 overflow-hidden"
    >
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <!-- Connection lines pattern -->
        <div
          class="absolute inset-0 opacity-5"
          style="background-image: 
                    radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.1) 0px, transparent 50%);
                    background-size: 100px 100px;"
        ></div>

        <!-- Floating connection dots -->
        <div
          *ngFor="let dot of floatingDots"
          [style.left]="dot.x + '%'"
          [style.top]="dot.y + '%'"
          [style.animationDelay]="dot.delay + 's'"
          class="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse pointer-events-none"
        ></div>

        <!-- Animated connection lines -->
        <svg class="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
          <path
            *ngFor="let line of connectionLines"
            [attr.d]="line.path"
            stroke="rgba(59, 130, 246, 0.3)"
            stroke-width="0.5"
            fill="none"
            stroke-dasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;100"
              dur="20s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        <!-- Glowing orbs -->
        <div
          class="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
        ></div>
        <div
          class="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style="animation-delay: 2s"
        ></div>
      </div>

      <div class="relative z-10 container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-16 md:mb-20" [@fadeInUp]>
          <div class="inline-flex items-center justify-center space-x-2 mb-4">
            <div class="w-8 h-px bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            <span class="text-blue-400 font-medium tracking-wider">GET IN TOUCH</span>
            <div class="w-8 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
          </div>

          <h2 class="text-white text-3xl md:text-5xl font-bold mb-6">
            Let's
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Connect</span
            >
          </h2>

          <p class="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life. I'm always
            open to new opportunities and collaborations.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <!-- Left Column - Contact Form -->
          <div [@fadeInUp]="{ value: '', params: { delay: '0.1s' } }">
            <div
              class="bg-gradient-to-br from-gray-900/80 to-blue-950/80 backdrop-blur-sm border border-blue-800/30 rounded-2xl p-8 md:p-10"
            >
              <h3 class="text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p class="text-gray-400 mb-8">
                Fill out the form below and I'll get back to you within 24 hours.
              </p>

              <form (ngSubmit)="submitForm()" #contactForm="ngForm" class="space-y-6">
                <!-- Form Status Messages -->
                <div
                  *ngIf="formStatus === 'success'"
                  class="p-4 bg-green-900/30 border border-green-700/30 rounded-xl animate-pulse"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-check-circle text-green-400 text-xl"></i>
                    <div>
                      <p class="text-green-300 font-medium">Message sent successfully!</p>
                      <p class="text-green-400 text-sm">I'll get back to you soon.</p>
                    </div>
                  </div>
                </div>

                <div
                  *ngIf="formStatus === 'error'"
                  class="p-4 bg-red-900/30 border border-red-700/30 rounded-xl"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-exclamation-triangle text-red-400 text-xl"></i>
                    <div>
                      <p class="text-red-300 font-medium">Oops! Something went wrong.</p>
                      <p class="text-red-400 text-sm">Please try again or contact me directly.</p>
                    </div>
                  </div>
                </div>

                <!-- Name Field -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                    <span class="flex items-center space-x-1">
                      <span>Full Name</span>
                      <span class="text-blue-400">*</span>
                    </span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <i class="fas fa-user text-blue-400/50"></i>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      [(ngModel)]="formData.name"
                      required
                      class="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-blue-800/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="John Developer"
                    />
                  </div>
                  <div *ngIf="formErrors.name" class="mt-1 text-sm text-red-400">
                    {{ formErrors.name }}
                  </div>
                </div>

                <!-- Email Field -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                    <span class="flex items-center space-x-1">
                      <span>Email Address</span>
                      <span class="text-blue-400">*</span>
                    </span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <i class="fas fa-envelope text-blue-400/50"></i>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      [(ngModel)]="formData.email"
                      required
                      class="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-blue-800/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div *ngIf="formErrors.email" class="mt-1 text-sm text-red-400">
                    {{ formErrors.email }}
                  </div>
                </div>

                <!-- Subject Field -->
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">
                    <span class="flex items-center space-x-1">
                      <span>Subject</span>
                      <span class="text-blue-400">*</span>
                    </span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <i class="fas fa-tag text-blue-400/50"></i>
                    </div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      [(ngModel)]="formData.subject"
                      required
                      class="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-blue-800/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div *ngIf="formErrors.subject" class="mt-1 text-sm text-red-400">
                    {{ formErrors.subject }}
                  </div>
                </div>

                <!-- Project Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    <span class="flex items-center space-x-1">
                      <span>Project Type</span>
                      <span class="text-blue-400">*</span>
                    </span>
                  </label>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <button
                      type="button"
                      *ngFor="let type of projectTypes"
                      (click)="formData.projectType = type.value"
                      [class]="
                        formData.projectType === type.value
                          ? 'py-2 px-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white text-sm font-medium transform scale-105'
                          : 'py-2 px-3 bg-blue-900/40 border border-blue-700/30 rounded-lg text-blue-300 text-sm hover:bg-blue-800/40 hover:border-blue-500/30 transition-all duration-300'
                      "
                    >
                      <i [class]="type.icon" class="mr-2"></i>
                      {{ type.label }}
                    </button>
                  </div>
                </div>

                <!-- Message Field -->
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
                    <span class="flex items-center space-x-1">
                      <span>Your Message</span>
                      <span class="text-blue-400">*</span>
                    </span>
                  </label>
                  <div class="relative">
                    <div class="absolute top-3 left-3 pointer-events-none">
                      <i class="fas fa-comment-alt text-blue-400/50"></i>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      [(ngModel)]="formData.message"
                      required
                      rows="6"
                      class="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-blue-800/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project, timeline, and budget..."
                    ></textarea>
                  </div>
                  <div class="flex justify-between mt-1">
                    <div *ngIf="formErrors.message" class="text-sm text-red-400">
                      {{ formErrors.message }}
                    </div>
                    <div class="text-sm text-gray-500">{{ formData.message.length }} / 2000</div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                  <button
                    type="submit"
                    [disabled]="isSubmitting"
                    [class]="
                      isSubmitting
                        ? 'w-full py-4 bg-blue-800/60 rounded-xl font-semibold text-blue-300 cursor-not-allowed'
                        : 'w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold text-white hover:from-blue-500 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300 group relative overflow-hidden'
                    "
                  >
                    <!-- Shimmer effect -->
                    <div
                      *ngIf="!isSubmitting"
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
                    ></div>

                    <span class="relative z-10 flex items-center justify-center space-x-2">
                      <span *ngIf="!isSubmitting">Send Message</span>
                      <span *ngIf="isSubmitting">Sending...</span>
                      <i
                        *ngIf="!isSubmitting"
                        class="fas fa-paper-plane group-hover:translate-x-1 transition-transform duration-300"
                      ></i>
                      <i *ngIf="isSubmitting" class="fas fa-spinner fa-spin"></i>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Right Column - Contact Info & Map -->
          <div>
            <!-- Contact Info Cards -->
            <div class="grid md:grid-cols-2 gap-6 mb-8" [@staggerItems]="'enter'">
              <div
                *ngFor="let info of contactInfo; let i = index"
                [@scaleIn]="{ value: '', params: { delay: i * 0.1 + 's' } }"
                class="group"
              >
                <div
                  class="h-full bg-gradient-to-br from-gray-900/80 to-blue-950/80 backdrop-blur-sm border border-blue-800/30 rounded-xl p-6 transition-all duration-500 group-hover:border-blue-500/50 group-hover:translate-y-[-4px]"
                >
                  <div class="flex items-start space-x-4">
                    <div
                      class="p-3 rounded-lg bg-gradient-to-br from-blue-900/50 to-cyan-900/50 group-hover:scale-110 transition-transform duration-300"
                    >
                      <i [class]="info.icon" class="text-blue-400 text-xl"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-lg font-bold text-white mb-1">{{ info.title }}</h4>
                      <p class="text-gray-400 text-sm mb-2">{{ info.description }}</p>
                      <a
                        *ngIf="info.link"
                        [href]="info.link"
                        target="_blank"
                        class="inline-flex items-center space-x-1 text-blue-400 hover:text-cyan-300 transition-colors duration-300 group/link"
                      >
                        <span class="text-sm">{{ info.value }}</span>
                        <i
                          class="fas fa-external-link-alt group-hover/link:translate-x-1 transition-transform duration-300 text-sm"
                        ></i>
                      </a>
                      <p *ngIf="!info.link" class="text-blue-300 text-sm">{{ info.value }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Office Hours -->
            <div class="mb-8" [@fadeInUp]="{ value: '', params: { delay: '0.3s' } }">
              <div
                class="bg-gradient-to-br from-gray-900/80 to-blue-950/80 backdrop-blur-sm border border-blue-800/30 rounded-xl p-6"
              >
                <h4 class="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <i class="fas fa-clock text-blue-400"></i>
                  <span>Availability</span>
                </h4>
                <div class="space-y-3">
                  <div
                    *ngFor="let hour of availability"
                    class="flex justify-between items-center pb-2 border-b border-blue-800/20 last:border-b-0 last:pb-0"
                  >
                    <span class="text-gray-400 text-sm">{{ hour.day }}</span>
                    <span class="text-blue-300 text-sm font-medium">{{ hour.hours }}</span>
                  </div>
                </div>
                <div class="mt-4 pt-4 border-t border-blue-800/20">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span class="text-green-400 text-sm font-medium">Currently Available</span>
                  </div>
                  <p class="text-gray-500 text-xs mt-1">Response time: Within 24 hours</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div [@fadeInUp]="{ value: '', params: { delay: '0.4s' } }">
              <div
                class="bg-gradient-to-br from-gray-900/80 to-blue-950/80 backdrop-blur-sm border border-blue-800/30 rounded-xl p-6"
              >
                <h4 class="text-lg font-bold text-white mb-4">Connect With Me</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <a
                    *ngFor="let social of socialLinks"
                    [href]="social.link"
                    target="_blank"
                    class="flex flex-col items-center justify-center p-4 bg-blue-900/40 border border-blue-700/30 rounded-xl text-blue-300 hover:text-white hover:bg-blue-800/40 hover:border-blue-500/50 hover:scale-105 transition-all duration-300 group/social"
                  >
                    <i
                      [class]="social.icon"
                      class="text-xl mb-2 group-hover/social:scale-110 transition-transform duration-300"
                    ></i>
                    <span class="text-xs font-medium">{{ social.name }}</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Location Map Placeholder -->
            <div class="mt-8" [@fadeInUp]="{ value: '', params: { delay: '0.5s' } }">
              <div
                class="bg-gradient-to-br from-gray-900/80 to-blue-950/80 backdrop-blur-sm border border-blue-800/30 rounded-xl overflow-hidden"
              >
                <div class="p-4 border-b border-blue-800/30">
                  <h4 class="text-lg font-bold text-white flex items-center space-x-2">
                    <i class="fas fa-map-marker-alt text-blue-400"></i>
                    <span>Based in San Francisco, CA</span>
                  </h4>
                </div>
                <div
                  class="relative h-48 md:h-56 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 flex items-center justify-center"
                >
                  <!-- Map placeholder with animated pulse -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div
                      class="w-12 h-12 rounded-full border-4 border-blue-500/30 bg-blue-800/40 animate-pulse"
                    ></div>
                  </div>
                  <!-- Location pin -->
                  <div class="relative z-10">
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center transform -translate-y-4"
                    >
                      <i class="fas fa-map-pin text-white text-sm"></i>
                    </div>
                  </div>
                  <!-- Animated rings -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div
                      class="w-24 h-24 rounded-full border-2 border-blue-500/20 animate-ping"
                    ></div>
                    <div
                      class="w-32 h-32 rounded-full border-2 border-cyan-500/20 animate-ping"
                      style="animation-delay: 1s"
                    ></div>
                  </div>
                </div>
                <div class="p-4 text-center">
                  <p class="text-gray-400 text-sm">Available for remote work worldwide</p>
                  <p class="text-blue-300 text-xs mt-1">
                    Open to relocation for the right opportunity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional CTA -->
        <div class="mt-16 text-center" [@fadeInUp]="{ value: '', params: { delay: '0.6s' } }">
          <div class="inline-flex items-center space-x-6">
            <div
              class="hidden md:block w-24 h-px bg-gradient-to-r from-blue-600/30 to-cyan-600/30"
            ></div>
            <div class="text-center">
              <p class="text-gray-400 mb-4">Prefer a quick call?</p>
              <a
                href="tel:+1234567890"
                class="inline-flex items-center space-x-3 px-6 py-3 border-2 border-blue-400/30 rounded-xl font-semibold text-blue-300 hover:text-white hover:border-blue-400/50 hover:bg-blue-900/30 transition-all duration-300 group/call"
              >
                <i class="fas fa-phone group-hover/call:animate-ring"></i>
                <span>Schedule a Call</span>
                <i
                  class="fas fa-external-link-alt group-hover/call:translate-x-1 transition-transform duration-300"
                ></i>
              </a>
            </div>
            <div
              class="hidden md:block w-24 h-px bg-gradient-to-l from-blue-600/30 to-cyan-600/30"
            ></div>
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
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      @keyframes ring {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.5;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      .animate-shimmer {
        animation: shimmer 2s linear infinite;
      }
      .animate-ring {
        animation: ring 2s ease-in-out infinite;
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
    trigger('staggerItems', [
      transition(':enter', [
        query(':enter', [stagger('100ms', [animateChild()])], { optional: true }),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(
          '0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class ContactSectionComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    subject: '',
    projectType: 'web',
    message: '',
  };

  formErrors = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  formStatus: 'idle' | 'success' | 'error' | 'submitting' = 'idle';
  isSubmitting = false;

  projectTypes = [
    { value: 'web', label: 'Web App', icon: 'fas fa-globe' },
    { value: 'mobile', label: 'Mobile App', icon: 'fas fa-mobile-alt' },
    { value: 'design', label: 'UI/UX Design', icon: 'fas fa-paint-brush' },
    { value: 'consulting', label: 'Consulting', icon: 'fas fa-chart-line' },
    { value: 'other', label: 'Other', icon: 'fas fa-cog' },
  ];

  floatingDots = [
    { x: 15, y: 20, delay: 0 },
    { x: 85, y: 30, delay: 1 },
    { x: 25, y: 70, delay: 2 },
    { x: 75, y: 60, delay: 3 },
    { x: 45, y: 40, delay: 0.5 },
    { x: 55, y: 80, delay: 1.5 },
  ];

  connectionLines = [
    { path: 'M15,20 L45,40' },
    { path: 'M75,30 L55,80' },
    { path: 'M25,70 L45,40' },
    { path: 'M85,60 L65,50' },
  ];

  contactInfo = [
    {
      title: 'Email Address',
      description: 'For business inquiries',
      value: 'hello@johndeveloper.com',
      link: 'mailto:hello@johndeveloper.com',
      icon: 'fas fa-envelope',
    },
    {
      title: 'Phone Number',
      description: 'Mon-Fri, 9AM-6PM PST',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      icon: 'fas fa-phone',
    },
    {
      title: 'Location',
      description: 'Based in',
      value: 'San Francisco, CA',
      link: null,
      icon: 'fas fa-map-marker-alt',
    },
    {
      title: 'LinkedIn',
      description: 'Professional profile',
      value: '@johndeveloper',
      link: 'https://linkedin.com/in/johndeveloper',
      icon: 'fab fa-linkedin-in',
    },
  ];

  availability = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  socialLinks = [
    {
      name: 'GitHub',
      link: 'https://github.com/johndeveloper',
      icon: 'fab fa-github',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/johndeveloper',
      icon: 'fab fa-twitter',
    },
    {
      name: 'Dribbble',
      link: 'https://dribbble.com/johndeveloper',
      icon: 'fab fa-dribbble',
    },
    {
      name: 'Upwork',
      link: 'https://upwork.com/freelancers/johndeveloper',
      icon: 'fas fa-briefcase',
    },
  ];

  constructor() {}

  ngOnInit() {
    // Initialization if needed
  }

  validateForm(): boolean {
    this.formErrors = { name: '', email: '', subject: '', message: '' };
    let isValid = true;

    if (!this.formData.name.trim()) {
      this.formErrors.name = 'Name is required';
      isValid = false;
    } else if (this.formData.name.trim().length < 2) {
      this.formErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.formData.email.trim()) {
      this.formErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(this.formData.email)) {
      this.formErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!this.formData.subject.trim()) {
      this.formErrors.subject = 'Subject is required';
      isValid = false;
    } else if (this.formData.subject.trim().length < 3) {
      this.formErrors.subject = 'Subject must be at least 3 characters';
      isValid = false;
    }

    if (!this.formData.message.trim()) {
      this.formErrors.message = 'Message is required';
      isValid = false;
    } else if (this.formData.message.trim().length < 10) {
      this.formErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    } else if (this.formData.message.length > 2000) {
      this.formErrors.message = 'Message cannot exceed 2000 characters';
      isValid = false;
    }

    return isValid;
  }

  async submitForm() {
    if (this.isSubmitting) return;

    if (!this.validateForm()) {
      this.formStatus = 'error';
      return;
    }

    this.isSubmitting = true;
    this.formStatus = 'submitting';

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.formStatus = 'success';

      // Reset form after success
      setTimeout(() => {
        this.formData = { name: '', email: '', subject: '', projectType: 'web', message: '' };
        this.formStatus = 'idle';
      }, 3000);
    } catch (error) {
      this.formStatus = 'error';
      console.error('Error submitting form:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  copyEmail() {
    navigator.clipboard.writeText('hello@johndeveloper.com').then(() => {
      const emailElement = document.querySelector('[data-email]') as HTMLElement;
      if (emailElement) {
        const originalText = emailElement.textContent;
        emailElement.textContent = 'Copied to clipboard!';
        emailElement.classList.add('text-green-400');

        setTimeout(() => {
          emailElement.textContent = originalText;
          emailElement.classList.remove('text-green-400');
        }, 2000);
      }
    });
  }
}
