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
      class="relative py-20 p-1 md:py-28 bg-gradient-to-b from-blue-950 via-black to-gray-900 overflow-hidden"
    >
      <!-- Minimal Background Elements -->
      <div class="absolute inset-0">
        <!-- Subtle grid pattern -->
        <div
          class="absolute inset-0 opacity-5"
          style="background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.2) 1px, transparent 0);
                 background-size: 40px 40px;"
        ></div>

        <!-- Single glowing orb -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
        ></div>
      </div>

      <div class="relative z-10 container mx-auto px-4">
        <!-- Section Header - More compact -->
        <div class="text-center mb-12" [@fadeInUp]>
          <span class="text-blue-400 text-sm font-medium tracking-wider block mb-2">GET IN TOUCH</span>
          <h2 class="text-white text-3xl md:text-4xl font-bold mb-4">
            Let's
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Connect
            </span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? I'm just a message away.
          </p>
        </div>

        <!-- Main Contact Card - Simplified layout -->
        <div class="max-w-4xl mx-auto p-0">
          <div
            class="bg-gradient-to-br p-4 from-gray-900/90 to-blue-950/90 backdrop-blur-sm border border-blue-800/30 rounded-2xl overflow-hidden"
            [@fadeInUp]="{ value: '', params: { delay: '0.1s' } }"
          >
            <div class="grid md:grid-cols-5 m-4 divide-y md:divide-y-0 md:divide-x divide-blue-800/30">
              
              <!-- Left Side - Contact Info (2 columns) -->
              <div class="md:col-span-2 p-6 md:p-8">
                <h3 class="text-lg font-semibold text-white mb-4">Contact Information</h3>
                
                <!-- Quick Contact Items -->
                <div class="space-y-4 mb-6">
                  <div class="flex items-center space-x-3 group">
                    <div class="w-10 h-10 rounded-lg bg-blue-900/40 border border-blue-700/30 flex items-center justify-center group-hover:bg-blue-800/40 group-hover:border-blue-500/50 transition-all duration-300">
                      <i class="fas fa-envelope text-blue-400"></i>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Email</p>
                      <a href="mailto:hello@johndeveloper.com" class="text-sm text-gray-300 hover:text-blue-400 transition-colors">
                        wangageremi725@gmail.com
                      </a>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3 group">
                    <div class="w-10 h-10 rounded-lg bg-blue-900/40 border border-blue-700/30 flex items-center justify-center group-hover:bg-blue-800/40 group-hover:border-blue-500/50 transition-all duration-300">
                      <i class="fas fa-phone text-blue-400"></i>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Phone</p>
                      <a href="tel:+15551234567" class="text-sm text-gray-300 hover:text-blue-400 transition-colors">
                        +254742545572
                      </a>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3 group">
                    <div class="w-10 h-10 rounded-lg bg-blue-900/40 border border-blue-700/30 flex items-center justify-center group-hover:bg-blue-800/40 group-hover:border-blue-500/50 transition-all duration-300">
                      <i class="fas fa-map-marker-alt text-blue-400"></i>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Location</p>
                      <p class="text-sm text-gray-300">Kisumu, Kenya</p>
                    </div>
                  </div>
                </div>

                <!-- Availability Badge -->
                <div class="flex items-center space-x-2 mb-6">
                  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span class="text-xs text-green-400">Available for work</span>
                </div>

                <!-- Social Links - Compact -->
                <div>
                  <p class="text-xs text-gray-500 mb-2">Social</p>
                  <div class="flex space-x-2">
                    <a *ngFor="let social of socialLinks"
                       [href]="social.link"
                       target="_blank"
                       class="w-8 h-8 rounded-lg bg-blue-900/30 border border-blue-700/30 flex items-center justify-center text-blue-300 hover:text-white hover:bg-blue-800/40 hover:border-blue-500/50 transition-all duration-300">
                      <i [class]="social.icon" class="text-sm"></i>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Right Side - Quick Message Form (3 columns) -->
              <div class="md:col-span-3 p-6 md:p-8">
                <h3 class="text-lg font-semibold text-white mb-4">Send a quick message</h3>
                
                <!-- Form Status Messages -->
                <div *ngIf="formStatus === 'success'" 
                     class="mb-4 p-3 bg-green-900/30 border border-green-700/30 rounded-lg text-sm text-green-300 flex items-center space-x-2">
                  <i class="fas fa-check-circle"></i>
                  <span>Message sent successfully!</span>
                </div>

                <div *ngIf="formStatus === 'error'" 
                     class="mb-4 p-3 bg-red-900/30 border border-red-700/30 rounded-lg text-sm text-red-300 flex items-center space-x-2">
                  <i class="fas fa-exclamation-triangle"></i>
                  <span>Something went wrong. Try again?</span>
                </div>

                <form (ngSubmit)="submitForm()" class="space-y-4">
                  <!-- Name & Email Row -->
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        [(ngModel)]="formData.name"
                        name="name"
                        placeholder="Your name"
                        class="w-full px-4 py-2.5 bg-gray-900/60 border border-blue-800/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                      <div *ngIf="formErrors.name" class="text-xs text-red-400 mt-1">{{ formErrors.name }}</div>
                    </div>
                    <div>
                      <input
                        type="email"
                        [(ngModel)]="formData.email"
                        name="email"
                        placeholder="Email address"
                        class="w-full px-4 py-2.5 bg-gray-900/60 border border-blue-800/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                      <div *ngIf="formErrors.email" class="text-xs text-red-400 mt-1">{{ formErrors.email }}</div>
                    </div>
                  </div>

                  <!-- Subject -->
                  <div>
                    <input
                      type="text"
                      [(ngModel)]="formData.subject"
                      name="subject"
                      placeholder="What's this about?"
                      class="w-full px-4 py-2.5 bg-gray-900/60 border border-blue-800/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <div *ngIf="formErrors.subject" class="text-xs text-red-400 mt-1">{{ formErrors.subject }}</div>
                  </div>

                  <!-- Message -->
                  <div>
                    <textarea
                      [(ngModel)]="formData.message"
                      name="message"
                      rows="3"
                      placeholder="Tell me about your project..."
                      class="w-full px-4 py-2.5 bg-gray-900/60 border border-blue-800/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                    ></textarea>
                    <div *ngIf="formErrors.message" class="text-xs text-red-400 mt-1">{{ formErrors.message }}</div>
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    [disabled]="isSubmitting"
                    class="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white font-medium hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <span *ngIf="!isSubmitting">Send Message</span>
                    <span *ngIf="isSubmitting">Sending...</span>
                    <i *ngIf="!isSubmitting" class="fas fa-paper-plane text-sm group-hover:translate-x-1 transition-transform"></i>
                    <i *ngIf="isSubmitting" class="fas fa-spinner fa-spin"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- Quick Response Guarantee -->
          <div class="text-center mt-6 text-sm text-gray-500" [@fadeInUp]="{ value: '', params: { delay: '0.2s' } }">
            <i class="fas fa-bolt text-blue-400 mr-1"></i>
            <span>Typically replies within 24 hours</span>
          </div>
        </div>
      </div>

      <!-- Minimal Decoration -->
      <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ContactSectionComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    subject: '',
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

  socialLinks = [
    { name: 'GitHub', link: 'https://github.com/Geremi57', icon: 'fab fa-github' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/geremi-wanga-g2018wtk/', icon: 'fab fa-linkedin-in' },
    { name: 'Twitter', link: 'https://x.com/GrizzyK89124', icon: 'fab fa-twitter' },
  ];

  ngOnInit() {}

  validateForm(): boolean {
    this.formErrors = { name: '', email: '', subject: '', message: '' };
    let isValid = true;

    if (!this.formData.name.trim()) {
      this.formErrors.name = 'Name required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.formData.email.trim()) {
      this.formErrors.email = 'Email required';
      isValid = false;
    } else if (!emailRegex.test(this.formData.email)) {
      this.formErrors.email = 'Invalid email';
      isValid = false;
    }

    if (!this.formData.subject.trim()) {
      this.formErrors.subject = 'Subject required';
      isValid = false;
    }

    if (!this.formData.message.trim()) {
      this.formErrors.message = 'Message required';
      isValid = false;
    } else if (this.formData.message.trim().length < 10) {
      this.formErrors.message = 'Too short';
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.formStatus = 'success';
      
      setTimeout(() => {
        this.formData = { name: '', email: '', subject: '', message: '' };
        this.formStatus = 'idle';
      }, 3000);
    } catch (error) {
      this.formStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }
}