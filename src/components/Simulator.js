import { 
  getInitialState, 
  checkInVehicle, 
  checkOutVehicle 
} from '../data.js';

export class Simulator {
  constructor(showToast) {
    this.showToast = showToast;
  }

  render() {
    return `
      <div class="static-page-header">
        <h1>Smart Security Gate Simulation Panel</h1>
        <p>Test and verify the anti-parking slot theft features, QR verifications, and alarm alerts.</p>
      </div>

      <div class="simulator-layout">
        <!-- Control Forms Column -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- Check-in Gate -->
          <div class="simulation-gate">
            <div class="gate-indicator closed" id="entry-gate-indicator">
              <span style="font-weight: 600;">ENTRY GATE SENSOR</span>
              <span class="gate-status-light"></span>
            </div>
            <h3>Simulate Vehicle Entry</h3>
            <p class="text-secondary" style="font-size: 0.85rem; margin-top: -0.5rem;">
              Simulate a car arriving at the gate. Enter plate + matching Booking ID. If a different vehicle attempts to park in a reserved slot, slot theft is triggered!
            </p>
            <form id="simulator-entry-form">
              <div class="form-group">
                <label for="sim-entry-slot">Parking Slot to Enter</label>
                <select id="sim-entry-slot" class="form-control" required>
                  <option value="">-- Choose Slot --</option>
                </select>
              </div>
              <div class="form-group">
                <label for="sim-entry-booking">Booking ID / Scan Ticket</label>
                <input type="text" id="sim-entry-booking" class="form-control" placeholder="BK-123456" />
                <span class="text-secondary" style="font-size: 0.75rem;">(Leave blank to simulate parking without reservation)</span>
              </div>
              <div class="form-group">
                <label for="sim-entry-plate">Arriving Vehicle License Plate</label>
                <input type="text" id="sim-entry-plate" class="form-control" placeholder="e.g. KA-01-AB-1234" required />
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Simulate Gate Entry Check
              </button>
            </form>
          </div>

          <!-- Check-out Gate -->
          <div class="simulation-gate">
            <div class="gate-indicator closed" id="exit-gate-indicator">
              <span style="font-weight: 600;">EXIT GATE SENSOR</span>
              <span class="gate-status-light"></span>
            </div>
            <h3>Simulate Vehicle Exit</h3>
            <p class="text-secondary" style="font-size: 0.85rem; margin-top: -0.5rem;">
              Simulate a car leaving. Enter PIN. If the user toggled the "Security Lock" in the booking pass, the exit gate will block the vehicle and trigger an alarm.
            </p>
            <form id="simulator-exit-form">
              <div class="form-group">
                <label for="sim-exit-slot">Parking Slot to Exit</label>
                <select id="sim-exit-slot" class="form-control" required>
                  <option value="">-- Choose Slot --</option>
                </select>
              </div>
              <div class="form-group">
                <label for="sim-exit-pin">Security PIN (4 digits)</label>
                <input type="password" id="sim-exit-pin" class="form-control" maxLength="4" placeholder="Enter PIN" />
                <span class="text-secondary" style="font-size: 0.75rem;">(Unnecessary if slot is unauthorized/theft status)</span>
              </div>
              <button type="submit" class="btn btn-secondary btn-block">
                Simulate Gate Exit Check
              </button>
            </form>
          </div>
        </div>

        <!-- Real-Time Activity Monitor Log Column -->
        <div class="card">
          <div class="card-header" style="background-color: var(--bg-tertiary);">
            <h2 class="card-title">Live Simulator Activity &amp; Alarm Log</h2>
            <button id="clear-simulator-logs" class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">Clear Logs</button>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 1rem; height: calc(100% - 60px);">
            <div class="logs-list" id="simulator-logs-feed" style="flex: 1; min-height: 480px;">
              <div class="log-item">
                <span class="log-time">[20:56:50]</span>
                <span class="log-msg">Security monitoring systems initialized and active.</span>
              </div>
            </div>
            <div class="info-box">
              <div style="font-weight: 600; font-size: 0.85rem;">Simulate Quick Theft Test Steps:</div>
              <ol style="font-size: 0.8rem; padding-left: 1.25rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem;">
                <li>Go to <strong>Dashboard</strong>, select <strong>Slot A1</strong>, click <strong>Reserve</strong>, enter vehicle number (e.g. <code>KA-01-1234</code>).</li>
                <li>In the <strong>Security Simulator</strong>, choose <strong>Slot A1</strong>. Try entering a different plate (e.g. <code>DL-03-5555</code>) with the Booking ID.</li>
                <li>Click <strong>Gate Entry Check</strong>. Observe the warning and flashing red slot alert!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    this.updateDropdowns();
    this.setupListeners();
  }

  updateDropdowns() {
    const state = getInitialState();
    const entrySelect = document.getElementById('sim-entry-slot');
    const exitSelect = document.getElementById('sim-exit-slot');

    if (entrySelect) {
      entrySelect.innerHTML = '<option value="">-- Choose Slot --</option>';
      state.slots.forEach(slot => {
        if (slot.status === 'available' || slot.status === 'reserved') {
          entrySelect.innerHTML += `<option value="${slot.id}">${slot.id} (${slot.status.toUpperCase()})</option>`;
        }
      });
    }

    if (exitSelect) {
      exitSelect.innerHTML = '<option value="">-- Choose Slot --</option>';
      state.slots.forEach(slot => {
        if (slot.status === 'occupied' || slot.status === 'theft-alert') {
          exitSelect.innerHTML += `<option value="${slot.id}">${slot.id} (${slot.status.toUpperCase()})</option>`;
        }
      });
    }
  }

  setupListeners() {
    const entryForm = document.getElementById('simulator-entry-form');
    const exitForm = document.getElementById('simulator-exit-form');
    const clearLogsBtn = document.getElementById('clear-simulator-logs');

    if (entryForm) {
      entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const slotId = document.getElementById('sim-entry-slot').value;
        const bookingId = document.getElementById('sim-entry-booking').value;
        const plate = document.getElementById('sim-entry-plate').value;

        const res = checkInVehicle(bookingId, slotId, plate);
        const entryGateInd = document.getElementById('entry-gate-indicator');

        if (res.success) {
          this.showToast('Gate Verified! Access Granted.', 'success');
          this.logEvent(`ENTRY GATE: Vehicle ${plate.toUpperCase()} checked into slot ${slotId}. Reservation verified.`, false, true);
          
          if (entryGateInd) {
            entryGateInd.classList.remove('closed');
            entryGateInd.classList.add('open');
            setTimeout(() => {
              entryGateInd.classList.remove('open');
              entryGateInd.classList.add('closed');
            }, 2500);
          }

          entryForm.reset();
          this.updateDropdowns();
        } else {
          this.showToast(res.error, 'error');
          if (res.alert) {
            this.logEvent(`SECURITY BREACH WARNING: ${res.error} (Alert ID: ${res.alert.id})`, true);
            this.triggerAlarm();
          } else {
            this.logEvent(`ENTRY GATES DENIED: ${res.error}`, true);
          }
          this.updateDropdowns();
        }
      });
    }

    if (exitForm) {
      exitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const slotId = document.getElementById('sim-exit-slot').value;
        const pin = document.getElementById('sim-exit-pin').value;

        const res = checkOutVehicle(slotId, pin);
        const exitGateInd = document.getElementById('exit-gate-indicator');

        if (res.success) {
          this.showToast('Gate Verified! Exit Granted.', 'success');
          if (res.booking) {
            this.logEvent(`EXIT GATE: Vehicle ${res.booking.vehiclePlate} checked out. Duration: ${res.billedHours} hr. Final Bill: $${res.finalCost.toFixed(2)}.`, false, true);
          } else {
            this.logEvent(`EXIT GATE: Slot ${slotId} cleared.`, false, true);
          }

          if (exitGateInd) {
            exitGateInd.classList.remove('closed');
            exitGateInd.classList.add('open');
            setTimeout(() => {
              exitGateInd.classList.remove('open');
              exitGateInd.classList.add('closed');
            }, 2500);
          }

          exitForm.reset();
          this.updateDropdowns();
        } else {
          this.showToast(res.error, 'error');
          if (res.alert) {
            this.logEvent(`ANTI-THEFT LOCKOUT: Gate closed! Locked vehicle movement detected on slot ${slotId}. (Alert ID: ${res.alert.id})`, true);
            this.triggerAlarm();
          } else {
            this.logEvent(`EXIT GATES DENIED: ${res.error}`, true);
          }
          this.updateDropdowns();
        }
      });
    }

    if (clearLogsBtn) {
      clearLogsBtn.addEventListener('click', () => {
        const logsFeed = document.getElementById('simulator-logs-feed');
        if (logsFeed) {
          logsFeed.innerHTML = `
            <div class="log-item">
              <span class="log-time">[${new Date().toLocaleTimeString()}]</span>
              <span class="log-msg">Simulator logs cleared. Security monitoring active.</span>
            </div>
          `;
        }
      });
    }
  }

  logEvent(message, isError = false, isSuccess = false) {
    const logsFeed = document.getElementById('simulator-logs-feed');
    if (!logsFeed) return;
    
    const time = new Date().toLocaleTimeString();
    const logItem = document.createElement('div');
    logItem.className = 'log-item';
    
    let msgClass = 'log-msg';
    if (isError) msgClass += ' error';
    if (isSuccess) msgClass += ' success';

    logItem.innerHTML = `
      <span class="log-time">[${time}]</span>
      <span class="${msgClass}">${message}</span>
    `;

    logsFeed.appendChild(logItem);
    logsFeed.scrollTop = logsFeed.scrollHeight;
  }

  triggerAlarm() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (!ctx) return;
      
      const playBeep = (delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        
        osc.start(ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.5);
        osc.stop(ctx.currentTime + delay + 0.5);
      };

      playBeep(0);
      playBeep(0.6);
    } catch (e) {
      console.warn('Audio Context alarm beep failed.', e);
    }
  }
}
