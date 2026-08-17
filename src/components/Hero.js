/**
 * Hero Component
 * Renders the top introductory banner illustrating the project's utility.
 */
export class Hero {
  render() {
    return `
      <div class="hero-section" style="background: linear-gradient(135deg, hsl(var(--accent-rgb) / 0.05) 0%, hsl(var(--accent-rgb) / 0.01) 100%); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2.5rem 2rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; position: relative; overflow: hidden; box-shadow: var(--card-shadow);">
        <div style="flex: 1.5; z-index: 2;">
          <span style="background: hsl(var(--accent-rgb) / 0.08); color: var(--accent); padding: 0.35rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; margin-bottom: 1rem;">
            🛡️ IoT Anti-Parking-Slot Theft &amp; Security Lock
          </span>
          <h1 style="font-size: 2.15rem; font-weight: 800; line-height: 1.25; margin-bottom: 1rem; letter-spacing: -0.03em;">
            Smart Parking Security &amp;<br/>Reservation System
          </h1>
          <p class="text-secondary" style="font-size: 1rem; margin-bottom: 1.5rem; max-width: 580px; line-height: 1.5;">
            An advanced parking lot management system utilizing QR codes, license plate match sensors, and a real-time anti-theft exit gate lock to prevent space piracy and unauthorized vehicle drive-off.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="#/simulator" class="btn btn-primary">Launch Gate Simulator</a>
            <a href="#/about" class="btn btn-secondary">System Workflow</a>
          </div>
        </div>
        <div class="hero-art-container" style="flex: 1; display: flex; justify-content: center; position: relative; z-index: 1;">
          <svg viewBox="0 0 200 200" style="width: 100%; max-width: 160px; height: auto;">
            <circle cx="100" cy="100" r="80" fill="hsl(var(--accent-rgb) / 0.03)" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.3" />
            <!-- Car body background -->
            <path d="M50 140 h100 v-15 a 10 10 0 0 0 -10 -10 H60 a 10 10 0 0 0 -10 10 z" fill="var(--bg-tertiary)" stroke="var(--border-color)" stroke-width="2" />
            <!-- Security lock -->
            <rect x="75" y="75" width="50" height="42" rx="8" fill="var(--bg-secondary)" stroke="var(--accent)" stroke-width="3" />
            <path d="M85 75V60a15 15 0 1 1 30 0v15" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" />
            <circle cx="100" cy="96" r="6" fill="var(--accent)" />
            <!-- Checkmark -->
            <path d="M96 122 l3 3 l6 -6" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    `;
  }

  init() {
    // Hero interactive features if any (none needed, static display)
  }
}
