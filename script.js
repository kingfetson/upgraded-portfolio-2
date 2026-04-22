// ============================================
// CAREER PORTFOLIO GENERATOR - MAIN SCRIPT
// ============================================

// ----- STATE MANAGEMENT -----
let portfolioData = null;
let currentFileUrls = { cv: null, resume: null };

// ----- INITIALIZATION -----
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  bindEventListeners();
  loadThemePreference();
});

function initializeApp() {
  loadFromStorage();
  if (!portfolioData) {
    // Use config.js as fallback
    portfolioData = { ...window.PORTFOLIO_CONFIG };
  }
  renderFormFields();
  renderPortfolio();
  setupFileURLs();
}

// ----- LOCALSTORAGE MANAGEMENT -----
function loadFromStorage() {
  const saved = localStorage.getItem('career_portfolio_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      portfolioData = { ...window.PORTFOLIO_CONFIG, ...parsed };
      // Increment view count
      portfolioData.analytics = portfolioData.analytics || { views: 0, cvDownloads: 0, resumeDownloads: 0 };
      portfolioData.analytics.views = (portfolioData.analytics.views || 0) + 1;
      saveToStorage();
    } catch(e) {
      console.error('Error loading from storage:', e);
      portfolioData = { ...window.PORTFOLIO_CONFIG };
    }
  } else {
    portfolioData = { ...window.PORTFOLIO_CONFIG };
    portfolioData.analytics = { views: 1, cvDownloads: 0, resumeDownloads: 0 };
    saveToStorage();
  }
}

function saveToStorage() {
  localStorage.setItem('career_portfolio_data', JSON.stringify(portfolioData));
}

// ----- FILE HANDLING -----
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function setupFileURLs() {
  if (portfolioData.cvFile && portfolioData.cvFile.startsWith('data:')) {
    // Already base64
  }
}

// ----- RENDER FORM FIELDS -----
function renderFormFields() {
  // Basic Info
  document.getElementById('nameInput').value = portfolioData.name || '';
  document.getElementById('titleInput').value = portfolioData.title || '';
  document.getElementById('bioInput').value = portfolioData.about || '';
  document.getElementById('imageUrlInput').value = portfolioData.profileImage || '';
  document.getElementById('locationInput').value = portfolioData.location || '';
  document.getElementById('emailInput').value = portfolioData.email || '';
  document.getElementById('phoneInput').value = portfolioData.phone || '';
  
  // Skills
  const skillsContainer = document.getElementById('skillsContainer');
  skillsContainer.innerHTML = '';
  (portfolioData.skills || []).forEach((skill, idx) => {
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.innerHTML = `${escapeHtml(skill)} <i class="fas fa-times" data-skill="${idx}"></i>`;
    tag.querySelector('i').addEventListener('click', () => {
      portfolioData.skills.splice(idx, 1);
      saveToStorage();
      renderFormFields();
      renderPortfolio();
    });
    skillsContainer.appendChild(tag);
  });
  
  // Projects
  const projectsContainer = document.getElementById('projectsList');
  projectsContainer.innerHTML = '';
  (portfolioData.projects || []).forEach((project, idx) => {
    const div = document.createElement('div');
    div.className = 'project-item';
    div.innerHTML = `
      <input type="text" placeholder="Project Title" value="${escapeHtml(project.name)}" data-project-title="${idx}">
      <textarea placeholder="Description" data-project-desc="${idx}" rows="2">${escapeHtml(project.description)}</textarea>
      <input type="text" placeholder="Link (URL)" value="${escapeHtml(project.link)}" data-project-link="${idx}">
      <button class="btn-small remove-project" data-project-idx="${idx}" style="background:var(--danger); margin-top:8px;">Remove</button>
    `;
    projectsContainer.appendChild(div);
  });
  
  // Attach project event listeners
  document.querySelectorAll('[data-project-title]').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(input.dataset.projectTitle);
      portfolioData.projects[idx].name = input.value;
      saveToStorage();
      renderPortfolio();
    });
  });
  document.querySelectorAll('[data-project-desc]').forEach(textarea => {
    textarea.addEventListener('input', (e) => {
      const idx = parseInt(textarea.dataset.projectDesc);
      portfolioData.projects[idx].description = textarea.value;
      saveToStorage();
      renderPortfolio();
    });
  });
  document.querySelectorAll('[data-project-link]').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(input.dataset.projectLink);
      portfolioData.projects[idx].link = input.value;
      saveToStorage();
      renderPortfolio();
    });
  });
  document.querySelectorAll('.remove-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.projectIdx);
      portfolioData.projects.splice(idx, 1);
      saveToStorage();
      renderFormFields();
      renderPortfolio();
    });
  });
  
  // Social Links
  const socialContainer = document.getElementById('socialList');
  socialContainer.innerHTML = '';
  const socialEntries = Object.entries(portfolioData.socialLinks || {});
  socialEntries.forEach(([platform, url], idx) => {
    if (url) {
      const div = document.createElement('div');
      div.className = 'social-item';
      div.innerHTML = `
        <select data-social-platform="${idx}">
          <option value="linkedin" ${platform === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
          <option value="github" ${platform === 'github' ? 'selected' : ''}>GitHub</option>
          <option value="twitter" ${platform === 'twitter' ? 'selected' : ''}>Twitter</option>
          <option value="dribbble" ${platform === 'dribbble' ? 'selected' : ''}>Dribbble</option>
        </select>
        <input type="text" placeholder="URL" value="${escapeHtml(url)}" data-social-url="${idx}">
        <button class="btn-small remove-social" data-social-idx="${idx}" style="background:var(--danger); margin-top:8px;">Remove</button>
      `;
      socialContainer.appendChild(div);
    }
  });
  
  document.querySelectorAll('[data-social-platform]').forEach(select => {
    select.addEventListener('change', (e) => {
      const idx = parseInt(select.dataset.socialPlatform);
      const oldKey = Object.keys(portfolioData.socialLinks)[idx];
      const newKey = select.value;
      const url = portfolioData.socialLinks[oldKey];
      delete portfolioData.socialLinks[oldKey];
      portfolioData.socialLinks[newKey] = url;
      saveToStorage();
      renderFormFields();
      renderPortfolio();
    });
  });
  document.querySelectorAll('[data-social-url]').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(input.dataset.socialUrl);
      const key = Object.keys(portfolioData.socialLinks)[idx];
      portfolioData.socialLinks[key] = input.value;
      saveToStorage();
      renderPortfolio();
    });
  });
  document.querySelectorAll('.remove-social').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.socialIdx);
      const key = Object.keys(portfolioData.socialLinks)[idx];
      delete portfolioData.socialLinks[key];
      saveToStorage();
      renderFormFields();
      renderPortfolio();
    });
  });
  
  // File names display
  if (portfolioData.cvFileName) {
    document.getElementById('cvFileName').innerHTML = `📄 ${portfolioData.cvFileName}`;
  }
  if (portfolioData.resumeFileName) {
    document.getElementById('resumeFileName').innerHTML = `📄 ${portfolioData.resumeFileName}`;
  }
}

// ----- RENDER PORTFOLIO PREVIEW -----
function renderPortfolio() {
  const data = portfolioData;
  const layout = document.getElementById('layoutSelect').value;
  const previewDiv = document.getElementById('portfolioPreview');
  
  // Build social HTML
  let socialHtml = '';
  for (const [platform, url] of Object.entries(data.socialLinks || {})) {
    if (url) {
      let icon = 'fa-link';
      if (platform === 'linkedin') icon = 'fab fa-linkedin';
      else if (platform === 'github') icon = 'fab fa-github';
      else if (platform === 'twitter') icon = 'fab fa-twitter';
      else if (platform === 'dribbble') icon = 'fab fa-dribbble';
      socialHtml += `<a href="${url}" target="_blank"><i class="${icon} fa-lg"></i></a>`;
    }
  }
  
  // Skills HTML
  const skillsHtml = (data.skills || []).map(s => `<span class="skill-badge">${escapeHtml(s)}</span>`).join('');
  
  // Projects HTML
  const projectsHtml = (data.projects || []).map(p => `
    <div class="project-card">
      <h4>${escapeHtml(p.name)}</h4>
      <p>${escapeHtml(p.description)}</p>
      ${p.tech ? `<div class="project-tech">${p.tech.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
      ${p.link && p.link !== '#' ? `<a href="${p.link}" target="_blank" class="project-link">View Project →</a>` : ''}
    </div>
  `).join('');
  
  // Certifications HTML
  const certsHtml = (data.certifications || []).map(c => `<span class="cert-badge">${escapeHtml(c)}</span>`).join('');
  
  // Documents HTML
  const cvPreview = data.cvFile ? `
    <div class="doc-card">
      <div class="doc-icon"><i class="fas fa-file-pdf"></i></div>
      <h4>Curriculum Vitae</h4>
      <div class="doc-meta">PDF · Detailed experience</div>
      <button class="btn-primary download-cv-btn"><i class="fas fa-download"></i> Download CV</button>
      ${data.cvFile.startsWith('data:') ? `<div class="pdf-preview"><iframe src="${data.cvFile}" width="100%" height="200px"></iframe></div>` : ''}
    </div>
  ` : `
    <div class="doc-card">
      <div class="doc-icon"><i class="fas fa-file-pdf"></i></div>
      <h4>Curriculum Vitae</h4>
      <div class="doc-meta">Not uploaded yet</div>
      <button class="btn-outline" disabled>No CV available</button>
    </div>
  `;
  
  const resumePreview = data.resumeFile ? `
    <div class="doc-card">
      <div class="doc-icon"><i class="fas fa-file-alt"></i></div>
      <h4>Professional Resume</h4>
      <div class="doc-meta">PDF · One-page summary</div>
      <button class="btn-primary download-resume-btn"><i class="fas fa-download"></i> Download Resume</button>
      ${data.resumeFile.startsWith('data:') ? `<div class="pdf-preview"><iframe src="${data.resumeFile}" width="100%" height="200px"></iframe></div>` : ''}
    </div>
  ` : `
    <div class="doc-card">
      <div class="doc-icon"><i class="fas fa-file-alt"></i></div>
      <h4>Professional Resume</h4>
      <div class="doc-meta">Not uploaded yet</div>
      <button class="btn-outline" disabled>No Resume available</button>
    </div>
  `;
  
  // Final HTML
  previewDiv.innerHTML = `
    <div class="hero-section">
      <img src="${data.profileImage || 'https://via.placeholder.com/140'}" class="profile-img-large" onerror="this.src='https://via.placeholder.com/140'">
      <h1>${escapeHtml(data.name)}</h1>
      <div class="hero-title">${escapeHtml(data.title)}</div>
      <div class="location-email">
        <i class="fas fa-map-marker-alt"></i> ${escapeHtml(data.location)} &nbsp;|&nbsp;
        <i class="fas fa-envelope"></i> ${escapeHtml(data.email)}
      </div>
      <div class="stats-row">
        <span><i class="fas fa-eye"></i> ${data.analytics?.views || 0} views</span>
        <span><i class="fas fa-download"></i> CV: ${data.analytics?.cvDownloads || 0}</span>
        <span><i class="fas fa-file-alt"></i> Resume: ${data.analytics?.resumeDownloads || 0}</span>
      </div>
      <div class="social-links">${socialHtml}</div>
    </div>
    
    <div class="recruiter-summary">
      <h3><i class="fas fa-bullhorn"></i> Summary for Recruiters</h3>
      <p>${escapeHtml(data.about || '')}</p>
      <div class="recruiter-details">
        📍 ${escapeHtml(data.location)} | 📧 ${escapeHtml(data.email)} | 📞 ${escapeHtml(data.phone || 'Not provided')}
      </div>
      <button id="whatsappSummaryBtn" class="btn-whatsapp" style="margin-top: 12px;">
        <i class="fab fa-whatsapp"></i> Contact via WhatsApp
      </button>
    </div>
    
    <div class="skills-section">
      <h3><i class="fas fa-code"></i> Core Skills</h3>
      <div class="skills-list">${skillsHtml}</div>
    </div>
    
    ${data.projects && data.projects.length ? `
    <div class="projects-section">
      <h3><i class="fas fa-project-diagram"></i> Featured Projects</h3>
      <div class="projects-grid">${projectsHtml}</div>
    </div>
    ` : ''}
    
    ${data.certifications && data.certifications.length ? `
    <div class="certifications-section">
      <h3><i class="fas fa-certificate"></i> Certifications</h3>
      <div class="certs-list">${certsHtml}</div>
    </div>
    ` : ''}
    
    <div class="documents-section">
      <h3><i class="fas fa-file-pdf"></i> Documents</h3>
      <div class="documents-grid">
        ${cvPreview}
        ${resumePreview}
      </div>
    </div>
    
    <div class="portfolio-footer">
      <p>Career Portfolio Generator — Created with <i class="fas fa-heart" style="color: var(--danger);"></i></p>
    </div>
  `;
  
  // Attach download handlers
  document.querySelectorAll('.download-cv-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (portfolioData.cvFile) {
        downloadFile(portfolioData.cvFile, 'CV.pdf');
        portfolioData.analytics.cvDownloads = (portfolioData.analytics.cvDownloads || 0) + 1;
        saveToStorage();
        renderPortfolio();
      } else {
        alert('CV file not uploaded yet');
      }
    });
  });
  
  document.querySelectorAll('.download-resume-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (portfolioData.resumeFile) {
        downloadFile(portfolioData.resumeFile, 'Resume.pdf');
        portfolioData.analytics.resumeDownloads = (portfolioData.analytics.resumeDownloads || 0) + 1;
        saveToStorage();
        renderPortfolio();
      } else {
        alert('Resume file not uploaded yet');
      }
    });
  });
  
  // WhatsApp button in summary
  const whatsappBtn = document.getElementById('whatsappSummaryBtn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const phone = portfolioData.phone?.replace(/\D/g, '') || '';
      if (phone) {
        const msg = `Hello ${portfolioData.name}, I saw your portfolio and I'm interested in connecting!`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
      } else {
        alert('WhatsApp number not provided in contact info');
      }
    });
  }
}

function downloadFile(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ----- EVENT LISTENERS -----
function bindEventListeners() {
  // Input fields
  document.getElementById('nameInput').addEventListener('input', (e) => {
    portfolioData.name = e.target.value;
    saveToStorage();
    renderPortfolio();
  });
  document.getElementById('titleInput').addEventListener('input', (e) => {
    portfolioData.title = e.target.value;
    saveToStorage();
    renderPortfolio();
  });
  document.getElementById('bioInput').addEventListener('input', (e) => {
    portfolioData.about = e.target.value;
    saveToStorage();
    renderPortfolio();
  });
  document.getElementById('imageUrlInput').addEventListener('input', (e) => {
    portfolioData.profileImage = e.target.value;
    saveToStorage();
    renderPortfolio();
  });
  document.getElementById('locationInput').addEventListener('input', (e) => {
    portfolioData.location = e.target.value;
    saveToStorage();
    renderPortfolio();
  });
  document.getElementById('emailInput').addEventListener('input', (e) => {
    portfolioData.email = e.target.value;
    saveToStorage();
    renderPortfolio();
  });
  document.getElementById('phoneInput').addEventListener('input', (e) => {
    portfolioData.phone = e.target.value;
    saveToStorage();
    renderPortfolio();
  });
  
  // Add Skill
  document.getElementById('addSkillBtn').addEventListener('click', () => {
    const input = document.getElementById('skillInput');
    if (input.value.trim()) {
      portfolioData.skills = portfolioData.skills || [];
      portfolioData.skills.push(input.value.trim());
      saveToStorage();
      renderFormFields();
      renderPortfolio();
      input.value = '';
    }
  });
  
  // Add Project
  document.getElementById('addProjectBtn').addEventListener('click', () => {
    portfolioData.projects = portfolioData.projects || [];
    portfolioData.projects.push({ name: 'New Project', description: 'Project description here', link: '#' });
    saveToStorage();
    renderFormFields();
    renderPortfolio();
  });
  
  // Add Social
  document.getElementById('addSocialBtn').addEventListener('click', () => {
    portfolioData.socialLinks = portfolioData.socialLinks || {};
    portfolioData.socialLinks['linkedin'] = 'https://linkedin.com/in/username';
    saveToStorage();
    renderFormFields();
    renderPortfolio();
  });
  
  // Theme selection
  document.getElementById('themeSelect').addEventListener('change', (e) => {
    const theme = e.target.value;
    document.body.classList.remove('theme-modern', 'theme-creative', 'theme-minimal');
    if (theme === 'modern') document.body.classList.add('theme-modern');
    else if (theme === 'creative') document.body.classList.add('theme-creative');
    else if (theme === 'minimal') document.body.classList.add('theme-minimal');
    localStorage.setItem('selectedTheme', theme);
  });
  
  // Layout selection
  document.getElementById('layoutSelect').addEventListener('change', () => renderPortfolio());
  
  // Reset data
  document.getElementById('resetDataBtn').addEventListener('click', () => {
    if (confirm('Are you sure? This will delete all your custom data and restore the default config.')) {
      localStorage.removeItem('career_portfolio_data');
      location.reload();
    }
  });
  
  // Export config
  document.getElementById('exportConfigBtn').addEventListener('click', () => {
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    downloadFile(url, 'portfolio-config.json');
    URL.revokeObjectURL(url);
  });
  
  // Sticky download CV
  document.getElementById('stickyDownloadCV').addEventListener('click', () => {
    if (portfolioData.cvFile) {
      downloadFile(portfolioData.cvFile, 'CV.pdf');
      portfolioData.analytics.cvDownloads = (portfolioData.analytics.cvDownloads || 0) + 1;
      saveToStorage();
      renderPortfolio();
    } else {
      alert('CV not uploaded yet');
    }
  });
  
  // Sticky WhatsApp
  document.getElementById('whatsappStickyBtn').addEventListener('click', () => {
    const phone = portfolioData.phone?.replace(/\D/g, '') || '';
    if (phone) {
      const msg = `Hello ${portfolioData.name}, I saw your portfolio and I'm interested!`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    } else {
      alert('WhatsApp number not provided');
    }
  });
  
  // File uploads
  document.getElementById('profileUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const base64 = await fileToBase64(file);
      portfolioData.profileImage = base64;
      saveToStorage();
      renderPortfolio();
    }
  });
  
  document.getElementById('cvUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const base64 = await fileToBase64(file);
      portfolioData.cvFile = base64;
      portfolioData.cvFileName = file.name;
      saveToStorage();
      renderFormFields();
      renderPortfolio();
    } else {
      alert('Please upload a PDF file');
    }
  });
  
  document.getElementById('resumeUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const base64 = await fileToBase64(file);
      portfolioData.resumeFile = base64;
      portfolioData.resumeFileName = file.name;
      saveToStorage();
      renderFormFields();
      renderPortfolio();
    } else {
      alert('Please upload a PDF file');
    }
  });
  
  // Mobile sidebar toggle
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('editorSidebar');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }
  
  document.getElementById('toggleSidebarMobile')?.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}

// ----- THEME -----
function loadThemePreference() {
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme === 'modern') document.body.classList.add('theme-modern');
  else if (savedTheme === 'creative') document.body.classList.add('theme-creative');
  else if (savedTheme === 'minimal') document.body.classList.add('theme-minimal');
  document.getElementById('themeSelect').value = savedTheme || 'default';
  
  // Dark mode toggle from localStorage
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// ----- UTILITIES -----
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Add dark mode toggle button dynamically
function addDarkModeToggle() {
  const toolbar = document.querySelector('.sticky-toolbar');
  if (toolbar) {
    const darkBtn = document.createElement('button');
    darkBtn.className = 'btn-outline';
    darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkBtn.id = 'darkModeToggle';
    darkBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('darkMode', !isDark);
      darkBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
    toolbar.appendChild(darkBtn);
  }
}

// Call after DOM ready
setTimeout(addDarkModeToggle, 100);
