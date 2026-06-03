import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer>
      <div class="footer-main">
        <div class="container">
          <div class="footer-grid">

            <div class="footer-brand">
              <a routerLink="/" class="logo">
                <span class="logo-icon">✦</span>
                <span class="logo-text">Lui Villa</span>
              </a>
              <p>Experience unparalleled luxury in our private villa. Your perfect tropical getaway awaits.</p>
              <div class="social-links">
                <a href="https://line.me/ti/p/YOUR_LINE_ID" target="_blank" rel="noopener noreferrer" class="social-btn line-btn">
                  <i class="fab fa-line"></i> Line
                </a>
                <a href="https://www.facebook.com/YOUR_PAGE" target="_blank" rel="noopener noreferrer" class="social-btn fb-btn">
                  <i class="fab fa-facebook-f"></i> Facebook
                </a>
              </div>
            </div>

            <div class="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a routerLink="/">Home</a></li>
                <li><a routerLink="/property">Property</a></li>
                <li><a routerLink="/gallery">Gallery</a></li>
                <li><a routerLink="/pricing">Pricing</a></li>
                <li><a routerLink="/contact">Contact</a></li>
              </ul>
            </div>

            <div class="footer-contact">
              <h4>Get in Touch</h4>
              <ul>
                <li>
                  <i class="fas fa-phone"></i>
                  <a href="tel:+66800000000">+66 80 000 0000</a>
                </li>
                <li>
                  <i class="fab fa-line"></i>
                  <a href="https://line.me/ti/p/YOUR_LINE_ID" target="_blank" rel="noopener noreferrer">&#64;luivilla</a>
                </li>
                <li>
                  <i class="fas fa-envelope"></i>
                  <a href="mailto:info@luivilla.com">info&#64;luivilla.com</a>
                </li>
                <li>
                  <i class="fas fa-map-marker-alt"></i>
                  <span>Thailand</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <p>&copy; {{ year }} Lui Villa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer { background: var(--primary-dark, #0f2538); color: rgba(255,255,255,0.75); }

    .footer-main { padding: 4.5rem 0 3rem; }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1.5fr;
      gap: 3rem;
    }

    .logo {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      margin-bottom: 1rem;
    }

    .logo-icon { color: var(--accent, #c9a227); font-size: 1.2rem; }

    .logo-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem;
      font-weight: 700;
    }

    .footer-brand p {
      font-size: 0.88rem;
      line-height: 1.75;
      margin-bottom: 1.5rem;
      color: rgba(255,255,255,0.55);
    }

    .social-links { display: flex; gap: 0.8rem; flex-wrap: wrap; }

    .social-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.45rem 1rem;
      border-radius: 50px;
      font-size: 0.82rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.3s;
    }

    .line-btn  { background: #06c755; color: white; }
    .fb-btn    { background: #1877f2; color: white; }
    .social-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.3); }

    h4 {
      color: white;
      font-family: 'Playfair Display', serif;
      font-size: 1rem;
      margin-bottom: 1.2rem;
      padding-bottom: 0.7rem;
      position: relative;
    }

    h4::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 28px; height: 2px;
      background: var(--accent, #c9a227);
    }

    ul { list-style: none; padding: 0; margin: 0; }

    .footer-links ul li { margin-bottom: 0.6rem; }

    .footer-links ul li a {
      color: rgba(255,255,255,0.55);
      font-size: 0.88rem;
      text-decoration: none;
      transition: color 0.3s;
    }

    .footer-links ul li a:hover { color: var(--accent, #c9a227); }

    .footer-contact ul li {
      display: flex;
      align-items: flex-start;
      gap: 0.7rem;
      margin-bottom: 0.8rem;
      font-size: 0.88rem;
    }

    .footer-contact ul li i { color: var(--accent, #c9a227); margin-top: 3px; width: 14px; flex-shrink: 0; }

    .footer-contact ul li a { color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.3s; }
    .footer-contact ul li a:hover { color: var(--accent, #c9a227); }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 1.2rem 0;
    }

    .footer-bottom p { text-align: center; font-size: 0.82rem; color: rgba(255,255,255,0.35); }

    @media (max-width: 900px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .footer-brand { grid-column: 1 / 3; }
    }

    @media (max-width: 500px) {
      .footer-grid { grid-template-columns: 1fr; }
      .footer-brand { grid-column: auto; }
    }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
