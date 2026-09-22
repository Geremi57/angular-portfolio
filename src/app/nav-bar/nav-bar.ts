import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav
      #navigation
      class="floating-navbar"
      [class.is-scrolled]="isScrolled"
      aria-label="Primary navigation"
    >
      <div class="navbar-pill">

      <svg
  class="navbar-spark"
  viewBox="0 0 900 62"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  <path
    id="navbar-spark-route"
    d="M31 1 H869 A30 30 0 0 1 899 31 A30 30 0 0 1 869 61 H31 A30 30 0 0 1 1 31 A30 30 0 0 1 31 1"
    pathLength="1000"
  />

  <circle class="navbar-spark-dot" r="1.5">
    <animateMotion
      dur="7s"
      repeatCount="indefinite"
    >
      <mpath href="#navbar-spark-route" />
    </animateMotion>
  </circle>
</svg>

        <!-- Brand -->
        <a
          routerLink="/"
          fragment="home"
          class="navbar-brand"
          aria-label="Geremi Wanga — Home"
          (click)="closeMobileMenu()"
        >
          <span>G</span><i>.</i>
        </a>

        <!-- Desktop Links -->
        <div class="navbar-links">

          <a
            routerLink="/"
            fragment="home"
            class="navbar-link"
            [class.active]="activeSection === 'home'"
            (click)="setActiveSection('home')"
          >
            Home
          </a>

          <a
            routerLink="/"
            fragment="projects"
            class="navbar-link"
            [class.active]="activeSection === 'projects'"
            (click)="setActiveSection('projects')"
          >
            Projects
          </a>

          <a
            routerLink="/"
            fragment="about"
            class="navbar-link"
            [class.active]="activeSection === 'about'"
            (click)="setActiveSection('about')"
          >
            About
          </a>

          <a
            routerLink="/blog"
            class="navbar-link"
            [class.active]="activeSection === 'blog'"
            (click)="setActiveSection('blog')"
          >
            Blog
          </a>

        </div>

        <!-- Contact -->
        <a
          routerLink="/"
          fragment="contact"
          class="navbar-contact"
          (click)="setActiveSection('contact')"
        >
          Contact

          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>

        <!-- Mobile Button -->
        <button
          type="button"
          class="mobile-menu-button"
          [class.open]="isMobileMenuOpen"
          [attr.aria-expanded]="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
          (click)="toggleMobileMenu()"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      <!-- Mobile Menu -->
      <div
        class="mobile-menu"
        [class.open]="isMobileMenuOpen"
      >
        <a
          routerLink="/"
          fragment="home"
          class="mobile-link"
          [class.active]="activeSection === 'home'"
          (click)="navigateMobile('home')"
        >
          Home
        </a>

        <a
          routerLink="/"
          fragment="projects"
          class="mobile-link"
          [class.active]="activeSection === 'projects'"
          (click)="navigateMobile('projects')"
        >
          Projects
        </a>

        <a
          routerLink="/"
          fragment="about"
          class="mobile-link"
          [class.active]="activeSection === 'about'"
          (click)="navigateMobile('about')"
        >
          About
        </a>

        <a
          routerLink="/blog"
          class="mobile-link"
          [class.active]="activeSection === 'blog'"
          (click)="navigateMobile('blog')"
        >
          Blog
        </a>

        <a
          routerLink="/"
          fragment="contact"
          class="mobile-contact"
          (click)="navigateMobile('contact')"
        >
          Contact

          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </nav>
  `,

  styles: [`
    :host {
      display: block;
    }

    /* ================================
       FLOATING NAVBAR
    ================================= */

    .floating-navbar {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);

      width: min(900px, calc(100% - 32px));

      z-index: 1000;

      transition: top 250ms ease;
    }

    .navbar-pill {
      height: 62px;
      width: 100%;

      display: flex;
      align-items: center;

      padding: 6px 7px 6px 12px;

      background: rgba(5, 9, 20, 0.86);

      border: 1px solid rgba(59, 130, 246, 0.16);

      border-radius: 999px;

      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);

      box-shadow:
        0 10px 35px rgba(0, 0, 0, 0.35),
        0 0 25px rgba(59, 130, 246, 0.04);

      transition:
        background 250ms ease,
        border-color 250ms ease,
        box-shadow 250ms ease;
    }

    .floating-navbar.is-scrolled .navbar-pill {
      background: rgba(5, 9, 20, 0.94);

      border-color: rgba(59, 130, 246, 0.24);

      box-shadow:
        0 14px 40px rgba(0, 0, 0, 0.45),
        0 0 30px rgba(59, 130, 246, 0.07);
    }

    /* ================================
       BRAND
    ================================= */

    .navbar-brand {
      width: 42px;
      height: 42px;

      flex-shrink: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 50%;

      color: #f8fafc;

      text-decoration: none;

      font-size: 19px;
      font-weight: 700;

      letter-spacing: -0.04em;

      transition:
        background 180ms ease,
        transform 180ms ease;
    }

    .navbar-brand span {
      color: #f8fafc;
    }

    .navbar-brand i {
      color: #3b82f6;
      font-style: normal;
    }

    .navbar-brand:hover {
      background: rgba(59, 130, 246, 0.1);
      transform: scale(1.04);
    }

    /* ================================
       LINKS
    ================================= */

    .navbar-links {
      display: flex;
      align-items: center;

      gap: 3px;

      margin-left: auto;
      margin-right: auto;
    }

    .navbar-link {
      position: relative;

      display: flex;
      align-items: center;

      height: 46px;

      padding: 0 18px;

      border-radius: 999px;

      color: #94a3b8;

      font-size: 14px;
      font-weight: 500;

      text-decoration: none;

      transition:
        color 180ms ease,
        background 180ms ease;
    }

    .navbar-link:hover {
      color: #e2e8f0;
      background: rgba(59, 130, 246, 0.07);
    }

    .navbar-link.active {
      color: #f8fafc;
      background: rgba(59, 130, 246, 0.13);
    }

    .navbar-link.active::after {
      content: '';

      position: absolute;

      bottom: 5px;
      left: 50%;

      width: 3px;
      height: 3px;

      transform: translateX(-50%);

      border-radius: 50%;

      background: #3b82f6;

      box-shadow:
        0 0 7px rgba(59, 130, 246, 0.8);
    }

    /* ================================
       CONTACT
    ================================= */

    .navbar-contact {
      height: 46px;

      display: flex;
      align-items: center;
      gap: 7px;

      padding: 0 19px;

      color: white;

      background: #2563eb;

      border-radius: 999px;

      font-size: 14px;
      font-weight: 600;

      text-decoration: none;

      box-shadow:
        0 5px 18px rgba(37, 99, 235, 0.2);

      transition:
        background 180ms ease,
        transform 180ms ease,
        box-shadow 180ms ease;
    }

    .navbar-contact svg {
      width: 15px;
      height: 15px;

      transition: transform 180ms ease;
    }

    .navbar-contact:hover {
      background: #3b82f6;

      transform: translateY(-1px);

      box-shadow:
        0 7px 22px rgba(37, 99, 235, 0.3);
    }

    .navbar-contact:hover svg {
      transform: translate(2px, -2px);
    }

    /* ================================
       MOBILE BUTTON
    ================================= */

    .mobile-menu-button {
      display: none;

      width: 42px;
      height: 42px;

      margin-left: auto;

      align-items: center;
      justify-content: center;

      flex-direction: column;

      gap: 4px;

      border: 0;
      border-radius: 50%;

      background: transparent;

      cursor: pointer;
    }

    .mobile-menu-button:hover {
      background: rgba(59, 130, 246, 0.08);
    }

    .mobile-menu-button span {
      display: block;

      width: 17px;
      height: 1.5px;

      border-radius: 999px;

      background: #cbd5e1;

      transition:
        transform 200ms ease,
        opacity 200ms ease;
    }

    .mobile-menu-button.open span:nth-child(1) {
      transform: translateY(5.5px) rotate(45deg);
    }

    .mobile-menu-button.open span:nth-child(2) {
      opacity: 0;
    }

    .mobile-menu-button.open span:nth-child(3) {
      transform: translateY(-5.5px) rotate(-45deg);
    }

    /* ================================
       MOBILE MENU
    ================================= */

    .mobile-menu {
      display: none;

      margin-top: 8px;

      padding: 8px;

      background: rgba(5, 9, 20, 0.94);

      border: 1px solid rgba(59, 130, 246, 0.15);

      border-radius: 20px;

      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);

      box-shadow:
        0 18px 40px rgba(0, 0, 0, 0.45);

      opacity: 0;

      transform: translateY(-6px);

      pointer-events: none;

      transition:
        opacity 180ms ease,
        transform 180ms ease;
    }

    .mobile-menu.open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .mobile-link {
      display: flex;
      align-items: center;

      min-height: 46px;

      padding: 0 14px;

      border-radius: 13px;

      color: #94a3b8;

      font-size: 14px;
      font-weight: 500;

      text-decoration: none;
    }

    .mobile-link:hover,
    .mobile-link.active {
      color: #f8fafc;
      background: rgba(59, 130, 246, 0.1);
    }

    .mobile-contact {
      min-height: 46px;

      margin-top: 5px;

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 7px;

      color: white;

      background: #2563eb;

      border-radius: 13px;

      font-size: 14px;
      font-weight: 600;

      text-decoration: none;
    }

    .mobile-contact svg {
      width: 16px;
      height: 16px;
    }

    /* ================================
       RESPONSIVE
    ================================= */

    @media (max-width: 899px) {
      .floating-navbar {
        top: 14px;
        width: calc(100% - 24px);
      }

      .navbar-pill {
        height: 54px;
        padding-left: 8px;
        padding-right: 7px;
      }

      .navbar-links,
      .navbar-contact {
        display: none;
      }

      .mobile-menu-button {
        display: flex;
      }

      .mobile-menu {
        display: block;
      }
    }

    @media (max-width: 420px) {
      .floating-navbar {
        width: calc(100% - 20px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .floating-navbar,
      .navbar-pill,
      .navbar-brand,
      .navbar-link,
      .navbar-contact,
      .navbar-contact svg,
      .mobile-menu,
      .mobile-menu-button span {
        transition: none;
      }
    }
      .navbar-pill {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.navbar-pill::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;

  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 300deg,
    rgba(255, 255, 255, 0.05) 320deg,
    rgba(255, 255, 255, 0.9) 345deg,
    rgba(96, 165, 250, 0.8) 355deg,
    transparent 360deg
  );

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  -webkit-mask-composite: xor;
  mask-composite: exclude;

  animation: borderOrbit 7s linear infinite;

  pointer-events: none;
  z-index: -1;
}

.navbar-pill {
  position: relative;
  isolation: isolate;

  /* keep your existing styles */
  height: 62px;

  background: rgba(5, 9, 20, 0.90);
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 999px;

  overflow: hidden;
}

.navbar-spark {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;

  z-index: 2;
}

.navbar-spark-path {
  fill: none;
  stroke: transparent;
}

.navbar-spark-dot {
  fill: white;

  filter:
    drop-shadow(0 0 2px rgba(255, 255, 255, 0.95))
    drop-shadow(0 0 5px rgba(147, 197, 253, 0.75))
    drop-shadow(0 0 9px rgba(59, 130, 246, 0.35));
}

/* Keep your actual navbar content above the spark */
.navbar-pill > *:not(.navbar-spark) {
  position: relative;
  z-index: 3;
}

@keyframes borderOrbit {
  to {
    transform: rotate(360deg);
  }
}
  `],
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  isMobileMenuOpen = false;
  isScrolled = false;
  activeSection = 'home';

  private observer?: IntersectionObserver;

  constructor(
    private router: Router,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {
    this.setupSectionObserver();
    this.updateScrollState();

    if (this.router.url.startsWith('/blog')) {
      this.activeSection = 'blog';
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateScrollState();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 900) {
      this.closeMobileMenu();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMobileMenuOpen) {
      return;
    }

    const target = event.target as Node;

    if (!this.elementRef.nativeElement.contains(target)) {
      this.closeMobileMenu();
    }
  }

  private updateScrollState(): void {
    this.isScrolled = window.scrollY > 24;
  }

  private setupSectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const sections = ['home', 'projects', 'about', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length) {
          this.activeSection = visible[0].target.id;
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => {
      this.observer?.observe(section);
    });
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  navigateMobile(section: string): void {
    this.activeSection = section;
    this.closeMobileMenu();
  }
}