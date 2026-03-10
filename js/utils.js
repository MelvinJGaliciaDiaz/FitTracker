// ============================================================
//  FITTRACK — Shared Utilities
// ============================================================

// ===== TOAST =====
function showToast(msg, type = 'success') {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity 0.3s';
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

// ===== AUTH GATE =====
// Redirects to login if not signed in. Call at the top of every page.
async function authGate() {
  const { data: { user } } = await db.auth.getUser();
  if (!user) {
    const isInPages = location.pathname.includes('/pages/');
    window.location.replace(isInPages ? '../login.html' : 'login.html');
    return null;
  }
  return user;
}

// ===== AUTH UI (header sign-out button) =====
async function updateAuthUI() {
  const { data: { user } } = await db.auth.getUser();
  const statusEl = document.getElementById('authStatus');
  if (!statusEl) return;

  if (user) {
    const short = user.email.split('@')[0];
    statusEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:12px;color:var(--muted);max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">👤 ${short}</span>
        <button class="btn btn-ghost btn-sm" id="signOutBtn">Sign Out</button>
      </div>`;
    document.getElementById('signOutBtn')?.addEventListener('click', async () => {
      await db.auth.signOut();
      const isInPages = location.pathname.includes('/pages/');
      window.location.href = isInPages ? '../login.html' : 'login.html';
    });
  }
}

// ===== REQUIRE AUTH (soft — shows modal instead of redirect) =====
// Use this inside button click handlers so the action prompts login if session expired
async function requireAuth() {
  const { data: { user } } = await db.auth.getUser();
  if (!user) {
    const isInPages = location.pathname.includes('/pages/');
    window.location.replace(isInPages ? '../login.html' : 'login.html');
    return null;
  }
  return user;
}

// ===== DATE HELPERS =====
function todayStr() {
  // Use local date — NOT toISOString() which converts to UTC and breaks after 4pm in US timezones
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ===== ACTIVE NAV =====
function setActiveNav() {
  const path = location.pathname;

  // Mark both desktop (.nav-link) and mobile (.mobile-link) links active
  document.querySelectorAll('.nav-link, .mobile-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    const normalized = href.replace('../', '');
    const isHome = (normalized === 'index.html') &&
      (path.endsWith('/') || path.endsWith('index.html'));
    const isOther = normalized !== 'index.html' && path.includes(normalized);
    a.classList.toggle('active', isHome || isOther);
  });
}

// ===== OPENAI HELPER =====
async function askClaude(systemPrompt, userMessage, imageBase64 = null) {
  // Build the user message content — supports text + optional image
  const userContent = imageBase64
    ? [
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}`, detail: 'high' } },
        { type: 'text', text: userMessage }
      ]
    : userMessage;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',          // vision + text, fast and accurate
      max_tokens: 1000,
      response_format: { type: 'json_object' },  // guarantees valid JSON back
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userContent  }
      ]
    })
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  const raw = data.choices[0].message.content;
  return JSON.parse(raw);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Run auth gate on all pages except login/reset
  const skipAuth = ['login.html', 'reset-password.html'];
  const isAuthPage = skipAuth.some(p => location.pathname.includes(p));

  if (!isAuthPage) {
    authGate().then(user => {
      if (user) {
        updateAuthUI();
        setActiveNav();
        if (typeof loadPageData === 'function') loadPageData();
      }
    });
  }

  // Listen for auth changes (e.g. token expiry)
  db.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') {
      const isAuthPage2 = skipAuth.some(p => location.pathname.includes(p));
      if (!isAuthPage2) {
        const isInPages = location.pathname.includes('/pages/');
        window.location.replace(isInPages ? '../login.html' : 'login.html');
      }
    }
  });
});
