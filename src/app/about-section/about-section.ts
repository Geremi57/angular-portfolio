import {
  Component,
} from '@angular/core';

import { RevealDirective } from '../shared/reveal.directive';

import {
  siAngular,
  siGit,
  siGo,
  siJavascript,
  siLinux,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siSpring,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons';

interface Technology {
  name: string;
  category: string;
  icon: SimpleIcon;
}

interface Experience {
  year: string;
  position: string;
  company: string;
  description: string;
  technologies: string[];
}

interface FocusArea {
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <main class="about-page">

      <!-- =====================================================
           TECHNOLOGY MARQUEE
      ====================================================== -->

      <section
        class="tech-marquee-section"
        aria-labelledby="technology-title"
      >
        <div class="section-container">

          <div class="marquee-header">
            <p class="section-index">01 / Technology</p>

            <p id="technology-title">
              Tools I use to build across the stack.
            </p>
          </div>

        </div>

        <div class="tech-marquee" aria-label="Technologies I work with">
          <div class="tech-track">

            <!-- First set -->
            <div class="tech-set">
              @for (technology of technologies; track technology.name) {
                <div
                  class="tech-card"
                  [attr.aria-label]="technology.name"
                  [title]="technology.name"
                >
                  <div class="tech-icon">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      [attr.aria-label]="technology.name"
                    >
                      <path [attr.d]="technology.icon.path" />
                    </svg>
                  </div>

                  <div class="tech-info">
                    <span class="tech-name">
                      {{ technology.name }}
                    </span>

                    <span class="tech-category">
                      {{ technology.category }}
                    </span>
                  </div>
                </div>
              }
            </div>

            <!-- Duplicate for seamless loop -->
            <div
              class="tech-set"
              aria-hidden="true"
            >
              @for (technology of technologies; track technology.name) {
                <div class="tech-card">
                  <div class="tech-icon">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path [attr.d]="technology.icon.path" />
                    </svg>
                  </div>

                  <div class="tech-info">
                    <span class="tech-name">
                      {{ technology.name }}
                    </span>

                    <span class="tech-category">
                      {{ technology.category }}
                    </span>
                  </div>
                </div>
              }
            </div>

          </div>
        </div>
      </section>


      <!-- =====================================================
           ABOUT INTRO
      ====================================================== -->

      <section
        class="about-intro"
        aria-labelledby="about-title"
      >

        <div class="section-container about-grid">

          <figure class="portrait-wrap" appReveal revealAnimation="clip">
            <div class="portrait-frame">
              <img
                src="/gwanga~2.jpg"
                alt="Portrait of Geremi Wanga"
                width="1200"
                height="1500"
                class="portrait-image"
              />

              <div class="portrait-overlay"></div>

              <span class="portrait-corner portrait-corner-top"></span>
              <span class="portrait-corner portrait-corner-bottom"></span>
            </div>

            <figcaption>
              Kisumu, Kenya · 00°06′S
            </figcaption>
          </figure>


          <div
  class="intro-copy"
  appReveal
  revealAnimation="fade-left"
  [revealDelay]="140"
>

            <p class="section-index">
              02 / About
            </p>

            <h1 id="about-title">
              Geremi Wanga
            </h1>

            <p class="role-line">
              Full-Stack Developer
            </p>

            <p class="intro-statement">
              I build practical software across the stack — from backend
              services and APIs to interfaces people actually use.
            </p>

            <p class="intro-detail">
              I enjoy working close to the system: understanding how
              applications communicate, how data moves through them, and
              how those pieces come together into reliable products.
              Most of what I know has come from building, breaking,
              debugging, and building again.
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
                  class="social-link"
                >
                  GitHub
                  <span>↗</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/geremi-wanga-g2018wtk/"
                  target="_blank"
                  rel="noreferrer"
                  class="social-link"
                >
                  LinkedIn
                  <span>↗</span>
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

        </div>

      </section>


      <!-- =====================================================
           WHAT I WORK ON
      ====================================================== -->

      <section
        class="focus-section"
        aria-labelledby="focus-title"
      >

        <div class="section-container">

          <header
  class="focus-heading"
  appReveal
  revealAnimation="fade-up"
>

            <div>
              <p class="section-index">
                03 / What I Work On
              </p>

              <h2 id="focus-title">
                From idea to working software.
              </h2>
            </div>

            <p>
              I like understanding the whole product rather than treating
              frontend, backend, and infrastructure as separate worlds.
            </p>

          </header>


          <div class="focus-grid">

            @for (area of focusAreas; track area.number) {
  <article
    class="focus-card"
    appReveal
    revealAnimation="scale"
    [revealDelay]="$index * 110"
  >

                <span class="focus-number">
                  {{ area.number }}
                </span>

                <div>
                  <h3>
                    {{ area.title }}
                  </h3>

                  <p>
                    {{ area.description }}
                  </p>
                </div>

                <span class="focus-arrow">
                  
                </span>

              </article>
            }

          </div>

        </div>

      </section>


      <!-- =====================================================
           EXPERIENCE
      ====================================================== -->

      <section
        class="experience-section"
        aria-labelledby="experience-title"
      >

        <div class="section-container">

          <header
  class="experience-heading"
  appReveal
  revealAnimation="fade-right"
>

            <div>
              <p class="section-index">
                04 / Experience
              </p>

              <h2 id="experience-title">
                Professional journey
              </h2>
            </div>

            <p>
              A path shaped by self-directed learning, collaboration,
              and increasingly complex software projects.
            </p>

          </header>


          <ol class="timeline">

            @for (item of experience; track item.year) {

              <li
  class="timeline-item"
  appReveal
  revealAnimation="fade-left"
  [revealDelay]="$index * 160"
>

                <div class="timeline-meta">

                  <time>
                    {{ item.year }}
                  </time>

                  <span class="timeline-line"></span>

                </div>


                <div class="timeline-marker">
                  <span></span>
                </div>


                <article class="experience-card">

                  <div class="experience-top">

                    <div>
                      <h3>
                        {{ item.position }}
                      </h3>

                      <p class="experience-company">
                        {{ item.company }}
                      </p>
                    </div>

                    <span class="experience-index">
                      0{{ $index + 1 }}
                    </span>

                  </div>


                  <p class="timeline-description">
                    {{ item.description }}
                  </p>


                  <div class="experience-stack">

                    @for (
                      technology of item.technologies;
                      track technology
                    ) {
                      <span>
                        {{ technology }}
                      </span>
                    }

                  </div>

                </article>

              </li>

            }

          </ol>

        </div>

      </section>


      <!-- =====================================================
           CLOSING STATEMENT
      ====================================================== -->


      <section
  class="about-closing"
  appReveal
  revealAnimation="scale"
>

        <div class="section-container">

          <div class="closing-line"></div>

          <p class="closing-label">
            Lets build.
          </p>

          <h2>
            Persistence over priviledge Always.
          </h2>

        </div>

      </section>

    </main>
  `,

  styleUrl: './about-section.css',
})
export class AboutSectionComponent {

  readonly technologies: Technology[] = [
    {
      name: 'Go',
      category: 'Backend',
      icon: siGo,
    },
    {
      name: 'Java',
      category: 'Backend',
      icon: siOpenjdk,
    },
    {
      name: 'Spring',
      category: 'Framework',
      icon: siSpring,
    },
    {
      name: 'JavaScript',
      category: 'Language',
      icon: siJavascript,
    },
    {
      name: 'TypeScript',
      category: 'Language',
      icon: siTypescript,
    },
    {
      name: 'Angular',
      category: 'Frontend',
      icon: siAngular,
    },
    {
      name: 'React',
      category: 'Frontend',
      icon: siReact,
    },
    {
      name: 'Python',
      category: 'Language',
      icon: siPython,
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      icon: siPostgresql,
    },
    {
      name: 'Git',
      category: 'Tools',
      icon: siGit,
    },
    {
      name: 'Linux',
      category: 'Systems',
      icon: siLinux,
    },
  ];

  readonly focusAreas: FocusArea[] = [
    {
      number: '01',
      title: 'Web Applications',
      description:
        'Full-stack applications with responsive interfaces, APIs, authentication, and the systems connecting everything together.',
    },
    {
      number: '02',
      title: 'APIs & Services',
      description:
        'Backend services and REST APIs designed around clear contracts, useful abstractions, and reliable communication.',
    },
    {
      number: '03',
      title: 'Data & Infrastructure',
      description:
        'Working with databases, Linux environments, containers, deployment workflows, and the infrastructure behind applications.',
    },
    {
      number: '04',
      title: 'Product Interfaces',
      description:
        'Interfaces that focus on clarity, responsiveness, accessibility, and making complex functionality feel straightforward.',
    },
  ];

  readonly experience: Experience[] = [
    {
      year: '2026 — Present',
      position: 'Apprentice',
      company: 'Zone01 Kisumu',
      description:
        'Building software through intensive, peer-led engineering projects. The work combines problem solving, collaboration, code reviews, and learning to work within real development constraints.',
      technologies: [
        'Go',
        'Java',
        'JavaScript',
        'Git',
        'Linux',
      ],
    },
    {
      year: '2023 — 2025',
      position: 'Freelance Full-Stack Developer',
      company: 'Self-employed',
      description:
        'Designed and developed web applications across the frontend and backend, working with APIs, databases, application architecture, and deployment while learning through hands-on projects.',
      technologies: [
        'JavaScript',
        'TypeScript',
        'Angular',
        'Go',
        'PostgreSQL',
      ],
    },
  ];

  downloadCV(): void {
    window.open(
      '/Black White Minimalist CV Resume-1.pdf',
      '_blank',
      'noopener,noreferrer',
    );
  }
}