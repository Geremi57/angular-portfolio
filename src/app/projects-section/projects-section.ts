import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  siAngular,
  siEthereum,
  siGithub,
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
  features: string[];
  image: string;
  gallery: string[];
  live: string;
  github: string;
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="projects"
      class="projects-section"
      aria-labelledby="projects-title"
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
              @for (project of projects; track project.title; let i = $index) {
                <article
                  #projectCard
                  class="project-card"
                  [attr.data-state]="cardStates[i]"
                  [attr.aria-hidden]="i !== currentIndex"
                >
                  <div class="project-image-wrap">
                    <img
                      class="project-image"
                      [src]="project.image"
                      [alt]="project.title + ' interface'"
                      [loading]="i === 0 ? 'eager' : 'lazy'"
                    />

                    <div class="project-image-shade"></div>

                    <div class="project-number">
                      {{ formatIndex(i + 1) }}
                    </div>

                    <div class="project-image-label">
                      {{ project.category }}
                    </div>

                    <div class="project-links">
                      <a
                        class="project-link"
                        [href]="project.github"
                        target="_blank"
                        rel="noopener noreferrer"
                        [attr.aria-label]="'View ' + project.title + ' source on GitHub'"
                        (click)="$event.stopPropagation()"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          role="img"
                          aria-label="GitHub"
                        >
                          <path
                            [attr.d]="githubIcon.path"
                            fill="currentColor"
                          />
                        </svg>
                      </a>

                      <a
                        class="project-link"
                        [href]="project.live"
                        target="_blank"
                        rel="noopener noreferrer"
                        [attr.aria-label]="'Open live ' + project.title"
                        (click)="$event.stopPropagation()"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3ZM5 5h5v14h14v-2H7V5H5Z"
                            fill="currentColor"
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
                        @for (
                          technology of project.technologies.slice(0, 5);
                          track technology.name
                        ) {
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
                                <path
                                  [attr.d]="technology.icon.path"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </span>
                        }
                      </div>

                      <a
                        class="view-project"
                        [href]="project.live"
                        target="_blank"
                        rel="noopener noreferrer"
                        (click)="$event.stopPropagation()"
                      >
                        <span>View project</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3ZM5 5h5v14h14v-2H7V5H5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              }
            </div>

            <aside class="project-info">
              <div class="project-info-intro">
                <span class="info-label">Projects</span>

                <h2 id="projects-title">
                  Projects built<br />
                  to be used.
                </h2>

                <p>
                  A collection of applications built across web, AI,
                  real estate, education, and emerging technology.
                </p>
              </div>

              @if (activeProject; as project) {
                <div class="project-active-info">
                  <div class="active-project-index">
                    <span>{{ formatIndex(currentIndex + 1) }}</span>
                    <span class="index-line"></span>
                    <span>{{ formatIndex(projects.length) }}</span>
                  </div>

                  <div class="active-project-category">
                    {{ project.category }}
                  </div>

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
                  d="m14.7 5.3-1.4-1.4L5.2 12l8.1 8.1 1.4-1.4L9 13h10v-2H9l5.7-5.7Z"
                  fill="currentColor"
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
                  d="m9.3 18.7 1.4 1.4 8.1-8.1-8.1-8.1-1.4 1.4L15 11H5v2h10l-5.7 5.7Z"
                  fill="currentColor"
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
  @ViewChildren('projectCard')
  private readonly projectCards!: QueryList<ElementRef<HTMLElement>>;

  private trackElement?: HTMLElement;
  private scrollFrame: number | null = null;
  private animationFrame: number | null = null;
  private animationTimer: number | null = null;
  private resizeObserver?: ResizeObserver;
  private isAnimating = false;
  private renderedIndex = 0;

  currentIndex = 0;

  cardStates: Array<'active' | 'stacked' | 'passed'> = [];

  readonly githubIcon = siGithub;

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
      features: [
        'Real-time AI responses',
        'Voice input',
        'Conversation templates',
        'File upload & analysis',
        'Markdown rendering',
      ],
      image: 'assets/projects/images/llm/Space-llm.png',
      gallery: [
        'assets/projects/images/llm/space-2.png',
        'assets/projects/images/llm/space-1.png',
        'assets/projects/images/llm/space-3.png',
        'assets/projects/images/llm/template-llm.png',
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
      features: [
        'User profiles',
        'Interactive cards',
        'Real-time updates',
        'Engagement analytics',
        'Responsive design',
      ],
      image: 'assets/projects/images/ph/purpleHeyz.png',
      gallery: [
        'assets/projects/images/ph/purpleHeyz.png',
        'assets/projects/images/ph/details-card.png',
        'assets/projects/images/ph/answer-ph.png',
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
      features: [
        'Property listings',
        'Advanced filters',
        'Interactive maps',
        'Price sliders',
        'Property details view',
      ],
      image: 'assets/projects/images/ra/Real-Estate.png',
      gallery: [
        'assets/projects/images/ra/Real-Estate.png',
        'assets/projects/images/ra/apartments.png',
        'assets/projects/images/ra/details-ra.png',
        'assets/projects/images/ra/sliders-ra.png',
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
      features: [
        'On-chain product registration with QR code generation',
        'Full supply chain traceability',
        'ECO token rewards',
        'MetaMask wallet authentication',
        'Smart contract automated token minting',
      ],
      image: 'assets/projects/images/ecotoken/ecotoken.png',
      gallery: [
        'assets/projects/images/ecotoken/eco-token-1.png',
        'assets/projects/images/ecotoken/eco-token-2.png',
        'assets/projects/images/ecotoken/eco-token-3.png',
        'assets/projects/images/ecotoken/eco-token-4.png',
      ],
      live: 'https://eco-waste-murex.vercel.app',
      github: 'https://github.com/Geremi57/Eco-waste',
    },
  ];

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly zone: NgZone,
  ) {
    this.cardStates = this.projects.map((_, index) =>
      index === 0 ? 'active' : 'stacked',
    );
  }

  get activeProject(): Project | undefined {
    return this.projects[this.currentIndex];
  }

  ngAfterViewInit(): void {
    this.trackElement =
      this.host.nativeElement.querySelector<HTMLElement>(
        '.projects-scroll-track',
      ) ?? undefined;

    if (!this.trackElement) {
      return;
    }

    this.applyStaticCardState(0);

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, {
        passive: true,
      });
      window.addEventListener('resize', this.onResize, {
        passive: true,
      });
    });

    this.resizeObserver = new ResizeObserver(() => {
      this.requestScrollUpdate();
    });

    this.resizeObserver.observe(this.trackElement);
    this.requestScrollUpdate();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);

    if (this.scrollFrame !== null) {
      cancelAnimationFrame(this.scrollFrame);
    }

    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.animationTimer !== null) {
      window.clearTimeout(this.animationTimer);
    }

    this.resizeObserver?.disconnect();
  }

  formatIndex(value: number): string {
    return value.toString().padStart(2, '0');
  }

  scrollToProject(index: number): void {
    const track = this.trackElement;
    if (!track) {
      return;
    }

    const safeIndex = Math.min(
      this.projects.length - 1,
      Math.max(0, index),
    );

    const trackTop =
      track.getBoundingClientRect().top + window.scrollY;

    const distance = Math.max(
      track.offsetHeight - window.innerHeight,
      1,
    );

    const targetProgress =
      safeIndex / Math.max(this.projects.length - 1, 1);

    window.scrollTo({
      top: trackTop + distance * targetProgress,
      behavior: window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
        ? 'auto'
        : 'smooth',
    });
  }

  private readonly onScroll = (): void => {
    this.requestScrollUpdate();
  };

  private readonly onResize = (): void => {
    this.requestScrollUpdate();
  };

  private requestScrollUpdate(): void {
    if (this.scrollFrame !== null) {
      return;
    }

    this.scrollFrame = requestAnimationFrame(() => {
      this.scrollFrame = null;
      this.updateFromScroll();
    });
  }

  private updateFromScroll(): void {
    const track = this.trackElement;
    if (!track) {
      return;
    }

    const trackTop =
      track.getBoundingClientRect().top + window.scrollY;

    const distance = Math.max(
      track.offsetHeight - window.innerHeight,
      1,
    );

    const progress = Math.min(
      1,
      Math.max(
        0,
        (window.scrollY - trackTop) / distance,
      ),
    );

    const totalSteps = Math.max(
      this.projects.length - 1,
      1,
    );

    const timeline = progress * totalSteps;

    const nextIndex = Math.min(
      this.projects.length - 1,
      Math.max(0, Math.round(timeline)),
    );

    if (nextIndex === this.renderedIndex) {
      return;
    }

    const jump = Math.abs(
      nextIndex - this.renderedIndex,
    );

    const previousIndex = this.renderedIndex;
    this.renderedIndex = nextIndex;

    this.zone.run(() => {
      this.currentIndex = nextIndex;
      this.cardStates = this.projects.map((_, index) =>
        index === nextIndex
          ? 'active'
          : index < nextIndex
            ? 'passed'
            : 'stacked',
      );
    });

    /*
     * If the user scrolls hard enough to cross multiple project
     * checkpoints in one movement, do NOT animate through the
     * intermediate cards. Jump directly to the destination.
     *
     * This is the key to avoiding the translucent/midpoint state.
     */
    if (jump > 1) {
      this.stopAnimation();
      this.applyStaticCardState(nextIndex);
      return;
    }

    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
    ) {
      this.stopAnimation();
      this.applyStaticCardState(nextIndex);
      return;
    }

    this.animateAdjacentCard(
      previousIndex,
      nextIndex,
    );
  }

  private animateAdjacentCard(
    fromIndex: number,
    toIndex: number,
  ): void {
    this.stopAnimation();

    const cards =
      this.projectCards?.toArray() ?? [];

    const outgoing =
      cards[fromIndex]?.nativeElement;
    const incoming =
      cards[toIndex]?.nativeElement;

    if (!outgoing || !incoming) {
      this.applyStaticCardState(toIndex);
      return;
    }

    const forward = toIndex > fromIndex;

    /*
     * The cards are always fully opaque.
     *
     * The outgoing card leaves first. Only after it is completely
     * out of the way does the incoming card move to the front.
     * So there is no transparent card-over-card composition.
     */
    this.isAnimating = true;

    outgoing.style.opacity = '1';
    outgoing.style.zIndex = '80';
    outgoing.style.pointerEvents = 'none';

    incoming.style.opacity = '1';
    incoming.style.zIndex = '70';
    incoming.style.pointerEvents = 'none';

    const start = performance.now();
    const duration = 360;

    const animate = (now: number): void => {
      const raw = Math.min(
        1,
        (now - start) / duration,
      );

      const eased = this.easeInOut(raw);

      if (raw < 0.58) {
        /* Phase 1 — remove the old card completely. */
        const phase = eased / this.easeInOut(0.58);

        outgoing.style.transform = forward
          ? `translate3d(${-120 * phase}px, ${-165 * phase}px, 0) rotateX(${-7 * phase}deg) rotateZ(${-6 * phase}deg) scale(${1 - 0.045 * phase})`
          : `translate3d(${120 * phase}px, ${-165 * phase}px, 0) rotateX(${-7 * phase}deg) rotateZ(${6 * phase}deg) scale(${1 - 0.045 * phase})`;

        outgoing.style.opacity = '1';

        incoming.style.transform =
  'translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg) scale(1)';

        incoming.style.opacity = '0';
      } else {
        /* Phase 2 — bring the new card in, still fully opaque. */
        outgoing.style.transform = forward
          ? 'translate3d(-120px, -165px, 0) rotateX(-7deg) rotateZ(-6deg) scale(.955)'
          : 'translate3d(120px, -165px, 0) rotateX(-7deg) rotateZ(6deg) scale(.955)';
        outgoing.style.opacity = '1';

        const phase =
          (eased - this.easeInOut(0.58)) /
          (1 - this.easeInOut(0.58));

      //   incoming.style.transform =
      //     this.interpolateStackToFront(
      //       toIndex,
      //       Math.min(1, Math.max(0, phase)),
      //     );
      //   incoming.style.opacity = '1';
      // }

      outgoing.style.opacity = '0';

incoming.style.transform =
  'translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg) scale(1)';

incoming.style.opacity = '1';
incoming.style.zIndex = '80';
      }

      if (raw < 1) {
        this.animationFrame = requestAnimationFrame(
          animate,
        );
        return;
      }

      this.animationFrame = null;
      this.isAnimating = false;
      this.applyStaticCardState(toIndex);
    };

    this.animationFrame = requestAnimationFrame(animate);

    this.animationTimer = window.setTimeout(() => {
      if (!this.isAnimating) {
        return;
      }

      this.stopAnimation();
      this.applyStaticCardState(toIndex);
    }, duration + 80);
  }

  private stackTransform(
    index: number,
    depth: number,
  ): string {
    const safeDepth = Math.min(3, Math.max(1, depth));
    const direction = index % 2 === 0 ? -1 : 1;

    return (
      `translate3d(${safeDepth * 10}px, ${safeDepth * 15}px, 0) ` +
      `rotateX(${-safeDepth * 1.2}deg) ` +
      `rotateZ(${direction * safeDepth * 1.15}deg) ` +
      `scale(${1 - safeDepth * 0.035})`
    );
  }

  // private interpolateStackToFront(
  //   index: number,
  //   progress: number,
  // ): string {
  //   const p = Math.min(1, Math.max(0, progress));
  //   const eased = this.easeInOut(p);
  //   const direction = index % 2 === 0 ? -1 : 1;

  //   const x = 10 * (1 - eased);
  //   const y = 15 * (1 - eased);
  //   const rotateX = -1.2 * (1 - eased);
  //   const rotateZ = direction * 1.15 * (1 - eased);
  //   const scale = 0.965 + 0.035 * eased;

  //   return (
  //     `translate3d(${x}px, ${y}px, 0) ` +
  //     `rotateX(${rotateX}deg) ` +
  //     `rotateZ(${rotateZ}deg) ` +
  //     `scale(${scale})`
  //   );
  // }

  private applyStaticCardState(
    activeIndex: number,
  ): void {
    const cards =
      this.projectCards?.toArray() ?? [];

    cards.forEach((cardRef, index) => {
      const card = cardRef.nativeElement;

      if (index < activeIndex) {
        card.style.transform =
          'translate3d(-120px, -165px, 0) rotateX(-7deg) rotateZ(-6deg) scale(.955)';
        card.style.opacity = '0';
        card.style.zIndex = String(10 - index);
        card.style.pointerEvents = 'none';
        card.dataset['state'] = 'passed';
        return;
      }

      if (index === activeIndex) {
        card.style.transform =
          'translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg) scale(1)';
        card.style.opacity = '1';
        card.style.zIndex = '80';
        card.style.pointerEvents = 'auto';
        card.dataset['state'] = 'active';
        return;
      }

      const depth = Math.min(
        index - activeIndex,
        3,
      );

      card.style.transform = this.stackTransform(
        index,
        depth,
      );
      card.style.opacity = '1';
      card.style.zIndex = String(60 - index);
      card.style.pointerEvents = 'none';
      card.dataset['state'] = 'stacked';
    });
  }

  private stopAnimation(): void {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    if (this.animationTimer !== null) {
      window.clearTimeout(this.animationTimer);
      this.animationTimer = null;
    }

    this.isAnimating = false;
  }

  private easeInOut(value: number): number {
    const clamped = Math.min(
      1,
      Math.max(0, value),
    );

    return clamped * clamped * (3 - 2 * clamped);
  }
}
