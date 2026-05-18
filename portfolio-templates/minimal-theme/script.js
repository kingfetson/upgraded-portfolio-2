// script.js – Minimal Corporate Theme | ATS-Friendly, Clean, Professional

// ---------- DATA MODEL ----------
let portfolioData = {
  name: "Sarah Johnson",
  title: "Senior Product Manager",
  bio: "Results-driven product leader with 8+ years of experience in SaaS product strategy, cross-functional team leadership, and data-driven decision making. Proven track record of delivering scalable solutions that drive business growth and user satisfaction.",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "https://linkedin.com/in/sarahjohnson",
  github: "https://github.com/sarahjohnson",
  skills: ["Product Strategy", "Data Analytics", "Agile Methodologies", "User Research", "Go-to-Market Strategy", "A/B Testing"],
  certifications: ["PMP Certification", "Certified Scrum Product Owner (CSPO)", "Google Analytics Certified"],
  experience: [
    {
      id: "exp1",
      title: "Senior Product Manager",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      date: "2021 – Present",
      description: "Lead product strategy for B2B SaaS platform serving 500+ enterprise clients. Increased user engagement by 45% through data-driven feature development. Managed roadmap for 3 cross-functional teams."
    },
    {
      id: "exp2",
      title: "Product Manager",
      company: "Innovate Labs",
      location: "Austin, TX",
      date: "2018 – 2021",
      description: "Launched 2 successful products generating $2M+ ARR. Implemented OKR framework that improved team velocity by 30%. Conducted 100+ user interviews to validate product-market fit."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "MBA, Product Management",
      institution: "Stanford University Graduate School of Business",
      date: "2016 – 2018",
      description: "Focus on Product Strategy and Innovation Management"
    },
    {
      id: "edu2",
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      date: "2012 – 2016",
      description: "Minor in Business Administration"
    }
  ]
};

// Helper Functions
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
  localStorage.setItem("corporate_portfolio", JSON.stringify(portfolioData));
}

function loadStoredData() {
  const saved = localStorage.getItem("corporate_portfolio");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      portfolioData = { ...portfolioData, ...parsed };
      if (!portfolioData.skills) portfolioData.skills = [];
      if (!portfolioData.certifications) portfolioData.certifications = [];
      if (!portfolioData.experience) portfolioData.experience = [];
      if (!portfolioData.education) portfolioData.education = [];
      
      // Ensure IDs for array items
      portfolioData.experience = portfolioData.experience.map(exp => ({ ...exp, id: exp.id || crypto.randomUUID?.() || Date.now() + Math.random() }));
      portfolioData.education = portfolioData.education.map(edu => ({ ...edu, id: edu.id || crypto.randomUUID?.() || Date.now() + Math.random() }));
    } catch(e) { console.warn(e); }
  }
}

// Render Main Portfolio
function renderPortfolio() {
  const container = document.getElementById("portfolioRoot");
  if (!container) return;
  
  const skillsHtml = portfolioData.skills.map(skill => 
    `<span class="skill-item">${escapeHtml(skill)}</span>`
  ).join('');
  
  const certsHtml = portfolioData.certifications.map(cert => 
    `<li>${escapeHtml(cert)}</li>`
  ).join('');
  
  const experienceHtml = portfolioData.experience.map(exp => `
    <div class="experience-item" data-exp-id="${exp.id}">
      <div class="experience-header">
        <span class="experience-title">${escapeHtml(exp.title)}</span>
        <span class="experience-date">${escapeHtml(exp.date)}</span>
      </div>
      <div class="experience-company">${escapeHtml(exp.company)}${exp.location ? ` · ${escapeHtml(exp.location)}` : ''}</div>
      <div class="experience-description">${escapeHtml(exp.description)}</div>
      <div style="margin-top: 8px;">
        <button class="edit-exp-btn" data-id="${exp.id}" style="background: none; border: none; color: #2c3e50; cursor: pointer; font-size: 0.7rem; margin-right: 12px;">
          <i class="fa-regular fa-pen"></i> Edit
        </button>
        <button class="delete-exp-btn" data-id="${exp.id}" style="background: none; border: none; color: #dc2626; cursor: pointer; font-size: 0.7rem;">
          <i class="fa-regular fa-trash-can"></i> Delete
        </button>
      </div>
    </div>
  `).join('');
  
  const educationHtml = portfolioData.education.map(edu => `
    <div class="education-item" data-edu-id="${edu.id}">
      <div class="education-header">
        <span class="education-degree">${escapeHtml(edu.degree)}</span>
        <span class="education-date">${escapeHtml(edu.date)}</span>
      </div>
      <div class="education-institution">${escapeHtml(edu.institution)}</div>
      <div class="experience-description">${escapeHtml(edu.description)}</div>
      <div style="margin-top: 8px;">
        <button class="edit-edu-btn" data-id="${edu.id}" style="background: none; border: none; color: #2c3e50; cursor: pointer; font-size: 0.7rem; margin-right: 12px;">
          <i class="fa-regular fa-pen"></i> Edit
        </button>
        <button class="delete-edu-btn" data-id="${edu.id}" style="background: none; border: none; color: #dc2626; cursor: pointer; font-size: 0.7rem;">
          <i class="fa-regular fa-trash-can"></i> Delete
        </button>
      </div>
    </div>
  `).join('');
  
  const html = `
    <div class="resume-header">
      <div class="name-title">
        <h1 class="resume-name">${escapeHtml(portfolioData.name)}</h1>
        <div class="resume-title">${escapeHtml(portfolioData.title)}</div>
        <div class="resume-summary">${escapeHtml(portfolioData.bio).replace(/\n/g, '<br>')}</div>
      </div>
      <div class="contact-bar">
        <div class="contact-item"><i class="fa-regular fa-envelope"></i> ${escapeHtml(portfolioData.email)}</div>
        <div class="contact-item"><i class="fa-regular fa-phone"></i> ${escapeHtml(portfolioData.phone)}</div>
        <div class="contact-item"><i class="fa-regular fa-location-dot"></i> ${escapeHtml(portfolioData.location)}</div>
        <a href="${escapeHtml(portfolioData.linkedin)}" class="contact-item" target="_blank"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
        <a href="${escapeHtml(portfolioData.github)}" class="contact-item" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>
      </div>
    </div>

    <div class="resume-grid">
      <div class="resume-left">
        <div class="resume-section">
          <h3>Core Competencies</h3>
          <div class="skills-list">
            ${skillsHtml || '<span class="empty-state">Add skills using sidebar →</span>'}
          </div>
        </div>
        
        <div class="resume-section">
          <h3>Certifications</h3>
          <ul class="cert-list">
            ${certsHtml || '<li class="empty-state">No certifications added</li>'}
          </ul>
        </div>
      </div>

      <div class="resume-right">
        <div class="resume-section">
          <h3>Professional Experience</h3>
          ${experienceHtml || '<div class="empty-state">Add work experience using sidebar →</div>'}
        </div>
        
        <div class="resume-section">
          <h3>Education</h3>
          ${educationHtml || '<div class="empty-state">Add education using sidebar →</div>'}
        </div>
      </div>
    </div>

    <div class="resume-footer">
      <p>Professional portfolio · Available for opportunities</p>
    </div>
  `;
  
  container.innerHTML = html;
  
  // Attach event listeners for edit/delete
  document.querySelectorAll('.edit-exp-btn').forEach(btn => {
    btn.addEventListener('click', () => editExperience(btn.getAttribute('data-id')));
  });
  document.querySelectorAll('.delete-exp-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteExperience(btn.getAttribute('data-id')));
  });
  document.querySelectorAll('.edit-edu-btn').forEach(btn => {
    btn.addEventListener('click', () => editEducation(btn.getAttribute('data-id')));
  });
  document.querySelectorAll('.delete-edu-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteEducation(btn.getAttribute('data-id')));
  });
}

// Experience Modal
function showExperienceModal(expToEdit = null) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>${expToEdit ? '✏️ Edit Experience' : '➕ Add Work Experience'}</h3>
      <input type="text" id="modalExpTitle" placeholder="Job title *" value="${expToEdit ? escapeHtml(expToEdit.title) : ''}">
      <input type="text" id="modalExpCompany" placeholder="Company name *" value="${expToEdit ? escapeHtml(expToEdit.company) : ''}">
      <input type="text" id="modalExpLocation" placeholder="Location (optional)" value="${expToEdit ? escapeHtml(expToEdit.location || '') : ''}">
      <input type="text" id="modalExpDate" placeholder="Date range (e.g., 2021 – Present)" value="${expToEdit ? escapeHtml(expToEdit.date) : ''}">
      <textarea id="modalExpDesc" placeholder="Job description / responsibilities" rows="4">${expToEdit ? escapeHtml(expToEdit.description) : ''}</textarea>
      <div class="modal-buttons">
        <button class="btn-outline" id="modalCancelBtn">Cancel</button>
        <button class="btn-primary" id="modalSaveBtn">${expToEdit ? 'Update' : 'Save'}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  const saveHandler = () => {
    const title = document.getElementById('modalExpTitle').value.trim();
    const company = document.getElementById('modalExpCompany').value.trim();
    if (!title || !company) {
      showToast("Title and company are required", "error");
      return;
    }
    
    const newExp = {
      id: expToEdit ? expToEdit.id : (crypto.randomUUID?.() || Date.now()),
      title: title,
      company: company,
      location: document.getElementById('modalExpLocation').value.trim(),
      date: document.getElementById('modalExpDate').value.trim() || "Present",
      description: document.getElementById('modalExpDesc').value.trim() || "No description provided"
    };
    
    if (expToEdit) {
      const index = portfolioData.experience.findIndex(e => e.id === expToEdit.id);
      if (index !== -1) portfolioData.experience[index] = newExp;
      showToast("Experience updated", "success");
    } else {
      portfolioData.experience.push(newExp);
      showToast("Experience added", "success");
    }
    persistData();
    renderPortfolio();
    modal.remove();
  };
  
  modal.querySelector('#modalSaveBtn').addEventListener('click', saveHandler);
  modal.querySelector('#modalCancelBtn').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

function editExperience(id) {
  const exp = portfolioData.experience.find(e => e.id === id);
  if (exp) showExperienceModal(exp);
}

function deleteExperience(id) {
  if (confirm("Delete this work experience?")) {
    portfolioData.experience = portfolioData.experience.filter(e => e.id !== id);
    persistData();
    renderPortfolio();
    showToast("Experience deleted", "success");
  }
}

// Education Modal
function showEducationModal(eduToEdit = null) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>${eduToEdit ? '✏️ Edit Education' : '➕ Add Education'}</h3>
      <input type="text" id="modalEduDegree" placeholder="Degree / Program *" value="${eduToEdit ? escapeHtml(eduToEdit.degree) : ''}">
      <input type="text" id="modalEduInstitution" placeholder="Institution name *" value="${eduToEdit ? escapeHtml(eduToEdit.institution) : ''}">
      <input type="text" id="modalEduDate" placeholder="Date range (e.g., 2016 – 2018)" value="${eduToEdit ? escapeHtml(eduToEdit.date) : ''}">
      <textarea id="modalEduDesc" placeholder="Additional details (optional)" rows="3">${eduToEdit ? escapeHtml(eduToEdit.description || '') : ''}</textarea>
      <div class="modal-buttons">
        <button class="btn-outline" id="modalCancelBtn">Cancel</button>
        <button class="btn-primary" id="modalSaveBtn">${eduToEdit ? 'Update' : 'Save'}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  const saveHandler = () => {
    const degree = document.getElementById('modalEduDegree').value.trim();
    const institution = document.getElementById('modalEduInstitution').value.trim();
    if (!degree || !institution) {
      showToast("Degree and institution are required", "error");
      return;
    }
    
    const newEdu = {
      id: eduToEdit ? eduToEdit.id : (crypto.randomUUID?.() || Date.now()),
      degree: degree,
      institution: institution,
      date: document.getElementById('modalEduDate').value.trim() || "Graduated",
      description: document.getElementById('modalEduDesc').value.trim() || ""
    };
    
    if (eduToEdit) {
      const index = portfolioData.education.findIndex(e => e.id === eduToEdit.id);
      if (index !== -1) portfolioData.education[index] = newEdu;
      showToast("Education updated", "success");
    } else {
      portfolioData.education.push(newEdu);
      showToast("Education added", "success");
    }
    persistData();
    renderPortfolio();
    modal.remove();
  };
  
  modal.querySelector('#modalSaveBtn').addEventListener('click', saveHandler);
  modal.querySelector('#modalCancelBtn').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

function editEducation(id) {
  const edu = portfolioData.education.find(e => e.id === id);
  if (edu) showEducationModal(edu);
}

function deleteEducation(id) {
  if (confirm("Delete this education entry?")) {
    portfolioData.education = portfolioData.education.filter(e => e.id !== id);
    persistData();
    renderPortfolio();
    showToast("Education deleted", "success");
  }
}

// Render skills and certifications in sidebar
function renderSkillsTags() {
  const container = document.getElementById("skillsTagContainer");
  if (!container) return;
  if (!portfolioData.skills.length) {
    container.innerHTML = '<div class="tag-item" style="opacity:0.6;">➕ Add core competencies above</div>';
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

function renderCertsTags() {
  const container = document.getElementById("certsTagContainer");
  if (!container) return;
  if (!portfolioData.certifications.length) {
    container.innerHTML = '<div class="tag-item" style="opacity:0.6;">➕ Add certifications above</div>';
    return;
  }
  container.innerHTML = portfolioData.certifications.map((cert, idx) => `
    <div class="tag-item">
      ${escapeHtml(cert)}
      <i class="fa-regular fa-circle-xmark" data-cert-index="${idx}"></i>
    </div>
  `).join('');
  
  document.querySelectorAll('#certsTagContainer .fa-circle-xmark').forEach(icon => {
    icon.addEventListener('click', (e) => {
      const idx = parseInt(icon.getAttribute('data-cert-index'));
      portfolioData.certifications.splice(idx, 1);
      renderCertsTags();
      renderPortfolio();
      persistData();
    });
  });
}

// Bind input fields
function bindInputs() {
  const fields = ['name', 'title', 'bio', 'email', 'phone', 'location', 'linkedin', 'github'];
  fields.forEach(field => {
    const el = document.getElementById(`input${field.charAt(0).toUpperCase() + field.slice(1)}`);
    if (el) {
      el.value = portfolioData[field] || '';
      el.addEventListener('input', (e) => {
        portfolioData[field] = e.target.value;
        renderPortfolio();
        persistData();
      });
    }
  });
  
  // Character counter for bio
  const bioInput = document.getElementById("inputBio");
  const counter = document.querySelector(".char-counter");
  if (bioInput && counter) {
    const update = () => { counter.textContent = `${bioInput.value.length}/400 characters`; };
    bioInput.addEventListener('input', update);
    update();
  }
}

// Add skill
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
      showToast(`Added: ${val}`, "success");
    } else if (val) {
      showToast("Skill already exists", "error");
    }
  };
  
  addBtn.addEventListener("click", add);
  input.addEventListener("keypress", (e) => { if (e.key === "Enter") add(); });
}

// Add certification
function setupCertAddition() {
  const addBtn = document.getElementById("addCertBtn");
  const input = document.getElementById("newCertInput");
  if (!addBtn) return;
  
  const add = () => {
    const val = input.value.trim();
    if (val && !portfolioData.certifications.includes(val)) {
      portfolioData.certifications.push(val);
      renderCertsTags();
      renderPortfolio();
      persistData();
      input.value = "";
      showToast(`Added: ${val}`, "success");
    } else if (val) {
      showToast("Certification already exists", "error");
    }
  };
  
  addBtn.addEventListener("click", add);
  input.addEventListener("keypress", (e) => { if (e.key === "Enter") add(); });
}

// Button handlers
function setupButtons() {
  const addExpBtn = document.getElementById("addExperienceBtn");
  const addEduBtn = document.getElementById("addEducationBtn");
  const resetBtn = document.getElementById("resetAllBtn");
  const exportBtn = document.getElementById("exportDataBtn");
  const printBtn = document.getElementById("printResumeBtn");
  
  if (addExpBtn) addExpBtn.addEventListener("click", () => showExperienceModal());
  if (addEduBtn) addEduBtn.addEventListener("click", () => showEducationModal());
  
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all data to default? This cannot be undone.")) {
        localStorage.removeItem("corporate_portfolio");
        location.reload();
      }
    });
  }
  
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const dataStr = JSON.stringify(portfolioData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resume_${portfolioData.name.replace(/\s/g, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Resume data exported!", "success");
    });
  }
  
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

// Initialize
function init() {
  loadStoredData();
  bindInputs();
  renderSkillsTags();
  renderCertsTags();
  renderPortfolio();
  setupSkillAddition();
  setupCertAddition();
  setupButtons();
}

document.addEventListener("DOMContentLoaded", init);