import { addSupportTicket } from '../data.js';

export class Contact {
  constructor(showToast) {
    this.showToast = showToast;
  }

  render() {
    return `
      <div class="static-page-header">
        <h1>Contact Support &amp; FAQ Center</h1>
        <p>Get in touch with parking authorities, file support tickets, or search FAQs.</p>
      </div>

      <div class="grid-2col" style="align-items: start;">
        <!-- Support Ticket Form -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">File a Support Ticket</h2>
          </div>
          <div class="card-body">
            <form id="contact-support-form">
              <div class="form-group">
                <label for="contact-name">Your Full Name</label>
                <input type="text" id="contact-name" class="form-control" placeholder="John Doe" required />
              </div>
              <div class="form-group">
                <label for="contact-email">Email Address</label>
                <input type="email" id="contact-email" class="form-control" placeholder="john@example.com" required />
              </div>
              <div class="form-group">
                <label for="contact-subject">Topic / Subject</label>
                <input type="text" id="contact-subject" class="form-control" placeholder="e.g. Booking refund or lock issue" required />
              </div>
              <div class="form-group">
                <label for="contact-message">Detailed Message</label>
                <textarea id="contact-message" class="form-control" rows="5" placeholder="Explain the problem or request..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Submit Support Ticket</button>
            </form>
          </div>
        </div>

        <!-- FAQ and Direct contact -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <!-- FAQ Section -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Frequently Asked Questions</h2>
            </div>
            <div class="card-body" style="display: flex; flex-direction: column; gap: 1rem;">
              
              <details name="parking-faq">
                <summary style="font-weight: 600; cursor: pointer; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                  How does the Anti-Slot Theft system verify plates?
                </summary>
                <p class="text-secondary" style="padding: 0.75rem 0; font-size: 0.85rem;">
                  When a driver reserves a slot, their vehicle registration number is mapped to that slot. When entering, a license plate reader (ANPR camera) scans the plate. If the plate does not match the reservation mapping, the slot lights flash red, gate access is blocked, and an alert is dispatched to security guards.
                </p>
              </details>

              <details name="parking-faq">
                <summary style="font-weight: 600; cursor: pointer; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                  What should I do if my exit gate is blocked by a Security Lock?
                </summary>
                <p class="text-secondary" style="padding: 0.75rem 0; font-size: 0.85rem;">
                  Simply pull up the app, view your active digital booking pass, and slide the "Anti-Theft Lock" toggle to OFF. The exit gate sensor will check the state and open. In case of cell network issues, you can present the QR ticket to the parking operator who can manually override the lock.
                </p>
              </details>

              <details name="parking-faq">
                <summary style="font-weight: 600; cursor: pointer; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                  How are parking charges calculated?
                </summary>
                <p class="text-secondary" style="padding: 0.75rem 0; font-size: 0.85rem;">
                  Charges start accruing the moment your vehicle scans in through the entry gate. Charges stop when you verify and scan out of the exit gate. Hourly rates depend on slot selection: Standard is $2/hr, EV Charging is $3/hr, and Premium VIP is $5/hr.
                </p>
              </details>
            </div>
          </div>

          <!-- Contact details -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Contact &amp; Location Details</h2>
            </div>
            <div class="card-body">
              <div class="contact-info-list">
                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <svg width="24" height="24" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div class="contact-info-text">
                    <h3>Emergency Security Dispatch</h3>
                    <p>+1 (555) 019-9111</p>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <svg width="24" height="24" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                  </div>
                  <div class="contact-info-text">
                    <h3>Customer Support Email</h3>
                    <p>support@parksecure-systems.com</p>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <svg width="24" height="24" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div class="contact-info-text">
                    <h3>Headquarters</h3>
                    <p>Sector 5, Outer Ring Rd, Tech City, KA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    this.setupListeners();
  }

  setupListeners() {
    const supportForm = document.getElementById('contact-support-form');
    if (!supportForm) return;

    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      const res = addSupportTicket(name, email, subject, message);
      if (res.success) {
        this.showToast('Support ticket filed successfully!', 'success');
        supportForm.reset();
      } else {
        this.showToast('Failed to file support ticket.', 'error');
      }
    });
  }
}
