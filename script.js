// ============================================
// CAREER PORTFOLIO GENERATOR - COMPLETE SCRIPT
// Enhanced Documents Management + All Features
// ============================================

// ----- STATE MANAGEMENT -----
let portfolioData = null;
let animationLevel = 'full';

// ----- INITIALIZATION -----
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  bindEventListeners();
  loadThemePreference();
  setupMobileInteractions();
  checkReducedMotion();
  updateImagePreview();
  initEnhancedDocuments();
  setupDocumentOptions();
});

function initializeApp() {
  loadFromStorage();
  if (!portfolioData) {
    portfolioData = { ...window.PORTFOLIO_CONFIG };
  }
  renderFormFields();
  renderPortfolio();
  updateShareLink();
}

// ----- LOCALSTORAGE MANAGEMENT -----
function loadFromStorage() {
  const saved = localStorage.getItem('career_portfolio_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      portfolioData = { ...window.PORTFOLIO_CONFIG, ...parsed };
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

// ----- IMAGE PREVIEW -----
function updateImagePreview() {
  const previewImg = document.getElementById('imagePreview');
  if (previewImg && portfolioData.profileImage) {
    previewImg.src = portfolioData.profileImage;
  }
}

// ============================================
// ENHANCED DOCUMENTS MANAGEMENT
// ============================================

function initEnhancedDocuments() {
  setupDocumentUpload('cv');
  setupDocumentUpload('resume');
  setupDocumentPreview();
  loadExistingDocuments();
}

function setupDocumentUpload(type) {
  const uploadBtn = document.getElementById(`${type}UploadBtn`);
  const fileInput = document.getElementById(`${type}Upload`);
  const uploadArea = document.getElementById(`${type}UploadArea`);
  
  if (!uploadBtn || !fileInput) return;
  
  // Trigger file input click
  uploadBtn.addEventListener('click', () => {
    fileInput.click();
  });
  
  // Drag and drop support
  if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--primary)';
      uploadArea.style.background = 'var(--primary-glow)';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--border)';
      uploadArea.style.background = 'var(--bg-input)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--border)';
      uploadArea.style.background = 'var(--bg-input)';
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        handleFileUpload(file, type);
      } else {
        showToast('Please drop a PDF file', 'error');
      }
    });
  }
  
  // File input change
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        if (file.size <= 10 * 1024 * 1024) {
          handleFileUpload(file, type);
        } else {
          showToast('File too large. Max size is 10MB', 'error');
        }
      } else {
        showToast('Please upload a PDF file', 'error');
      }
    }
  });
}

function handleFileUpload(file, type) {
  showUploadProgress(type, true);
  
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 10;
    updateProgressBar(type, progress);
    if (progress >= 100) {
      clearInterval(progressInterval);
      completeFileUpload(file, type);
    }
  }, 50);
}

function updateProgressBar(type, percent) {
  const progressDiv = document.getElementById(`${type}Progress`);
  const fillDiv = document.getElementById(`${type}ProgressFill`);
  if (progressDiv && fillDiv) {
    progressDiv.classList.add('active');
    fillDiv.style.width = `${percent}%`;
    if (percent >= 100) {
      setTimeout(() => {
        progressDiv.classList.remove('active');
        fillDiv.style.width = '0%';
      }, 500);
    }
  }
}

function showUploadProgress(type, show) {
  let progressDiv = document.getElementById(`${type}Progress`);
  if (!progressDiv && show) {
    const uploadArea = document.getElementById(`${type}UploadArea`);
    if (uploadArea) {
      progressDiv = document.createElement('div');
      progressDiv.id = `${type}Progress`;
      progressDiv.className = 'upload-progress';
      progressDiv.innerHTML = `<div class="progress-bar"><div class="progress-fill" id="${type}ProgressFill"></div></div>`;
      uploadArea.appendChild(progressDiv);
    }
  }
}

async function completeFileUpload(file, type) {
  try {
    const base64 = await fileToBase64(file);
    
    if (type === 'cv') {
      portfolioData.cvFile = base64;
      portfolioData.cvFileName = file.name;
      portfolioData.cvFileSize = file.size;
      portfolioData.cvUploadedAt = new Date().toISOString();
    } else {
      portfolioData.resumeFile = base64;
      portfolioData.resumeFileName = file.name;
      portfolioData.resumeFileSize = file.size;
      portfolioData.resumeUploadedAt = new Date().toISOString();
    }
    
    saveToStorage();
    updateDocumentDisplay(type, file);
    
    const card = document.getElementById(`${type}UploadCard`);
    if (card) {
      card.classList.add('upload-success');
      setTimeout(() => card.classList.remove('upload-success'), 500);
    }
    
    showToast(`${type.toUpperCase()} uploaded successfully!`, 'success');
    renderPortfolio();
    
  } catch (error) {
    console.error('Upload error:', error);
    showToast('Error uploading file. Please try again.', 'error');
  }
}

function updateDocumentDisplay(type, file) {
  const infoDiv = document.getElementById(`${type}FileInfo`);
  const uploadArea = document.getElementById(`${type}UploadArea`);
  const card = document.getElementById(`${type}UploadCard`);
  
  if (!infoDiv) return;
  
  const fileSize = formatFileSize(file.size);
  const uploadDate = new Date().toLocaleDateString();
  
  infoDiv.innerHTML = `
    <div class="file-details">
      <div class="file-icon-large">
        <i class="fas fa-file-pdf"></i>
      </div>
      <div class="file-info-text">
        <div class="file-name">${escapeHtml(file.name)}</div>
        <div class="file-meta">
          <span><i class="fas fa-database"></i> ${fileSize}</span>
          <span><i class="fas fa-calendar"></i> ${uploadDate}</span>
          <span><i class="fas fa-check-circle" style="color: var(--success);"></i> Uploaded</span>
        </div>
      </div>
      <div class="file-actions-buttons">
        <button class="file-action-btn preview" data-type="${type}" data-tooltip="Preview PDF">
          <i class="fas fa-eye"></i>
        </button>
        <button class="file-action-btn download" data-type="${type}" data-tooltip="Download">
          <i class="fas fa-download"></i>
        </button>
        <button class="file-action-btn replace" data-type="${type}" data-tooltip="Replace File">
          <i class="fas fa-sync-alt"></i>
        </button>
        <button class="file-action-btn delete" data-type="${type}" data-tooltip="Delete File">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `;
  
  infoDiv.classList.add('active');
  if (uploadArea) uploadArea.style.display = 'none';
  if (card) card.classList.add('has-file');
  
  // Add event listeners
  const previewBtn = infoDiv.querySelector('.preview');
  const downloadBtn = infoDiv.querySelector('.download');
  const replaceBtn = infoDiv.querySelector('.replace');
  const deleteBtn = infoDiv.querySelector('.delete');
  
  if (previewBtn) previewBtn.addEventListener('click', () => previewDocument(type));
  if (downloadBtn) downloadBtn.addEventListener('click', () => downloadDocument(type));
  if (replaceBtn) replaceBtn.addEventListener('click', () => replaceDocument(type));
  if (deleteBtn) deleteBtn.addEventListener('click', () => deleteDocument(type));
}

function previewDocument(type) {
  const fileData = type === 'cv' ? portfolioData.cvFile : portfolioData.resumeFile;
  const fileName = type === 'cv' ? portfolioData.cvFileName : portfolioData.resumeFileName;
  
  if (fileData) {
    const modal = document.getElementById('documentPreviewModal');
    const frame = document.getElementById('documentPreviewFrame');
    const title = document.getElementById('previewTitle');
    
    if (modal && frame) {
      frame.src = fileData;
      title.textContent = `Preview: ${fileName || `${type.toUpperCase()} Document`}`;
      modal.classList.add('active');
      
      const downloadBtn = document.getElementById('downloadFromPreviewBtn');
      if (downloadBtn) {
        downloadBtn.onclick = () => downloadDocument(type);
      }
    }
  } else {
    showToast('No document to preview', 'error');
  }
}

function downloadDocument(type) {
  const fileData = type === 'cv' ? portfolioData.cvFile : portfolioData.resumeFile;
  const fileName = type === 'cv' ? portfolioData.cvFileName : portfolioData.resumeFileName;
  
  if (fileData) {
    downloadFile(fileData, fileName || `${type.toUpperCase()}.pdf`);
    
    if (type === 'cv') {
      portfolioData.analytics.cvDownloads = (portfolioData.analytics.cvDownloads || 0) + 1;
    } else {
      portfolioData.analytics.resumeDownloads = (portfolioData.analytics.resumeDownloads || 0) + 1;
    }
    saveToStorage();
    
    showToast(`${type.toUpperCase()} download started`, 'success');
  } else {
    showToast('No document to download', 'error');
  }
}

function replaceDocument(type) {
  const fileInput = document.getElementById(`${type}Upload`);
  if (fileInput) {
    fileInput.click();
  }
}

function deleteDocument(type) {
  if (confirm(`Are you sure you want to delete your ${type.toUpperCase()}? This action cannot be undone.`)) {
    if (type === 'cv') {
      portfolioData.cvFile = null;
      portfolioData.cvFileName = null;
      portfolioData.cvFileSize = null;
      portfolioData.cvUploadedAt = null;
    } else {
      portfolioData.resumeFile = null;
      portfolioData.resumeFileName = null;
      portfolioData.resumeFileSize = null;
      portfolioData.resumeUploadedAt = null;
    }
    
    saveToStorage();
    resetDocumentUI(type);
    showToast(`${type.toUpperCase()} deleted successfully`, 'success');
    renderPortfolio();
  }
}

function resetDocumentUI(type) {
  const infoDiv = document.getElementById(`${type}FileInfo`);
  const uploadArea = document.getElementById(`${type}UploadArea`);
  const card = document.getElementById(`${type}UploadCard`);
  const fileInput = document.getElementById(`${type}Upload`);
  
  if (infoDiv) {
    infoDiv.classList.remove('active');
    infoDiv.innerHTML = '';
  }
  
  if (uploadArea) uploadArea.style.display = 'flex';
  if (card) card.classList.remove('has-file');
  if (fileInput) fileInput.value = '';
}

function loadExistingDocuments() {
  if (portfolioData.cvFile && portfolioData.cvFileName) {
    const fakeFile = {
      name: portfolioData.cvFileName,
      size: portfolioData.cvFileSize || 1024 * 1024,
      type: 'application/pdf'
    };
    updateDocumentDisplay('cv', fakeFile);
    
    const uploadArea = document.getElementById('cvUploadArea');
    if (uploadArea) uploadArea.style.display = 'none';
  }
  
  if (portfolioData.resumeFile && portfolioData.resumeFileName) {
    const fakeFile = {
      name: portfolioData.resumeFileName,
      size: portfolioData.resumeFileSize || 1024 * 1024,
      type: 'application/pdf'
    };
    updateDocumentDisplay('resume', fakeFile);
    
    const uploadArea = document.getElementById('resumeUploadArea');
    if (uploadArea) uploadArea.style.display = 'none';
  }
}

function setupDocumentPreview() {
  const modal = document.getElementById('documentPreviewModal');
  const closeBtns = document.querySelectorAll('#closePreviewBtn, #closePreviewFooterBtn');
  
  closeBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        if (modal) modal.classList.remove('active');
      });
    }
  });
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

function setupDocumentOptions() {
  const cvToggle = document.getElementById('toggleCvOptions');
  const resumeToggle = document.getElementById('toggleResumeOptions');
  
  if (cvToggle) {
    cvToggle.addEventListener('click', () => {
      console.log('CV options clicked');
    });
  }
  
  if (resumeToggle) {
    resumeToggle.addEventListener('click', () => {
      console.log('Resume options clicked');
    });
  }
}

function formatFileSize(bytes) {
  if (!bytes) return 'Unknown size';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ----- RENDER FORM FIELDS -----
function renderFormFields() {
  setValue('nameInput', portfolioData.name);
  setValue('titleInput', portfolioData.title);
  setValue('bioInput', portfolioData.about);
  setValue('imageUrlInput', portfolioData.profileImage);
  setValue('locationInput', portfolioData.location);
  setValue('emailInput', portfolioData.email);
  setValue('phoneInput', portfolioData.phone);
  
  updateImagePreview();
  
  const skillsContainer = document.getElementById('skillsContainer');
  if (skillsContainer) {
    skillsContainer.innerHTML = '';
    (portfolioData.skills || []).forEach((skill, idx) => {
      const tag = createTagElement(skill, idx, 'skill');
      skillsContainer.appendChild(tag);
    });
  }
  
  const certsContainer = document.getElementById('certsContainer');
  if (certsContainer) {
    certsContainer.innerHTML = '';
    (portfolioData.certifications || []).forEach((cert, idx) => {
      const tag = createTagElement(cert, idx, 'cert');
      certsContainer.appendChild(tag);
    });
  }
  
  renderProjectsList();
  renderSocialList();
}

function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value || '';
}

function createTagElement(text, idx, type) {
  const tag = document.createElement('div');
  tag.className = type === 'skill' ? 'skill-tag' : 'cert-tag';
  tag.innerHTML = `${escapeHtml(text)} <i class="fas fa-times" data-${type}-idx="${idx}"></i>`;
  tag.querySelector('i').addEventListener('click', () => {
    if (type === 'skill') {
      portfolioData.skills.splice(idx, 1);
    } else {
      portfolioData.certifications.splice(idx, 1);
    }
    saveToStorage();
    renderFormFields();
    renderPortfolio();
    showToast(`${type === 'skill' ? 'Skill' : 'Certification'} removed`, 'info');
  });
  return tag;
}

function renderProjectsList() {
  const projectsContainer = document.getElementById('projectsList');
  if (!projectsContainer) return;
  
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
  
  document.querySelectorAll('[data-project-title]').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(input.dataset.projectTitle);
      portfolioData.projects[idx].name = input.value;
      saveToStorage();
      debouncedRender();
    });
  });
  document.querySelectorAll('[data-project-desc]').forEach(textarea => {
    textarea.addEventListener('input', (e) => {
      const idx = parseInt(textarea.dataset.projectDesc);
      portfolioData.projects[idx].description = textarea.value;
      saveToStorage();
      debouncedRender();
    });
  });
  document.querySelectorAll('[data-project-link]').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(input.dataset.projectLink);
      portfolioData.projects[idx].link = input.value;
      saveToStorage();
      debouncedRender();
    });
  });
  document.querySelectorAll('.remove-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.projectIdx);
      portfolioData.projects.splice(idx, 1);
      saveToStorage();
      renderFormFields();
      renderPortfolio();
      showToast('Project removed', 'info');
    });
  });
}

function renderSocialList() {
  const socialContainer = document.getElementById('socialList');
  if (!socialContainer) return;
  
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
      debouncedRender();
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
      showToast('Social link removed', 'info');
    });
  });
}

let renderTimeout;
function debouncedRender() {
  clearTimeout(renderTimeout);
  renderTimeout = setTimeout(() => renderPortfolio(), 100);
}

// ----- RENDER PORTFOLIO PREVIEW -----
function renderPortfolio() {
  const data = portfolioData;
  const previewDiv = document.getElementById('portfolioPreview');
  if (!previewDiv) return;
  
  let socialHtml = '';
  for (const [platform, url] of Object.entries(data.socialLinks || {})) {
    if (url && url !== '#') {
      let icon = 'fa-link';
      if (platform === 'linkedin') icon = 'fab fa-linkedin-in';
      else if (platform === 'github') icon = 'fab fa-github';
      else if (platform === 'twitter') icon = 'fab fa-twitter';
      else if (platform === 'dribbble') icon = 'fab fa-dribbble';
      socialHtml += `<a href="${url}" target="_blank" aria-label="${platform}"><i class="${icon}"></i></a>`;
    }
  }
  
  const skillsHtml = (data.skills || []).map(s => `<span class="skill-badge">${escapeHtml(s)}</span>`).join('');
  
  const projectsHtml = (data.projects || []).filter(p => p.name && p.name !== 'New Project').map(p => `
    <div class="project-card">
      <h4>${escapeHtml(p.name)}</h4>
      <p>${escapeHtml(p.description)}</p>
      ${p.link && p.link !== '#' ? `<a href="${p.link}" target="_blank" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>` : ''}
    </div>
  `).join('');
  
  const certsHtml = (data.certifications || []).map(c => `<span class="cert-badge">${escapeHtml(c)}</span>`).join('');
  
  const cvPreview = data.cvFile ? `
    <div class="doc-card">
      <div class="doc-icon"><i class="fas fa-file-pdf"></i></div>
      <h4>Curriculum Vitae</h4>
      <div class="doc-meta">PDF · ${data.cvFileName || 'Document'}</div>
      <button class="btn-primary download-cv-btn"><i class="fas fa-download"></i> Download CV</button>
      ${data.cvFile.startsWith('data:') ? `<div class="pdf-preview"><iframe src="${data.cvFile}" title="CV Preview"></iframe></div>` : ''}
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
      <div class="doc-meta">PDF · ${data.resumeFileName || 'Document'}</div>
      <button class="btn-primary download-resume-btn"><i class="fas fa-download"></i> Download Resume</button>
      ${data.resumeFile.startsWith('data:') ? `<div class="pdf-preview"><iframe src="${data.resumeFile}" title="Resume Preview"></iframe></div>` : ''}
    </div>
  ` : `
    <div class="doc-card">
      <div class="doc-icon"><i class="fas fa-file-alt"></i></div>
      <h4>Professional Resume</h4>
      <div class="doc-meta">Not uploaded yet</div>
      <button class="btn-outline" disabled>No Resume available</button>
    </div>
  `;
  
  previewDiv.innerHTML = `
    <div class="hero-section">
      <img src="${data.profileImage || 'https://via.placeholder.com/140'}" class="profile-img-large" onerror="this.src='https://via.placeholder.com/140'" alt="${escapeHtml(data.name)}">
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
      ${socialHtml ? `<div class="social-links">${socialHtml}</div>` : ''}
    </div>
    
    <div class="recruiter-summary">
      <h3><i class="fas fa-bullhorn"></i> Summary for Recruiters</h3>
      <p>${escapeHtml(data.about || '')}</p>
      <div class="recruiter-details">
        📍 ${escapeHtml(data.location)} | 📧 ${escapeHtml(data.email)} | 📞 ${escapeHtml(data.phone || 'Not provided')}
      </div>
      <button id="whatsappSummaryBtn" class="btn-whatsapp" style="margin-top: 16px;">
        <i class="fab fa-whatsapp"></i> Contact via WhatsApp
      </button>
    </div>
    
    ${skillsHtml ? `
    <div class="skills-section">
      <h3><i class="fas fa-code"></i> Core Skills</h3>
      <div class="skills-list">${skillsHtml}</div>
    </div>
    ` : ''}
    
    ${projectsHtml ? `
    <div class="projects-section">
      <h3><i class="fas fa-project-diagram"></i> Featured Projects</h3>
      <div class="projects-grid">${projectsHtml}</div>
    </div>
    ` : ''}
    
    ${certsHtml ? `
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
      <p>✨ Career Portfolio Generator — Create your professional portfolio in minutes ✨</p>
    </div>
  `;
  
  attachDownloadHandlers();
  
  const whatsappBtn = document.getElementById('whatsappSummaryBtn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => handleWhatsApp());
  }
}

function attachDownloadHandlers() {
  document.querySelectorAll('.download-cv-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (portfolioData.cvFile) {
        downloadFile(portfolioData.cvFile, 'CV.pdf');
        portfolioData.analytics.cvDownloads = (portfolioData.analytics.cvDownloads || 0) + 1;
        saveToStorage();
        renderPortfolio();
        showToast('CV download started', 'success');
      } else {
        showToast('CV file not uploaded yet', 'error');
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
        showToast('Resume download started', 'success');
      } else {
        showToast('Resume file not uploaded yet', 'error');
      }
    });
  });
}

function downloadFile(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function handleWhatsApp() {
  const phone = portfolioData.phone?.replace(/\D/g, '') || '';
  if (phone) {
    const msg = `Hello ${portfolioData.name}, I saw your portfolio and I'm interested in connecting!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  } else {
    showToast('WhatsApp number not provided in contact info', 'error');
  }
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.style.borderLeftColor = type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)';
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function updateShareLink() {
  const shareLink = document.getElementById('shareLinkInput');
  if (shareLink) {
    shareLink.value = window.location.href;
  }
}

function copyToClipboard() {
  const shareLink = document.getElementById('shareLinkInput');
  if (shareLink) {
    shareLink.select();
    document.execCommand('copy');
    showToast('Link copied to clipboard!', 'success');
  }
}

function openShareModal() {
  const modal = document.getElementById('shareModal');
  if (modal) {
    modal.classList.add('active');
    updateShareLink();
    generateSimpleQR();
  }
}

function generateSimpleQR() {
  const qrContainer = document.getElementById('qrCodeContainer');
  if (!qrContainer) return;
  
  qrContainer.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.width = 120;
  canvas.height = 120;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 120, 120);
  ctx.fillStyle = '#000000';
  ctx.font = '10px Arial';
  ctx.fillText('📱', 52, 50);
  ctx.fillText('Scan me', 38, 75);
  ctx.fillStyle = '#6366f1';
  ctx.fillRect(40, 85, 40, 4);
  qrContainer.appendChild(canvas);
}

function shareOnPlatform(platform) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Check out my professional portfolio!`);
  let shareUrl = '';
  
  switch(platform) {
    case 'whatsapp':
      const phone = portfolioData.phone?.replace(/\D/g, '') || '';
      shareUrl = phone ? `https://wa.me/${phone}?text=${text}%20${url}` : `https://wa.me/?text=${text}%20${url}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      break;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank');
  }
}

// ----- EVENT LISTENERS -----
function bindEventListeners() {
  const nameInput = document.getElementById('nameInput');
  if (nameInput) nameInput.addEventListener('input', (e) => { portfolioData.name = e.target.value; saveToStorage(); debouncedRender(); updateImagePreview(); });
  
  const titleInput = document.getElementById('titleInput');
  if (titleInput) titleInput.addEventListener('input', (e) => { portfolioData.title = e.target.value; saveToStorage(); debouncedRender(); });
  
  const bioInput = document.getElementById('bioInput');
  if (bioInput) bioInput.addEventListener('input', (e) => { portfolioData.about = e.target.value; saveToStorage(); debouncedRender(); });
  
  const imageUrlInput = document.getElementById('imageUrlInput');
  if (imageUrlInput) imageUrlInput.addEventListener('input', (e) => { portfolioData.profileImage = e.target.value; saveToStorage(); debouncedRender(); updateImagePreview(); });
  
  const locationInput = document.getElementById('locationInput');
  if (locationInput) locationInput.addEventListener('input', (e) => { portfolioData.location = e.target.value; saveToStorage(); debouncedRender(); });
  
  const emailInput = document.getElementById('emailInput');
  if (emailInput) emailInput.addEventListener('input', (e) => { portfolioData.email = e.target.value; saveToStorage(); debouncedRender(); });
  
  const phoneInput = document.getElementById('phoneInput');
  if (phoneInput) phoneInput.addEventListener('input', (e) => { portfolioData.phone = e.target.value; saveToStorage(); debouncedRender(); });
  
  const addSkillBtn = document.getElementById('addSkillBtn');
  if (addSkillBtn) {
    addSkillBtn.addEventListener('click', () => {
      const input = document.getElementById('skillInput');
      if (input && input.value.trim()) {
        portfolioData.skills = portfolioData.skills || [];
        portfolioData.skills.push(input.value.trim());
        saveToStorage();
        renderFormFields();
        renderPortfolio();
        input.value = '';
        showToast('Skill added', 'success');
      }
    });
  }
  
  const addCertBtn = document.getElementById('addCertBtn');
  if (addCertBtn) {
    addCertBtn.addEventListener('click', () => {
      const input = document.getElementById('certInput');
      if (input && input.value.trim()) {
        portfolioData.certifications = portfolioData.certifications || [];
        portfolioData.certifications.push(input.value.trim());
        saveToStorage();
        renderFormFields();
        renderPortfolio();
        input.value = '';
        showToast('Certification added', 'success');
      }
    });
  }
  
  const addProjectBtn = document.getElementById('addProjectBtn');
  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
      portfolioData.projects = portfolioData.projects || [];
      portfolioData.projects.push({ name: 'New Project', description: 'Project description here', link: '#' });
      saveToStorage();
      renderFormFields();
      renderPortfolio();
      showToast('New project added', 'success');
    });
  }
  
  const addSocialBtn = document.getElementById('addSocialBtn');
  if (addSocialBtn) {
    addSocialBtn.addEventListener('click', () => {
      portfolioData.socialLinks = portfolioData.socialLinks || {};
      portfolioData.socialLinks['linkedin'] = 'https://linkedin.com/in/username';
      saveToStorage();
      renderFormFields();
      renderPortfolio();
      showToast('Social link added', 'success');
    });
  }
  
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      const theme = e.target.value;
      document.body.classList.remove('theme-modern', 'theme-creative', 'theme-minimal');
      if (theme === 'modern') document.body.classList.add('theme-modern');
      else if (theme === 'creative') document.body.classList.add('theme-creative');
      else if (theme === 'minimal') document.body.classList.add('theme-minimal');
      localStorage.setItem('selectedTheme', theme);
      showToast(`Theme changed to ${theme}`, 'success');
    });
  }
  
  const animationSelect = document.getElementById('animationSelect');
  if (animationSelect) {
    animationSelect.addEventListener('change', (e) => {
      animationLevel = e.target.value;
      localStorage.setItem('animationLevel', animationLevel);
      if (animationLevel === 'none') {
        document.body.classList.add('no-animation');
      } else {
        document.body.classList.remove('no-animation');
      }
    });
  }
  
  const layoutSelect = document.getElementById('layoutSelect');
  if (layoutSelect) layoutSelect.addEventListener('change', () => renderPortfolio());
  
  const resetBtn = document.getElementById('resetDataBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('⚠️ Are you sure? This will delete ALL your custom data and restore the default configuration. This action cannot be undone.')) {
        localStorage.removeItem('career_portfolio_data');
        showToast('Data reset. Refreshing...', 'success');
        setTimeout(() => location.reload(), 1000);
      }
    });
  }
  
  const exportBtn = document.getElementById('exportConfigBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = JSON.stringify(portfolioData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      downloadFile(url, `portfolio-${(portfolioData.name || 'config').replace(/\s/g, '-')}.json`);
      URL.revokeObjectURL(url);
      showToast('Config exported successfully', 'success');
    });
  }
  
  const importBtn = document.getElementById('importConfigBtn');
  const importFile = document.getElementById('importFileInput');
  if (importBtn && importFile) {
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        const text = await file.text();
        try {
          const imported = JSON.parse(text);
          portfolioData = { ...portfolioData, ...imported };
          saveToStorage();
          renderFormFields();
          renderPortfolio();
          showToast('Config imported successfully!', 'success');
        } catch (err) {
          showToast('Invalid config file', 'error');
        }
      }
    });
  }
  
  const stickyCvBtn = document.getElementById('stickyDownloadCV');
  if (stickyCvBtn) {
    stickyCvBtn.addEventListener('click', () => {
      if (portfolioData.cvFile) {
        downloadFile(portfolioData.cvFile, 'CV.pdf');
        portfolioData.analytics.cvDownloads = (portfolioData.analytics.cvDownloads || 0) + 1;
        saveToStorage();
        showToast('CV download started', 'success');
      } else {
        showToast('CV not uploaded yet', 'error');
      }
    });
  }
  
  const stickyResumeBtn = document.getElementById('stickyDownloadResume');
  if (stickyResumeBtn) {
    stickyResumeBtn.addEventListener('click', () => {
      if (portfolioData.resumeFile) {
        downloadFile(portfolioData.resumeFile, 'Resume.pdf');
        portfolioData.analytics.resumeDownloads = (portfolioData.analytics.resumeDownloads || 0) + 1;
        saveToStorage();
        showToast('Resume download started', 'success');
      } else {
        showToast('Resume not uploaded yet', 'error');
      }
    });
  }
  
  const whatsappSticky = document.getElementById('whatsappStickyBtn');
  if (whatsappSticky) whatsappSticky.addEventListener('click', handleWhatsApp);
  
  const shareBtn = document.getElementById('sharePortfolioBtn');
  if (shareBtn) shareBtn.addEventListener('click', openShareModal);
  
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  if (copyLinkBtn) copyLinkBtn.addEventListener('click', copyToClipboard);
  
  const closeModalBtn = document.getElementById('closeModalBtn');
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => {
    document.getElementById('shareModal')?.classList.remove('active');
  });
  
  const shareWhatsApp = document.getElementById('shareWhatsApp');
  if (shareWhatsApp) shareWhatsApp.addEventListener('click', () => shareOnPlatform('whatsapp'));
  
  const shareLinkedIn = document.getElementById('shareLinkedIn');
  if (shareLinkedIn) shareLinkedIn.addEventListener('click', () => shareOnPlatform('linkedin'));
  
  const shareTwitter = document.getElementById('shareTwitter');
  if (shareTwitter) shareTwitter.addEventListener('click', () => shareOnPlatform('twitter'));
  
  const profileUpload = document.getElementById('profileUpload');
  if (profileUpload) {
    profileUpload.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const base64 = await fileToBase64(file);
        portfolioData.profileImage = base64;
        saveToStorage();
        renderFormFields();
        renderPortfolio();
        showToast('Profile image updated', 'success');
      } else if (file) {
        showToast('Please upload an image file', 'error');
      }
    });
  }
}

// ----- MOBILE INTERACTIONS -----
function setupMobileInteractions() {
  const sidebar = document.getElementById('editorSidebar');
  const openBtn = document.getElementById('openSidebarBtn');
  const closeBtn = document.getElementById('closeSidebarBtn');
  const overlay = document.getElementById('mobileOverlay');
  
  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (sidebar) {
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
  
  const closeSidebar = () => {
    if (sidebar) {
      sidebar.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };
  
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });
  
  const modal = document.getElementById('shareModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
  
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900 && sidebar) {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }, 250);
  });
}

// ----- THEME & PREFERENCES -----
function loadThemePreference() {
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme === 'modern') document.body.classList.add('theme-modern');
  else if (savedTheme === 'creative') document.body.classList.add('theme-creative');
  else if (savedTheme === 'minimal') document.body.classList.add('theme-minimal');
  
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) themeSelect.value = savedTheme || 'default';
  
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  const savedAnimation = localStorage.getItem('animationLevel');
  if (savedAnimation) {
    animationLevel = savedAnimation;
    const animSelect = document.getElementById('animationSelect');
    if (animSelect) animSelect.value = savedAnimation;
    if (savedAnimation === 'none') {
      document.body.classList.add('no-animation');
    }
  }
}

function checkReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches && animationLevel !== 'none') {
    animationLevel = 'reduced';
    const animSelect = document.getElementById('animationSelect');
    if (animSelect) animSelect.value = 'reduced';
  }
}

function setupDarkMode() {
  const darkBtn = document.getElementById('darkModeToggle');
  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('darkMode', !isDark);
      darkBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      showToast(`${isDark ? 'Light' : 'Dark'} mode activated`, 'success');
    });
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    darkBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}

function handleSkillKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const addBtn = document.getElementById('addSkillBtn');
    if (addBtn) addBtn.click();
  }
}

window.handleSkillKeyPress = handleSkillKeyPress;
setTimeout(setupDarkMode, 100);

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
