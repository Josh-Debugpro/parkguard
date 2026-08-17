import { router } from './router.js';
import { Navbar } from './components/Navbar.js';
import { Dashboard } from './components/Dashboard.js';
import { Simulator } from './components/Simulator.js';
import { Admin } from './components/Admin.js';
import { About } from './components/About.js';
import { Contact } from './components/Contact.js';

// ==================== TOAST NOTIFICATION SYSTEM ====================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '';
  if (type === 'success') {
    icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>`;
  } else if (type === 'error') {
    icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>`;
  } else if (type === 'warning') {
    icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
  } else {
    icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
  }

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 4000);
}

// ==================== APP INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mount Navigation Bar
  const navbarMount = document.getElementById('navbar-mount');
  const navbar = new Navbar((newTheme) => {
    // Rerender QR code color if dashboard has pass modal open
    if (router.currentComponent && typeof router.currentComponent.renderQR === 'function') {
      const passModal = document.getElementById('pass-modal');
      if (passModal && passModal.hasAttribute('open')) {
        const bookingId = document.getElementById('pass-booking-id').textContent;
        router.currentComponent.renderQR(bookingId);
      }
    }
  });

  if (navbarMount) {
    navbarMount.innerHTML = navbar.render();
    navbar.init();
  }

  // 2. Instantiate View Components
  const dashboard = new Dashboard(showToast);
  const simulator = new Simulator(showToast);
  const admin = new Admin(showToast);
  const about = new About();
  const contact = new Contact(showToast);

  // 3. Register SPA Component Routes
  router.setMountPoint('view-mount');
  router.on('#/dashboard', dashboard);
  router.on('#/simulator', simulator);
  router.on('#/admin', admin);
  router.on('#/about', about);
  router.on('#/contact', contact);

  // 4. Trigger Initial Route mount
  router.handleRouting();
});
