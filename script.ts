type Section = 'personal' | 'education' | 'experience' | 'skills' | 'preview';

const sections: Section[] = ['personal', 'education', 'experience', 'skills', 'preview'];
let currentSection: number = 0;

function nextSection(sectionId: Section): void {
    document.getElementById(sections[currentSection])?.classList.remove('active');
    document.getElementById(sectionId)?.classList.add('active');
    currentSection = sections.indexOf(sectionId);
    updateProgressBar();
}

function prevSection(sectionId: Section): void {
    document.getElementById(sections[currentSection])?.classList.remove('active');
    document.getElementById(sectionId)?.classList.add('active');
    currentSection = sections.indexOf(sectionId);
    updateProgressBar();
}

function updateProgressBar(): void {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        if (index <= currentSection) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function generateResume(): void {
    const formElement = document.getElementById('resumeForm') as HTMLFormElement;
    const formData = new FormData(formElement);
    const profilePictureElement = document.getElementById('profilePicture') as HTMLImageElement;
    const profilePicture = profilePictureElement.src;
    
    let resumeHTML = `
        <img src="${profilePicture}" alt="Profile picture" class="profile-picture">
        <h1>${formData.get('name')}</h1>
        <p>Email: ${formData.get('email')} | Phone: ${formData.get('phone')}</p>
        <h2>Education</h2>
        <p>${formData.get('degree')} - ${formData.get('school')} (${formData.get('gradYear')})</p>
        <h2>Work Experience</h2>
        <p><strong>${formData.get('position')} at ${formData.get('company')}</strong></p>
        <p>${formData.get('startDate')} - ${formData.get('endDate') || 'Present'}</p>
        <p>${formData.get('responsibilities')}</p>
        <h2>Skills</h2>
        <p>${formData.get('skills')}</p>
    `;
    
    const resumePreviewElement = document.getElementById('resumePreview');
    if (resumePreviewElement) {
        resumePreviewElement.innerHTML = resumeHTML;
    }
    nextSection('preview');
}

function printResume(): void {
    const resumePreviewElement = document.getElementById('resumePreview');
    if (resumePreviewElement) {
        const printContent = resumePreviewElement.innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    }
}

function toggleTheme(): void {
    document.body.classList.toggle('dark');
}

function handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function(e: ProgressEvent<FileReader>) {
            const profilePictureElement = document.getElementById('profilePicture') as HTMLImageElement;
            if (e.target && typeof e.target.result === 'string') {
                profilePictureElement.src = e.target.result;
            }
        }
        reader.readAsDataURL(file);
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e: Event) {
    e.preventDefault();
    
    // Get the href value (the target anchor's id)
    const href = (HTMLAnchorElement).getAttribute('href');
    
    // Ensure href is not null and is a valid string
    if (href && href !== '#') {
      // Find the target element by the href (which should match an element id)
      const targetElement = document.querySelector(href);
      
      // If the target element exists, scroll it into view smoothly
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',  // Align the element at the top of the viewport
        });
      }
    }
  });
});

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }
});