/**
 * SnapStory Photography - Main JavaScript
 * Author: Muhammad Nabil Fatahilah
 * Date: April 2025
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler with validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !service || !message) {
                showAlert('Please fill in all fields.', 'danger');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'danger');
                return;
            }
            
            // If validation passes, show success message (in real implementation, this would send data)
            showAlert('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Gallery image click handlers for larger view (could be expanded with a lightbox)
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(function(image) {
        image.addEventListener('click', function() {
            // In a real implementation, this would open a lightbox or modal
            console.log('Image clicked:', this.alt);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize animation on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Bootstrap tooltip initialization (if needed)
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

/**
 * Show alert message
 * @param {string} message - The message to display
 * @param {string} type - The type of alert (success, danger, warning, info)
 */
function showAlert(message, type = 'info') {
    // Create alert container if it doesn't exist
    let alertContainer = document.querySelector('.alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.className = 'alert-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(alertContainer);
    }
    
    // Create the alert element
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type} alert-dismissible fade show`;
    alertElement.role = 'alert';
    alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to container
    alertContainer.appendChild(alertElement);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (alertElement && alertElement.parentNode) {
            const bsAlert = new bootstrap.Alert(alertElement);
            bsAlert.close();
        }
    }, 5000);
}

/**
 * Animate elements when scrolled into view
 */
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .gallery-img, h2, .accordion-item');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            if (!element.classList.contains('slide-in')) {
                element.classList.add('slide-in');
            }
        }
    });
}