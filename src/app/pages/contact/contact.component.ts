import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="page-header">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you — get in touch to check availability and reserve your stay</p>
    </div>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">

          <!-- ── Left: Info + Quick Buttons ── -->
          <div class="contact-info">
            <span class="label">Get in Touch</span>
            <h2>Reach Us Instantly</h2>
            <p>The fastest way to book or enquire is to contact us directly via phone, Line, or Facebook Messenger.</p>

            <!-- Quick Contact Buttons -->
            <div class="quick-buttons">
              <a href="tel:+66800000000" class="quick-btn call-btn">
                <div class="quick-icon"><i class="fas fa-phone"></i></div>
                <div class="quick-text">
                  <span class="quick-label">Click to Call</span>
                  <span class="quick-value">+66 80 000 0000</span>
                </div>
              </a>

              <a href="https://line.me/ti/p/YOUR_LINE_ID" target="_blank" rel="noopener noreferrer" class="quick-btn line-btn">
                <div class="quick-icon"><i class="fab fa-line"></i></div>
                <div class="quick-text">
                  <span class="quick-label">Chat on Line</span>
                  <span class="quick-value">&#64;luivilla</span>
                </div>
              </a>

              <a href="https://m.me/YOUR_PAGE" target="_blank" rel="noopener noreferrer" class="quick-btn fb-btn">
                <div class="quick-icon"><i class="fab fa-facebook-messenger"></i></div>
                <div class="quick-text">
                  <span class="quick-label">Facebook Messenger</span>
                  <span class="quick-value">Lui Villa</span>
                </div>
              </a>

              <a href="https://www.facebook.com/YOUR_PAGE" target="_blank" rel="noopener noreferrer" class="quick-btn fb-page-btn">
                <div class="quick-icon"><i class="fab fa-facebook-f"></i></div>
                <div class="quick-text">
                  <span class="quick-label">Facebook Page</span>
                  <span class="quick-value">&#64;luivilla</span>
                </div>
              </a>
            </div>

            <div class="info-divider"></div>

            <!-- Contact details -->
            <ul class="contact-details">
              <li>
                <i class="fas fa-envelope"></i>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:info@luivilla.com">info&#64;luivilla.com</a>
                </div>
              </li>
              <li>
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Location</strong>
                  <span>Thailand (exact address shared upon booking)</span>
                </div>
              </li>
              <li>
                <i class="fas fa-clock"></i>
                <div>
                  <strong>Response Time</strong>
                  <span>We typically reply within 2 hours</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- ── Right: Inquiry Form ── -->
          <div class="contact-form-wrap">
            <div class="form-card">
              @if (!submitted()) {
                <h3>Send an Inquiry</h3>
                <p class="form-subtitle">Fill in the form below and we'll get back to you shortly.</p>

                <form [formGroup]="form" (ngSubmit)="onSubmit()">
                  <div class="form-row">
                    <div class="form-group" [class.error]="isInvalid('name')">
                      <label for="name">Full Name *</label>
                      <input id="name" type="text" formControlName="name" placeholder="Your full name">
                      @if (isInvalid('name')) {
                        <span class="error-msg">Please enter your name.</span>
                      }
                    </div>
                    <div class="form-group" [class.error]="isInvalid('email')">
                      <label for="email">Email Address *</label>
                      <input id="email" type="email" formControlName="email" placeholder="your@email.com">
                      @if (isInvalid('email')) {
                        <span class="error-msg">Please enter a valid email.</span>
                      }
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="phone">Phone / WhatsApp</label>
                      <input id="phone" type="tel" formControlName="phone" placeholder="+66 xx xxx xxxx">
                    </div>
                    <div class="form-group">
                      <label for="guests">Number of Guests</label>
                      <select id="guests" formControlName="guests">
                        @for (n of [1,2,3,4,5,6]; track n) {
                          <option [value]="n">{{ n }} guest{{ n > 1 ? 's' : '' }}</option>
                        }
                      </select>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="checkin">Check-in Date</label>
                      <input id="checkin" type="date" formControlName="checkin" [min]="today">
                    </div>
                    <div class="form-group">
                      <label for="checkout">Check-out Date</label>
                      <input id="checkout" type="date" formControlName="checkout" [min]="today">
                    </div>
                  </div>

                  <div class="form-group full" [class.error]="isInvalid('message')">
                    <label for="message">Message *</label>
                    <textarea id="message" formControlName="message" rows="5"
                      placeholder="Tell us about your stay, any special requests, or questions you have..."></textarea>
                    @if (isInvalid('message')) {
                      <span class="error-msg">Please enter a message (minimum 10 characters).</span>
                    }
                  </div>

                  <button type="submit" class="btn btn-submit" [disabled]="submitting()">
                    @if (submitting()) {
                      <i class="fas fa-spinner fa-spin"></i> Sending...
                    } @else {
                      <i class="fas fa-paper-plane"></i> Send Inquiry
                    }
                  </button>
                </form>
              } @else {
                <div class="success-state">
                  <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for your inquiry. We'll get back to you within 2 hours.</p>
                  <button class="btn btn-primary" (click)="resetForm()">Send Another Message</button>
                </div>
              }
            </div>
          </div>

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

    .btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.85rem 2rem; border-radius: 50px;
      font-weight: 500; font-size: 0.9rem;
      text-decoration: none; transition: all 0.3s; cursor: pointer; border: none;
      font-family: 'Poppins', sans-serif;
    }
    .btn-primary  { background: var(--primary); color: white; }
    .btn-primary:hover { background: var(--primary-light); }

    /* Layout */
    .contact-section { padding: 5rem 0 6rem; background: var(--light); }

    .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: flex-start; }

    /* Info side */
    .contact-info h2 { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--primary); margin: 0.4rem 0 0.8rem; }
    .contact-info > p { font-size: 0.92rem; color: var(--gray); line-height: 1.75; margin-bottom: 2rem; }

    .quick-buttons { display: flex; flex-direction: column; gap: 0.9rem; margin-bottom: 2rem; }

    .quick-btn {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.3rem;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.3s;
      color: white;
    }
    .quick-btn:hover { transform: translateX(4px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }

    .call-btn    { background: linear-gradient(135deg, #2c6fad, var(--primary)); }
    .line-btn    { background: linear-gradient(135deg, #04a344, #06c755); }
    .fb-btn      { background: linear-gradient(135deg, #0084ff, #0078f0); }
    .fb-page-btn { background: linear-gradient(135deg, #1877f2, #1565c0); }

    .quick-icon {
      width: 42px; height: 42px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .quick-text { display: flex; flex-direction: column; }
    .quick-label { font-size: 0.72rem; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px; }
    .quick-value { font-weight: 600; font-size: 0.92rem; }

    .info-divider { height: 1px; background: var(--gray-light); margin: 1.5rem 0; }

    .contact-details { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem; }
    .contact-details li { display: flex; align-items: flex-start; gap: 0.8rem; }
    .contact-details li i { color: var(--accent); font-size: 1rem; margin-top: 3px; width: 18px; }
    .contact-details li strong { display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray); margin-bottom: 1px; }
    .contact-details li a,
    .contact-details li span { font-size: 0.9rem; color: var(--dark); text-decoration: none; }
    .contact-details li a:hover { color: var(--accent); }

    /* Form */
    .form-card {
      background: white;
      padding: 2.5rem;
      border-radius: var(--border-radius);
      box-shadow: 0 10px 40px rgba(0,0,0,0.07);
    }

    .form-card h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--primary); margin-bottom: 0.3rem; }
    .form-subtitle { font-size: 0.88rem; color: var(--gray); margin-bottom: 2rem; }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }

    .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
    .form-group.full { grid-column: 1 / -1; }

    .form-group label { font-size: 0.82rem; font-weight: 500; color: var(--dark); }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.7rem 1rem;
      border: 1.5px solid var(--gray-light);
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      font-size: 0.88rem;
      color: var(--dark);
      background: var(--light);
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      border-color: var(--primary-light);
      box-shadow: 0 0 0 3px rgba(44,95,138,0.1);
      background: white;
    }

    .form-group.error input,
    .form-group.error textarea {
      border-color: var(--error, #e74c3c);
    }

    .error-msg { font-size: 0.78rem; color: var(--error, #e74c3c); }

    .form-group textarea { resize: vertical; min-height: 120px; }
    .form-group select { cursor: pointer; }

    .btn-submit {
      width: 100%;
      justify-content: center;
      padding: 1rem;
      background: var(--primary);
      color: white;
      font-size: 1rem;
      border-radius: 10px;
      margin-top: 0.5rem;
    }
    .btn-submit:hover:not([disabled]) { background: var(--primary-light); transform: translateY(-2px); box-shadow: 0 8px 25px rgba(26,60,94,0.3); }
    .btn-submit[disabled] { opacity: 0.6; cursor: not-allowed; }

    /* Success state */
    .success-state { text-align: center; padding: 2rem 0; }
    .success-icon { font-size: 4rem; color: var(--success, #2ecc71); margin-bottom: 1rem; }
    .success-state h3 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--primary); margin-bottom: 0.5rem; }
    .success-state p { color: var(--gray); margin-bottom: 2rem; }

    /* Responsive */
    @media (max-width: 900px) {
      .contact-grid { grid-template-columns: 1fr; }
      .contact-info { order: 2; }
      .contact-form-wrap { order: 1; }
    }

    @media (max-width: 600px) {
      .form-row { grid-template-columns: 1fr; }
      .form-card { padding: 1.5rem; }
    }
  `]
})
export class ContactComponent {
  submitted  = signal(false);
  submitting = signal(false);
  today = new Date().toISOString().split('T')[0];

  form = this.fb.group({
    name:     ['', [Validators.required, Validators.minLength(2)]],
    email:    ['', [Validators.required, Validators.email]],
    phone:    [''],
    guests:   [2],
    checkin:  [''],
    checkout: [''],
    message:  ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private fb: FormBuilder) {}

  isInvalid(field: string): boolean {
    const ctrl: AbstractControl | null = this.form.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
    }, 1200);
  }

  resetForm(): void {
    this.form.reset({ guests: 2 });
    this.submitted.set(false);
  }
}
