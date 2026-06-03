import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header [class.scrolled]="isScrolled()">
      <div class="container">
        <a routerLink="/" class="logo">
          <span class="logo-icon">✦</span>
          <span class="logo-text">Lui Villa</span>
        </a>

        <nav [class.open]="menuOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMenu()">Home</a>
          <a routerLink="/property" routerLinkActive="active" (click)="closeMenu()">Property</a>
          <a routerLink="/gallery" routerLinkActive="active" (click)="closeMenu()">Gallery</a>
          <a routerLink="/pricing" routerLinkActive="active" (click)="closeMenu()">Pricing</a>
          <a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()" class="nav-cta">Book Now</a>
        </nav>

        <button class="hamburger" [class.open]="menuOpen()" (click)="toggleMenu()" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
      </div>

      @if (menuOpen()) {
        <div class="overlay" (click)="closeMenu()"></div>
      }
    </header>
  `,
  styles: [`
    header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      padding: 1.5rem 0;
      transition: var(--transition, all 0.3s ease);
    }

    header.scrolled {
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(12px);
      padding: 0.9rem 0;
      box-shadow: 0 2px 20px rgba(0,0,0,0.08);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 2;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      transition: color 0.3s;
    }

    header.scrolled .logo { color: var(--primary, #1a3c5e); }

    .logo-icon { font-size: 1.4rem; color: var(--accent, #c9a227); }

    .logo-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 1px;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    nav a {
      text-decoration: none;
      color: rgba(255,255,255,0.9);
      font-weight: 500;
      font-size: 0.92rem;
      letter-spacing: 0.3px;
      transition: color 0.3s;
      position: relative;
    }

    nav a::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      width: 0; height: 2px;
      background: var(--accent, #c9a227);
      transition: width 0.3s;
    }

    nav a:hover::after, nav a.active::after { width: 100%; }

    header.scrolled nav a { color: var(--dark, #1c1c1e); }

    nav a:hover, nav a.active { color: var(--accent, #c9a227); }

    nav a.nav-cta {
      background: var(--accent, #c9a227);
      color: white !important;
      padding: 0.55rem 1.4rem;
      border-radius: 50px;
    }
    nav a.nav-cta::after { display: none; }
    nav a.nav-cta:hover { background: var(--accent-dark, #9e7d1a); transform: translateY(-1px); box-shadow: 0 4px 15px rgba(201,162,39,0.4); }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      z-index: 3;
    }

    .hamburger span {
      display: block;
      width: 24px; height: 2px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    header.scrolled .hamburger span { background: var(--dark, #1c1c1e); }

    .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
    .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 1;
    }

    @media (max-width: 768px) {
      .hamburger { display: flex; }

      nav {
        position: fixed;
        top: 0; right: -100%;
        width: 280px;
        height: 100vh;
        background: white;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 2rem;
        gap: 1.5rem;
        box-shadow: -5px 0 30px rgba(0,0,0,0.15);
        transition: right 0.3s ease;
        z-index: 2;
      }

      nav.open { right: 0; }

      nav a { color: var(--dark, #1c1c1e) !important; font-size: 1.05rem; }

      nav a.nav-cta { width: 100%; text-align: center; color: white !important; }
    }
  `]
})
export class HeaderComponent {
  isScrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 60);
  }

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu(): void  { this.menuOpen.set(false); }
}
