// about-section.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  animateChild,
  query,
  stagger,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="about"
      class="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-blue-950 overflow-hidden"
    >
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <!-- Animated grid pattern -->
        <div
          class="absolute inset-0 opacity-5"
          style="background-image: 
                    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 2px, transparent 2px),
                    radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 2px, transparent 2px);
                    background-size: 60px 60px;"
        ></div>

        <!-- Floating shapes -->
        <div
          *ngFor="let shape of floatingShapes"
          [style.left]="shape.x + '%'"
          [style.top]="shape.y + '%'"
          [style.animationDelay]="shape.delay + 's'"
          [class]="shape.class"
          class="absolute rounded-full opacity-10 animate-float"
        ></div>

        <!-- Glowing accent lines -->
        <div
          class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"
        ></div>
        <div
          class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"
        ></div>
      </div>

      <div class="relative z-10 container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-16 md:mb-20" [@fadeInUp]>
          <div class="inline-flex items-center justify-center space-x-2 mb-4">
            <div class="w-6 h-px bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            <span class="text-blue-400 font-medium tracking-wider">ABOUT ME</span>
            <div class="w-6 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
          </div>

          <h2 class="text-3xl md:text-5xl font-bold mb-6">
            <span class="text-white">Crafting Digital</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Excellence</span
            >
          </h2>

          <p class="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Transforming ideas into elegant, high-performance digital solutions through innovative
            design and cutting-edge technology.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left Column - Personal Intro -->
          <div [@staggerChildren]="'items'">
            <!-- Profile Card -->
            <div class="relative group" [@fadeInUp]="{ value: '', params: { delay: '0.1s' } }">
              <div
                class="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"
              ></div>
              <div
                class="relative bg-gray-900/80 backdrop-blur-sm border border-blue-800/30 rounded-2xl p-8 md:p-10"
              >
                <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <!-- Avatar -->
                  <div class="relative">
                    <div
                      class="w-32 h-32 rounded-full border-4 border-blue-500/30 overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-800 p-1"
                    >
                      <div
                        class="w-full h-full rounded-full bg-gradient-to-br from-blue-800 to-cyan-700 flex items-center justify-center"
                      >
                        <img src="profile(2).jpeg" class="h-full w-full object-cover" />
                      </div>
                    </div>
                    <!-- Status indicator -->
                    <div
                      class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"
                    >
                      <div
                        class="w-full h-full rounded-full bg-green-400 animate-ping opacity-75"
                      ></div>
                    </div>
                  </div>

                  <!-- Personal Info -->
                  <div class="flex-1 text-center md:text-left">
                    <h3 class="text-2xl font-bold text-white mb-2">Geremi Wanga</h3>
                    <p class="text-blue-400 font-medium mb-3">Full-Stack Developer</p>
                    <p class="text-gray-400 mb-4">
                      With over 3 years of experience in creating digital experiences that blend
                      aesthetics with functionality.
                    </p>

                    <!-- Social Links -->
                    <div class="flex justify-center md:justify-start space-x-3">
                      <a
                        *ngFor="let social of socialLinks"
                        [href]="social.link"
                        target="_blank"
                        class="w-10 h-10 rounded-lg bg-blue-900/50 border border-blue-700/30 flex items-center justify-center text-blue-300 hover:text-white hover:bg-blue-800/50 hover:border-blue-500/50 hover:scale-110 transition-all duration-300 group"
                      >
                        <span class="sr-only">{{ social.name }}</span>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path [attr.d]="social.icon"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8" [@staggerChildren]="'items'">
              <div
                *ngFor="let stat of stats"
                class="bg-gray-900/60 backdrop-blur-sm border border-blue-800/20 rounded-xl p-4 text-center group hover:bg-blue-900/20 hover:border-blue-500/30 transition-all duration-300"
              >
                <div
                  class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-1"
                >
                  {{ stat.value }}
                </div>
                <div class="text-sm text-gray-400">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Right Column - Skills & Timeline -->
          <div>
            <!-- Skills Section -->
            <div class="mb-12" [@fadeInUp]="{ value: '', params: { delay: '0.3s' } }">
              <h3 class="text-xl font-bold text-white mb-6 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Core Expertise
              </h3>

              <div class="space-y-5">
                <div
                  *ngFor="let skill of skills"
                  class="group cursor-pointer"
                  (mouseenter)="hoveredSkill = skill.name"
                  (mouseleave)="hoveredSkill = null"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span
                      class="text-gray-300 font-medium group-hover:text-blue-300 transition-colors duration-300"
                    >
                      {{ skill.name }}
                    </span>
                    <span class="text-blue-400 font-bold">{{ skill.percentage }}%</span>
                  </div>
                  <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      [style.width.%]="skill.percentage"
                      [class]="
                        hoveredSkill === skill.name
                          ? 'h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out'
                          : 'h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-1000 ease-out'
                      "
                    >
                      <div
                        class="w-full h-full bg-gradient-to-r from-transparent to-white/20 animate-shimmer"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div [@fadeInUp]="{ value: '', params: { delay: '0.4s' } }">
              <h3 class="text-xl font-bold text-white mb-6 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-blue-400"
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
                Professional Journey
              </h3>

              <div class="relative">
                <!-- Timeline line -->
                <div
                  class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-400/50 to-cyan-500/20"
                ></div>

                <div class="space-y-8">
                  <div
                    *ngFor="let exp of experience; let i = index"
                    class="relative pl-16 group"
                    [@fadeInUp]="{ value: '', params: { delay: 0.5 + i * 0.1 + 's' } }"
                  >
                    <!-- Timeline dot -->
                    <div
                      class="absolute left-4 top-1 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 border-4 border-gray-900 group-hover:scale-125 transition-transform duration-300"
                    >
                      <div
                        class="w-full h-full rounded-full bg-blue-400 animate-ping opacity-20"
                      ></div>
                    </div>

                    <div
                      class="bg-gray-900/60 backdrop-blur-sm border border-blue-800/20 rounded-xl p-5 group-hover:bg-blue-900/20 group-hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div class="flex justify-between items-start mb-2">
                        <h4 class="text-lg font-bold text-white">{{ exp.position }}</h4>
                        <span
                          class="text-sm text-blue-400 font-medium bg-blue-900/30 px-3 py-1 rounded-full"
                        >
                          {{ exp.year }}
                        </span>
                      </div>
                      <p class="text-blue-300 font-medium mb-2">{{ exp.company }}</p>
                      <p class="text-gray-400 text-sm">{{ exp.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Philosophy Section -->
        <div class="mt-20 md:mt-32" [@fadeInUp]="{ value: '', params: { delay: '0.6s' } }">
          <div class="max-w-4xl mx-auto">
            <div
              class="bg-gradient-to-r from-blue-900/30 via-blue-950/50 to-cyan-900/30 border border-blue-800/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center"
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-4">My Philosophy</h3>
                  <p class="text-gray-300 text-lg leading-relaxed">
                    I believe that exceptional digital experiences are born from the perfect
                    marriage of
                    <span class="text-blue-400 font-medium">innovative design</span> and
                    <span class="text-cyan-400 font-medium">robust engineering</span>. Every project
                    is an opportunity to push boundaries, solve complex challenges, and create
                    something that not only meets but exceeds expectations.
                  </p>
                  <button
                    (click)="downloadCV()"
                    class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <span>Resume</span>
                    <!-- <svg
                      class="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg> -->
                     <i
                          class="fas fa-external-link-alt group-hover/link:translate-x-1 transition-transform duration-300 text-sm"
                        ></i>
                  </button>
                </div>
              </div>
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
          transform: translateY(-20px) rotate(3deg);
        }
        66% {
          transform: translateY(10px) rotate(-3deg);
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
        animation: float 15s ease-in-out infinite;
      }
      .animate-shimmer {
        animation: shimmer 2s linear infinite;
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
    trigger('staggerChildren', [
      transition(':enter', [query('@*', [stagger('100ms', [animateChild()])], { optional: true })]),
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
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
export class AboutSectionComponent implements OnInit {
  floatingShapes = [
    { x: 10, y: 15, delay: 0, class: 'w-16 h-16 bg-blue-500' },
    { x: 85, y: 25, delay: 2, class: 'w-24 h-24 bg-cyan-500' },
    { x: 20, y: 70, delay: 4, class: 'w-12 h-12 bg-blue-600' },
    { x: 75, y: 60, delay: 1, class: 'w-20 h-20 bg-cyan-600' },
  ];

  socialLinks = [
    {
      name: 'GitHub',
      link: 'https://github.com/Geremi57',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/geremi-wanga-g2018wtk/',
      icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com',
      icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    },
    {
      name: 'Dribbble',
      link: 'https://dribbble.com',
      icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.5 7.435c1.172.186 2.215.667 3.117 1.442-.107.248-.222.494-.346.737-1.025-.154-2.056-.231-3.091-.231-.795 0-1.585.058-2.369.173.227-.49.472-.97.736-1.439.614.117 1.23.195 1.843.233l.11-.001zm-3.5-.76c.28.54.534 1.092.763 1.654-1.38.284-2.72.86-3.898 1.693-.623-1.157-1.393-2.227-2.286-3.186 1.081-.579 2.289-.918 3.561-.918.388 0 .773.033 1.153.097.164.019.327.04.489.064l.218-.004zm-4.5-.452c.954.984 1.765 2.098 2.414 3.311-1.57.666-2.938 1.627-4.047 2.807-1.174-1.157-1.903-2.65-2.132-4.293 1.043-.953 2.345-1.573 3.765-1.825zm-5.5.951c.217 1.722.973 3.289 2.19 4.501-1.099 1.171-2.449 2.121-3.998 2.772.21-1.166.677-2.242 1.357-3.178.292-.407.618-.79.974-1.147.388-.391.807-.751 1.253-1.077-.64-.386-1.233-.85-1.776-1.389l-.001-.001zm15.5 11.574c-.772.366-1.591.603-2.445.703.444-.593.838-1.217 1.179-1.869.667.247 1.285.607 1.83 1.064-.19.25-.388.496-.593.738l-.971-.636zm-2.5-1.506c-.336.652-.725 1.276-1.165 1.869-1.019.183-2.067.183-3.086 0-.44-.593-.829-1.217-1.165-1.869.693-.379 1.438-.663 2.229-.848.791.185 1.536.469 2.229.848zm-7.5-.848c.791-.185 1.536-.469 2.229-.848-.336.652-.725 1.276-1.165 1.869-1.019.183-2.067.183-3.086 0-.44-.593-.829-1.217-1.165-1.869.693.379 1.438.663 2.229.848z',
    },
  ];

  stats = [
    { value: '50+', label: 'Projects Completed' },
    { value: '25+', label: 'Happy Clients' },
    { value: '5+', label: 'Years Experience' },
    { value: '100%', label: 'Satisfaction' },
    { value: '15+', label: 'Technologies' },
    { value: '∞', label: 'Passion' },
  ];

  skills = [
    { name: 'JavaScript', percentage: 95 },
    { name: 'Golang', percentage: 85 },
    { name: 'angular', percentage: 92 },
    { name: 'Tailwind CSS', percentage: 90 },
    { name: 'Typescript', percentage: 62 },
    { name: 'UI/UX Design', percentage: 88 },
  ];

  experience = [
    {
      year: '2026 - Present',
      position: 'Apprentice',
      company: 'Zone01 Kisumu.',
      description:
        'Leading a team of 5 developers in building enterprise-level Angular applications.',
    },
    {
      year: '2023 - 2025',
      position: 'Freelance Full stack developer',
      company: 'Self-employed',
      description: 'Developed and aintained multiple web applications using JavaScript and Golang',
    },
    // {
    //   year: '2018 - 2020',
    //   position: 'Web Developer',
    //   company: 'Creative Web Agency',
    //   description: 'Built responsive websites and web applications for various clients.',
    // },
  ];

  hoveredSkill: string | null = null;

  ngOnInit() {
    // Initialization logic if needed
  }

  downloadCV() {
    // Simulate CV download
    // console.log('Downloading CV...');
    // In real implementation, you would trigger a file download
    // window.open('/assets/cv.pdf', '_blank');
    window.open('Black White Minimalist CV Resume-1.pdf', '_blank');

    // Show download success feedback
    const button = document.querySelector('button[aria-label="Download CV"]') as HTMLElement;
    if (button) {
      button.innerHTML =
        '<span>Download Complete!</span><svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
      button.classList.add('bg-green-600', 'hover:bg-green-500');
      setTimeout(() => {
        button.innerHTML =
          '<span>Download CV</span><svg class="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>';
        button.classList.remove('bg-green-600', 'hover:bg-green-500');
      }, 3000);
    }
  }
}
