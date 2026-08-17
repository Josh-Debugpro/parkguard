/**
 * Navbar Component
 * Renders the top navigation header and manages light/dark mode toggling.
 */
export class Navbar {
  constructor(onThemeChange) {
    this.onThemeChange = onThemeChange;
  }

  render() {
    return `
      <div class="nav-container">
        <a href="#/dashboard" class="logo-link">
          <svg class="logo-icon" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
            <circle cx="12" cy="12" r="10" stroke-opacity="0.1" />
          </svg>
          <span class="logo-text">ParkGuard</span>
        </a>
        <nav>
          <ul>
            <li><a href="#/dashboard" class="nav-link">Dashboard</a></li>
            <li><a href="#/simulator" class="nav-link">Security Simulator</a></li>
            <li><a href="#/admin" class="nav-link">Admin Center</a></li>
            <li><a href="#/about" class="nav-link">About Us</a></li>
            <li><a href="#/contact" class="nav-link">Contact &amp; Support</a></li>
          </ul>
        </nav>
        <div class="controls-container">
          <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle light/dark theme">
            <svg class="theme-icon-sun" viewBox="0 0 24 24" style="display: none;">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <svg class="theme-icon-moon" viewBox="0 0 24 24">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  init() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    
    const sunIcon = toggleBtn.querySelector('.theme-icon-sun');
    const moonIcon = toggleBtn.querySelector('.theme-icon-moon');
    const htmlEl = document.documentElement;

    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
      
      if (this.onThemeChange) {
        this.onThemeChange(newTheme);
      }
    });

    function updateThemeIcons(theme) {
      if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    }
  }
}
