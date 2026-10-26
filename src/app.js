import { proposalData } from './data.js';

// Application State
let currentLang = localStorage.getItem('nuweiba_proposal_lang') || 'ar';
let activeAudienceIndex = 0;

// DOM Elements Cache
const elements = {
  html: document.documentElement,
  scrollProgress: document.getElementById('scroll-progress'),
  topNav: document.querySelector('.top-nav'),
  langToggleBtn: document.getElementById('lang-toggle-btn'),
  timelineContainer: document.getElementById('nav-timeline'),
  mobileDrawer: document.getElementById('mobile-drawer'),
  mobileToggleBtn: document.getElementById('mobile-toggle-btn'),
  modalOverlay: document.getElementById('media-modal'),
  modalMediaContainer: document.getElementById('modal-media-slot'),
  modalCloseBtn: document.getElementById('modal-close-btn')
};

// Section mapping for top timeline navigation
const sectionKeys = [
  { key: 's01', id: 'cover', num: '01' },
  { key: 's02', id: 'brand-understanding', num: '02' },
  { key: 's03', id: 'challenge-opportunity', num: '03' },
  { key: 's04', id: 'target-audience', num: '04' },
  { key: 's05', id: 'promedia-model', num: '05' },
  { key: 's06', id: 'mega-influencers', num: '06' },
  { key: 's07', id: 'mini-influencers', num: '07' },
  { key: 's08', id: 'ugc-production', num: '08' },
  { key: 's09', id: 'egc-production', num: '09' },
  { key: 's10', id: 'content-pillars', num: '10' },
  { key: 's11', id: 'paid-media', num: '11' },
  { key: 's12', id: 'digital-experience', num: '12' },
  { key: 's13', id: 'kpis', num: '13' },
  { key: 's14', id: 'roadmap', num: '14' },
  { key: 's15', id: 'reference-board', num: '15' },
  { key: 's16', id: 'why-promedia', num: '16' }
];

// Initialize Website
export function initApp() {
  setLanguage(currentLang);
  setupScrollTracking();
  setupEventListeners();
  renderTimelineNav();
  renderAllSections();
}

// Language Switcher Function
export function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('nuweiba_proposal_lang', lang);
  elements.html.lang = lang;
  elements.html.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update Language Button Label
  if (elements.langToggleBtn) {
    elements.langToggleBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
      <span>${proposalData[lang].nav.langSwitch}</span>
    `;
  }

  // Re-render components with translated texts
  renderTimelineNav();
  renderAllSections();
}

// Render Top Timeline Navigation
function renderTimelineNav() {
  const d = proposalData[currentLang];
  if (!elements.timelineContainer) return;

  elements.timelineContainer.innerHTML = sectionKeys.map(item => `
    <a href="#${item.id}" class="timeline-pill" data-section="${item.id}">
      <span class="timeline-pill-num">${item.num}</span>
      <span>${d.nav[item.key]}</span>
    </a>
  `).join('');

  if (elements.mobileDrawer) {
    elements.mobileDrawer.innerHTML = sectionKeys.map(item => `
      <a href="#${item.id}" class="mobile-nav-link" data-section="${item.id}">
        <span>${d.nav[item.key]}</span>
        <span style="opacity: 0.6; font-size: 0.8rem;">#${item.num}</span>
      </a>
    `).join('');
  }
}

// Master Render Function for all 16 Sections
function renderAllSections() {
  const d = proposalData[currentLang];
  const s = d.sections;

  // Header branding
  const brandNameEl = document.getElementById('nav-brand-text');
  if (brandNameEl) brandNameEl.textContent = d.nav.brand;

  const officialSiteBtn = document.getElementById('nav-official-btn');
  if (officialSiteBtn) officialSiteBtn.textContent = d.nav.visitSite;

  // S01: HERO & VISION
  const heroContainer = document.getElementById('section-cover');
  if (heroContainer) {
    heroContainer.innerHTML = `
      <div class="hero-bg-overlay"></div>
      <div class="container hero-grid">
        <div class="hero-text-content">
          <div class="hero-badge-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>${s.s01.badge}</span>
          </div>
          <h1 class="hero-title">${s.s01.title}</h1>
          <p class="hero-subtitle">${s.s01.subtitle}</p>
          <p class="hero-meta">${s.s01.preparedBy}</p>
          
          <div class="hero-vision-box">
            <div class="vision-heading">${s.s01.visionLabel}</div>
            <p class="vision-text">${s.s01.visionText}</p>
          </div>

          <div class="hero-cta-group">
            <a href="#promedia-model" class="btn-primary">
              <span>${s.s01.ctaPrimary}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="https://nuweibacamps.com/" target="_blank" rel="noopener noreferrer" class="btn-secondary">
              <span>${s.s01.ctaSecondary}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>

          <div class="hero-stats-grid">
            ${s.s01.stats.map(st => `
              <div class="hero-stat-item">
                <span class="stat-val">${st.value}</span>
                <span class="stat-lbl">${st.label}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="hero-visual-col">
          <div class="hero-visual-card">
            <img src="./assets/camps/safari_main.webp" alt="Safari Beach Camp Nuweiba" class="hero-visual-img" />
            <div class="hero-visual-badge">
              <div>
                <div class="badge-destination-name">${currentLang === 'ar' ? 'سفاري بيتش نويبع (الموقع الرسمي)' : 'Safari Beach Nuweiba (Official)'}</div>
                <div class="badge-destination-desc">${currentLang === 'ar' ? 'مصدر معتمد: nuweibacamps.com/camps/safari-beach' : 'Direct Official Source: nuweibacamps.com'}</div>
              </div>
              <a href="https://nuweibacamps.com/camps/safari-beach" target="_blank" rel="noopener noreferrer" style="color:var(--color-turquoise); display:flex; align-items:center; gap:4px; font-size:0.85rem; font-weight:700;">
                <span>${currentLang === 'ar' ? 'تفاصيل الكامب' : 'Camp Details'} ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // S02: BRAND UNDERSTANDING
  const s02El = document.getElementById('section-brand-understanding');
  if (s02El) {
    s02El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s02.tag}</span>
          <h2 class="section-title">${s.s02.title}</h2>
          <p class="section-subtitle">${s.s02.lead}</p>
        </div>

        <div class="editorial-alert alert-notice">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0; margin-top:2px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>${s.s02.notice}</div>
        </div>

        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-navy); margin: 36px 0 20px 0;">${s.s02.pillarsTitle}</h3>
        
        <div class="brand-grid">
          ${s.s02.pillars.map(p => `
            <div class="brand-card">
              <div class="card-num-circle">${p.num}</div>
              <h4 class="card-title">${p.title}</h4>
              <p class="card-desc">${p.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // S03: CHALLENGE VS OPPORTUNITY
  const s03El = document.getElementById('section-challenge-opportunity');
  if (s03El) {
    s03El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s03.tag}</span>
          <h2 class="section-title">${s.s03.title}</h2>
          <p class="section-subtitle">${s.s03.subtitle}</p>
        </div>

        <div class="editorial-alert alert-disclaimer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0; margin-top:2px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <div>${s.s03.disclaimer}</div>
        </div>

        <div class="comparison-table-wrapper">
          <div class="comparison-header-row">
            <div class="comp-header-challenge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              <span>${currentLang === 'ar' ? 'التحدي التسويقي الحالي' : 'Marketing Challenge'}</span>
            </div>
            <div class="comp-header-opportunity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>${currentLang === 'ar' ? 'فرصة النمو المقترحة من بروميديا' : 'Proposed Growth Opportunity'}</span>
            </div>
          </div>
          ${s.s03.comparisons.map(row => `
            <div class="comparison-row">
              <div class="cell-challenge">
                <span style="font-weight:700;">•</span>
                <span>${row.challenge}</span>
              </div>
              <div class="cell-opportunity">
                <span style="font-weight:700; color:#10B981;">✓</span>
                <span>${row.opportunity}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // S04: TARGET AUDIENCE
  const s04El = document.getElementById('section-target-audience');
  if (s04El) {
    const activeSeg = s.s04.segments[activeAudienceIndex] || s.s04.segments[0];
    s04El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s04.tag}</span>
          <h2 class="section-title">${s.s04.title}</h2>
          <p class="section-subtitle">${s.s04.subtitle}</p>
        </div>

        <div class="editorial-alert alert-notice">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <div>${s.s04.note}</div>
        </div>

        <div class="audience-tabs-nav">
          ${s.s04.segments.map((seg, idx) => `
            <button class="audience-tab-btn ${idx === activeAudienceIndex ? 'active' : ''}" data-index="${idx}">
              ${seg.name}
            </button>
          `).join('')}
        </div>

        <div class="audience-detail-card">
          <div class="audience-summary-pane">
            <div class="audience-profile-header">
              <span class="audience-age-badge">${activeSeg.age}</span>
              <h3 class="audience-name-title">${activeSeg.name}</h3>
            </div>

            <div class="audience-block-item">
              <div class="audience-block-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                <span>${currentLang === 'ar' ? 'دوافع السفر والاختيار' : 'Travel Motivations'}</span>
              </div>
              <p class="audience-block-content">${activeSeg.motivation}</p>
            </div>

            <div class="audience-cta-box">
              <div class="audience-cta-title">${currentLang === 'ar' ? 'الرسالة والدعوة المقترحة (CTA):' : 'Proposed Call-to-Action (CTA):'}</div>
              <p class="audience-cta-text">"${activeSeg.cta}"</p>
            </div>
          </div>

          <div class="audience-content-pane">
            <div class="audience-block-item">
              <div class="audience-block-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                <span>${currentLang === 'ar' ? 'نمط المحتوى المفضل على السوشيال ميديا' : 'Preferred Social Content Style'}</span>
              </div>
              <p class="audience-block-content">${activeSeg.contentStyle}</p>
            </div>

            <div style="background: var(--color-bg-light); border-radius: var(--radius-md); padding: 20px; border: 1px solid var(--color-border); margin-top: 24px;">
              <h5 style="font-weight: 800; color: var(--color-navy); margin-bottom: 8px;">${currentLang === 'ar' ? 'المنصات الأكثر تأثيراً في هذه الشريحة' : 'High-Impact Social Platforms'}</h5>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <span style="background:#FFFFFF; padding:4px 12px; border-radius:var(--radius-full); font-size:0.8rem; font-weight:700; border:1px solid var(--color-border);">TikTok</span>
                <span style="background:#FFFFFF; padding:4px 12px; border-radius:var(--radius-full); font-size:0.8rem; font-weight:700; border:1px solid var(--color-border);">Instagram Reels</span>
                <span style="background:#FFFFFF; padding:4px 12px; border-radius:var(--radius-full); font-size:0.8rem; font-weight:700; border:1px solid var(--color-border);">Facebook Groups</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind tab clicks
    s04El.querySelectorAll('.audience-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeAudienceIndex = parseInt(btn.getAttribute('data-index'));
        renderAllSections();
      });
    });
  }

  // S05: PROMEDIA 4-ENGINE DEVELOPMENT MODEL
  const s05El = document.getElementById('section-promedia-model');
  if (s05El) {
    s05El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s05.tag}</span>
          <h2 class="section-title">${s.s05.title}</h2>
          <p class="section-subtitle">${s.s05.subtitle}</p>
        </div>

        <div class="engines-grid">
          ${s.s05.engines.map(eng => `
            <div class="engine-card">
              <div class="engine-step-number">${eng.step}</div>
              <h3 class="engine-name">${eng.name}</h3>
              <div class="engine-tool-badge">${eng.tool}</div>
              <div class="engine-lead">${eng.lead}</div>
              <p class="engine-desc">${eng.desc}</p>
              <div class="engine-metric-box">
                <span class="engine-metric-label">${currentLang === 'ar' ? 'مؤشر النجاح:' : 'Key Metric:'} </span>
                <span>${eng.metric}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // S06: MEGA INFLUENCERS
  const s06El = document.getElementById('section-mega-influencers');
  if (s06El) {
    s06El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s06.tag}</span>
          <h2 class="section-title">${s.s06.title}</h2>
          <p class="section-subtitle">${s.s06.subtitle}</p>
        </div>

        <div class="editorial-alert alert-disclaimer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>${s.s06.disclaimer}</div>
        </div>

        <div style="background:#FFFFFF; border-radius:var(--radius-lg); padding:28px; border:1px solid var(--color-border); margin-bottom:40px;">
          <h3 style="font-size:1.2rem; font-weight:800; color:var(--color-navy); margin-bottom:16px;">${s.s06.deliverablesTitle}</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px;">
            ${s.s06.deliverables.map(del => `
              <div style="display:flex; align-items:flex-start; gap:8px; font-size:0.92rem; color:var(--color-slate);">
                <span style="color:var(--color-primary); font-weight:800;">✓</span>
                <span>${del}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="creator-cards-list">
          ${proposalData.megaCreators.map(creator => `
            <div class="creator-card-full ${creator.isPriority ? 'priority-border' : ''}">
              <div class="creator-card-header">
                <div class="creator-title-group">
                  <div class="creator-rank-badge">${creator.rank}</div>
                  <div>
                    <h3 class="creator-header-name">${creator.name}</h3>
                    <div class="creator-header-handle">${currentLang === 'ar' ? creator.roleAr : creator.roleEn}</div>
                  </div>
                </div>
                ${creator.isPriority ? `
                  <div class="priority-flag">
                    ★ ${currentLang === 'ar' ? 'المرشح ذو الأولوية (ملف رئيسي متكامل)' : 'Priority Creator (Featured Dossier)'}
                  </div>
                ` : `
                  <div style="font-size:0.8rem; font-weight:700; color:var(--color-muted);">
                    ${creator.handle}
                  </div>
                `}
              </div>

              <div class="creator-card-body">
                <div class="creator-visual-col">
                  ${creator.hasVideo ? `
                    <div class="video-container">
                      <video controls class="video-player-element" poster="${creator.posterImage}">
                        <source src="${creator.videoPath}" type="video/mp4">
                        Your browser does not support the video tag.
                      </video>
                      <div style="padding:10px 14px; background:#0F172A; color:#94A3B8; font-size:0.75rem; display:flex; align-items:center; gap:6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                        <span>${d.influencers.videoNotice}</span>
                      </div>
                    </div>
                  ` : `
                    <img src="${creator.avatar}" alt="${creator.name}" class="creator-main-image lightbox-trigger" />
                  `}

                  <div class="creator-thumbs-grid">
                    ${creator.gallery.slice(0, 4).map(img => `
                      <img src="${img}" alt="Preview" class="creator-thumb-item lightbox-trigger" />
                    `).join('')}
                  </div>
                </div>

                <div class="creator-details-col">
                  ${creator.leaderProfile ? `
                    <!-- Dedicated Spotlight: Mohamed Elhagan (Creative Director & CEO, ProMedia) -->
                    <div class="leader-spotlight-card" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color:#FFFFFF; border-radius: var(--radius-lg); padding: 22px; border: 1px solid rgba(255,255,255,0.15); margin-bottom: 22px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
                      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                          <span style="background:var(--color-gold); color:var(--color-navy); font-weight:800; font-size:0.75rem; padding:4px 10px; border-radius:var(--radius-full);">
                            ${currentLang === 'ar' ? 'القيادة الإبداعية والتنفيذية لبروميديا' : 'ProMedia Founder & Creative Leadership'}
                          </span>
                        </div>
                        <span style="font-size:0.75rem; color:var(--color-turquoise); font-weight:700;">
                          ${currentLang === 'ar' ? 'ملف رسمي معتمد' : 'Official Verified Profile'}
                        </span>
                      </div>

                      <div style="display:grid; grid-template-columns: 84px 1fr; gap: 18px; align-items:center;">
                        <img src="${creator.leaderProfile.avatar}" alt="${creator.leaderProfile.nameAr}" style="width:84px; height:84px; border-radius:50%; object-fit:cover; border:2px solid var(--color-gold); box-shadow:0 4px 12px rgba(245,158,11,0.25);" class="lightbox-trigger" />
                        <div>
                          <h4 style="font-size:1.25rem; font-weight:800; color:#FFFFFF; margin-bottom:4px;">
                            ${currentLang === 'ar' ? creator.leaderProfile.nameAr : creator.leaderProfile.nameEn}
                          </h4>
                          <div style="font-size:0.84rem; color:var(--color-warm-sand); font-weight:700; margin-bottom:6px;">
                            ${currentLang === 'ar' ? creator.leaderProfile.titleAr : creator.leaderProfile.titleEn}
                          </div>
                          <p style="font-size:0.86rem; color:#CBD5E1; line-height:1.5; margin-bottom:12px;">
                            ${currentLang === 'ar' ? creator.leaderProfile.bioAr : creator.leaderProfile.bioEn}
                          </p>

                          <!-- Mohamed Elhagan Official Clickable Links -->
                          <div style="display:flex; flex-wrap:wrap; gap:8px;">
                            ${creator.leaderProfile.links.map(l => `
                              <a href="${l.url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:var(--radius-full); background:rgba(255,255,255,0.12); color:#FFFFFF; font-size:0.78rem; font-weight:700; border:1px solid rgba(255,255,255,0.25); text-decoration:none;">
                                <span>${l.label}</span>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                              </a>
                            `).join('')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ` : ''}

                  ${creator.socialStats ? `
                    <div class="creator-stats-panel">
                      <div class="stats-panel-title">${currentLang === 'ar' ? 'إحصائيات المتابعين (وفق ملف العرض المقدم):' : 'Audience Statistics (Per Supplied Deck):'}</div>
                      <div class="stats-numbers-row">
                        <div>
                          <div class="stat-metric-val">${creator.socialStats.tiktok}</div>
                          <div class="stat-metric-platform">TikTok</div>
                        </div>
                        <div>
                          <div class="stat-metric-val">${creator.socialStats.facebook}</div>
                          <div class="stat-metric-platform">Facebook</div>
                        </div>
                        <div>
                          <div class="stat-metric-val">${creator.socialStats.instagram}</div>
                          <div class="stat-metric-platform">Instagram</div>
                        </div>
                        <div>
                          <div class="stat-metric-val" style="color:var(--color-gold);">${creator.socialStats.total}</div>
                          <div class="stat-metric-platform">${currentLang === 'ar' ? 'الإجمالي' : 'Total'}</div>
                        </div>
                      </div>
                      <div class="stats-disclaimer-text">${currentLang === 'ar' ? creator.socialStats.statusNoteAr : creator.socialStats.statusNoteEn}</div>
                    </div>
                  ` : `
                    <div style="background:var(--color-bg-light); padding:12px 16px; border-radius:var(--radius-md); border:1px solid var(--color-border); font-size:0.85rem; color:var(--color-slate); margin-bottom:18px;">
                      <strong>${currentLang === 'ar' ? 'حالة التحقق:' : 'Verification Status:'}</strong>
                      <span>${currentLang === 'ar' ? creator.statusAr : creator.statusEn}</span>
                    </div>
                  `}

                  ${creator.members ? `
                    <div class="team-members-box">
                      <div class="team-members-title">${currentLang === 'ar' ? 'أعضاء الفريق والقيادة الإبداعية:' : 'Team Members & Creative Leadership:'}</div>
                      ${creator.members.map(m => `
                        <div class="member-item">
                          <div class="member-name">${m.name}</div>
                          <div class="member-bio">${currentLang === 'ar' ? m.bioAr : m.bioEn}</div>
                          ${m.links ? `
                            <div style="display:flex; gap:8px; margin-top:6px;">
                              ${m.links.map(ml => `
                                <a href="${ml.url}" target="_blank" rel="noopener noreferrer" style="font-size:0.75rem; color:var(--color-primary); font-weight:700;">
                                  ${ml.label} ↗
                                </a>
                              `).join('')}
                            </div>
                          ` : ''}
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}

                  <div class="creator-info-block">
                    <div class="info-block-label">${d.influencers.campaignFit}</div>
                    <p class="info-block-text">${currentLang === 'ar' ? creator.fitAr : creator.fitEn}</p>
                  </div>

                  <div class="creator-info-block">
                    <div class="info-block-label">${d.influencers.creativeAngles}</div>
                    <p class="info-block-text">${currentLang === 'ar' ? creator.creativeAnglesAr : creator.creativeAnglesEn}</p>
                  </div>

                  ${creator.links ? `
                    <div class="creator-links-group">
                      ${creator.links.map(l => `
                        <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn-creator-link">
                          <span>${l.label}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // S07: MINI INFLUENCERS
  const s07El = document.getElementById('section-mini-influencers');
  if (s07El) {
    s07El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s07.tag}</span>
          <h2 class="section-title">${s.s07.title}</h2>
          <p class="section-subtitle">${s.s07.overview}</p>
        </div>

        <div class="mini-creators-grid">
          ${proposalData.miniCreators.map(mini => `
            <div class="mini-card">
              <div class="mini-card-header">
                <img src="${mini.avatar}" alt="${mini.nameAr}" class="mini-avatar-img lightbox-trigger" />
                <div>
                  <h4 class="mini-name">${currentLang === 'ar' ? mini.nameAr : mini.nameEn}</h4>
                  <span class="mini-category-badge">${currentLang === 'ar' ? mini.categoryAr : mini.categoryEn}</span>
                </div>
              </div>

              <div class="mini-screenshots-strip">
                ${mini.screenshots.map(shot => `
                  <img src="${shot}" alt="Screenshot" class="mini-shot-thumb lightbox-trigger" />
                `).join('')}
              </div>

              <div class="mini-card-body">
                <p class="mini-relevance-text">${currentLang === 'ar' ? mini.relevanceAr : mini.relevanceEn}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="background:#FFFFFF; border-radius:var(--radius-xl); padding:36px; border:1px solid var(--color-border); box-shadow:var(--shadow-sm);">
          <h3 style="font-size:1.3rem; font-weight:800; color:var(--color-navy); margin-bottom:8px;">${s.s07.referenceVideosTitle}</h3>
          <p style="font-size:0.9rem; color:var(--color-muted); margin-bottom:24px;">
            ${currentLang === 'ar' ? 'فيديوهات مرجعية زودنا بها العميل للاستلهام البصري ودراسة زوايا التناول:' : 'Client-supplied reference video links for visual inspiration and thematic benchmarking:'}
          </p>

          <div class="ref-videos-grid">
            ${s.s07.refVideos.map(vid => `
              <div class="ref-video-card">
                <span class="ref-video-platform-pill">${vid.platform}</span>
                <h5 class="ref-video-category">${vid.category}</h5>
                <p class="ref-video-desc">${vid.desc}</p>
                <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="btn-watch-link">
                  <span>${currentLang === 'ar' ? 'مشاهدة الفيديو المرجعي' : 'Watch Reference Video'}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // S08: UGC CONCEPTS
  const s08El = document.getElementById('section-ugc-production');
  if (s08El) {
    s08El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s08.tag}</span>
          <h2 class="section-title">${s.s08.title}</h2>
          <p class="section-subtitle">${s.s08.subtitle}</p>
        </div>

        <div class="editorial-alert alert-notice">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>${s.s08.note}</div>
        </div>

        <div class="ugc-grid">
          ${s.s08.concepts.map(c => `
            <div class="ugc-card">
              <span class="ugc-tag-pill">${c.tag}</span>
              <h4 class="ugc-title">${c.title}</h4>
              <div class="ugc-angle-label">${c.angle}</div>
              <p class="ugc-desc">${c.description}</p>
              <div class="ugc-cta-box">
                <span style="color:var(--color-primary); font-weight:800;">CTA:</span>
                <span>"${c.cta}"</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // S09: EGC PRODUCTION
  const s09El = document.getElementById('section-egc-production');
  if (s09El) {
    s09El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s09.tag}</span>
          <h2 class="section-title">${s.s09.title}</h2>
          <p class="section-subtitle">${s.s09.subtitle}</p>
        </div>

        <div class="editorial-alert alert-disclaimer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <div>${s.s09.clarification}</div>
        </div>

        <div class="egc-list-grid">
          ${s.s09.series.map(item => `
            <div class="egc-card">
              <span class="egc-badge-pill">${item.badge}</span>
              <h4 class="egc-title">${item.title}</h4>
              <p class="egc-concept-text">${item.concept}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // S10: CONTENT PILLARS
  const s10El = document.getElementById('section-content-pillars');
  if (s10El) {
    s10El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s10.tag}</span>
          <h2 class="section-title">${s.s10.title}</h2>
          <p class="section-subtitle">${s.s10.subtitle}</p>
        </div>

        <div class="pillars-timeline-list">
          ${s.s10.pillars.map(pillar => `
            <div class="pillar-row-card">
              <div class="pillar-num-box">${pillar.num}</div>
              <div class="pillar-name-group">
                <div class="pillar-name-text">${pillar.name}</div>
                <div class="pillar-target-text">${pillar.target}</div>
              </div>
              <div class="pillar-message-text">"${pillar.message}"</div>
              <div class="pillar-kpi-badge">
                <div style="font-size:0.7rem; color:var(--color-muted); text-transform:uppercase;">${currentLang === 'ar' ? 'مؤشر القياس' : 'Key KPI'}</div>
                <div>${pillar.kpi}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // S11: PAID MEDIA
  const s11El = document.getElementById('section-paid-media');
  if (s11El) {
    s11El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s11.tag}</span>
          <h2 class="section-title">${s.s11.title}</h2>
          <p class="section-subtitle">${s.s11.subtitle}</p>
        </div>

        <div class="editorial-alert alert-disclaimer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>${s.s11.caution}</div>
        </div>

        <div class="paid-media-grid">
          ${s.s11.phases.map((ph, idx) => `
            <div class="paid-phase-card">
              <span class="phase-step-tag">Phase 0${idx + 1}</span>
              <h4 class="phase-title">${ph.title}</h4>
              <p class="phase-desc">${ph.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // S12: DIGITAL EXPERIENCE
  const s12El = document.getElementById('section-digital-experience');
  if (s12El) {
    s12El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s12.tag}</span>
          <h2 class="section-title">${s.s12.title}</h2>
          <p class="section-subtitle">${s.s12.subtitle}</p>
        </div>

        <div class="editorial-alert alert-notice">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <div>${s.s12.auditDisclaimer}</div>
        </div>

        <div class="audit-grid">
          ${s.s12.points.map(pt => `
            <div class="audit-point-card">
              <h4 class="audit-point-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                <span>${pt.title}</span>
              </h4>
              <p class="audit-point-desc">${pt.desc}</p>
            </div>
          `).join('')}
        </div>

        <div class="audit-cta-center">
          <a href="https://nuweibacamps.com/" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:16px 36px;">
            <span>${s.s12.siteBtn}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    `;
  }

  // S13: KPI FRAMEWORK
  const s13El = document.getElementById('section-kpis');
  if (s13El) {
    s13El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s13.tag}</span>
          <h2 class="section-title">${s.s13.title}</h2>
          <p class="section-subtitle">${s.s13.subtitle}</p>
        </div>

        <div class="editorial-alert alert-notice">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>${s.s13.note}</div>
        </div>

        <div class="kpi-table-wrapper">
          <div class="kpi-row-header">
            <div>${currentLang === 'ar' ? 'القناة / المحرك' : 'Channel / Growth Engine'}</div>
            <div>${currentLang === 'ar' ? 'المؤشر الأساسي (Primary)' : 'Primary Metric'}</div>
            <div>${currentLang === 'ar' ? 'المؤشرات الثانوية (Secondary)' : 'Secondary Metrics'}</div>
            <div>${currentLang === 'ar' ? 'الهدف الاستراتيجي' : 'Strategic Objective'}</div>
          </div>
          ${s.s13.framework.map(row => `
            <div class="kpi-table-row">
              <div class="kpi-col-channel">${row.channel}</div>
              <div class="kpi-col-primary">${row.primary}</div>
              <div class="kpi-col-secondary">${row.secondary}</div>
              <div class="kpi-col-eval">${row.eval}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // S14: 90-DAY ROADMAP
  const s14El = document.getElementById('section-roadmap');
  if (s14El) {
    s14El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s14.tag}</span>
          <h2 class="section-title">${s.s14.title}</h2>
          <p class="section-subtitle">${s.s14.subtitle}</p>
        </div>

        <div class="editorial-alert alert-disclaimer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>${s.s14.disclaimer}</div>
        </div>

        <div class="roadmap-timeline-grid">
          ${s.s14.months.map(m => `
            <div class="roadmap-month-card">
              <div class="month-badge">${m.month}</div>
              <h3 class="month-title">${m.phase.split('·')[0]}</h3>
              <div class="month-phase-text">${m.phase.split('·')[1] || m.phase}</div>
              <ul class="roadmap-items-list">
                ${m.items.map(it => `
                  <li class="roadmap-item">
                    <svg class="roadmap-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>${it}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // S15: REFERENCE BOARD & CAMPS SHOWCASE
  const s15El = document.getElementById('section-reference-board');
  if (s15El) {
    s15El.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">${s.s15.tag}</span>
          <h2 class="section-title">${s.s15.title}</h2>
          <p class="section-subtitle">${s.s15.subtitle}</p>
        </div>

        <div class="editorial-alert alert-notice">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>${s.s15.note}</div>
        </div>

        <h3 style="font-size:1.4rem; font-weight:800; color:var(--color-navy); margin-bottom:20px;">${d.influencers.campsTitle}</h3>
        <p style="font-size:0.95rem; color:var(--color-slate); margin-bottom:28px;">${d.influencers.campsDesc}</p>

        <div class="camps-showcase-grid">
          ${proposalData.camps.map(camp => `
            <div class="camp-card">
              <div style="position:relative;">
                <img src="${camp.image}" alt="${camp.nameAr}" class="camp-card-image lightbox-trigger" />
                <div style="position:absolute; top:12px; left:12px; background:rgba(15,23,42,0.85); backdrop-filter:blur(6px); color:#38BDF8; font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:var(--radius-full); border:1px solid rgba(56,189,248,0.3); display:flex; align-items:center; gap:4px;">
                  <span>✓</span>
                  <span>${currentLang === 'ar' ? 'صورة رسمية معتمدة' : 'Official Verified Image'}</span>
                </div>
                ${camp.priceFrom ? `
                  <div style="position:absolute; bottom:12px; right:12px; background:var(--color-gold); color:var(--color-navy); font-size:0.8rem; font-weight:800; padding:4px 10px; border-radius:var(--radius-full); box-shadow:0 2px 8px rgba(0,0,0,0.3);">
                    ${currentLang === 'ar' ? 'يبدأ من: ' + camp.priceFrom : 'From ' + camp.priceFrom}
                  </div>
                ` : ''}
              </div>

              <div class="camp-card-content">
                <h4 class="camp-name-title">${currentLang === 'ar' ? camp.nameAr : camp.nameEn}</h4>
                <div style="font-size:0.82rem; color:var(--color-primary-dark); font-weight:700; margin-bottom:8px; display:flex; align-items:center; gap:4px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>${currentLang === 'ar' ? camp.locationAr : camp.locationEn}</span>
                </div>
                <p class="camp-desc-text">${currentLang === 'ar' ? camp.descAr : camp.descEn}</p>

                <div style="border-top:1px solid var(--color-border); padding-top:14px; margin-top:auto;">
                  <div style="font-size:0.75rem; color:var(--color-muted); margin-bottom:10px;">
                    <strong>${currentLang === 'ar' ? 'المصدر المعتمد:' : 'Official Source:'}</strong> 
                    <a href="${camp.officialDetailUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--color-primary); text-decoration:underline;">nuweibacamps.com</a>
                  </div>

                  <div class="camp-social-links" style="display:flex; flex-wrap:wrap; gap:8px;">
                    <a href="${camp.officialDetailUrl}" target="_blank" rel="noopener noreferrer" class="btn-camp-social" style="background:var(--color-primary); color:#FFFFFF; border-color:var(--color-primary);">
                      <span>${currentLang === 'ar' ? 'صفحة الكامب بالمنصة' : 'Official Camp Page'}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                    ${camp.social && camp.social.facebook ? `
                      <a href="${camp.social.facebook}" target="_blank" rel="noopener noreferrer" class="btn-camp-social">
                        <span>Facebook</span>
                        ↗
                      </a>
                    ` : ''}
                    ${camp.social && camp.social.instagram ? `
                      <a href="${camp.social.instagram}" target="_blank" rel="noopener noreferrer" class="btn-camp-social">
                        <span>Instagram</span>
                        ↗
                      </a>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="deliverables-box">
          <h3 class="deliverables-title">${s.s15.deliverablesTitle}</h3>
          <ul class="deliverables-checklist">
            ${s.s15.deliverablesList.map(del => `
              <li class="deliverable-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5" style="flex-shrink:0; margin-top:2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${del}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  // S16: WHY PROMEDIA?
  const s16El = document.getElementById('section-why-promedia');
  if (s16El) {
    s16El.innerHTML = `
      <div class="container">
        <span class="section-tag" style="background:rgba(255,255,255,0.12); color:var(--color-warm-sand);">${s.s16.tag}</span>
        <h2 class="closing-headline">${s.s16.headline}</h2>
        <p class="closing-subheadline">${s.s16.subheadline}</p>

        <div class="closing-box">
          <h3 class="closing-title">${s.s16.closingTitle}</h3>
          <p class="closing-subtitle">${s.s16.closingSubtitle}</p>

          <div class="closing-actions">
            <a href="https://nuweibacamps.com/" target="_blank" rel="noopener noreferrer" class="btn-closing-primary">
              <span>${s.s16.visitOfficialBtn}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
            <a href="https://web.facebook.com/MohamedElhaganPromedia/" target="_blank" rel="noopener noreferrer" class="btn-closing-secondary">
              <span>${s.s16.contactCta}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>

        <div style="font-size:0.9rem; color:#94A3B8;">
          ${s.s16.agencyTagline} · ProMedia Production House 2026
        </div>
      </div>
    `;
  }

  // Footer translations
  const footerAgencyTag = document.getElementById('footer-agency-text');
  if (footerAgencyTag) footerAgencyTag.textContent = s.s16.agencyTagline;

  // Re-bind Lightbox Triggers
  bindLightboxTriggers();
}

// Scroll Tracking for Active Nav Pill and Progress Bar
function setupScrollTracking() {
  window.addEventListener('scroll', () => {
    // Scroll progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height);
    if (elements.scrollProgress) {
      elements.scrollProgress.style.transform = `scaleX(${scrolled})`;
    }

    // Nav background blur
    if (elements.topNav) {
      if (winScroll > 40) {
        elements.topNav.classList.add('scrolled');
      } else {
        elements.topNav.classList.remove('scrolled');
      }
    }

    // Active Section Tracking via scroll position
    const scrollPos = window.scrollY + 180;
    sectionKeys.forEach(item => {
      const secEl = document.getElementById(item.id) || document.getElementById(`section-${item.id}`);
      if (secEl) {
        const top = secEl.offsetTop;
        const height = secEl.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.timeline-pill').forEach(p => p.classList.remove('active'));
          const activePill = document.querySelector(`.timeline-pill[data-section="${item.id}"]`);
          if (activePill) {
            activePill.classList.add('active');
            activePill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        }
      }
    });
  }, { passive: true });
}

// Setup Event Listeners
function setupEventListeners() {
  // Language switcher button
  if (elements.langToggleBtn) {
    elements.langToggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'ar' ? 'en' : 'ar';
      setLanguage(nextLang);
    });
  }

  // Mobile menu toggle
  if (elements.mobileToggleBtn && elements.mobileDrawer) {
    elements.mobileToggleBtn.addEventListener('click', () => {
      elements.mobileDrawer.classList.toggle('open');
    });

    elements.mobileDrawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        elements.mobileDrawer.classList.remove('open');
      }
    });
  }

  // Modal close
  if (elements.modalCloseBtn && elements.modalOverlay) {
    elements.modalCloseBtn.addEventListener('click', () => {
      elements.modalOverlay.classList.remove('open');
      if (elements.modalMediaContainer) elements.modalMediaContainer.innerHTML = '';
    });

    elements.modalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.modalOverlay) {
        elements.modalOverlay.classList.remove('open');
        if (elements.modalMediaContainer) elements.modalMediaContainer.innerHTML = '';
      }
    });
  }
}

// Lightbox triggers for images
function bindLightboxTriggers() {
  document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.onclick = () => {
      if (elements.modalMediaContainer && elements.modalOverlay) {
        elements.modalMediaContainer.innerHTML = `
          <img src="${img.src}" alt="Preview" class="modal-media-view" />
        `;
        elements.modalOverlay.classList.add('open');
      }
    };
  });
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
