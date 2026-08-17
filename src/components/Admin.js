import { 
  getInitialState, 
  resolveAlert, 
  addSlot, 
  removeSlot, 
  resetSystem 
} from '../data.js';

export class Admin {
  constructor(showToast) {
    this.showToast = showToast;
  }

  render() {
    return `
      <div class="static-page-header">
        <h1>Command &amp; Security Control Center</h1>
        <p>View bookings, manage slot layouts, respond to security breach alerts, and read support tickets.</p>
      </div>

      <div class="admin-layout">
        <!-- Alerts and Management Column -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          
          <!-- Security Alerts Feed -->
          <div class="card" id="admin-alerts-card">
            <div class="card-header" style="background-color: var(--danger-bg); border-bottom-color: var(--danger);">
              <h2 class="card-title" style="color: var(--danger); display: flex; align-items: center; gap: 0.5rem;">
                <svg width="20" height="20" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                Active Security Breaches (<span id="admin-alerts-count">0</span>)
              </h2>
            </div>
            <div class="card-body">
              <div class="alert-feed-list" id="admin-alerts-feed">
                <p class="text-secondary" style="text-align: center; padding: 1.5rem 0;">No active security breaches or lock violations detected.</p>
              </div>
            </div>
          </div>

          <!-- Slots Management -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Manage Parking Layout</h2>
            </div>
            <div class="card-body">
              <div class="grid-2col" style="gap: 1.5rem; align-items: start;">
                <!-- Add slot form -->
                <form id="admin-add-slot-form" style="border-right: 1px solid var(--border-color); padding-right: 1.5rem;">
                  <h3 style="font-size: 1rem; margin-bottom: 1rem;">Add New Parking Slot</h3>
                  <div class="form-group">
                    <label for="admin-slot-id">Slot ID (Unique, e.g. A9)</label>
                    <input type="text" id="admin-slot-id" class="form-control" placeholder="A9" required />
                  </div>
                  <div class="form-group">
                    <label for="admin-slot-zone">Zone (A, B, C...)</label>
                    <input type="text" id="admin-slot-zone" class="form-control" placeholder="A" maxLength="1" required />
                  </div>
                  <div class="form-group">
                    <label for="admin-slot-type">Slot Category</label>
                    <select id="admin-slot-type" class="form-control" required>
                      <option value="Standard">Standard Parking</option>
                      <option value="EV Charging">EV Charging Slot</option>
                      <option value="Premium / VIP">Premium / VIP Slot</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="admin-slot-rate">Hourly Rate ($)</label>
                    <input type="number" id="admin-slot-rate" class="form-control" step="0.5" min="0.5" value="2.0" required />
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">Add Slot to Grid</button>
                </form>

                <!-- Slots List with delete -->
                <div>
                  <h3 style="font-size: 1rem; margin-bottom: 1rem;">Active Layout Slots (<span id="admin-slots-total">20</span>)</h3>
                  <div id="admin-slots-list" style="max-height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; border: 1px solid var(--border-color); padding: 0.75rem; border-radius: var(--radius-sm);">
                    <!-- Dynamic rendering -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Support Tickets Logs -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">User Support &amp; Contact Enquiries</h2>
            </div>
            <div class="card-body">
              <div class="ticket-list" id="admin-tickets-list">
                <p class="text-secondary" style="text-align: center; padding: 1.5rem 0;">No support inquiries or contact submissions found.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bookings Column -->
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <h2 class="card-title">All Reservations History</h2>
            <button id="admin-reset-system" class="btn btn-danger" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">Reset Database</button>
          </div>
          <div class="card-body" style="padding: 0;">
            <div id="admin-bookings-table-wrapper" style="max-height: 600px; overflow-y: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
                <thead>
                  <tr style="background-color: var(--bg-tertiary); border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 0.75rem 1rem;">Booking ID</th>
                    <th style="padding: 0.75rem 1rem;">Slot</th>
                    <th style="padding: 0.75rem 1rem;">Plate</th>
                    <th style="padding: 0.75rem 1rem;">Status</th>
                    <th style="padding: 0.75rem 1rem;">Cost</th>
                  </tr>
                </thead>
                <tbody id="admin-bookings-rows">
                  <tr>
                    <td colspan="5" class="text-secondary" style="text-align: center; padding: 2rem;">No bookings found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    this.updateAdminView();
    this.setupListeners();
  }

  updateAdminView() {
    const state = getInitialState();
    
    // 1. Alert counts
    const alertsFeed = document.getElementById('admin-alerts-feed');
    const alertCountEl = document.getElementById('admin-alerts-count');
    const activeAlerts = state.alerts.filter(a => !a.resolved);
    
    if (alertCountEl) alertCountEl.textContent = activeAlerts.length;

    if (alertsFeed) {
      if (activeAlerts.length === 0) {
        alertsFeed.innerHTML = '<p class="text-secondary" style="text-align: center; padding: 1.5rem 0;">No active security breaches or lock violations detected.</p>';
      } else {
        alertsFeed.innerHTML = '';
        activeAlerts.forEach(alert => {
          const item = document.createElement('div');
          item.className = 'alert-feed-item';
          item.innerHTML = `
            <div class="alert-feed-content">
              <div class="alert-feed-msg">${alert.message}</div>
              <div class="alert-feed-time">Detected: ${new Date(alert.timestamp).toLocaleTimeString()} - Alert ID: ${alert.id}</div>
            </div>
            <button class="btn btn-danger btn-dismiss-alert" data-id="${alert.id}">Dismiss / Dispatch Guard</button>
          `;

          item.querySelector('.btn-dismiss-alert').addEventListener('click', () => {
            resolveAlert(alert.id);
            this.showToast('Alert cleared. Security guard dispatched.', 'success');
            this.updateAdminView();
          });

          alertsFeed.appendChild(item);
        });
      }
    }

    // 2. Render Layout Slots List
    const slotsList = document.getElementById('admin-slots-list');
    const totalSlotsEl = document.getElementById('admin-slots-total');
    
    if (totalSlotsEl) totalSlotsEl.textContent = state.slots.length;
    
    if (slotsList) {
      slotsList.innerHTML = '';
      state.slots.forEach(slot => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        item.style.padding = '0.5rem';
        item.style.borderBottom = '1px solid var(--border-color)';
        item.style.fontSize = '0.85rem';

        let badgeColor = 'var(--success)';
        if (slot.status === 'reserved') badgeColor = 'var(--accent)';
        if (slot.status === 'occupied') badgeColor = 'var(--warning)';
        if (slot.status === 'theft-alert') badgeColor = 'var(--danger)';

        item.innerHTML = `
          <div>
            <span style="font-weight: 700;">${slot.id}</span> 
            <span class="text-secondary" style="margin-left: 0.5rem;">(${slot.type} - $${slot.rate}/hr)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-weight: 600; color: ${badgeColor}; font-size: 0.75rem; text-transform: uppercase;">${slot.status}</span>
            ${slot.status === 'available' ? `<button class="btn btn-secondary btn-delete-slot" data-id="${slot.id}" style="padding: 0.2rem 0.4rem; font-size: 0.75rem;">&times;</button>` : ''}
          </div>
        `;

        if (slot.status === 'available') {
          item.querySelector('.btn-delete-slot').addEventListener('click', () => {
            const res = removeSlot(slot.id);
            if (res.success) {
              this.showToast(`Slot ${slot.id} removed.`, 'success');
              this.updateAdminView();
            } else {
              this.showToast(res.error, 'error');
            }
          });
        }

        slotsList.appendChild(item);
      });
    }

    // 3. Render Bookings history
    const bookingsRows = document.getElementById('admin-bookings-rows');
    if (bookingsRows) {
      if (state.bookings.length === 0) {
        bookingsRows.innerHTML = `
          <tr>
            <td colspan="5" class="text-secondary" style="text-align: center; padding: 2rem;">No bookings found.</td>
          </tr>
        `;
      } else {
        bookingsRows.innerHTML = '';
        const sortedBookings = [...state.bookings].reverse();
        sortedBookings.forEach(b => {
          const row = document.createElement('tr');
          row.style.borderBottom = '1px solid var(--border-color)';
          
          let statusColor = 'var(--accent)';
          if (b.status === 'checked-in') statusColor = 'var(--warning)';
          if (b.status === 'completed') statusColor = 'var(--success)';
          if (b.status === 'cancelled') statusColor = 'var(--text-secondary)';

          row.innerHTML = `
            <td style="padding: 0.75rem 1rem; font-family: monospace;">${b.id}</td>
            <td style="padding: 0.75rem 1rem; font-weight: 600;">${b.slotId}</td>
            <td style="padding: 0.75rem 1rem;">${b.vehiclePlate}</td>
            <td style="padding: 0.75rem 1rem; font-weight: 600; color: ${statusColor};">${b.status.toUpperCase()}</td>
            <td style="padding: 0.75rem 1rem; font-weight: 700;">${b.cost ? `$${b.cost.toFixed(2)}` : '--'}</td>
          `;
          bookingsRows.appendChild(row);
        });
      }
    }

    // 4. Support Tickets
    const ticketsList = document.getElementById('admin-tickets-list');
    if (ticketsList) {
      if (state.supportTickets.length === 0) {
        ticketsList.innerHTML = '<p class="text-secondary" style="text-align: center; padding: 1.5rem 0;">No support inquiries or contact submissions found.</p>';
      } else {
        ticketsList.innerHTML = '';
        state.supportTickets.forEach(ticket => {
          const tElement = document.createElement('div');
          tElement.className = 'ticket-item';
          tElement.innerHTML = `
            <div class="ticket-header">
              <div>
                <div class="ticket-subject">${ticket.subject}</div>
                <div class="ticket-meta">From: ${ticket.name} (${ticket.email})</div>
              </div>
              <div class="ticket-meta">${new Date(ticket.timestamp).toLocaleString()}</div>
            </div>
            <div class="ticket-message">${ticket.message}</div>
          `;
          ticketsList.appendChild(tElement);
        });
      }
    }
  }

  setupListeners() {
    const addSlotForm = document.getElementById('admin-add-slot-form');
    const resetBtn = document.getElementById('admin-reset-system');

    if (addSlotForm) {
      addSlotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('admin-slot-id').value;
        const zone = document.getElementById('admin-slot-zone').value;
        const type = document.getElementById('admin-slot-type').value;
        const rate = document.getElementById('admin-slot-rate').value;

        const res = addSlot(id, zone, type, rate);
        if (res.success) {
          this.showToast(`Slot ${id} added to the grid map.`, 'success');
          addSlotForm.reset();
          this.updateAdminView();
        } else {
          this.showToast(res.error, 'error');
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to restore the system to defaults? This will erase all bookings, alerts, and tickets!')) {
          resetSystem();
          this.showToast('Database reset to defaults.', 'success');
          window.location.hash = '#/dashboard';
        }
      });
    }
  }
}
