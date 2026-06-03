import { Component, HostListener, signal, computed } from '@angular/core';

interface GalleryImage {
  src: string;
  thumb: string;
  alt: string;
  category: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  template: `
    <div class="page-header">
      <h1>Photo Gallery</h1>
      <p>Explore every corner of Lui Villa through our curated collection of photos</p>
    </div>

    <section class="gallery-section">
      <div class="container">

        <div class="filter-bar">
          @for (cat of categories; track cat) {
            <button
              class="filter-btn"
              [class.active]="activeCategory() === cat"
              (click)="setCategory(cat)">
              {{ cat }}
            </button>
          }
        </div>

        <div class="gallery-grid">
          @for (img of filteredImages(); track img.src; let i = $index) {
            <div class="gallery-item" (click)="openLightbox(i)">
              <img [src]="img.thumb" [alt]="img.alt" loading="lazy">
              <div class="gallery-item-overlay">
                <i class="fas fa-expand-alt"></i>
                <span>{{ img.alt }}</span>
              </div>
            </div>
          }
        </div>

        @if (filteredImages().length === 0) {
          <p class="empty-state">No photos in this category yet.</p>
        }
      </div>
    </section>

    <!-- Lightbox -->
    @if (lightboxOpen()) {
      <div class="lightbox" (click)="closeLightbox()">
        <button class="lb-close" (click)="closeLightbox()" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>

        <button class="lb-nav lb-prev" (click)="prev($event)" aria-label="Previous">
          <i class="fas fa-chevron-left"></i>
        </button>

        <div class="lb-content" (click)="$event.stopPropagation()">
          <img [src]="currentImage().src" [alt]="currentImage().alt">
          <p class="lb-caption">
            {{ currentImage().alt }}
            <span class="lb-counter">{{ lightboxIndex() + 1 }} / {{ filteredImages().length }}</span>
          </p>
        </div>

        <button class="lb-nav lb-next" (click)="next($event)" aria-label="Next">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    }
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

    /* Filter bar */
    .gallery-section { padding: 4rem 0 6rem; background: var(--light); }

    .filter-bar {
      display: flex;
      gap: 0.7rem;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 3rem;
    }

    .filter-btn {
      padding: 0.5rem 1.3rem;
      border-radius: 50px;
      border: 2px solid var(--gray-light);
      background: white;
      color: var(--gray);
      font-family: 'Poppins', sans-serif;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.25s;
    }

    .filter-btn:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    .filter-btn.active {
      background: var(--primary);
      border-color: var(--primary);
      color: white;
    }

    /* Gallery grid */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .gallery-item {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
      border-radius: 10px;
      cursor: pointer;
      background: var(--gray-light);
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
      display: block;
    }

    .gallery-item:hover img { transform: scale(1.06); }

    .gallery-item-overlay {
      position: absolute;
      inset: 0;
      background: rgba(15, 37, 56, 0);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: white;
      transition: background 0.3s;
    }

    .gallery-item:hover .gallery-item-overlay { background: rgba(15, 37, 56, 0.5); }

    .gallery-item-overlay i { font-size: 1.5rem; opacity: 0; transform: scale(0.7); transition: all 0.3s; }
    .gallery-item-overlay span { font-size: 0.85rem; opacity: 0; transition: opacity 0.3s 0.05s; }

    .gallery-item:hover .gallery-item-overlay i { opacity: 1; transform: scale(1); }
    .gallery-item:hover .gallery-item-overlay span { opacity: 1; }

    .empty-state { text-align: center; color: var(--gray); padding: 3rem; }

    /* Lightbox */
    .lightbox {
      position: fixed;
      inset: 0;
      background: rgba(5, 15, 25, 0.95);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .lb-close {
      position: absolute;
      top: 1.2rem; right: 1.5rem;
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      width: 44px; height: 44px;
      border-radius: 50%;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background 0.2s;
      display: flex; align-items: center; justify-content: center;
      z-index: 1;
    }
    .lb-close:hover { background: rgba(255,255,255,0.2); }

    .lb-nav {
      position: absolute;
      top: 50%; transform: translateY(-50%);
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      width: 48px; height: 48px;
      border-radius: 50%;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background 0.2s;
      display: flex; align-items: center; justify-content: center;
      z-index: 1;
    }
    .lb-nav:hover { background: rgba(255,255,255,0.2); }
    .lb-prev { left: 1.5rem; }
    .lb-next { right: 1.5rem; }

    .lb-content {
      max-width: 90vw;
      max-height: 90vh;
      text-align: center;
    }

    .lb-content img {
      max-width: 100%;
      max-height: 80vh;
      border-radius: 8px;
      object-fit: contain;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    .lb-caption {
      color: rgba(255,255,255,0.8);
      margin-top: 1rem;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .lb-counter { color: rgba(255,255,255,0.45); font-size: 0.8rem; }

    /* Responsive */
    @media (max-width: 900px) {
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .lb-prev { left: 0.5rem; }
      .lb-next { right: 0.5rem; }
    }

    @media (max-width: 500px) {
      .gallery-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class GalleryComponent {
  categories = ['All', 'Living Areas', 'Bedrooms', 'Pool & Outdoor', 'Kitchen', 'Bathrooms'];
  activeCategory = signal('All');
  lightboxOpen  = signal(false);
  lightboxIndex = signal(0);

  images: GalleryImage[] = [
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=75', alt: 'Living Room', category: 'Living Areas' },
    { src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=75', alt: 'Open-Plan Lounge', category: 'Living Areas' },
    { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=75', alt: 'Master Bedroom', category: 'Bedrooms' },
    { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=75', alt: 'Bedroom 2', category: 'Bedrooms' },
    { src: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=75', alt: 'Bedroom 3', category: 'Bedrooms' },
    { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=75', alt: 'Private Pool', category: 'Pool & Outdoor' },
    { src: 'https://images.unsplash.com/photo-1540541338537-63fef45f9e90?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1540541338537-63fef45f9e90?w=600&q=75', alt: 'Pool Deck', category: 'Pool & Outdoor' },
    { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=75', alt: 'Villa Exterior', category: 'Pool & Outdoor' },
    { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=75', alt: 'Tropical Garden', category: 'Pool & Outdoor' },
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75', alt: 'Modern Kitchen', category: 'Kitchen' },
    { src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=75', alt: 'Kitchen Island', category: 'Kitchen' },
    { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=75', alt: 'Master Bathroom', category: 'Bathrooms' },
    { src: 'https://images.unsplash.com/photo-1620626011761-996317702782?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1620626011761-996317702782?w=600&q=75', alt: 'Outdoor Shower', category: 'Bathrooms' },
  ];

  filteredImages = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All' ? this.images : this.images.filter(i => i.category === cat);
  });

  currentImage = computed(() => {
    const imgs = this.filteredImages();
    const idx  = this.lightboxIndex();
    return imgs[idx] ?? imgs[0];
  });

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
    this.lightboxOpen.set(false);
  }

  openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  prev(event: Event): void {
    event.stopPropagation();
    const len = this.filteredImages().length;
    this.lightboxIndex.update(i => (i - 1 + len) % len);
  }

  next(event: Event): void {
    event.stopPropagation();
    const len = this.filteredImages().length;
    this.lightboxIndex.update(i => (i + 1) % len);
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (!this.lightboxOpen()) return;
    if (e.key === 'Escape')     this.closeLightbox();
    if (e.key === 'ArrowLeft')  this.prev(e);
    if (e.key === 'ArrowRight') this.next(e);
  }
}
