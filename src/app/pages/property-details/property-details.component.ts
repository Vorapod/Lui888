import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-header">
      <h1>Property Details</h1>
      <p>Everything you need to know about your stay at Lui Villa</p>
    </div>

    <!-- ── Overview ── -->
    <section class="overview">
      <div class="container">
        <div class="overview-grid">
          <div class="overview-image">
            <img src="https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=700&q=80" alt="Lui Villa front view" loading="lazy">
          </div>
          <div class="overview-content">
            <span class="label">Our Property</span>
            <h2>Lui Villa</h2>
            <p class="tagline">A Luxurious 3-Bedroom Private Villa with Pool</p>
            <p>
              Lui Villa is an exquisitely designed private retreat set amidst tropical
              gardens. With three elegantly furnished bedrooms, a sparkling private pool,
              and premium amenities throughout, it offers a complete luxury experience
              for up to six guests.
            </p>

            <div class="key-stats">
              @for (s of keyStats; track s.label) {
                <div class="key-stat">
                  <i [class]="s.icon"></i>
                  <div>
                    <span class="key-stat-value">{{ s.value }}</span>
                    <span class="key-stat-label">{{ s.label }}</span>
                  </div>
                </div>
              }
            </div>

            <a routerLink="/contact" class="btn btn-primary">
              <i class="fas fa-calendar-check"></i> Check Availability
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Amenities ── -->
    <section class="amenities">
      <div class="container">
        <div class="section-head center">
          <span class="label">What's Included</span>
          <h2>Amenities &amp; Features</h2>
        </div>
        <div class="amenity-categories">
          @for (cat of amenityCategories; track cat.title) {
            <div class="amenity-cat">
              <div class="cat-header">
                <i [class]="cat.icon"></i>
                <h3>{{ cat.title }}</h3>
              </div>
              <ul>
                @for (item of cat.items; track item) {
                  <li><i class="fas fa-check"></i>{{ item }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ── Bedrooms ── -->
    <section class="bedrooms">
      <div class="container">
        <div class="section-head center">
          <span class="label">Sleep in Style</span>
          <h2>The Bedrooms</h2>
        </div>
        <div class="bedroom-grid">
          @for (room of bedrooms; track room.name) {
            <div class="bedroom-card">
              <div class="bedroom-img">
                <img [src]="room.image" [alt]="room.name" loading="lazy">
              </div>
              <div class="bedroom-info">
                <h3>{{ room.name }}</h3>
                <p>{{ room.description }}</p>
                <ul>
                  @for (feature of room.features; track feature) {
                    <li><i class="fas fa-bed"></i>{{ feature }}</li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ── Location ── -->
    <section class="location">
      <div class="container">
        <div class="location-grid">
          <div class="location-content">
            <span class="label">Where We Are</span>
            <h2>Location &amp; Surroundings</h2>
            <p>
              Lui Villa is perfectly situated to give you easy access to local attractions,
              beaches, restaurants, and shopping — while still feeling like a world away
              from the everyday.
            </p>
            <ul class="location-list">
              @for (item of locationPoints; track item.place) {
                <li>
                  <i class="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>{{ item.place }}</strong>
                    <span>{{ item.distance }}</span>
                  </div>
                </li>
              }
            </ul>
          </div>
          <div class="map-placeholder">
            <div class="map-inner">
              <i class="fas fa-map-marked-alt"></i>
              <p>Map available upon booking confirmation</p>
              <a routerLink="/contact" class="btn btn-primary">Request Location</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── House Rules ── -->
    <section class="rules">
      <div class="container">
        <div class="section-head center">
          <span class="label">Important Information</span>
          <h2>House Rules</h2>
        </div>
        <div class="rules-grid">
          @for (rule of houseRules; track rule.title) {
            <div class="rule-card" [class.do]="rule.type === 'do'" [class.dont]="rule.type === 'dont'">
              <i [class]="rule.icon"></i>
              <div>
                <h4>{{ rule.title }}</h4>
                <p>{{ rule.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
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

    .section-head { margin-bottom: 3rem; }
    .section-head.center { text-align: center; }
    .section-head h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.4rem); color: var(--primary); margin-top: 0.4rem; }

    .btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.85rem 2rem; border-radius: 50px;
      font-weight: 500; font-size: 0.9rem;
      text-decoration: none; transition: all 0.3s; border: none; cursor: pointer;
    }
    .btn-primary { background: var(--primary); color: white; }
    .btn-primary:hover { background: var(--primary-light); transform: translateY(-2px); box-shadow: 0 8px 25px rgba(26,60,94,0.3); }

    /* Overview */
    .overview { padding: 5rem 0; background: var(--light); }

    .overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }

    .overview-image img { width: 100%; border-radius: var(--border-radius); box-shadow: 0 20px 50px rgba(0,0,0,0.12); }

    .overview-content h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--primary); margin: 0.4rem 0 0.3rem; }
    .tagline { color: var(--accent); font-weight: 500; font-size: 0.95rem; margin-bottom: 1rem; }
    .overview-content > p { color: var(--gray); line-height: 1.8; font-size: 0.95rem; margin-bottom: 1.5rem; }

    .key-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0 2rem; }

    .key-stat { display: flex; align-items: center; gap: 0.8rem; padding: 0.9rem; background: white; border-radius: 10px; box-shadow: var(--shadow); }
    .key-stat i { font-size: 1.3rem; color: var(--accent); width: 28px; text-align: center; }
    .key-stat-value { display: block; font-family: 'Playfair Display', serif; font-size: 1.2rem; color: var(--primary); font-weight: 700; }
    .key-stat-label { display: block; font-size: 0.75rem; color: var(--gray); }

    /* Amenities */
    .amenities { padding: 5rem 0; background: white; }

    .amenity-categories { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }

    .amenity-cat { background: var(--light); padding: 2rem; border-radius: var(--border-radius); }

    .cat-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.2rem; }
    .cat-header i { font-size: 1.3rem; color: var(--accent); }
    .cat-header h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--primary); }

    .amenity-cat ul { list-style: none; padding: 0; }
    .amenity-cat ul li { display: flex; align-items: center; gap: 0.6rem; padding: 0.4rem 0; font-size: 0.88rem; color: var(--dark); border-bottom: 1px solid rgba(0,0,0,0.05); }
    .amenity-cat ul li:last-child { border-bottom: none; }
    .amenity-cat ul li i { color: var(--success, #2ecc71); font-size: 0.75rem; }

    /* Bedrooms */
    .bedrooms { padding: 5rem 0; background: var(--light); }

    .bedroom-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }

    .bedroom-card { background: white; border-radius: var(--border-radius); overflow: hidden; box-shadow: var(--shadow); transition: transform 0.3s, box-shadow 0.3s; }
    .bedroom-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); }

    .bedroom-img { height: 200px; overflow: hidden; }
    .bedroom-img img { width: 100%; height: 100%; object-fit: cover; }

    .bedroom-info { padding: 1.5rem; }
    .bedroom-info h3 { font-family: 'Playfair Display', serif; color: var(--primary); margin-bottom: 0.5rem; }
    .bedroom-info p { font-size: 0.88rem; color: var(--gray); line-height: 1.6; margin-bottom: 1rem; }

    .bedroom-info ul { list-style: none; padding: 0; }
    .bedroom-info ul li { display: flex; align-items: center; gap: 0.5rem; font-size: 0.83rem; color: var(--dark); margin-bottom: 0.3rem; }
    .bedroom-info ul li i { color: var(--accent); font-size: 0.8rem; }

    /* Location */
    .location { padding: 5rem 0; background: white; }

    .location-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }

    .location-content h2 { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--primary); margin: 0.4rem 0 1rem; }
    .location-content > p { color: var(--gray); line-height: 1.8; font-size: 0.95rem; margin-bottom: 1.5rem; }

    .location-list { list-style: none; padding: 0; }
    .location-list li { display: flex; align-items: flex-start; gap: 1rem; padding: 0.8rem 0; border-bottom: 1px solid var(--gray-light); }
    .location-list li:last-child { border-bottom: none; }
    .location-list li i { color: var(--accent); margin-top: 3px; }
    .location-list li strong { display: block; font-size: 0.9rem; color: var(--dark); }
    .location-list li span { font-size: 0.82rem; color: var(--gray); }

    .map-placeholder {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      border-radius: var(--border-radius);
      height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .map-inner { text-align: center; color: white; }
    .map-inner i { font-size: 4rem; color: var(--accent); margin-bottom: 1rem; display: block; }
    .map-inner p { margin-bottom: 1.5rem; color: rgba(255,255,255,0.8); }

    /* House Rules */
    .rules { padding: 5rem 0; background: var(--light); }

    .rules-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; }

    .rule-card {
      display: flex; align-items: flex-start; gap: 1rem;
      padding: 1.3rem 1.5rem;
      background: white;
      border-radius: 10px;
      border-left: 4px solid var(--gray-light);
      box-shadow: var(--shadow);
    }
    .rule-card.do   { border-left-color: var(--success, #2ecc71); }
    .rule-card.dont { border-left-color: var(--error, #e74c3c); }

    .rule-card > i { font-size: 1.3rem; margin-top: 2px; flex-shrink: 0; }
    .rule-card.do   > i { color: var(--success, #2ecc71); }
    .rule-card.dont > i { color: var(--error, #e74c3c); }

    .rule-card h4 { font-size: 0.95rem; color: var(--dark); margin-bottom: 0.25rem; }
    .rule-card p  { font-size: 0.83rem; color: var(--gray); line-height: 1.5; margin: 0; }

    /* Responsive */
    @media (max-width: 900px) {
      .overview-grid { grid-template-columns: 1fr; }
      .amenity-categories { grid-template-columns: 1fr 1fr; }
      .bedroom-grid { grid-template-columns: 1fr 1fr; }
      .location-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 600px) {
      .amenity-categories, .bedroom-grid { grid-template-columns: 1fr; }
      .key-stats { grid-template-columns: 1fr 1fr; }
      .rules-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class PropertyDetailsComponent {
  keyStats = [
    { icon: 'fas fa-bed',           value: '3',       label: 'Bedrooms' },
    { icon: 'fas fa-bath',          value: '2',       label: 'Bathrooms' },
    { icon: 'fas fa-users',         value: '6',       label: 'Max Guests' },
    { icon: 'fas fa-vector-square', value: '350 m²',  label: 'Villa Area' },
  ];

  amenityCategories = [
    {
      icon: 'fas fa-home',
      title: 'Living Spaces',
      items: ['Spacious living room', 'Dining area (seats 8)', 'Private pool & sundeck', 'Tropical garden', 'BBQ area', 'Outdoor shower'],
    },
    {
      icon: 'fas fa-utensils',
      title: 'Kitchen & Dining',
      items: ['Fully equipped kitchen', 'Espresso machine', 'Refrigerator & freezer', 'Microwave & oven', 'Cooking essentials', 'Tableware & utensils'],
    },
    {
      icon: 'fas fa-wifi',
      title: 'Tech & Comfort',
      items: ['High-speed WiFi', 'Smart TV in each room', 'Air conditioning', 'Ceiling fans', 'Bluetooth speakers', 'USB charging ports'],
    },
    {
      icon: 'fas fa-star',
      title: 'Guest Services',
      items: ['Daily housekeeping', 'Welcome fruit basket', 'Concierge service', 'Airport transfer (extra)', 'Tour booking assistance', '24/7 emergency contact'],
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Safety & Security',
      items: ['24/7 security system', 'CCTV cameras (exterior)', 'Safe deposit box', 'Secure key card entry', 'Pool safety net available', 'First aid kit'],
    },
    {
      icon: 'fas fa-car',
      title: 'Parking & Access',
      items: ['Private parking (2 cars)', 'Easy access location', 'Luggage storage', 'Linens & towels', 'Pool towels provided', 'Baby equipment (on request)'],
    },
  ];

  bedrooms = [
    {
      name: 'Master Suite',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
      description: 'A lavish retreat with king-size bed, en-suite bathroom, and private garden views.',
      features: ['King-size bed', 'En-suite bathroom', 'Walk-in wardrobe', 'Garden view balcony'],
    },
    {
      name: 'Bedroom 2',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
      description: 'Elegantly appointed with queen-size bed and direct pool access.',
      features: ['Queen-size bed', 'Pool access', 'Built-in wardrobe', 'Smart TV'],
    },
    {
      name: 'Bedroom 3',
      image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80',
      description: 'Perfect for families or friends with two comfortable single beds.',
      features: ['Twin single beds', 'Garden view', 'Shared bathroom access', 'Desk workspace'],
    },
  ];

  locationPoints = [
    { place: 'Beach',           distance: '5 min drive' },
    { place: 'Restaurants',     distance: '3 min walk' },
    { place: 'Convenience store', distance: '2 min walk' },
    { place: 'Town centre',     distance: '10 min drive' },
    { place: 'Airport',         distance: '35 min drive' },
  ];

  houseRules = [
    { type: 'do',   icon: 'fas fa-clock',           title: 'Check-in & Check-out',     description: 'Check-in from 2:00 PM. Check-out by 12:00 PM. Late check-out subject to availability.' },
    { type: 'do',   icon: 'fas fa-users',           title: 'Guest Limit',              description: 'Maximum 6 guests. Additional guests require prior approval and may incur extra charges.' },
    { type: 'dont', icon: 'fas fa-smoking-ban',     title: 'No Smoking Indoors',       description: 'Smoking is strictly prohibited inside the villa. A designated outdoor area is available.' },
    { type: 'dont', icon: 'fas fa-volume-mute',     title: 'Quiet Hours',              description: 'Please respect neighbors. Quiet hours are 10:00 PM – 8:00 AM.' },
    { type: 'do',   icon: 'fas fa-paw',             title: 'Pets',                     description: 'Well-behaved pets may be permitted with prior approval. Please enquire when booking.' },
    { type: 'dont', icon: 'fas fa-exclamation-triangle', title: 'No Parties',          description: 'Unauthorized events or parties are not permitted without prior written consent.' },
    { type: 'do',   icon: 'fas fa-recycle',         title: 'Eco-Friendly',             description: 'Please help us care for the environment — use air conditioning responsibly and conserve water.' },
    { type: 'do',   icon: 'fas fa-swimming-pool',   title: 'Pool Safety',              description: 'Children must be supervised at all times around the pool. Swim at your own risk.' },
  ];
}
