// ============================================================
//  FITTRACK — Shared Navigation (Top Navbar)
//  Injected into every page automatically
// ============================================================

(function injectNav() {
  const isRoot = !location.pathname.includes('/pages/');
  const prefix = isRoot ? 'pages/' : '';
  const rootPrefix = isRoot ? '' : '../';

  // Build top navbar — replaces the old top-header + bottom-nav
  const nav = document.createElement('nav');
  nav.className = 'top-nav';
  nav.innerHTML = `
    <div class="top-nav-inner">
      <a class="top-nav-logo" href="${rootPrefix}index.html">FIT<span>TRACK</span></a>

      <!-- Desktop links -->
      <div class="top-nav-links">
        <a class="nav-link" href="${rootPrefix}index.html">
          <span class="nav-link-icon">🏠</span> Home
        </a>
        <a class="nav-link" href="${prefix}calories.html">
          <span class="nav-link-icon">🍽️</span> Food
        </a>
        <a class="nav-link" href="${prefix}cardio.html">
          <span class="nav-link-icon">🔥</span> Cardio
        </a>
        <a class="nav-link" href="${prefix}weight.html">
          <span class="nav-link-icon">📉</span> Weight
        </a>
      </div>

      <div class="top-nav-right">
        <div id="authStatus"></div>
        <!-- Hamburger for mobile -->
        <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    <div class="mobile-menu" id="mobileMenu">
      <a class="mobile-link" href="${rootPrefix}index.html">🏠 Home</a>
      <a class="mobile-link" href="${prefix}calories.html">🍽️ Food Log</a>
      <a class="mobile-link" href="${prefix}cardio.html">🔥 Cardio</a>
      <a class="mobile-link" href="${prefix}weight.html">📉 Weight</a>
    </div>
  `;

  // Insert at very top of body
  document.body.insertBefore(nav, document.body.firstChild);

  // Hamburger toggle
  document.getElementById('hamburgerBtn').addEventListener('click', () => {
    const menu = document.getElementById('mobileMenu');
    const btn  = document.getElementById('hamburgerBtn');
    menu.classList.toggle('open');
    btn.classList.toggle('open');
  });

  // Close menu on link click
  document.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.remove('open');
      document.getElementById('hamburgerBtn').classList.remove('open');
    });
  });

  // Inject shared auth modal (still used as fallback)
  const authModal = document.createElement('div');
  authModal.id = 'authModal';
  authModal.className = 'modal-overlay';
  authModal.style.display = 'none';
  authModal.innerHTML = `
    <div class="modal">
      <div class="modal-handle"></div>
      <h2>SIGN IN</h2>
      <p class="modal-sub">Your data syncs across all devices</p>
      <div class="form-group">
        <input type="email" id="authEmail" placeholder="Email address" class="input" autocomplete="email"/>
      </div>
      <div class="form-group">
        <input type="password" id="authPassword" placeholder="Password (6+ chars)" class="input" autocomplete="current-password"/>
      </div>
      <button class="btn btn-primary" id="signInBtn" style="margin-bottom:10px">Sign In</button>
      <button class="btn btn-ghost" id="signUpBtn">Create Account</button>
      <p class="modal-error" id="authError"></p>
      <button id="closeAuthModal" style="position:absolute;top:16px;right:16px;background:var(--surface2);border:1px solid var(--border);color:var(--muted);width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;">✕</button>
    </div>
  `;
  document.body.appendChild(authModal);
})();
