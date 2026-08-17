export class About {
  render() {
    return `
      <div class="static-page-header">
        <h1>About Smart Parking Security &amp; Reservation System</h1>
        <p>A smart IoT-inspired system designed to resolve space piracy, parking fraud, and vehicle theft.</p>
      </div>

      <div class="grid-2col">
        <!-- Story and Description -->
        <div>
          <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--accent);">Anti-Theft Parking Innovation</h2>
          <p class="text-secondary" style="margin-bottom: 1.25rem;">
            In traditional parking lots, reservations only act as a signpost. Anyone can slide into an empty reserved spot, leading to disputes, lost revenues, and frustration. Furthermore, once inside a parking garage, vehicles are vulnerable to theft.
          </p>
          <p class="text-secondary" style="margin-bottom: 1.5rem;">
            <strong>ParkGuard</strong> resolves both problems simultaneously. By binding digital ticket check-ins to license plate scans, the entry gates verify identity before opening. If an unauthorized car slides in, the slot sensor flags it instantly. When parked, drivers can toggle the <strong>Security Lock</strong> via their smartphone. If a thief tries to roll the locked car past exit sensors, the system locks down exit gates, triggers loud sirens, and alerts parking authorities.
          </p>

          <h3 style="font-weight: 600; font-size: 1.1rem; margin-bottom: 1rem;">Core Security Workflows</h3>
          <div class="about-features">
            <div class="feature-box">
              <div class="feature-box-icon">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div class="feature-box-content">
                <h3>QR &amp; Plate Verification</h3>
                <p>Gates cross-reference the digital QR pass with the physical license plate. Mismatching vehicles are denied access.</p>
              </div>
            </div>
            
            <div class="feature-box">
              <div class="feature-box-icon">
                <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div class="feature-box-content">
                <h3>Smartphone Slot Lock</h3>
                <p>Secure your vehicle directly from the browser app. When activated, the exit gate will block the vehicle until the owner unlocks it.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Technical and Team info -->
        <div>
          <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Technology &amp; Security Flow</h2>
          <div class="info-box" style="margin-bottom: 2rem;">
            <div class="info-title">System Architecture Overview</div>
            <div class="text-secondary" style="line-height: 1.6;">
              This web application acts as a simulation and monitoring dashboard representing a real-world edge IoT network. 
              <br/><br/>
              <strong>1. Client Interface:</strong> The user accesses the dashboard to reserve spaces, check prices, and obtain QR tickets.
              <br/><br/>
              <strong>2. Simulation Node:</strong> Emulates automated gate nodes and ultrasonic parking bay sensors, sending verification payloads.
              <br/><br/>
              <strong>3. Command Center:</strong> Receives event logs, updates layout configurations, and dispatches security guards when slot theft or vehicle movement alarms trigger.
            </div>
          </div>

          <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Developer Team</h2>
          <div class="team-grid">
            <div class="team-card">
              <div class="team-avatar">JD</div>
              <div class="team-name">Joshua D.</div>
              <div class="team-role">Lead Developer</div>
              <p class="text-secondary" style="font-size: 0.75rem;">Full Stack Developer &amp; Security Enthusiast</p>
            </div>
            <div class="team-card">
              <div class="team-avatar">AG</div>
              <div class="team-name">Antigravity AI</div>
              <div class="team-role">AI Architect</div>
              <p class="text-secondary" style="font-size: 0.75rem;">Pair-Programming Assistant &amp; Designer</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    // Static page, no dynamic binds required
  }
}
