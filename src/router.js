// Single Page Application Component Router

class Router {
  constructor() {
    this.routes = {};
    this.currentComponent = null;
    this.mountPoint = null;

    // Handle hash change events
    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('DOMContentLoaded', () => this.handleRouting());
  }

  // Set the DOM container where pages should render
  setMountPoint(elementId) {
    this.mountPoint = document.getElementById(elementId);
  }

  // Register a route mapped to a component instance
  on(route, componentInstance) {
    this.routes[route] = componentInstance;
  }

  handleRouting() {
    if (!this.mountPoint) {
      this.mountPoint = document.getElementById('view-mount');
      if (!this.mountPoint) return;
    }

    let hash = window.location.hash || '#/dashboard';
    
    // Normalize path fallback
    if (!this.routes[hash]) {
      hash = '#/dashboard';
    }

    const nextComponent = this.routes[hash];

    // 1. Run destructor on previous component if active (e.g., clear billing intervals)
    if (this.currentComponent && typeof this.currentComponent.destroy === 'function') {
      this.currentComponent.destroy();
    }

    // 2. Render new component layout HTML to the mount container
    this.mountPoint.innerHTML = nextComponent.render();

    // 3. Call the component initialization (e.g., event bindings, chart draws)
    if (typeof nextComponent.init === 'function') {
      nextComponent.init();
    }

    // Keep pointer to active component
    this.currentComponent = nextComponent;

    // 4. Highlight active nav links in the header navbar
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Programmatically trigger path change
  navigate(hash) {
    window.location.hash = hash;
  }
}

export const router = new Router();
