// script.js – Designer Theme | Bright Gradients, Big Images, Smooth Animations

// ---------- DATA MODEL ----------
let portfolioData = {
  name: "Emma Chen",
  title: "Creative Director & Visual Designer",
  bio: "Crafting bold visual stories with passion for typography, color, and movement. 8+ years of bringing creative visions to life.",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&h=800&fit=crop",
  email: "hello@emma.design",
  location: "Brooklyn, NYC",
  colorTheme: "sunset",
  skills: ["Brand Identity", "UI/UX Design", "Motion Graphics", "Typography", "Art Direction", "Illustration"],
  projects: [
    {
      id: "proj1",
      title: "Nebula Agency Rebrand",
      description: "Complete brand identity transformation including logo, motion, and digital presence.",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop",
      link: "#",
      technologies: ["Branding", "Motion", "Web Design"]
    },
    {
      id: "proj2",
      title: "Cosmic UI Kit",
      description: "Award-winning design system with vibrant gradients and micro-interactions.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
      link: "#",
      technologies: ["UI/UX", "Figma", "Design System"]
    },
    {
      id: "proj3",
      title: "Luminous Campaign",
      description: "Interactive digital campaign for fashion brand reaching 2M+ engagement.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      link: "#",
      technologies: ["Motion", "After Effects", "Social Media"]
    }
  ]
};

// Gradient theme mappings
const gradientThemes = {
  sunset: "linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)",
  ocean: "linear-gradient(135deg, #00cec9 0%, #0984e3 50%, #6c5ce7 100%)",
  aurora: "linear-gradient(135deg, #a8e6cf 0%, #3a0ca3 50%, #7209b7 100%)",
  candy: "linear-gradient(135deg, #ff006e 0%, #ffbe0b 50%, #fb5607 100%)",
  forest: "linear-gradient(135deg, #06d6a0 0%, #118ab2 50%, #073b4c 100%)"
};

// Helper functions
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(message, type = "info") {
  const existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();
  
  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.innerHTML = `<i class="fa-regular ${type === 'success' ? 'fa-circle-check' : 'fa-info-circle'}"></i><span>${escapeHtml(message)}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function persistData() {
  localStorage.setItem("designer_portfolio", JSON.stringify(portfolioData));
}

function loadStoredData() {
  const saved = localStorage.getItem("designer_portfolio");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      portfolioData = { ...portfolioData, ...parsed };
      if (!portfolioData.projects) portfolioData.projects = [];
      if (!portfolioData.skills) portfolioData.skills = [];
      portfolioData.projects = portfolioData.projects.map(p => ({ ...p, id: p.id || crypto.randomUUID?.() || Date.now() + Math.random() }));
    } catch(e) {}
  }
}

function applyGradientTheme() {
  const gradient = gradientThemes[portfolioData.colorTheme] || gradientThemes.sunset;
  document.documentElement.style.setProperty('--current-gradient', gradient);
  
  // Update logo and buttons
  const logoMark = document.querySelector('.logo-mark');
  const buttons = document.querySelectorAll('.btn-primary');
  
  if (logoMark) logoMark.style.background = gradient;
  buttons.forEach(btn => { if(btn) btn.style.background = gradient; });
}

// Render main preview
function renderPortfolio() {
  const container = document.getElementById("portfolioRoot");
  if (!container) return;
  
  applyGradientTheme();
  
  const heroBg = portfolioData.coverImage || "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&h=800&fit=crop";
  
  const skillsHtml = portfolioData.skills.map(skill => 
    `<span class="skill-badge">${escapeHtml(skill)}</span>`
  ).join('');
  
  const projectsHtml = portfolioData.projects.map(proj => `
    <div class="project-card" data-project-id="${proj.id}">
      <div class="project-image" style="background-image: url('${escapeHtml(proj.image)}')"></div>
      <div class="project-content">
        <h4>${escapeHtml(proj.title)}</h4>
        <p>${escapeHtml(proj.description)}</p>
        <div class="project-tech">
          ${proj.technologies.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
          <a href="${escapeHtml(proj.link)}" class="project-link" target="_blank">View Case Study <i class="fa-regular fa-arrow-right"></i></a>
          <div style="display: flex; gap: 8px;">
            <button class="edit-project-btn" data-id="${proj.id}" style="background: none; border: none; color: #ff9ff3; cursor: pointer;">
              <i class="fa-regular fa-pen"></i>
            </button>
            <button class="delete-project-btn" data-id="${proj.id}" style="background: none; border: none; color: #ff6b6b; cursor: pointer;">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  const html = `
    <div class="hero-section">
      <div class="hero-bg" style="background-image: url('${escapeHtml(heroBg)}')"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <img src="${portfolioData.image}" alt="${escapeHtml(portfolioData.name)}" class="hero-avatar" onerror="this.src='https://ui-avatars.com/api/?background=ff6b6b&color=fff&bold=true&name=${encodeURIComponent(portfolioData.name)}'">
        <h1 class="hero-name">${escapeHtml(portfolioData.name)}</h1>
        <div class="hero-title">✦ ${escapeHtml(portfolioData.title)} ✦</div>
        <div class="hero-bio">${escapeHtml(portfolioData.bio).replace(/\n/g, '<br>')}</div>
        <div class="hero-stats">
          <div class="stat-badge"><i class="fa-regular fa-location-dot"></i> ${escapeHtml(portfolioData.location)}</div>
          <div class="stat-badge"><i class="fa-regular fa-envelope"></i> ${escapeHtml(portfolioData.email)}</div>
          <div class="stat-badge"><i class="fa-regular fa-sparkles"></i> ${portfolioData.skills.length}+ Creative Skills</div>
        </div>
      </div>
    </div>

    <div class="creative-grid">
      <div class="skills-section">
        <div class="section-icon"><i class="fa-regular fa-compass"></i></div>
        <h3>Creative Arsenal</h3>
        <div class="skills-chips">
          ${skillsHtml || '<span class="skill-badge">Add skills in sidebar →</span>'}
        </div>
      </div>

      <div class="contact-section">
        <div class="section-icon"><i class="fa-regular fa-paper-plane"></i></div>
        <h3>Let's Connect</h3>
        <div class="contact-links">
          <a href="mailto:${portfolioData.email}" class="contact-item"><i class="fa-regular fa-envelope"></i> ${escapeHtml(portfolioData.email)}</a>
          <a href="#" class="contact-item"><i class="fa-brands fa-instagram"></i> @${escapeHtml(portfolioData.name.split(' ')[0].toLowerCase())}.studio</a>
          <a href="#" class="contact-item"><i class="fa-brands fa-behance"></i> behance.net/${escapeHtml(portfolioData.name.split(' ')[0].toLowerCase())}</a>
          <a href="#" class="contact-item"><i class="fa-brands fa-dribbble"></i> dribbble.com/${escapeHtml(portfolioData.name.split(' ')[0].toLowerCase())}</a>
        </div>
      </div>

      <div class="projects-section">
        <div class="projects-header">
          <h3><i class="fa-regular fa-sparkles"></i> Featured Work</h3>
          <button id="addProjectModalBtn" class="btn-primary small" style="padding: 10px 24px;">+ New Project</button>
        </div>
        <div class="projects-gallery">
          ${projectsHtml || '<div style="text-align:center; padding:40px;">✨ Click "New Project" to showcase your creative work</div>'}
        </div>
      </div>
    </div>

    <div class="creative-footer">
      <p>✦ Design with intention. Create with passion. ✦</p>
      <small style="opacity:0.5;">© ${new Date().getFullYear()} ${escapeHtml(portfolioData.name)} · All visions realized</small>
    </div>
  `;
  
  container.innerHTML = html;
  
  // Attach project event listeners
  document.querySelectorAll('.edit-project-btn').forEach(btn => {
    btn.addEventListener('click', () => editProjectById(btn.getAttribute('data-id')));
  });
  document.querySelectorAll('.delete-project-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteProjectById(btn.getAttribute('data-id')));
  });
  
  const addBtn = document.getElementById('addProjectModalBtn');
  if (addBtn) addBtn.addEventListener('click', () => showProjectModal());
}

// Project Modal
function showProjectModal(projectToEdit = null) {
  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>${projectToEdit ? '✏️ Edit Project' : '✨ Add New Project'}</h3>
        <input type="text" id="modalProjectTitle" placeholder="Project title" value="${projectToEdit ? escapeHtml(projectToEdit.title) : ''}">
        <textarea id="modalProjectDesc" placeholder="Project description" rows="3">${projectToEdit ? escapeHtml(projectToEdit.description) : ''}</textarea>
        <input type="url" id="modalProjectImage" placeholder="Project image URL" value="${projectToEdit ? escapeHtml(projectToEdit.image) : ''}">
        <input type="text" id="modalProjectTech" placeholder="Technologies (comma separated)" value="${projectToEdit && projectToEdit.technologies ? projectToEdit.technologies.join(', ') : ''}">
        <input type="url" id="modalProjectLink" placeholder="Project link" value="${projectToEdit ? escapeHtml(projectToEdit.link) : ''}">
        <div class="modal-buttons">
          <button class="btn-outline" id="modalCancelBtn">Cancel</button>
          <button class="btn-primary" id="modalSaveBtn">${projectToEdit ? 'Update' : 'Save'}</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  const saveBtn = modal.querySelector('#modalSaveBtn');
  const cancelBtn = modal.querySelector('#modalCancelBtn');
  const overlay = modal.querySelector('.modal-overlay');
  
  const saveHandler = () => {
    const title = document.getElementById('modalProjectTitle').value.trim();
    if (!title) { showToast("Project title required", "error"); return; }
    
    const newProject = {
      id: projectToEdit ? projectToEdit.id : (crypto.randomUUID?.() || Date.now()),
      title: title,
      description: document.getElementById('modalProjectDesc').value.trim() || "No description",
      image: document.getElementById('modalProjectImage').value.trim() || "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop",
      technologies: document.getElementById('modalProjectTech').value.split(',').map(t => t.trim()).filter(t => t),
      link: document.getElementById('modalProjectLink').value.trim() || "#"
    };
    
    if (projectToEdit) {
      const index = portfolioData.projects.findIndex(p => p.id === projectToEdit.id);
      if (index !== -1) portfolioData.projects[index] = newProject;
      showToast("Project updated!", "success");
    } else {
      portfolioData.projects.push(newProject);
      showToast("New project added!", "success");
    }
    persistData();
    renderPortfolio();
    modal.remove();
  };
  
  saveBtn.addEventListener('click', saveHandler);
  cancelBtn.addEventListener('click', () => modal.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) modal.remove(); });
}

function editProjectById(id) {
  const project = portfolioData.projects.find(p => p.id === id);
  if (project) showProjectModal(project);
}

function deleteProjectById(id) {
  if (confirm("Delete this project?")) {
    portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
    persistData();
    renderPortfolio();
    showToast("Project deleted", "success");
  }
}

// Render skills tags
function renderSkillsTags() {
  const container = document.getElementById("skillsTagContainer");
  if (!container) return;
  if (!portfolioData.skills.length) {
    container.innerHTML = '<div class="tag-item" style="opacity:0.6;">✨ Add your creative skills above</div>';
    return;
  }
  container.innerHTML = portfolioData.skills.map((skill, idx) => `
    <div class="tag-item">
      ${escapeHtml(skill)}
      <i class="fa-regular fa-circle-xmark" data-skill-index="${idx}"></i>
    </div>
  `).join('');
  
  document.querySelectorAll('#skillsTagContainer .fa-circle-xmark').forEach(icon => {
    icon.addEventListener('click', (e) => {
      const idx = parseInt(icon.getAttribute('data-skill-index'));
      portfolioData.skills.splice(idx, 1);
      renderSkillsTags();
      renderPortfolio();
      persistData();
    });
  });
}

// Bind inputs
function bindInputs() {
  const fields = ['name', 'title', 'bio', 'image', 'coverImage', 'email', 'location', 'colorTheme'];
  fields.forEach(field => {
    const el = document.getElementById(`input${field.charAt(0).toUpperCase() + field.slice(1)}`);
    if (el) {
      el.value = portfolioData[field] || '';
      el.addEventListener('input', (e) => {
        portfolioData[field] = e.target.value;
        if (field === 'colorTheme') applyGradientTheme();
        renderPortfolio();
        persistData();
      });
    }
  });
}

// Skill addition
function setupSkillAddition() {
  const addBtn = document.getElementById("addSkillBtn");
  const input = document.getElementById("newSkillInput");
  if (!addBtn) return;
  
  const add = () => {
    const val = input.value.trim();
    if (val && !portfolioData.skills.includes(val)) {
      portfolioData.skills.push(val);
      renderSkillsTags();
      renderPortfolio();
      persistData();
      input.value = "";
      showToast(`➕ ${val} added`, "success");
    }
  };
  
  addBtn.addEventListener("click", add);
  input.addEventListener("keypress", (e) => { if (e.key === "Enter") add(); });
}

// Reset
function setupReset() {
  const btn = document.getElementById("resetAllBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      if (confirm("Reset everything to default?")) {
        localStorage.removeItem("designer_portfolio");
        location.reload();
      }
    });
  }
}

// Export
function setupExport() {
  const btn = document.getElementById("exportDataBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const dataStr = JSON.stringify(portfolioData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `designer_portfolio_${portfolioData.name.replace(/\s/g, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Portfolio exported!", "success");
    });
  }
}

// Add project button in sidebar
function setupSidebarProjectButton() {
  const btn = document.getElementById("addProjectBtn");
  if (btn) btn.addEventListener("click", () => showProjectModal());
}

// Char counter
function setupCharCounter() {
  const bio = document.getElementById("inputBio");
  const counter = document.querySelector(".char-counter");
  if (bio && counter) {
    const update = () => { counter.textContent = `${bio.value.length}/300`; };
    bio.addEventListener("input", update);
    update();
  }
}

// Initialize
function init() {
  loadStoredData();
  bindInputs();
  renderSkillsTags();
  renderPortfolio();
  setupSkillAddition();
  setupReset();
  setupExport();
  setupSidebarProjectButton();
  setupCharCounter();
}

document.addEventListener("DOMContentLoaded", init);