import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- ═══════════════ HERO ═══════════════ -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-badge">Luxury Villa Rental</span>
        <h1>Your Dream Escape<br>Starts Here</h1>
        <p>
          Immerse yourself in paradise at Lui Villa — a stunning private retreat
          with a pool, lush gardens, and every comfort you deserve.
        </p>
        <div class="hero-actions">
          <a routerLink="/contact" class="btn btn-gold">Book Your Stay</a>
          <a routerLink="/gallery" class="btn btn-ghost">View Gallery</a>
        </div>
      </div>

      <div class="hero-stats">
        @for (stat of stats; track stat.label) {
          <div class="stat">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
          @if (!$last) { <div class="stat-divider"></div> }
        }
      </div>
    </section>

    <!-- ═══════════════ AMENITY STRIP ═══════════════ -->
    <section class="strip">
      <div class="container">
        <div class="strip-grid">
          @for (f of features; track f.label) {
            <div class="strip-item">
              <i [class]="f.icon"></i>
              <span>{{ f.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ═══════════════ ABOUT ═══════════════ -->
    <section class="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-images">
            <div class="img-main">
              <img src="https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=700&q=80" alt="Lui Villa exterior" loading="lazy">
            </div>
            <div class="img-secondary">
              <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=80" alt="Private pool" loading="lazy">
            </div>
            <div class="img-badge">
              <span class="badge-star">5 ★</span>
              <span class="badge-sub">Luxury<br>Experience</span>
            </div>
          </div>

          <div class="about-content">
            <span class="label">About Our Villa</span>
            <h2>A Sanctuary of Comfort &amp; Elegance</h2>
            <p>
              Nestled in a prime tropical location, Lui Villa is a meticulously designed
              three-bedroom retreat that blends modern luxury with natural charm.
              Perfect for families, couples, and groups seeking an exclusive hideaway.
            </p>
            <p>
              Every detail has been crafted for your comfort — from the private pool
              overlooking lush gardens to the fully-equipped gourmet kitchen.
            </p>
            <div class="highlights">
              @for (h of highlights; track h) {
                <div class="highlight-item">
                  <i class="fas fa-check-circle"></i>
                  <span>{{ h }}</span>
                </div>
              }
            </div>
            <a routerLink="/property" class="btn btn-primary">Explore the Villa</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ GALLERY PREVIEW ═══════════════ -->
    <section class="gallery-preview">
      <div class="container">
        <div class="section-head">
          <span class="label">Photo Gallery</span>
          <h2>Explore Every Corner</h2>
        </div>
        <div class="preview-grid">
          @for (img of previewImages; track img.alt; let i = $index) {
            <div class="preview-item" [class.large]="i === 0">
              <img [src]="img.src" [alt]="img.alt" loading="lazy">
              <div class="preview-label">{{ img.alt }}</div>
            </div>
          }
        </div>
        <div class="section-cta">
          <a routerLink="/gallery" class="btn btn-outline-dark">View All Photos</a>
        </div>
      </div>
    </section>

    <!-- ═══════════════ CALL TO ACTION ═══════════════ -->
    <section class="cta-section">
      <div class="cta-overlay"></div>
      <div class="container">
        <div class="cta-content">
          <span class="label light">Ready to Book?</span>
          <h2>Start Your Luxury Getaway Today</h2>
          <p>Contact us now to check availability and reserve your dates.</p>
          <div class="cta-actions">
            <a href="tel:+66800000000" class="btn btn-white">
              <i class="fas fa-phone"></i> Call Now
            </a>
            <a href="https://line.me/ti/p/YOUR_LINE_ID" target="_blank" rel="noopener noreferrer" class="btn btn-line">
              <i class="fab fa-line"></i> Chat on Line
            </a>
            <a routerLink="/contact" class="btn btn-ghost-white">Send Inquiry</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ── Shared ── */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

    .label {
      display: inline-block;
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 0.6rem;
    }
    .label.light { color: rgba(201,162,39,0.9); }

    .section-head { text-align: center; margin-bottom: 3rem; }
    .section-head h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.4rem); color: var(--primary); margin-top: 0.4rem; }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.85rem 2rem;
      border-radius: 50px;
      font-weight: 500;
      font-size: 0.9rem;
      text-decoration: none;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .btn-gold     { background: var(--accent); color: white; }
    .btn-gold:hover { background: var(--accent-dark); transform: translateY(-2px); box-shadow: 0 8px 25px rgba(201,162,39,0.4); }

    .btn-ghost    { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.7); }
    .btn-ghost:hover { background: rgba(255,255,255,0.1); }

    .btn-primary  { background: var(--primary); color: white; }
    .btn-primary:hover { background: var(--primary-light); transform: translateY(-2px); box-shadow: 0 8px 25px rgba(26,60,94,0.3); }

    .btn-outline-dark { background: transparent; color: var(--primary); border: 2px solid var(--primary); }
    .btn-outline-dark:hover { background: var(--primary); color: white; }

    .btn-white    { background: white; color: var(--primary); }
    .btn-white:hover { background: #f0f0f0; transform: translateY(-2px); }

    .btn-line     { background: #06c755; color: white; }
    .btn-line:hover { background: #04a344; transform: translateY(-2px); }

    .btn-ghost-white { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.6); }
    .btn-ghost-white:hover { background: rgba(255,255,255,0.1); }

    /* ── Hero ── */
    .hero {
      position: relative;
      height: 100vh;
      min-height: 680px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background: url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80') center/cover no-repeat;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(15,37,56,0.78) 0%, rgba(26,60,94,0.62) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      color: white;
      max-width: 780px;
      padding: 0 2rem;
      animation: fadeInUp 1s ease;
    }

    .hero-badge {
      display: inline-block;
      background: rgba(201,162,39,0.18);
      border: 1px solid var(--accent);
      color: var(--accent);
      padding: 0.35rem 1.2rem;
      border-radius: 50px;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }

    .hero-content h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.8rem, 6vw, 5rem);
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      text-shadow: 0 2px 20px rgba(0,0,0,0.3);
    }

    .hero-content p {
      font-size: 1.05rem;
      line-height: 1.8;
      color: rgba(255,255,255,0.82);
      margin-bottom: 2.5rem;
      max-width: 580px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

    .hero-stats {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 1.8rem;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 1.1rem 2.5rem;
      border-radius: 100px;
      color: white;
      z-index: 1;
      white-space: nowrap;
    }

    .stat { text-align: center; }
    .stat-value { display: block; font-family: 'Playfair Display', serif; font-size: 1.7rem; color: var(--accent); font-weight: 700; }
    .stat-label { display: block; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.65); margin-top: 2px; }
    .stat-divider { width: 1px; height: 38px; background: rgba(255,255,255,0.2); }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Strip ── */
    .strip { background: var(--primary); padding: 1.8rem 0; }

    .strip-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.8rem; }

    .strip-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      color: rgba(255,255,255,0.82);
      font-size: 0.88rem;
    }

    .strip-item i {
      width: 34px; height: 34px;
      background: rgba(201,162,39,0.18);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent);
      font-size: 0.9rem;
    }

    /* ── About ── */
    .about { padding: 6rem 0; background: var(--light); }

    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }

    .about-images { position: relative; padding-bottom: 3rem; padding-right: 3rem; }

    .img-main img { width: 100%; border-radius: var(--border-radius); box-shadow: 0 20px 60px rgba(0,0,0,0.14); display: block; }

    .img-secondary {
      position: absolute;
      bottom: 0; right: 0;
      width: 54%;
      border-radius: var(--border-radius);
      overflow: hidden;
      border: 5px solid white;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    }
    .img-secondary img { width: 100%; display: block; }

    .img-badge {
      position: absolute;
      top: -1rem; left: -1rem;
      background: var(--accent);
      color: white;
      padding: 1rem 1.2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 6px 20px rgba(201,162,39,0.45);
    }
    .badge-star { display: block; font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; }
    .badge-sub  { display: block; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 1px; line-height: 1.4; margin-top: 2px; }

    .about-content h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,2.5vw,2.3rem); color: var(--primary); line-height: 1.3; margin-bottom: 1rem; margin-top: 0.5rem; }
    .about-content p  { color: var(--gray); line-height: 1.8; margin-bottom: 1rem; font-size: 0.95rem; }

    .highlights { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; margin: 1.5rem 0 2rem; }

    .highlight-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; color: var(--dark); }
    .highlight-item i { color: var(--accent); font-size: 0.9rem; }

    /* ── Gallery Preview ── */
    .gallery-preview { padding: 6rem 0; background: white; }

    .preview-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      grid-template-rows: 240px 240px;
      gap: 0.8rem;
    }

    .preview-item { position: relative; overflow: hidden; border-radius: 10px; cursor: pointer; }
    .preview-item.large { grid-row: 1 / 3; }

    .preview-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .preview-item:hover img { transform: scale(1.06); }

    .preview-label {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      background: linear-gradient(transparent, rgba(15,37,56,0.8));
      color: white;
      padding: 1.5rem 1rem 0.8rem;
      font-size: 0.88rem;
      font-weight: 500;
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.3s;
    }
    .preview-item:hover .preview-label { opacity: 1; transform: translateY(0); }

    .section-cta { text-align: center; margin-top: 2.5rem; }

    /* ── CTA Section ── */
    .cta-section {
      position: relative;
      padding: 6rem 0;
      background: url('https://images.unsplash.com/photo-1540541338537-63fef45f9e90?w=1920&q=80') center/cover no-repeat fixed;
    }

    .cta-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(15,37,56,0.88), rgba(26,60,94,0.82));
    }

    .cta-content { position: relative; z-index: 1; text-align: center; color: white; }

    .cta-content h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.8rem); margin-bottom: 0.8rem; margin-top: 0.5rem; }
    .cta-content p  { color: rgba(255,255,255,0.75); margin-bottom: 2.5rem; font-size: 1rem; }

    .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .about-grid { grid-template-columns: 1fr; gap: 3rem; }
    }

    @media (max-width: 768px) {
      .hero-stats { display: none; }

      .preview-grid {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
      }
      .preview-item.large { grid-row: auto; grid-column: 1 / 3; height: 220px; }
      .preview-item { height: 160px; }
    }

    @media (max-width: 480px) {
      .preview-grid { grid-template-columns: 1fr; }
      .preview-item.large { grid-column: auto; }
    }
  `]
})
export class HomeComponent {
  stats = [
    { value: '3', label: 'Bedrooms' },
    { value: '2', label: 'Bathrooms' },
    { value: '6', label: 'Max Guests' },
    { value: '∞', label: 'Memories' },
  ];

  features = [
    { icon: 'fas fa-swimming-pool', label: 'Private Pool' },
    { icon: 'fas fa-wifi',          label: 'Free WiFi' },
    { icon: 'fas fa-wind',          label: 'Air Conditioning' },
    { icon: 'fas fa-utensils',      label: 'Full Kitchen' },
    { icon: 'fas fa-car',           label: 'Free Parking' },
    { icon: 'fas fa-tv',            label: 'Smart TV' },
    { icon: 'fas fa-shield-alt',    label: '24/7 Security' },
    { icon: 'fas fa-concierge-bell',label: 'Concierge Service' },
  ];

  highlights = [
    '3 Luxury Bedrooms',
    'Private Swimming Pool',
    'Fully Equipped Kitchen',
    'Lush Tropical Garden',
    'High-Speed WiFi',
    'Smart Entertainment System',
  ];

  previewImages = [
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', alt: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80', alt: 'Master Bedroom' },
    { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', alt: 'Private Pool' },
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', alt: 'Kitchen' },
    { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80', alt: 'Villa Exterior' },
  ];
}
