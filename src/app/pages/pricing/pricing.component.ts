import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe, NgClass } from '@angular/common';

interface Season {
  name: string;
  period: string;
  pricePerNight: number;
  minStay: number;
  highlight: boolean;
  tag?: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, DecimalPipe, NgClass],
  template: `
    <div class="page-header">
      <h1>Pricing</h1>
      <p>Transparent pricing with no hidden fees — what you see is what you pay</p>
    </div>

    <!-- ── Season Cards ── -->
    <section class="pricing-section">
      <div class="container">
        <div class="section-head center">
          <span class="label">Our Rates</span>
          <h2>Seasonal Pricing</h2>
          <p class="subtitle">All rates are per night. Prices shown in Thai Baht (THB).</p>
        </div>

        <div class="season-grid">
          @for (season of seasons; track season.name) {
            <div class="season-card" [class.highlight]="season.highlight">
              @if (season.tag) {
                <div class="card-tag">{{ season.tag }}</div>
              }
              <div class="season-icon">
                <i [class]="getSeasonIcon(season.name)"></i>
              </div>
              <h3>{{ season.name }}</h3>
              <p class="season-period">{{ season.period }}</p>
              <div class="price-block">
                <span class="price-currency">฿</span>
                <span class="price-amount">{{ season.pricePerNight | number }}</span>
                <span class="price-unit">/ night</span>
              </div>
              <p class="min-stay">
                <i class="fas fa-calendar-alt"></i>
                Min. stay: {{ season.minStay }} night{{ season.minStay > 1 ? 's' : '' }}
              </p>
              <a routerLink="/contact" class="btn" [class.btn-white]="season.highlight" [class.btn-primary]="!season.highlight">
                Book This Period
              </a>
            </div>
          }
        </div>

        <p class="pricing-note">
          <i class="fas fa-info-circle"></i>
          Prices are subject to change. Contact us for long-stay discounts (7+ nights).
        </p>
      </div>
    </section>

    <!-- ── What's Included ── -->
    <section class="whats-included">
      <div class="container">
        <div class="section-head center">
          <span class="label">All-Inclusive</span>
          <h2>What's Included in Every Stay</h2>
        </div>
        <div class="included-grid">
          @for (item of included; track item.title) {
            <div class="included-item">
              <div class="included-icon">
                <i [class]="item.icon"></i>
              </div>
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ── Add-ons ── -->
    <section class="addons">
      <div class="container">
        <div class="section-head center">
          <span class="label">Enhance Your Stay</span>
          <h2>Optional Add-On Services</h2>
        </div>
        <div class="addon-grid">
          @for (addon of addons; track addon.name) {
            <div class="addon-card">
              <i [class]="addon.icon"></i>
              <div>
                <h4>{{ addon.name }}</h4>
                <p>{{ addon.description }}</p>
              </div>
              <span class="addon-price">{{ addon.price }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ── Policies ── -->
    <section class="policies">
      <div class="container">
        <div class="section-head center">
          <span class="label">Good to Know</span>
          <h2>Booking &amp; Cancellation Policies</h2>
        </div>
        <div class="policy-grid">
          @for (policy of policies; track policy.title) {
            <div class="policy-card">
              <i [class]="policy.icon"></i>
              <h4>{{ policy.title }}</h4>
              <p>{{ policy.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="pricing-cta">
      <div class="container">
        <div class="cta-inner">
          <div>
            <h3>Ready to Reserve Your Dates?</h3>
            <p>Contact us today to check availability and secure your booking.</p>
          </div>
          <div class="cta-actions">
            <a href="tel:+66800000000" class="btn btn-outline-dark">
              <i class="fas fa-phone"></i> Call Us
            </a>
            <a routerLink="/contact" class="btn btn-primary">
              <i class="fas fa-envelope"></i> Send Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

    .label {
      display: inline-block;
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 0.6rem;
    }

    .section-head { margin-bottom: 3rem; }
    .section-head.center { text-align: center; }
    .section-head h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.4rem); color: var(--primary); margin-top: 0.4rem; }
    .subtitle { color: var(--gray); font-size: 0.9rem; margin-top: 0.5rem; }

    .btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.75rem 1.8rem; border-radius: 50px;
      font-weight: 500; font-size: 0.88rem;
      text-decoration: none; transition: all 0.3s; border: none; cursor: pointer;
      font-family: 'Poppins', sans-serif;
    }
    .btn-primary { background: var(--primary); color: white; }
    .btn-primary:hover { background: var(--primary-light); transform: translateY(-2px); }
    .btn-white   { background: white; color: var(--primary); }
    .btn-white:hover { background: #f0f0f0; transform: translateY(-2px); }
    .btn-outline-dark { background: transparent; color: var(--primary); border: 2px solid var(--primary); }
    .btn-outline-dark:hover { background: var(--primary); color: white; }

    /* Season Cards */
    .pricing-section { padding: 5rem 0; background: var(--light); }

    .season-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 1.5rem; }

    .season-card {
      background: white;
      border-radius: var(--border-radius);
      padding: 2.5rem 2rem;
      text-align: center;
      box-shadow: var(--shadow);
      position: relative;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .season-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); }

    .season-card.highlight {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: white;
      transform: scale(1.04);
    }
    .season-card.highlight:hover { transform: scale(1.04) translateY(-4px); }

    .card-tag {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent);
      color: white;
      font-size: 0.72rem;
      font-weight: 600;
      padding: 0.25rem 1rem;
      border-radius: 50px;
      letter-spacing: 1px;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .season-icon {
      width: 60px; height: 60px;
      background: rgba(201,162,39,0.12);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1.2rem;
      font-size: 1.5rem;
      color: var(--accent);
    }
    .season-card.highlight .season-icon { background: rgba(255,255,255,0.15); color: var(--accent-light); }

    .season-card h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin-bottom: 0.3rem; }
    .season-card.highlight h3 { color: white; }

    .season-period { font-size: 0.82rem; color: var(--gray); margin-bottom: 1.5rem; }
    .season-card.highlight .season-period { color: rgba(255,255,255,0.65); }

    .price-block { display: flex; align-items: flex-end; justify-content: center; gap: 2px; margin-bottom: 1rem; }
    .price-currency { font-size: 1.2rem; font-weight: 600; color: var(--accent); padding-bottom: 4px; }
    .price-amount   { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: var(--primary); line-height: 1; }
    .price-unit     { font-size: 0.82rem; color: var(--gray); padding-bottom: 8px; }

    .season-card.highlight .price-amount { color: white; }
    .season-card.highlight .price-unit   { color: rgba(255,255,255,0.65); }

    .min-stay { font-size: 0.82rem; color: var(--gray); margin-bottom: 1.8rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
    .min-stay i { color: var(--accent); }
    .season-card.highlight .min-stay { color: rgba(255,255,255,0.65); }

    .pricing-note {
      text-align: center;
      font-size: 0.85rem;
      color: var(--gray);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .pricing-note i { color: var(--primary-light); }

    /* What's Included */
    .whats-included { padding: 5rem 0; background: white; }

    .included-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }

    .included-item {
      text-align: center;
      padding: 2rem 1.5rem;
      background: var(--light);
      border-radius: var(--border-radius);
      transition: transform 0.3s;
    }
    .included-item:hover { transform: translateY(-4px); }

    .included-icon {
      width: 56px; height: 56px;
      background: var(--primary);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.3rem;
      color: white;
    }

    .included-item h4 { font-size: 0.95rem; color: var(--primary); margin-bottom: 0.4rem; }
    .included-item p  { font-size: 0.82rem; color: var(--gray); line-height: 1.6; margin: 0; }

    /* Add-ons */
    .addons { padding: 5rem 0; background: var(--light); }

    .addon-grid { display: flex; flex-direction: column; gap: 1rem; }

    .addon-card {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      background: white;
      padding: 1.3rem 1.8rem;
      border-radius: 10px;
      box-shadow: var(--shadow);
    }

    .addon-card > i { font-size: 1.3rem; color: var(--accent); width: 28px; flex-shrink: 0; }
    .addon-card > div { flex: 1; }
    .addon-card h4  { font-size: 0.95rem; color: var(--dark); margin-bottom: 0.15rem; }
    .addon-card p   { font-size: 0.82rem; color: var(--gray); margin: 0; }
    .addon-price    { font-weight: 600; color: var(--primary); white-space: nowrap; font-size: 0.9rem; }

    /* Policies */
    .policies { padding: 5rem 0; background: white; }

    .policy-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }

    .policy-card {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--light);
      border-radius: var(--border-radius);
    }

    .policy-card > i { font-size: 1.3rem; color: var(--accent); margin-top: 2px; flex-shrink: 0; }
    .policy-card h4  { font-size: 0.95rem; color: var(--primary); margin-bottom: 0.4rem; }
    .policy-card p   { font-size: 0.85rem; color: var(--gray); line-height: 1.6; margin: 0; }

    /* Pricing CTA */
    .pricing-cta { padding: 4rem 0; background: var(--primary-dark); }

    .cta-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .cta-inner h3 { font-family: 'Playfair Display', serif; color: white; font-size: 1.4rem; margin-bottom: 0.3rem; }
    .cta-inner p  { color: rgba(255,255,255,0.6); font-size: 0.9rem; margin: 0; }

    .cta-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

    /* Responsive */
    @media (max-width: 900px) {
      .season-grid { grid-template-columns: 1fr; max-width: 400px; margin-left: auto; margin-right: auto; }
      .season-card.highlight { transform: none; }
      .included-grid { grid-template-columns: repeat(2, 1fr); }
      .policy-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 600px) {
      .included-grid { grid-template-columns: 1fr; }
      .cta-inner { flex-direction: column; text-align: center; }
    }
  `]
})
export class PricingComponent {
  seasons: Season[] = [
    { name: 'Low Season',  period: 'May – October',        pricePerNight: 4500,  minStay: 2, highlight: false },
    { name: 'High Season', period: 'November – February',  pricePerNight: 6500,  minStay: 3, highlight: true,  tag: 'Most Popular' },
    { name: 'Peak Season', period: 'March – April, Dec 20 – Jan 5', pricePerNight: 9000, minStay: 5, highlight: false },
  ];

  getSeasonIcon(name: string): string {
    if (name.includes('Low'))  return 'fas fa-cloud-sun';
    if (name.includes('High')) return 'fas fa-sun';
    return 'fas fa-star';
  }

  included = [
    { icon: 'fas fa-broom',          title: 'Daily Housekeeping',      description: 'Fresh towels, linens, and villa cleaning every morning.' },
    { icon: 'fas fa-wifi',           title: 'High-Speed WiFi',          description: 'Unlimited fibre internet throughout the villa.' },
    { icon: 'fas fa-swimming-pool',  title: 'Private Pool',             description: 'Exclusive use of the heated pool, 24/7.' },
    { icon: 'fas fa-parking',        title: 'Free Parking',             description: 'Secure private parking for up to 2 vehicles.' },
    { icon: 'fas fa-gifts',          title: 'Welcome Package',          description: 'Arrival fruits, refreshments, and local snacks.' },
    { icon: 'fas fa-concierge-bell', title: 'Concierge Service',        description: 'Personal assistance for tours, restaurants, and more.' },
    { icon: 'fas fa-shield-alt',     title: '24/7 Security',            description: 'Round-the-clock security for your peace of mind.' },
    { icon: 'fas fa-baby',           title: 'Baby Equipment',           description: 'Cot, high chair, and stroller available on request.' },
  ];

  addons = [
    { icon: 'fas fa-car',           name: 'Airport Transfer',          description: 'Private car transfer from/to airport (up to 4 people).', price: '฿1,500 per trip' },
    { icon: 'fas fa-utensils',      name: 'Private Chef',              description: 'In-villa chef service for breakfast, lunch, or dinner.',  price: 'From ฿3,000 per meal' },
    { icon: 'fas fa-spa',           name: 'In-Villa Massage',          description: 'Professional massage therapist at the villa.',            price: 'From ฿1,200 per hour' },
    { icon: 'fas fa-birthday-cake', name: 'Special Occasion Setup',    description: 'Romantic decoration, flowers, and cake arrangement.',    price: 'From ฿2,500' },
    { icon: 'fas fa-motorcycle',    name: 'Scooter Rental',            description: 'Daily scooter hire for exploring the area.',              price: '฿500 per day' },
  ];

  policies = [
    { icon: 'fas fa-file-signature',   title: 'Reservation Deposit',   text: 'A 30% deposit is required to confirm your booking. The balance is due 14 days before check-in.' },
    { icon: 'fas fa-calendar-times',   title: 'Cancellation Policy',   text: 'Full refund if cancelled 30+ days before arrival. 50% refund for 14–29 days. No refund within 14 days.' },
    { icon: 'fas fa-credit-card',      title: 'Payment Methods',       text: 'Bank transfer, credit card (Visa/Mastercard), or cash. All transactions in Thai Baht (THB).' },
    { icon: 'fas fa-exchange-alt',     title: 'Date Changes',          text: 'Date changes subject to availability. Changes within 14 days of arrival may incur a fee.' },
  ];
}
