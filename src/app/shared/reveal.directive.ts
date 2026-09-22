import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

type RevealAnimation =
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'scale'
  | 'clip';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;
  @Input() revealAnimation: RevealAnimation = 'fade-up';

  private observer?: IntersectionObserver;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.setStyle(
      element,
      '--reveal-delay',
      `${this.revealDelay}ms`,
    );

    this.renderer.addClass(
      element,
      `reveal-${this.revealAnimation}`,
    );

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.renderer.addClass(element, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          this.renderer.addClass(element, 'is-visible');

          this.observer?.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}