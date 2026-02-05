// services-section.component.ts
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
  keyframes,
  animateChild,
} from '@angular/animations';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` <section
    id="services"
    class="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-blue-950 overflow-hidden"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0">
      <!-- Circuit board pattern -->
      <div
        class="absolute inset-0 opacity-5"
        style="background-image: 
                    radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0px, transparent 50%);
                    background-size: 100px 100px;"
      ></div>

      <!-- Animated gears -->
      <div
        *ngFor="let gear of animatedGears"
        [style.left]="gear.x + '%'"
        [style.top]="gear.y + '%'"
        [style.animationDelay]="gear.delay + 's'"
        class="absolute opacity-10 animate-gear pointer-events-none"
      >
        <i class="fas fa-cog text-blue-500 text-4xl md:text-6xl"></i>
      </div>

      <!-- Glowing orbs -->
      <div
        class="absolute -top-32 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
      ></div>
      <div
        class="absolute -bottom-32 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
        style="animation-delay: 1.5s"
      ></div>
    </div>

    <div class="relative z-10 container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16 md:mb-20" [@fadeInUp]>
        <div class="inline-flex items-center justify-center space-x-2 mb-4">
          <div class="w-8 h-px bg-gradient-to-r from-blue-400 to-cyan-400"></div>
          <span class="text-blue-400 font-medium tracking-wider">EXPERT SERVICES</span>
          <div class="w-8 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
        </div>

        <h2 class="text-white text-3xl md:text-5xl font-bold mb-6">
          Solutions I
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Provide</span
          >
        </h2>

        <p class="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
          Comprehensive digital solutions tailored to your business needs, from concept to
          deployment and beyond.
        </p>
      </div>

      <!-- Services Tabs Navigation -->
      <div class="flex justify-center mb-12" [@fadeInUp]="{ value: '', params: { delay: '0.1s' } }">
        <div
          class="inline-flex p-1 bg-gray-900/60 backdrop-blur-sm border border-blue-800/30 rounded-xl"
        >
          <button
            *ngFor="let tab of serviceTabs"
            (click)="activeTab = tab.id"
            [class]="
              activeTab === tab.id
                ? 'px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium transform scale-105'
                : 'px-6 py-3 rounded-lg text-gray-400 hover:text-blue-300 hover:bg-blue-900/30 transition-all duration-300'
            "
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Services Grid -->
      <div *ngIf="activeTab === 'services'" class="mb-20">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" [@staggerItems]="'enter'">
          <div
            *ngFor="let service of services; let i = index"
            [@scaleIn]="{ value: '', params: { delay: i * 0.1 + 's' } }"
            class="group"
          >
            <!-- Service Card -->
            <div
              class="h-full relative bg-gradient-to-br from-gray-900/80 to-blue-950/80 backdrop-blur-sm border border-blue-800/30 rounded-2xl p-8 transition-all duration-500 group-hover:border-blue-500/50 group-hover:translate-y-[-8px] overflow-hidden"
            >
              <!-- Card Background Pattern -->
              <div
                class="absolute inset-0 opacity-5"
                [style.background]="
                  'repeating-linear-gradient(45deg, ' +
                  service.color +
                  ', ' +
                  service.color +
                  ' 2px, transparent 2px, transparent 10px)'
                "
              ></div>

              <!-- Icon Container -->
              <div class="relative mb-6">
                <div
                  class="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-blue-700/30"
                >
                  <i [class]="service.icon" class="text-blue-400 text-2xl"></i>
                </div>
                <!-- Floating number -->
                <div
                  class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white"
                >
                  {{ i + 1 }}
                </div>
              </div>

              <!-- Service Title -->
              <h3
                class="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300"
              >
                {{ service.title }}
              </h3>

              <!-- Service Description -->
              <p class="text-gray-400 mb-6 text-sm leading-relaxed">
                {{ service.description }}
              </p>

              <!-- Features List -->
              <ul class="space-y-3 mb-8">
                <li *ngFor="let feature of service.features" class="flex items-start space-x-3">
                  <i class="fas fa-check text-blue-400 mt-0.5 text-sm"></i>
                  <span class="text-sm text-gray-300">{{ feature }}</span>
                </li>
              </ul>

              <!-- Technologies -->
              <div class="mb-8">
                <h4 class="text-sm font-semibold text-blue-300 mb-2">Technologies</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    *ngFor="let tech of service.technologies"
                    class="px-2.5 py-1 bg-blue-900/40 border border-blue-700/20 rounded-lg text-xs text-blue-300"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- CTA Button -->
              <div
                class="mt-auto pt-6 border-t border-blue-800/20 group-hover:border-blue-500/30 transition-colors duration-300"
              >
                <button
                  (click)="openServiceModal(service)"
                  class="w-full py-3 bg-blue-900/40 border border-blue-700/30 rounded-xl text-blue-300 hover:text-white hover:bg-blue-800/40 hover:border-blue-500/30 transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                >
                  <span>Learn More</span>
                  <i class="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform duration-300 text-sm"></i>
                </button>
              </div>

              <!-- Hover Effect Line -->
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing Tabs Content -->
      <div *ngIf="activeTab === 'pricing'" class="mb-20">
        <div class="grid md:grid-cols-3 gap-8" [@staggerItems]="'enter'">
          <div
            *ngFor="let plan of pricingPlans; let i = index"
            [@scaleIn]="{ value: '', params: { delay: i * 0.1 + 's' } }"
            class="group relative"
          >
            <!-- Popular Badge -->
            <div *ngIf="plan.popular" 
                 class="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-white text-xs font-bold">
              Most Popular
            </div>

            <!-- Pricing Card -->
            <div
              [class]="
                plan.popular
                  ? 'border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/40 to-black/80'
                  : 'border border-blue-800/30 bg-gradient-to-br from-gray-900/80 to-blue-950/80'
              "
              class="h-full backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 group-hover:translate-y-[-4px] overflow-hidden"
            >
              <!-- Plan Header -->
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-white mb-2">{{ plan.name }}</h3>
                <p class="text-gray-400 text-sm mb-4">{{ plan.description }}</p>

                <!-- Price -->
                <div class="mb-6">
                  <div class="flex items-end justify-center">
                    <span
                      class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
                    >
                      $ {{ plan.price }}
                    </span>
                    <span class="text-gray-400 mb-1 ml-1">{{ plan.period }}</span>
                  </div>
                </div>
              </div>

              <!-- Features -->
              <ul class="space-y-4 mb-8">
                <li *ngFor="let feature of plan.features" class="flex items-start space-x-3">
                  <i [class]="feature.included ? 'fas fa-check text-green-400' : 'fas fa-times text-gray-600'" 
                     class="mt-0.5 text-sm"></i>
                  <span
                    [class]="feature.included ? 'text-gray-300' : 'text-gray-600'"
                    class="text-sm"
                  >
                    {{ feature.text }}
                  </span>
                </li>
              </ul>

              <!-- CTA Button -->
              <div class="text-center">
                <button
                  (click)="selectPlan(plan)"
                  [class]="
                    plan.popular
                      ? 'w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold text-white hover:from-blue-500 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300'
                      : 'w-full py-3 bg-blue-900/40 border border-blue-700/30 rounded-xl text-blue-300 hover:text-white hover:bg-blue-800/40 hover:border-blue-500/30 transition-all duration-300'
                  "
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Process Timeline -->
      <div class="mt-32" [@fadeInUp]="{ value: '', params: { delay: '0.3s' } }">
        <div class="text-center mb-12">
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
            My
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
              >Process</span
            >
          </h3>
          <p class="text-gray-400 max-w-2xl mx-auto">
            A structured approach to ensure quality and efficiency in every project
          </p>
        </div>

        <div class="relative max-w-5xl mx-auto">
          <!-- Timeline Line -->
          <div
            class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-400/40 to-cyan-500/20 transform -translate-x-1/2"
          ></div>

          <!-- Process Steps -->
          <div class="relative">
            <div
              *ngFor="let step of processSteps; let i = index"
              [class]="i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'"
              class="mb-12 md:mb-16 md:w-1/2 md:absolute"
              [style.top]="i * 160 + 'px'"
              [style.left]="i % 2 === 0 ? '0' : 'auto'"
              [style.right]="i % 2 !== 0 ? '0' : 'auto'"
              [@slideIn]="{
                value: '',
                params: { delay: i * 0.2 + 's', direction: i % 2 === 0 ? 'left' : 'right' }
              }"
            >
              <!-- Step Card -->
              <div class="relative group">
                <!-- Timeline Dot -->
                <div
                  [class]="i % 2 === 0 ? 'md:right-[-44px]' : 'md:left-[-44px]'"
                  class="absolute top-0 md:top-1/2 md:transform md:-translate-y-1/2"
                >
                  <div
                    class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 border-4 border-gray-900 group-hover:scale-125 transition-transform duration-300 flex items-center justify-center"
                  >
                    <span class="text-xs font-bold text-white">{{ i + 1 }}</span>
                    <div
                      class="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"
                    ></div>
                  </div>
                </div>

                <!-- Step Content -->
                <div
                  class="bg-gradient-to-br from-gray-900/80 to-blue-950/80 backdrop-blur-sm border border-blue-800/30 rounded-2xl p-6 group-hover:border-blue-500/50 transition-all duration-300"
                >
                  <div class="flex items-center space-x-4 mb-4">
                    <div class="p-2 rounded-xl bg-gradient-to-br from-blue-900/50 to-cyan-900/50">
                      <i [class]="step.icon" class="text-blue-400 text-xl"></i>
                    </div>
                    <h4 class="text-lg font-bold text-white">{{ step.title }}</h4>
                  </div>
                  <p class="text-gray-400 text-sm">{{ step.description }}</p>
                </div>
              </div>
            </div>

            <!-- Spacer for timeline -->
            <div class="h-0 md:h-[640px]"></div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-90 text-center" [@fadeInUp]="{ value: '', params: { delay: '0.5s' } }">
        <div
          class="bg-gradient-to-r from-blue-900/30 via-black/50 to-cyan-900/30 border border-blue-800/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm max-w-3xl mx-auto"
        >
          <div
            class="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-6"
          >
            <i class="fas fa-comments text-white text-2xl"></i>
          </div>

          <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p class="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss your ideas and requirements. I'll provide a detailed proposal and timeline
            for your project.
          </p>

          <div class="flex flex-col md:flex-row gap-4 justify-center">
            <button
              (click)="openContactModal()"
              class="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300"
            >
              Get Free Consultation
            </button>

            <button
              (click)="downloadBrochure()"
              class="px-8 py-4 border-2 border-blue-400/30 rounded-xl font-semibold text-blue-300 hover:text-white hover:border-blue-400/50 hover:bg-blue-900/30 transition-all duration-300"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>`,
  styles: [
    `
      :host {
        display: block;
      }
      @keyframes gear-rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes slide-in-left {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slide-in-right {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .animate-gear {
        animation: gear-rotate 20s linear infinite;
      }
      .animate-slide-in-left {
        animation: slide-in-left 0.6s ease-out;
      }
      .animate-slide-in-right {
        animation: slide-in-right 0.6s ease-out;
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
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX({{direction}})' }),
        animate('0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ], { params: { direction: '-30px' } })
    ])
  ],
})

export class ServicesSectionComponent implements OnInit {
  activeTab = 'services';
  selectedPlan: any = null;

  serviceTabs = [
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
  ];

  animatedGears = [
    { x: 10, y: 15, delay: 0 },
    { x: 90, y: 25, delay: 2 },
    { x: 15, y: 75, delay: 4 },
    { x: 85, y: 65, delay: 1 },
  ];

  services = [
    {
      id: 1,
      title: 'Custom Web Development',
      description:
        'Tailored web applications built with modern frameworks, optimized for performance and scalability.',
      icon: 'fas fa-code',
      color: '#3b82f6',
      features: [
        'Custom Angular/React applications',
        'Responsive design implementation',
        'API integration & development',
        'Performance optimization',
        'SEO-friendly architecture',
      ],
      technologies: ['Angular', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 2,
      title: 'UI/UX Design',
      description:
        'User-centered design solutions that enhance user experience and drive engagement.',
      icon: 'fas fa-paint-brush',
      color: '#06b6d4',
      features: [
        'User research & persona creation',
        'Wireframing & prototyping',
        'Visual design systems',
        'Interaction design',
        'Usability testing',
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description:
        'Cross-platform mobile applications using Ionic and React Native for maximum reach.',
      icon: 'fas fa-mobile-alt',
      color: '#8b5cf6',
      features: [
        'iOS & Android development',
        'Cross-platform solutions',
        'Push notifications',
        'Offline functionality',
        'App store deployment',
      ],
      technologies: ['Ionic', 'React Native', 'Capacitor', 'Firebase', 'PWA'],
    },
    {
      id: 4,
      title: 'E-Commerce Solutions',
      description:
        'Complete e-commerce platforms with secure payment processing and inventory management.',
      icon: 'fas fa-shopping-cart',
      color: '#10b981',
      features: [
        'Shopping cart & checkout',
        'Payment gateway integration',
        'Inventory management',
        'Order tracking',
        'Analytics dashboard',
      ],
      technologies: ['Stripe', 'PayPal', 'WooCommerce', 'Magento', 'Shopify'],
    },
    {
      id: 5,
      title: 'API Development',
      description: 'Robust RESTful APIs and GraphQL endpoints for seamless data integration.',
      icon: 'fas fa-server',
      color: '#f59e0b',
      features: [
        'RESTful API development',
        'GraphQL implementation',
        'Authentication & authorization',
        'Rate limiting',
        'API documentation',
      ],
      technologies: ['Node.js', 'Express', 'GraphQL', 'JWT', 'Swagger'],
    },
    {
      id: 6,
      title: 'Consulting & Training',
      description:
        "Expert guidance and training sessions to elevate your team's technical capabilities.",
      icon: 'fas fa-chalkboard-teacher',
      color: '#ef4444',
      features: [
        'Technical consulting',
        'Code reviews',
        'Team training sessions',
        'Architecture guidance',
        'Best practices workshops',
      ],
      technologies: ['Angular', 'TypeScript', 'CI/CD', 'Testing', 'Architecture'],
    },
  ];

  pricingPlans = [
    {
      id: 1,
      name: 'Starter',
      description: 'Perfect for small projects and MVPs',
      price: '2,999',
      period: '/project',
      popular: false,
      features: [
        { text: 'Up to 5 pages', included: true },
        { text: 'Basic responsive design', included: true },
        { text: 'Contact form integration', included: true },
        { text: 'SEO optimization', included: true },
        { text: '1 month support', included: true },
        { text: 'Custom animations', included: false },
        { text: 'Admin dashboard', included: false },
        { text: 'E-commerce functionality', included: false },
      ],
    },
    {
      id: 2,
      name: 'Professional',
      description: 'Ideal for growing businesses',
      price: '4,999',
      period: '/project',
      popular: true,
      features: [
        { text: 'Up to 15 pages', included: true },
        { text: 'Advanced responsive design', included: true },
        { text: 'Custom animations', included: true },
        { text: 'CMS integration', included: true },
        { text: '3 months support', included: true },
        { text: 'Performance optimization', included: true },
        { text: 'Basic admin panel', included: true },
        { text: 'E-commerce functionality', included: false },
      ],
    },
    {
      id: 3,
      name: 'Enterprise',
      description: 'For large-scale applications',
      price: '8,999',
      period: '/project',
      popular: false,
      features: [
        { text: 'Unlimited pages', included: true },
        { text: 'Custom design system', included: true },
        { text: 'Advanced animations', included: true },
        { text: 'Full CMS integration', included: true },
        { text: '6 months support', included: true },
        { text: 'Enterprise security', included: true },
        { text: 'Advanced admin panel', included: true },
        { text: 'E-commerce functionality', included: true },
      ],
    },
  ];

  processSteps = [
    {
      title: 'Discovery & Planning',
      description:
        'Understanding your requirements, goals, and creating a detailed project roadmap.',
      icon: 'fas fa-search',
    },
    {
      title: 'Design & Prototyping',
      description: 'Creating wireframes, mockups, and interactive prototypes for approval.',
      icon: 'fas fa-pencil-ruler',
    },
    {
      title: 'Development',
      description: 'Building the application with clean, maintainable code and modern practices.',
      icon: 'fas fa-code',
    },
    {
      title: 'Testing & Quality Assurance',
      description:
        'Rigorous testing across devices and browsers to ensure quality and performance.',
      icon: 'fas fa-vial',
    },
    {
      title: 'Deployment & Launch',
      description: 'Deploying to production, configuring servers, and ensuring smooth launch.',
      icon: 'fas fa-rocket',
    },
    {
      title: 'Support & Maintenance',
      description:
        'Ongoing support, updates, and maintenance to keep your application running smoothly.',
      icon: 'fas fa-tools',
    },
  ];

  ngOnInit() {
    // Initialization logic if needed
  }

  openServiceModal(service: any) {
    console.log('Opening service modal for:', service.title);
    // In a real app, you would open a modal with detailed service information
    // this.modalService.open(ServiceDetailModalComponent, { data: service });

    // Visual feedback
    const buttons = document.querySelectorAll(`button[data-service="${service.id}"]`);
    buttons.forEach((button) => {
      button.classList.add('bg-blue-500', 'text-white');
      setTimeout(() => {
        button.classList.remove('bg-blue-500', 'text-white');
      }, 1000);
    });
  }

  selectPlan(plan: any) {
    console.log('Selected plan:', plan.name);
    this.selectedPlan = plan;

    // Show confirmation
    const button = event?.target as HTMLElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Selected!';
      button.classList.add('bg-green-600', 'hover:bg-green-500');
      button.classList.remove(
        'from-blue-600',
        'to-cyan-500',
        'hover:from-blue-500',
        'hover:to-cyan-400'
      );

      setTimeout(() => {
        if (button.textContent === 'Selected!') {
          button.textContent = originalText;
          button.classList.remove('bg-green-600', 'hover:bg-green-500');
          if (plan.popular) {
            button.classList.add(
              'from-blue-600',
              'to-cyan-500',
              'hover:from-blue-500',
              'hover:to-cyan-400'
            );
          }
        }
      }, 2000);
    }

    // In a real app, you would navigate to a contact form or checkout
    // this.router.navigate(['/contact'], { queryParams: { plan: plan.id } });
  }

  openContactModal() {
    console.log('Opening contact modal');
    // In a real app, open a contact modal or navigate to contact page
    // this.modalService.open(ContactModalComponent);

    // Visual feedback
    const button = document.querySelector(
      'button:contains("Get Free Consultation")'
    ) as HTMLElement;
    if (button) {
      button.classList.add('ring-4', 'ring-blue-500/30');
      setTimeout(() => {
        button.classList.remove('ring-4', 'ring-blue-500/30');
      }, 1000);
    }
  }

  downloadBrochure() {
    console.log('Downloading brochure');
    // In a real app, trigger file download
    // window.open('/assets/brochure.pdf', '_blank');

    // Visual feedback
    const button = document.querySelector('button:contains("Download Brochure")') as HTMLElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Downloading...';
      button.classList.add('text-cyan-300');

      setTimeout(() => {
        button.textContent = 'Download Complete!';
        button.classList.remove('text-cyan-300');
        button.classList.add('text-green-400');

        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove('text-green-400');
        }, 2000);
      }, 1500);
    }
  }
}