import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';

import {
  siAngular,
  siGit,
  siGo,
  siJavascript,
  siLinux,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siSpring,
  siSqlite,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons';

interface Technology {
  name: string;
  icon: SimpleIcon;
}

interface Experience {
  year: string;
  position: string;
  company: string;
  description: string;
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  template: `
    <main class="about-page">

    <!-- TECHNOLOGY MARQUEE -->
<section
  class="tech-marquee-section"
  aria-label="Technologies I work with"
>
  <div class="tech-marquee">
    <div class="tech-track">

      <!-- First set -->
      <div class="tech-set">
        @for (technology of technologies; track technology.name) {
          <div
            class="tech-logo"
            [attr.aria-label]="technology.name"
            [title]="technology.name"
          >
            <svg
              viewBox="0 0 24 24"
              role="img"
              [attr.aria-label]="technology.name"
            >
              <path [attr.d]="technology.icon.path" />
            </svg>
          </div>
        }
      </div>

      <!-- Duplicate for seamless loop -->
      <div
        class="tech-set"
        aria-hidden="true"
      >
        @for (technology of technologies; track technology.name) {
          <div class="tech-logo">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path [attr.d]="technology.icon.path" />
            </svg>
          </div>
        }
      </div>

    </div>
  </div>
</section>

      <!-- ABOUT -->
      <section
        #revealSection
        class="about-intro reveal-section"
        aria-labelledby="about-title"
      >
        <figure class="portrait-wrap">
          <img
            src="/profile(2).jpeg"
            alt="Portrait of Geremi Wanga"
            width="1200"
            height="1500"
            class="portrait-image"
          />

          <figcaption>
            Kisumu, Kenya · 00°06′S
          </figcaption>
        </figure>

        <div class="intro-copy">
          <p class="section-index">01 / About</p>

          <h1 id="about-title">
            Geremi Wanga
          </h1>

          <p class="role-line">
            Full-Stack Developer
          </p>

          <p class="intro-statement">
            I build practical software across the stack—dependable systems
            behind the scenes and thoughtful interfaces in front of them.
            I care about clarity, craft, and learning by making things that work.
          </p>

          <div class="intro-actions">

            <nav
              class="social-nav"
              aria-label="Social profiles"
            >
              <a
                href="https://github.com/Geremi57"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
                class="social-link"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/geremi-wanga-g2018wtk/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                class="social-link"
              >
                LinkedIn
              </a>
            </nav>

            <span class="action-divider"></span>

            <button
              type="button"
              class="resume-link"
              (click)="downloadCV()"
            >
              Resume

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 17 17 7M8 7h9v9"
                />
              </svg>
            </button>

          </div>
        </div>
      </section>


      <!-- TECHNOLOGIES -->
    


      <!-- EXPERIENCE -->
      <section
        #revealSection
        class="experience-section reveal-section"
        aria-labelledby="experience-title"
      >
        <header class="experience-heading">

          <div>
            <p class="section-index">
              02 / Experience
            </p>

            <h2 id="experience-title">
              Professional journey
            </h2>
          </div>

          <p>
            Learning by building, collaborating, and solving useful problems.
          </p>

        </header>

        <ol class="timeline">

          @for (item of experience; track item.year) {
            <li class="timeline-item">

              <span
                class="timeline-dot"
                aria-hidden="true"
              ></span>

              <time>
                {{ item.year }}
              </time>

              <div class="timeline-role">
                <h3>
                  {{ item.position }}
                </h3>

                <p>
                  {{ item.company }}
                </p>
              </div>

              <p class="timeline-description">
                {{ item.description }}
              </p>

            </li>
          }

        </ol>
      </section>

    </main>
  `,
  styleUrl: './about-section.css',
})

export class AboutSectionComponent {

  // @ViewChildren('revealSection')
  // revealSections!: QueryList<ElementRef<HTMLElement>>;

  // private observer?: IntersectionObserver;

  readonly technologies: Technology[] = [
    { name: 'Go', icon: siGo },
    { name: 'Java', icon: siOpenjdk },
    { name: 'React', icon: siReact },
    { name: 'JavaScript', icon: siJavascript },
    { name: 'TypeScript', icon: siTypescript },
    { name: 'Python', icon: siPython },
    { name: 'Angular', icon: siAngular },
    { name: 'Spring', icon: siSpring },
    // { name: 'Node.js', icon: siNodedotjs },
    { name: 'PostgreSQL', icon: siPostgresql },
    { name: 'SQL', icon: siSqlite },
    { name: 'Git', icon: siGit },
    { name: 'Linux', icon: siLinux },
  ];

  readonly experience: Experience[] = [
    {
      year: '2026 — Present',
      position: 'Apprentice',
      company: 'Zone01 Kisumu',
      description:
        'Building production software through intensive, peer-led engineering projects.',
    },
    {
      year: '2023 — 2025',
      position: 'Freelance Full-Stack Developer',
      company: 'Self-employed',
      description:
        'Developed and maintained web applications using JavaScript and Go.',
    },
  ];

  // ngAfterViewInit(): void {
  //   this.observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('is-visible');
  //           this.observer?.unobserve(entry.target);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.14,
  //     },
  //   );

  //   this.revealSections.forEach((section) => {
  //     this.observer?.observe(section.nativeElement);
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.observer?.disconnect();
  // }

  downloadCV(): void {
    window.open(
      '/Black White Minimalist CV Resume-1.pdf',
      '_blank',
      'noopener,noreferrer',
    );
  }
}