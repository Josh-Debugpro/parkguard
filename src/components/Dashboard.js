import { Hero } from './Hero.js';
import { generateQRDataUrl } from '../qr.js';
import { 
  getInitialState, 
  reserveSlot, 
  toggleSecurityLock,
  reportSlotTheft
} from '../data.js';

export class Dashboard {
  constructor(showToast) {
    this.showToast = showToast;
    this.heroComponent = new Hero();
    this.activeBillingInterval = null;
    this.currentSelectedSlotId = null;
  }

  render() {
    return `
      <!-- Embedded Hero Landing component -->
      <div id="dashboard-hero-mount">
        ${this.heroComponent.render()}
      </div>

      <!-- Bento Grid Stats -->
      <div class="stats-grid">
        <div class="stat-card total">
          <span class="stat-title">Total Capacity</span>
          <span id="stats-total" class="stat-val">20</span>
          <span class="stat-subtitle">Configured slots</span>
        </div>
        <div class="stat-card available">
          <span class="stat-title">Available Spaces</span>
          <span id="stats-available" class="stat-val">20</span>
          <span class="stat-subtitle">Ready to reserve</span>
        </div>
        <div class="stat-card occupied">
          <span class="stat-title">Occupied Spaces</span>
          <span id="stats-occupied" class="stat-val">0</span>
          <span class="stat-subtitle">Vehicles parked</span>
        </div>
        <div class="stat-card alerts" id="alert-card-container">
          <span class="stat-title">Security Alarms</span>
          <span id="stats-alerts" class="stat-val">0</span>
          <span class="stat-subtitle" id="stats-alerts-text">No active breaches</span>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="dashboard-layout">
        <!-- Interactive Layout Grid -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Real-Time Parking Grid Map</h2>
            <div class="legend-item" style="font-size: 0.75rem;">
              <span class="legend-color available"></span><span>Available</span>
              <span class="legend-color reserved"></span><span>Reserved</span>
              <span class="legend-color occupied"></span><span>Occupied</span>
              <span class="legend-color theft-alert"></span><span>Theft Alarm</span>
            </div>
          </div>
          <div class="card-body">
            <div class="parking-zones">
              <!-- Zone A -->
              <div class="parking-zone">
                <div class="zone-header">
                  <span>Zone A - Standard Parking</span>
                  <span class="text-secondary">$2.00 / hour</span>
                </div>
                <div id="grid-zone-a" class="zone-grid"></div>
              </div>
              
              <!-- Zone B -->
              <div class="parking-zone">
                <div class="zone-header">
                  <span>Zone B - EV Charging Slots</span>
                  <span class="text-secondary">$3.00 / hour</span>
                </div>
                <div id="grid-zone-b" class="zone-grid"></div>
              </div>

              <!-- Zone C -->
              <div class="parking-zone">
                <div class="zone-header">
                  <span>Zone C - Premium VIP Slots</span>
                  <span class="text-secondary">$5.00 / hour</span>
                </div>
                <div id="grid-zone-c" class="zone-grid"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Actions -->
        <div class="sidebar-panel">
          <div class="card" id="sidebar-action-card">
            <div class="card-header">
              <h2 class="card-title" id="sidebar-title">Slot Details</h2>
            </div>
            <div class="card-body">
              <div id="sidebar-slot-details">
                <p class="text-secondary">Click on any parking slot in the grid map to view its occupancy status or to start a reservation.</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Quick Live Tracker</h2>
            </div>
            <div class="card-body">
              <div class="info-box">
                <div class="info-title">
                  <svg width="16" height="16" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
                  <span>Active Reservations</span>
                </div>
                <div id="quick-bookings-list">
                  <p class="text-secondary" style="font-size: 0.8rem;">No active bookings found. Select a slot to reserve.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dialogue Modal Elements (Encapsulated in Dashboard for cleanliness) -->
      
      <!-- Booking Form Modal -->
      <dialog id="booking-modal" closedby="any" aria-labelledby="booking-modal-title">
        <div class="dialog-header">
          <h2 id="booking-modal-title">Reserve Parking Slot</h2>
          <button type="button" class="dialog-close" id="btn-close-booking-modal" aria-label="Close dialog">&times;</button>
        </div>
        <form id="booking-form" method="dialog">
          <div class="form-group">
            <label>Selected Parking Slot</label>
            <input type="text" id="booking-slot-id-display" class="form-control" style="font-weight: 700; background-color: var(--bg-tertiary);" readonly />
          </div>
          <div class="form-group">
            <label for="booking-plate">Vehicle License Plate Number</label>
            <input type="text" id="booking-plate" class="form-control" placeholder="e.g. KA-01-AB-1234" required />
          </div>
          <div class="form-group">
            <label for="booking-duration">Estimated Duration (Hours)</label>
            <select id="booking-duration" class="form-control" required>
              <option value="1">1 Hour</option>
              <option value="2" selected>2 Hours</option>
              <option value="4">4 Hours</option>
              <option value="8">8 Hours</option>
              <option value="12">12 Hours</option>
              <option value="24">24 Hours</option>
            </select>
          </div>
          <div class="form-group" style="margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary btn-block">Confirm Reservation</button>
          </div>
        </form>
      </dialog>

      <!-- Digital Pass Modal -->
      <dialog id="pass-modal" closedby="any" aria-labelledby="pass-modal-title">
        <div class="dialog-header">
          <h2 id="pass-modal-title">Digital Parking Ticket</h2>
          <button type="button" class="dialog-close" id="btn-close-pass-modal" aria-label="Close dialog">&times;</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="booking-pass">
            <div id="pass-slot-id" style="font-size: 1.75rem; font-weight: 800; color: var(--accent); line-height: 1;">A1</div>
            <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary); margin-top: -0.5rem; font-weight: 600;">Assigned Space</div>
            
            <div class="qr-wrapper">
              <img id="pass-qr-code-img" class="qr-code" src="" alt="Booking QR Code" />
            </div>
            
            <div class="pass-details">
              <div>Booking ID:</div>
              <div id="pass-booking-id" class="pass-val">BK-XXXXXX</div>
              <div>Vehicle Plate:</div>
              <div id="pass-vehicle-plate" class="pass-val">KA-01-AB-1234</div>
              <div>Security PIN:</div>
              <div id="pass-pin" class="pass-val" style="letter-spacing: 0.1em;">----</div>
              <div>Hourly Rate:</div>
              <div id="pass-rate" class="pass-val">$2.00 / hr</div>
            </div>
          </div>

          <!-- Security Anti-Theft Switch -->
          <div class="lock-card-box" id="pass-lock-box">
            <div class="lock-label-group">
              <svg class="lock-icon-svg" id="pass-lock-icon" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path class="lock-shackle" d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
              <div>
                <div style="font-weight: 700; font-size: 0.9rem;" id="pass-lock-title">Vehicle Security Lock</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);" id="pass-lock-desc">Lock vehicle at exit gates</div>
              </div>
            </div>
            <div>
              <label class="switch" aria-label="Toggle vehicle security lock">
                <input type="checkbox" id="pass-lock-toggle" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
          
          <!-- Emergency & Dispute Action Buttons -->
          <div style="display: flex; gap: 0.5rem;" id="pass-dispute-actions">
            <button type="button" id="btn-report-theft" class="btn btn-warning" style="flex: 1; font-size: 0.8rem; font-weight: 600; padding: 0.5rem 0.25rem;">
              🚨 Report Slot Hijacked
            </button>
            <a href="tel:+15550199111" class="btn btn-danger" style="flex: 1; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 0.25rem; padding: 0.5rem 0.25rem;">
              📞 Emergency Call
            </a>
          </div>
          
          <p class="text-secondary" style="font-size: 0.75rem; text-align: center; margin-top: -0.25rem;">
            Show this QR code at the entry gate sensor, or use the PIN to checkout at the exit gate. Activating the Security Lock blocks the vehicle from being driven out.
          </p>
        </div>
      </dialog>
    `;
  }

  init() {
    this.heroComponent.init();
    this.setupModalDismiss();
    this.render();
    this.updateDashboard();
  }

  // Destructor helper to clear timers
  destroy() {
    if (this.activeBillingInterval) {
      clearInterval(this.activeBillingInterval);
      this.activeBillingInterval = null;
    }
  }

  updateDashboard() {
    const state = getInitialState();

    if (this.activeBillingInterval) {
      clearInterval(this.activeBillingInterval);
      this.activeBillingInterval = null;
    }

    // Update stats cards
    const totalCount = state.slots.length;
    const availableCount = state.slots.filter(s => s.status === 'available').length;
    const occupiedCount = state.slots.filter(s => s.status === 'occupied').length;
    const activeAlerts = state.alerts.filter(a => !a.resolved);
    const alertsCount = activeAlerts.length;

    const totalEl = document.getElementById('stats-total');
    const availableEl = document.getElementById('stats-available');
    const occupiedEl = document.getElementById('stats-occupied');
    const alertsEl = document.getElementById('stats-alerts');

    if (totalEl) totalEl.textContent = totalCount;
    if (availableEl) availableEl.textContent = availableCount;
    if (occupiedEl) occupiedEl.textContent = occupiedCount;
    if (alertsEl) alertsEl.textContent = alertsCount;

    const alertContainer = document.getElementById('alert-card-container');
    const alertText = document.getElementById('stats-alerts-text');
    
    if (alertContainer && alertText) {
      if (alertsCount > 0) {
        alertContainer.classList.add('active-alarms');
        alertText.innerHTML = `<span style="color: var(--danger); font-weight: 700;">${alertsCount} Active Breaches!</span>`;
      } else {
        alertContainer.classList.remove('active-alarms');
        alertText.textContent = 'No active breaches';
      }
    }

    // Render Grid zones
    this.renderZoneGrid('grid-zone-a', 'A', state.slots);
    this.renderZoneGrid('grid-zone-b', 'B', state.slots);
    this.renderZoneGrid('grid-zone-c', 'C', state.slots);

    // Sidebar status
    this.renderSidebarDetails(state);

    // Update quick lists
    this.renderQuickReservations(state);
  }

  renderZoneGrid(containerId, zoneId, slots) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const zoneSlots = slots.filter(s => s.zone === zoneId);
    
    zoneSlots.forEach(slot => {
      const slotEl = document.createElement('div');
      slotEl.className = `parking-slot ${slot.status}`;
      slotEl.setAttribute('role', 'button');
      slotEl.setAttribute('aria-label', `Slot ${slot.id}, status: ${slot.status}, category: ${slot.type}`);
      slotEl.setAttribute('tabindex', '0');
      
      let iconPath = '';
      if (slot.status === 'available') {
        iconPath = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>';
      } else if (slot.status === 'theft-alert') {
        iconPath = '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>';
      } else {
        iconPath = '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11 2 11.2 2 11.5V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>';
      }

      slotEl.innerHTML = `
        <span class="slot-id">${slot.id}</span>
        <svg class="slot-icon" viewBox="0 0 24 24">
          ${iconPath}
        </svg>
        <span class="slot-status-text">${slot.status.replace('-', ' ')}</span>
      `;

      slotEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          slotEl.click();
        }
      });

      slotEl.addEventListener('click', () => {
        document.querySelectorAll('.parking-slot').forEach(el => el.style.boxShadow = '');
        slotEl.style.boxShadow = '0 0 0 3px var(--accent)';
        
        this.currentSelectedSlotId = slot.id;
        this.showSlotDetailsInSidebar(slot);
      });

      container.appendChild(slotEl);
    });
  }

  renderSidebarDetails(state) {
    if (this.currentSelectedSlotId) {
      const activeSlot = state.slots.find(s => s.id === this.currentSelectedSlotId);
      if (activeSlot) {
        this.showSlotDetailsInSidebar(activeSlot);
        return;
      }
    }

    const sidebarBody = document.getElementById('sidebar-slot-details');
    if (sidebarBody) {
      sidebarBody.innerHTML = `
        <p class="text-secondary">Click on any parking slot in the grid map to view its occupancy status or to start a reservation.</p>
      `;
    }
  }

  showSlotDetailsInSidebar(slot) {
    const sidebarBody = document.getElementById('sidebar-slot-details');
    const sidebarTitle = document.getElementById('sidebar-title');
    const state = getInitialState();
    
    if (!sidebarBody || !sidebarTitle) return;
    
    sidebarTitle.textContent = `Space details: ${slot.id}`;

    if (this.activeBillingInterval) {
      clearInterval(this.activeBillingInterval);
      this.activeBillingInterval = null;
    }

    if (slot.status === 'available') {
      sidebarBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="info-box">
            <div class="info-item"><span>Slot ID:</span> <span>${slot.id}</span></div>
            <div class="info-item"><span>Category:</span> <span>${slot.type}</span></div>
            <div class="info-item"><span>Hourly Rate:</span> <span>$${slot.rate.toFixed(2)}/hr</span></div>
            <div class="info-item"><span>Status:</span> <span style="color: var(--success); font-weight: 700;">Available</span></div>
          </div>
          <button id="btn-reserve-sidebar" class="btn btn-primary btn-block">Reserve Space</button>
        </div>
      `;

      document.getElementById('btn-reserve-sidebar').addEventListener('click', () => {
        this.openReservationDialog(slot.id);
      });

    } else if (slot.status === 'reserved') {
      const booking = state.bookings.find(b => b.slotId === slot.id && b.status === 'reserved');
      if (!booking) return;

      sidebarBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="info-box">
            <div class="info-item"><span>Booking ID:</span> <span style="font-family: monospace;">${booking.id}</span></div>
            <div class="info-item"><span>Vehicle Plate:</span> <span>${booking.vehiclePlate}</span></div>
            <div class="info-item"><span>Rate:</span> <span>$${slot.rate.toFixed(2)}/hr</span></div>
            <div class="info-item"><span>Security PIN:</span> <span style="letter-spacing: 0.05em;">${booking.pin}</span></div>
            <div class="info-item"><span>Status:</span> <span style="color: var(--accent); font-weight: 700;">Reserved</span></div>
          </div>
          <button id="btn-view-pass-sidebar" class="btn btn-secondary btn-block">View Digital Pass</button>
        </div>
      `;

      document.getElementById('btn-view-pass-sidebar').addEventListener('click', () => {
        this.openDigitalPass(booking.id);
      });

    } else if (slot.status === 'occupied') {
      const booking = state.bookings.find(b => b.slotId === slot.id && b.status === 'checked-in');
      if (!booking) return;

      sidebarBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="info-box">
            <div class="info-item"><span>Booking ID:</span> <span style="font-family: monospace;">${booking.id}</span></div>
            <div class="info-item"><span>Vehicle Plate:</span> <span>${booking.vehiclePlate}</span></div>
            <div class="info-item"><span>Check-In Time:</span> <span style="font-size: 0.75rem;">${new Date(booking.startTime).toLocaleTimeString()}</span></div>
            <div class="info-item"><span>Security Lock:</span> <span style="color: ${booking.securityLock ? 'var(--danger)' : 'var(--success)'}; font-weight: 700;">${booking.securityLock ? 'LOCKED' : 'UNLOCKED'}</span></div>
            <div class="info-item" style="border-top: 1px dashed var(--border-color); padding-top: 0.5rem; margin-top: 0.5rem;">
              <span>Charges Accrued:</span> 
              <span id="live-charges-count" style="font-size: 1.15rem; color: var(--warning); font-weight: 700;">$0.00</span>
            </div>
          </div>
          <button id="btn-view-pass-sidebar" class="btn btn-secondary btn-block">Manage Pass &amp; Lock</button>
        </div>
      `;

      const updateCharges = () => {
        const now = new Date();
        const elapsedMs = now - new Date(booking.startTime);
        const elapsedHours = elapsedMs / (1000 * 60 * 60);
        const billedHours = Math.max(0.01, elapsedHours);
        const charges = billedHours * booking.rate;
        
        const chargesEl = document.getElementById('live-charges-count');
        if (chargesEl) {
          chargesEl.textContent = `$${charges.toFixed(3)}`;
        }
      };
      updateCharges();
      this.activeBillingInterval = setInterval(updateCharges, 1000);

      document.getElementById('btn-view-pass-sidebar').addEventListener('click', () => {
        this.openDigitalPass(booking.id);
      });

    } else if (slot.status === 'theft-alert') {
      const alert = state.alerts.find(a => a.slotId === slot.id && !a.resolved);
      sidebarBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="info-box" style="border-color: var(--danger); background-color: var(--danger-bg);">
            <div style="color: var(--danger); font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.25rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Security Alarm Active
            </div>
            <p style="font-size: 0.8rem; color: var(--text-primary); line-height: 1.4;">
              ${alert ? alert.message : 'Unauthorized vehicle parked in reserved slot without verification.'}
            </p>
          </div>
          <button id="btn-goto-admin" class="btn btn-secondary btn-block">Go to Admin Center</button>
        </div>
      `;

      document.getElementById('btn-goto-admin').addEventListener('click', () => {
        window.location.hash = '#/admin';
      });
    }
  }

  renderQuickReservations(state) {
    const container = document.getElementById('quick-bookings-list');
    if (!container) return;
    
    const activeBookings = state.bookings.filter(b => b.status === 'reserved' || b.status === 'checked-in');

    if (activeBookings.length === 0) {
      container.innerHTML = '<p class="text-secondary" style="font-size: 0.8rem;">No active bookings found. Select a slot to reserve.</p>';
      return;
    }

    container.innerHTML = '';
    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '0.5rem';

    activeBookings.forEach(booking => {
      const item = document.createElement('button');
      item.className = 'btn btn-secondary';
      item.style.fontSize = '0.8rem';
      item.style.justifyContent = 'space-between';
      item.style.width = '100%';
      item.style.padding = '0.4rem 0.65rem';
      
      let statusBadge = `<span style="color: var(--accent); font-weight: 700;">Reserved</span>`;
      if (booking.status === 'checked-in') {
        statusBadge = booking.securityLock 
          ? `<span style="color: var(--danger); font-weight: 700;">LOCKED</span>`
          : `<span style="color: var(--success); font-weight: 700;">Parked</span>`;
      }

      item.innerHTML = `
        <span style="font-weight: 600;">${booking.slotId} - ${booking.vehiclePlate}</span>
        ${statusBadge}
      `;

      item.addEventListener('click', () => {
        this.openDigitalPass(booking.id);
      });

      list.appendChild(item);
    });

    container.appendChild(list);
  }

  openReservationDialog(slotId) {
    const modal = document.getElementById('booking-modal');
    const slotDisplay = document.getElementById('booking-slot-id-display');
    const form = document.getElementById('booking-form');

    if (!modal || !slotDisplay || !form) return;

    slotDisplay.value = slotId;
    document.getElementById('booking-plate').value = '';
    document.getElementById('booking-duration').selectedIndex = 1;

    form.onsubmit = (e) => {
      e.preventDefault();
      const plateInput = document.getElementById('booking-plate').value;
      const durationInput = document.getElementById('booking-duration').value;

      const res = reserveSlot(slotId, plateInput, durationInput);
      
      if (res.success) {
        modal.close();
        this.showToast(`Slot ${slotId} reserved successfully!`, 'success');
        this.updateDashboard();
        this.openDigitalPass(res.booking.id);
      } else {
        this.showToast(res.error, 'error');
      }
    };

    modal.showModal();
  }

  async openDigitalPass(bookingId) {
    const modal = document.getElementById('pass-modal');
    if (!modal) return;
    
    const state = getInitialState();
    const booking = state.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    document.getElementById('pass-slot-id').textContent = booking.slotId;
    const passDetails = modal.querySelector('.pass-details');
    if (passDetails) {
      if (booking.voucherCode) {
        passDetails.innerHTML = `
          <div>Booking ID:</div>
          <div id="pass-booking-id" class="pass-val">${booking.id}</div>
          <div>Vehicle Plate:</div>
          <div id="pass-vehicle-plate" class="pass-val">${booking.vehiclePlate}</div>
          <div>Security PIN:</div>
          <div id="pass-pin" class="pass-val" style="letter-spacing: 0.1em;">${booking.pin}</div>
          <div>Hourly Rate:</div>
          <div id="pass-rate" class="pass-val" style="color: var(--success); font-weight: 700;">$0.00 (FREE COMP)</div>
          <div style="color: var(--success); font-weight: 700;">Compensation:</div>
          <div class="pass-val" style="color: var(--success); font-weight: 700;">$10.00 Credit (${booking.voucherCode})</div>
        `;
      } else {
        const rateText = booking.rate === 0 ? '$0.00 (FREE COMP)' : `$${booking.rate.toFixed(2)}/hr`;
        passDetails.innerHTML = `
          <div>Booking ID:</div>
          <div id="pass-booking-id" class="pass-val">${booking.id}</div>
          <div>Vehicle Plate:</div>
          <div id="pass-vehicle-plate" class="pass-val">${booking.vehiclePlate}</div>
          <div>Security PIN:</div>
          <div id="pass-pin" class="pass-val" style="letter-spacing: 0.1em;">${booking.pin}</div>
          <div>Hourly Rate:</div>
          <div id="pass-rate" class="pass-val">${rateText}</div>
        `;
      }
    }

    await this.renderQR(bookingId);

    const lockToggle = document.getElementById('pass-lock-toggle');
    const lockBox = document.getElementById('pass-lock-box');
    const lockIcon = document.getElementById('pass-lock-icon');
    const lockTitle = document.getElementById('pass-lock-title');
    const lockDesc = document.getElementById('pass-lock-desc');

    if (lockToggle) {
      lockToggle.checked = booking.securityLock;
      this.updateLockUI(booking.securityLock, lockBox, lockTitle, lockDesc, lockIcon);

      lockToggle.onchange = () => {
        const isLocked = lockToggle.checked;
        const res = toggleSecurityLock(bookingId, isLocked);
        if (res.success) {
          this.updateLockUI(isLocked, lockBox, lockTitle, lockDesc, lockIcon);
          if (isLocked) {
            this.showToast('ANTI-THEFT LOCK ACTIVE! Vehicle cannot leave gate.', 'warning');
          } else {
            this.showToast('Vehicle unlocked. Exit gate cleared.', 'success');
          }
          this.updateDashboard();
        }
      };
    }

    // Setup emergency call & dispute actions
    const disputeActions = document.getElementById('pass-dispute-actions');
    const reportTheftBtn = document.getElementById('btn-report-theft');

    if (disputeActions && reportTheftBtn) {
      if (booking.status === 'reserved') {
        disputeActions.style.display = 'flex';
        
        // Remove and recreate button listener to prevent double triggers
        const newReportTheftBtn = reportTheftBtn.cloneNode(true);
        reportTheftBtn.parentNode.replaceChild(newReportTheftBtn, reportTheftBtn);
        
        newReportTheftBtn.addEventListener('click', () => {
          if (confirm(`Are you sure you want to report that another vehicle is currently occupying Slot ${booking.slotId}?\n\nThis will trigger a security dispatch and immediately reassign you to a free parking slot as compensation.`)) {
            const res = reportSlotTheft(bookingId);
            if (res.success) {
              this.showToast(res.message, 'success');
              modal.close();
              this.updateDashboard();
              
              // Re-open digital ticket with the new slot and rate
              setTimeout(() => {
                this.openDigitalPass(bookingId);
              }, 400);
            } else {
              this.showToast(res.error || 'Dispute registered.', 'warning');
              modal.close();
              this.updateDashboard();
            }
          }
        });
      } else {
        disputeActions.style.display = 'none';
      }
    }

    modal.showModal();
  }

  async renderQR(bookingId) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const qrImg = document.getElementById('pass-qr-code-img');
    const dataUrl = await generateQRDataUrl(bookingId, isDark);
    if (qrImg) qrImg.src = dataUrl;
  }

  updateLockUI(isLocked, lockBox, lockTitle, lockDesc, lockIcon) {
    if (!lockBox || !lockTitle || !lockDesc || !lockIcon) return;
    
    if (isLocked) {
      lockBox.classList.add('locked');
      lockTitle.textContent = 'Vehicle Security Locked';
      lockTitle.style.color = 'var(--danger)';
      lockDesc.textContent = 'Exit block active. Disable lock to drive out.';
      lockIcon.innerHTML = `
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      `;
    } else {
      lockBox.classList.remove('locked');
      lockTitle.textContent = 'Vehicle Security Unlocked';
      lockTitle.style.color = '';
      lockDesc.textContent = 'Lock vehicle to secure it at the exit gates.';
      lockIcon.innerHTML = `
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      `;
    }
  }

  setupModalDismiss() {
    const bookingModal = document.getElementById('booking-modal');
    const passModal = document.getElementById('pass-modal');
    const closeBooking = document.getElementById('btn-close-booking-modal');
    const closePass = document.getElementById('btn-close-pass-modal');

    if (closeBooking) closeBooking.addEventListener('click', () => bookingModal.close());
    if (closePass) closePass.addEventListener('click', () => passModal.close());

    // Light dismiss fallback
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      [bookingModal, passModal].forEach(dialog => {
        if (!dialog) return;
        dialog.addEventListener('click', (event) => {
          if (event.target !== dialog) return;
          const rect = dialog.getBoundingClientRect();
          const isContent = (
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
          );
          if (!isContent) dialog.close();
        });
      });
    }
  }
}
