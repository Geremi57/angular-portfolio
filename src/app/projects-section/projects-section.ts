import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  siAngular,
  siEthereum,
  siGo,
  siGooglemaps,
  siHtml5,
  siJavascript,
  siNodedotjs,
  siOpenrouter,
  siPolygon,
  siReact,
  siSolidity,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons';

interface ProjectTechnology {
  name: string;
  icon: SimpleIcon;
}

interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: ProjectTechnology[];
  tags: string[];
  image: string;
  gallery: string[];
  features: string[];
  live: string;
  github: string;
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  template: `
    <section
      id="projects"
      class="projects-section"
      aria-labelledby="projects-heading"
    >
      <div #track class="projects-scroll-track">
        <div class="projects-sticky-stage">
          <header class="projects-header">
            <div class="section-eyebrow">
              <span>03</span>
              <span>/</span>
              <span>Selected work</span>
            </div>
          </header>

          <div class="projects-showcase">
            <div class="project-stack" aria-live="polite">
              @for (project of projects; track project.title; let index = $index) {
                <article
                  #projectCard
                  class="project-card"
                  [attr.data-state]="
                    index === currentIndex
                      ? 'active'
                      : index < currentIndex
                        ? 'passed'
                        : 'stacked'
                  "
                  [attr.aria-hidden]="index !== currentIndex"
                  (click)="openProject(project, index)"
                  (keydown.enter)="openProject(project, index)"
                  (keydown.space)="openProject(project, index)"
                  tabindex="0"
                  role="button"
                >
                  <div class="project-image-wrap">
                    <img
                      class="project-image"
                      [src]="project.image"
                      [alt]="project.title + ' interface'"
                      [loading]="index === 0 ? 'eager' : 'lazy'"
                    />
                    <div class="project-image-shade"></div>

                    <div class="project-number">
                      {{ formatIndex(index + 1) }}
                    </div>

                    <div class="project-image-label">
                      {{ project.category }}
                    </div>

                    <div class="project-links" (click)="$event.stopPropagation()">
                      <a
                        [href]="project.github"
                        target="_blank"
                        rel="noreferrer"
                        [attr.aria-label]="project.title + ' on GitHub'"
                        tabindex="{{ index === currentIndex ? 0 : -1 }}"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fill="currentColor"
                            d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11.05 11.05 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
                          />
                        </svg>
                      </a>

                      <a
                        [href]="project.live"
                        target="_blank"
                        rel="noreferrer"
                        [attr.aria-label]="'Open live ' + project.title"
                        tabindex="{{ index === currentIndex ? 0 : -1 }}"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7 17 17 7M8 7h9v9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div class="project-card-content">
                    <div class="project-card-meta">
                      <span>{{ project.category }}</span>
                      <span>{{ project.year }}</span>
                    </div>

                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>

                    <div class="project-card-footer">
                      <div
                        class="project-technologies"
                        [attr.aria-label]="project.title + ' technologies'"
                      >
                        @for (technology of project.technologies; track technology.name) {
                          <span
                            class="technology-badge"
                            [attr.title]="technology.name"
                            [attr.aria-label]="technology.name"
                          >
                            <span class="technology-icon">
                              <svg
                                viewBox="0 0 24 24"
                                role="img"
                                [attr.aria-label]="technology.name"
                              >
                                <path [attr.d]="technology.icon.path" />
                              </svg>
                            </span>
                          </span>
                        }
                      </div>

                      <span class="view-project" aria-hidden="true">
                        View project
                        <svg viewBox="0 0 24 24">
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7 17 17 7M8 7h9v9"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              }
            </div>

            <aside class="project-info">
              <div class="project-info-intro">
                <span class="info-label">Projects</span>
                <h2 id="projects-heading">Projects built<br />to be used.</h2>
                <p>
                  A collection of applications built across web, AI, real estate,
                  education, and emerging technology.
                </p>
              </div>

              @if (activeProject; as project) {
                <div class="project-active-info">
                  <div class="active-project-index">
                    <span>{{ formatIndex(currentIndex + 1) }}</span>
                    <span class="index-line"></span>
                    <span>{{ formatIndex(projects.length) }}</span>
                  </div>

                  <div class="active-project-category">{{ project.category }}</div>
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.description }}</p>

                  <div class="active-project-tags">
                    @for (tag of project.tags; track tag) {
                      <span>{{ tag }}</span>
                    }
                  </div>
                </div>
              }
            </aside>
          </div>

          <div class="projects-controls" aria-label="Project controls">
            <button
              type="button"
              class="project-control"
              [disabled]="currentIndex === 0"
              (click)="scrollToProject(currentIndex - 1)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m15 18-6-6 6-6"
                />
              </svg>
              <span>Previous</span>
            </button>

            <div class="project-progress">
              <strong>{{ formatIndex(currentIndex + 1) }}</strong>
              <span class="progress-slash">/</span>
              <span>{{ formatIndex(projects.length) }}</span>
            </div>

            <button
              type="button"
              class="project-control"
              [disabled]="currentIndex === projects.length - 1"
              (click)="scrollToProject(currentIndex + 1)"
            >
              <span>Next</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9 18 6-6-6-6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './projects-section.css',
})
export class ProjectsSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('track', { static: true })
  private readonly trackRef!: ElementRef<HTMLElement>;

  @ViewChildren('projectCard')
  private readonly cardRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly projects: Project[] = [
    {
      title: 'Space LLM Support AI Chat Assistant',
      category: 'AI Application',
      year: '2024',
      description:
        'A voice-enabled AI workspace for responsive conversations, templates, and file analysis.',
      technologies: [
        { name: 'Go', icon: siGo },
        { name: 'Angular', icon: siAngular },
        { name: 'OpenRouter', icon: siOpenrouter },
        { name: 'TypeScript', icon: siTypescript },
        { name: 'Tailwind CSS', icon: siTailwindcss },
      ],
      tags: ['AI', 'Chat', 'Voice'],
      image: 'assets/projects/images/llm/Space-llm.png',
      gallery: [
        'assets/projects/images/llm/space-2.png',
        'assets/projects/images/llm/space-1.png',
        'assets/projects/images/llm/space-3.png',
        'assets/projects/images/llm/template-llm.png',
      ],
      features: [
        'Real-time AI responses',
        'Voice input',
        'Conversation templates',
        'File upload & analysis',
        'Markdown rendering',
      ],
      live: 'https://space-topaz-tau.vercel.app/',
      github: 'https://github.com/Geremi57/space-llm',
    },
    {
      title: 'PurpleHeyz Education Platform',
      category: 'Social Application',
      year: '2024',
      description:
        'An interactive learning community built around focused study cards and progress tracking.',
      technologies: [
        { name: 'React', icon: siReact },
        { name: 'Go', icon: siGo },
        { name: 'Node.js', icon: siNodedotjs },
        { name: 'Tailwind CSS', icon: siTailwindcss },
      ],
      tags: ['Education', 'Community', 'Tracking'],
      image: 'assets/projects/images/ph/purpleHeyz.png',
      gallery: [
        'assets/projects/images/ph/purpleHeyz.png',
        'assets/projects/images/ph/details-card.png',
        'assets/projects/images/ph/answer-ph.png',
      ],
      features: [
        'User profiles',
        'Interactive cards',
        'Real-time updates',
        'Engagement analytics',
        'Responsive design',
      ],
      live: 'https://purple-heyz.netlify.app/',
      github: 'https://github.com/Geremi57/FlashNotes',
    },
    {
      title: 'Real Estate Platform',
      category: 'Real Estate',
      year: '2023–2024',
      description:
        'A property discovery experience with precise filters, interactive maps, and detailed listings.',
      technologies: [
        { name: 'Go', icon: siGo },
        { name: 'Google Maps', icon: siGooglemaps },
        { name: 'JavaScript', icon: siJavascript },
        { name: 'HTML5', icon: siHtml5 },
      ],
      tags: ['Real Estate', 'Maps', 'Filters'],
      image: 'assets/projects/images/ra/Real-Estate.png',
      gallery: [
        'assets/projects/images/ra/Real-Estate.png',
        'assets/projects/images/ra/apartments.png',
        'assets/projects/images/ra/details-ra.png',
        'assets/projects/images/ra/sliders-ra.png',
      ],
      features: [
        'Property listings',
        'Advanced filters',
        'Interactive maps',
        'Price sliders',
        'Property details view',
      ],
      live: 'https://www.broaderrealtors.co.ke/',
      github: 'https://github.com/Geremi57/broader_real_estate',
    },
    {
      title: 'EcoToken',
      category: 'Blockchain',
      year: '2025',
      description:
        'On-chain material traceability with token rewards across the complete supply chain.',
      technologies: [
        { name: 'Solidity', icon: siSolidity },
        { name: 'Go', icon: siGo },
        { name: 'React', icon: siReact },
        { name: 'Ethereum', icon: siEthereum },
        { name: 'Polygon', icon: siPolygon },
      ],
      tags: ['Blockchain', 'Web3', 'Supply Chain', 'Traceability'],
      image: 'assets/projects/images/ecotoken/ecotoken.png',
      gallery: [
        'assets/projects/images/ecotoken/eco-token-1.png',
        'assets/projects/images/ecotoken/eco-token-2.png',
        'assets/projects/images/ecotoken/eco-token-3.png',
        'assets/projects/images/ecotoken/eco-token-4.png',
      ],
      features: [
        'On-chain product registration with QR code generation',
        'Full supply chain traceability',
        'ECO token rewards',
        'MetaMask wallet authentication',
        'Smart contract automated token minting',
      ],
      live: 'https://eco-waste-murex.vercel.app',
      github: 'https://github.com/Geremi57/Eco-waste',
    },
  ];

formatIndex(value: number): string {
  return String(value).padStart(2, '0');
}

  currentIndex = 0;
  activeProject = this.projects[0];

  private frameId: number | null = null;
  private readonly stackRotations = [-2, 2.6, -1.4, 2.2];

  private readonly onScroll = (): void => {
    this.requestFrame();
  };

  private readonly onResize = (): void => {
    this.requestFrame();
  };

  ngAfterViewInit(): void {
    this.renderFrame();

    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);

    if (this.frameId !== null) {
      window.cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  openProject(project: Project, index: number): void {
    if (index !== this.currentIndex) return;

    // Keep the card itself clickable without interfering with the GitHub/live links.
    window.open(project.live, '_blank', 'noopener,noreferrer');
  }

  scrollToProject(index: number): void {
    const track = this.trackRef.nativeElement;
    const safeIndex = Math.min(
      this.projects.length - 1,
      Math.max(0, index),
    );

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = Math.max(
      track.offsetHeight - window.innerHeight,
      1,
    );
    const targetProgress = safeIndex / (this.projects.length - 1);

    window.scrollTo({
      top: trackTop + scrollDistance * targetProgress,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }

  private requestFrame(): void {
    if (this.frameId !== null) return;

    this.frameId = window.requestAnimationFrame(() => {
      this.frameId = null;
      this.renderFrame();
    });
  }

  private renderFrame(): void {
    const track = this.trackRef.nativeElement;
    const distance = Math.max(track.offsetHeight - window.innerHeight, 1);
    const trackTop = track.getBoundingClientRect().top + window.scrollY;

    const progress = this.clamp(
      (window.scrollY - trackTop) / distance,
    );

    const nextIndex = Math.round(
      progress * (this.projects.length - 1),
    );

    if (nextIndex !== this.currentIndex) {
      this.currentIndex = nextIndex;
      this.activeProject = this.projects[nextIndex] ?? this.projects[0];
    }

    const cards = this.cardRefs.toArray();

    cards.forEach((cardRef, index) => {
      const card = cardRef.nativeElement;
      const relative = index - this.currentIndex;

      if (relative < 0) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.transform =
          'translate3d(-5rem, -7rem, 0) rotate(-6deg) scale(.95)';
        card.style.zIndex = String(10 - index);
        card.dataset['state'] = 'passed';
        return;
      }

      const depth = Math.min(relative, 3);
      const direction = index % 2 === 0 ? -1 : 1;

      card.style.opacity = String(1 - depth * 0.12);
      card.style.pointerEvents = relative === 0 ? 'auto' : 'none';
      card.style.transform = `translate3d(${depth * 10}px, ${depth * 15}px, 0) rotate(${direction * depth * 1.15}deg) scale(${1 - depth * 0.035})`;
      card.style.zIndex = String(40 - index);
      card.dataset['state'] = relative === 0 ? 'active' : 'stacked';
    });
  }

  private clamp(value: number, min = 0, max = 1): number {
    return Math.min(max, Math.max(min, value));
  }
}
