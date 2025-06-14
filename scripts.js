// Single Page App Navigation and Animations
class ArtistPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.sections = document.querySelectorAll('.content-section');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navTabs = document.querySelector('.nav-tabs');
        this.heroButtons = document.querySelectorAll('[data-nav]');
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupHeroButtons();
        this.loadContentFromConfig();
        this.updateCommissionStatus();
        this.setupFormHandling();
        
        // Show initial section with animation
        this.showSection('home', false);
    }

    setupNavigation() {
        this.navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = button.getAttribute('data-section');
                this.navigateToSection(targetSection);
            });
        });
    }

    setupMobileMenu() {
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking on a nav item
        this.navButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    setupHeroButtons() {
        this.heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = button.getAttribute('data-nav');
                this.navigateToSection(targetSection);
            });
        });
    }

    navigateToSection(targetSection) {
        if (targetSection === this.currentSection) return;

        const direction = this.getSlideDirection(this.currentSection, targetSection);
        this.showSection(targetSection, true, direction);
        this.updateActiveNavButton(targetSection);
        this.currentSection = targetSection;
        
        // Update URL hash without triggering scroll
        history.replaceState(null, null, `#${targetSection}`);
    }

    getSlideDirection(fromSection, toSection) {
        const sections = ['home', 'commissions', 'tos', 'contact'];
        const fromIndex = sections.indexOf(fromSection);
        const toIndex = sections.indexOf(toSection);
        
        return toIndex > fromIndex ? 'right' : 'left';
    }

    showSection(sectionName, animate = true, direction = 'right') {
        const targetSection = document.getElementById(sectionName);
        
        if (!targetSection) return;

        // Hide all sections
        this.sections.forEach(section => {
            section.classList.remove('active', 'slide-in-right', 'slide-in-left');
            section.style.display = 'none';
        });

        // Show target section with animation
        targetSection.style.display = 'block';
        
        if (animate) {
            // Force reflow
            targetSection.offsetHeight;
            
            // Add animation class
            const animationClass = direction === 'right' ? 'slide-in-right' : 'slide-in-left';
            targetSection.classList.add(animationClass);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                targetSection.classList.remove(animationClass);
            }, 500);
        }
        
        targetSection.classList.add('active');
        
        // Scroll to top of section
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateActiveNavButton(activeSection) {
        this.navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-section') === activeSection) {
                button.classList.add('active');
            }
        });
    }

    toggleMobileMenu() {
        this.navTabs.classList.toggle('mobile-open');
        this.mobileMenuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMobileMenu() {
        this.navTabs.classList.remove('mobile-open');
        this.mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    updateCommissionStatus() {
        // Use the SiteContent config for commission status
        if (typeof SiteContent === 'undefined') {
            console.warn('SiteContent not loaded, using default status');
            return;
        }
        
        const statusBadge = document.getElementById('commission-status');
        const statusTexts = document.querySelectorAll('.status-text');
        const commissionData = SiteContent.commissionStatus;
        
        const statusText = this.getStatusText(commissionData);
        const statusColor = this.getStatusColor(commissionData.status);
        const statusClass = this.getStatusClass(commissionData.status);
        
        if (statusBadge) {
            statusBadge.textContent = statusText;
            statusBadge.style.background = statusColor;
            statusBadge.className = `status-badge ${statusClass}`;
            
            // Add stripe pattern for HIATUS
            if (commissionData.status === 'HIATUS') {
                statusBadge.style.background = 'repeating-linear-gradient(45deg, var(--color-error), var(--color-error) 10px, #8b0000 10px, #8b0000 20px)';
            }
        }
        
        statusTexts.forEach(text => {
            text.textContent = statusText;
            text.style.color = statusColor;
        });
    }
    
    getStatusText(commissionData) {
        const { status, slots } = commissionData;
        const slotsText = `${slots.current}/${slots.total}`;
        
        switch (status) {
            case 'OPEN':
                return `OPEN (${slotsText})`;
            case 'CLOSED':
                return `CLOSED (${slotsText})`;
            case 'HIATUS':
                return 'HIATUS';
            default:
                return 'UNKNOWN';
        }
    }
    
    getStatusColor(status) {
        switch (status) {
            case 'OPEN':
                return 'var(--color-success)';
            case 'CLOSED':
            case 'HIATUS':
                return 'var(--color-error)';
            default:
                return 'var(--color-text-muted)';
        }
    }
    
    getStatusClass(status) {
        return `status-${status.toLowerCase()}`;
    }

    loadContentFromConfig() {
        if (typeof SiteContent === 'undefined') {
            console.warn('SiteContent not loaded, using static content');
            return;
        }

        // Update all dynamic content
        this.updateHeroContent();
        this.updateArtistName();
        this.updateContactInfo();
        this.updateCommissionCards();
        this.updateTOSContent();
        this.updateContactForm();
        this.updateFooter();
    }

    updateHeroContent() {
        const hero = SiteContent.hero;
        
        // Update hero title
        const heroTitle = document.querySelector('.hero-text h2');
        if (heroTitle && hero.title) {
            heroTitle.textContent = hero.title;
        }
        
        // Update hero subtitle
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle && hero.subtitle) {
            heroSubtitle.textContent = hero.subtitle;
        }
        
        // Update hero description
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription && hero.description) {
            // Keep the status span intact
            const statusSpan = heroDescription.querySelector('.status-text');
            const statusText = statusSpan ? statusSpan.outerHTML : '<span class="status-text">OPEN</span>';
            heroDescription.innerHTML = hero.description + ` Commissions are currently ${statusText}!`;
        }
        
        // Update button text
        const primaryBtn = document.querySelector('[data-nav="commissions"]');
        if (primaryBtn && hero.primaryButton) {
            primaryBtn.textContent = hero.primaryButton;
        }
        
        const secondaryBtn = document.querySelector('[data-nav="contact"]');
        if (secondaryBtn && hero.secondaryButton) {
            secondaryBtn.textContent = hero.secondaryButton;
        }
    }

    updateArtistName() {
        const artistName = SiteContent.artistName;
        if (!artistName) return;
        
        // Update logo in header
        const logoTitle = document.querySelector('.logo h1');
        if (logoTitle) {
            logoTitle.textContent = artistName;
        }
        
        // Update page title
        document.title = `${artistName} | Artist Site`;
    }

    updateContactInfo() {
        const contact = SiteContent.contact;
        if (!contact) return;
        
        // Update email links
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            if (contact.email) {
                link.href = `mailto:${contact.email}`;
                const emailText = link.querySelector('span:last-child');
                if (emailText) {
                    emailText.textContent = `Email: ${contact.email}`;
                }
            }
        });
        
        // Update Instagram links
        const instagramLinks = document.querySelectorAll('a[href*="instagram"]');
        instagramLinks.forEach(link => {
            if (contact.instagram) {
                link.href = `https://instagram.com/${contact.instagram}`;
                const instaText = link.querySelector('span:last-child');
                if (instaText) {
                    instaText.textContent = `Instagram: @${contact.instagram}`;
                }
            }
        });
        
        // Update Discord text
        const discordLinks = document.querySelectorAll('.contact-link');
        discordLinks.forEach(link => {
            const span = link.querySelector('span:last-child');
            if (span && span.textContent.includes('Discord') && contact.discord) {
                span.textContent = `Discord: ${contact.discord}`;
            }
        });
    }

    updateCommissionCards() {
        const commissions = SiteContent.commissions;
        if (!commissions) return;

        // Update Sketch card
        this.updateCommissionCard('sketch', commissions.sketch);
        
        // Update Lineart card
        this.updateCommissionCard('lineart', commissions.lineart, 'Rendered Lineart');
        
        // Update Painting card
        this.updateCommissionCard('painting', commissions.painting, 'Full Painting');
        
        // Update Emotes card (if it exists in DOM)
        if (commissions.emotes) {
            this.updateCommissionCard('emotes', commissions.emotes);
        }
        
        // Update Reference Sheet card (horizontal)
        this.updateReferenceSheetCard(commissions.referenceSheet);
        
        // Update Modifiers & Add-ons
        this.updateModifiers();
        
        // Update Special Offers
        this.updateSpecialOffers();
        
        // Update Commission Process
        this.updateCommissionProcess();
        
        // Update commission form dropdown
        this.updateCommissionFormOptions();
    }

    updateCommissionCard(type, data, displayName = null) {
        if (!data) return;
        
        const cards = document.querySelectorAll('.commission-card');
        cards.forEach(card => {
            const title = card.querySelector('h3');
            if (title && (title.textContent === (displayName || data.name) || 
                         title.textContent.toLowerCase() === type.toLowerCase())) {
                
                // Update title
                title.textContent = data.name;
                
                // Update price range
                const priceRange = card.querySelector('.price-range');
                if (priceRange) {
                    priceRange.textContent = data.priceRange;
                }
                
                // Update price list
                const priceList = card.querySelector('.price-list');
                if (priceList && data.prices) {
                    priceList.innerHTML = data.prices.map(price => `<li>${price}</li>`).join('');
                }
                
                // Update turnaround
                const turnaround = card.querySelector('.turnaround');
                if (turnaround && data.turnaround) {
                    turnaround.textContent = `Turnaround: ${data.turnaround}`;
                }
            }
        });
    }

    updateReferenceSheetCard(data) {
        if (!data) return;
        
        const refCard = document.querySelector('.commission-card.horizontal');
        if (!refCard) return;
        
        // Update title and price range
        const title = refCard.querySelector('h3');
        if (title) title.textContent = data.name;
        
        const priceRange = refCard.querySelector('.price-range');
        if (priceRange) priceRange.textContent = data.priceRange;
        
        // Update base options
        const baseColumn = refCard.querySelector('.price-column:first-child .price-list');
        if (baseColumn && data.baseOptions) {
            baseColumn.innerHTML = data.baseOptions.map(option => `<li>${option}</li>`).join('');
        }
        
        // Update add-ons
        const addOnColumn = refCard.querySelector('.price-column:last-child .price-list');
        if (addOnColumn && data.addOns) {
            addOnColumn.innerHTML = data.addOns.map(addon => `<li>${addon}</li>`).join('');
        }
        
        // Update note
        const note = refCard.querySelector('.note');
        if (note && data.note) {
            note.textContent = data.note;
        }
        
        // Update turnaround
        const turnaround = refCard.querySelector('.turnaround');
        if (turnaround && data.turnaround) {
            turnaround.textContent = `Turnaround: ${data.turnaround}`;
        }
    }

    updateModifiers() {
        const modifiers = SiteContent.modifiers;
        if (!modifiers) return;
        
        const modifiersCard = document.querySelector('.info-card');
        if (modifiersCard) {
            const title = modifiersCard.querySelector('h4');
            if (title && title.textContent.includes('Modifiers')) {
                const list = modifiersCard.querySelector('ul');
                if (list) {
                    list.innerHTML = modifiers.map(modifier => `<li>${modifier}</li>`).join('');
                }
            }
        }
    }

    updateSpecialOffers() {
        const specialOffers = SiteContent.specialOffers;
        if (!specialOffers) return;
        
        const infoCards = document.querySelectorAll('.info-card');
        infoCards.forEach(card => {
            const title = card.querySelector('h4');
            if (title && title.textContent.includes('Special Offers')) {
                const list = card.querySelector('ul');
                if (list) {
                    list.innerHTML = specialOffers.map(offer => `<li>${offer}</li>`).join('');
                }
            }
        });
    }

    updateCommissionProcess() {
        const process = SiteContent.process;
        if (!process) return;
        
        const infoCards = document.querySelectorAll('.info-card');
        infoCards.forEach(card => {
            const title = card.querySelector('h4');
            if (title && title.textContent.includes('Commission Process')) {
                const list = card.querySelector('ol');
                if (list) {
                    list.innerHTML = process.map(step => `<li>${step}</li>`).join('');
                }
            }
        });
    }

    updateTOSContent() {
        const tos = SiteContent.tos;
        if (!tos) return;
        
        const tosContainer = document.querySelector('.tos-content');
        if (!tosContainer) return;
        
        // Clear existing content
        tosContainer.innerHTML = '';
        
        // Create sections from config
        Object.entries(tos).forEach(([key, section]) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'tos-section';
            
            const title = document.createElement('h3');
            title.textContent = section.title;
            sectionDiv.appendChild(title);
            
            const list = document.createElement('ul');
            section.items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                list.appendChild(listItem);
            });
            sectionDiv.appendChild(list);
            
            tosContainer.appendChild(sectionDiv);
        });
    }

    updateContactForm() {
        const contactForm = SiteContent.contactForm;
        if (!contactForm) return;
        
        // Update contact section title
        const contactTitle = document.querySelector('#contact .section-title');
        if (contactTitle && contactForm.title) {
            contactTitle.textContent = contactForm.title;
        }
        
        // Update contact info section
        const contactInfoTitle = document.querySelector('.contact-info h3');
        if (contactInfoTitle && contactForm.subtitle) {
            contactInfoTitle.textContent = contactForm.subtitle;
        }
        
        const contactInfoDesc = document.querySelector('.contact-info p');
        if (contactInfoDesc && contactForm.description) {
            contactInfoDesc.textContent = contactForm.description;
        }
        
        // Update form note
        const formNote = document.querySelector('.form-note');
        if (formNote && contactForm.formNote) {
            formNote.textContent = contactForm.formNote;
        }
    }

    updateFooter() {
        const footer = SiteContent.footer;
        if (!footer) return;
        
        // Update copyright text
        const copyright = document.querySelector('.footer-content p');
        if (copyright && footer.copyright) {
            copyright.textContent = footer.copyright;
        }
    }

    setupFormHandling() {
        const form = document.querySelector('.commission-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        }
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        form.classList.add('loading');
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Commission request sent successfully! I\'ll get back to you within 24-48 hours.', 'success');
            form.reset();
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.classList.remove('loading');
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    max-width: 400px;
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-lg);
                    z-index: 2000;
                    transform: translateX(100%);
                    transition: transform 0.3s ease-out;
                }
                .notification-success {
                    background: var(--color-success);
                    color: white;
                }
                .notification-error {
                    background: var(--color-error);
                    color: white;
                }
                .notification-info {
                    background: var(--color-blue-primary);
                    color: white;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => this.hideNotification(notification), 5000);
        
        // Close button handler
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });
    }

    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    updateCommissionFormOptions() {
        const commissions = SiteContent.commissions;
        if (!commissions) return;
        
        const commissionSelect = document.getElementById('commission-type');
        if (!commissionSelect) return;
        
        // Clear existing options except the first one
        const firstOption = commissionSelect.querySelector('option[value=""]');
        commissionSelect.innerHTML = '';
        if (firstOption) {
            commissionSelect.appendChild(firstOption);
        }
        
        // Add options from config
        Object.entries(commissions).forEach(([key, commission]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = commission.name;
            commissionSelect.appendChild(option);
        });
        
        // Add other/custom option
        const otherOption = document.createElement('option');
        otherOption.value = 'other';
        otherOption.textContent = 'Other/Custom';
        commissionSelect.appendChild(otherOption);
    }
}

// Utility functions for enhanced interactivity
class PortfolioEffects {
    constructor() {
        this.setupImageHovers();
        this.setupParallaxEffects();
        this.setupIntersectionObserver();
    }

    setupImageHovers() {
        // Add hover effects to commission cards
        const cards = document.querySelectorAll('.commission-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('horizontal')) {
                    card.style.transform = 'translateY(-5px) scale(1.02)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('horizontal')) {
                    card.style.transform = 'translateY(0) scale(1)';
                }
            });
        });

        // Sample image links
        const sampleLinks = document.querySelectorAll('.sample-link, .example-image');
        sampleLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const img = link.querySelector('img');
                const fullSizeUrl = link.getAttribute('href');
                this.openImageLightbox(img, fullSizeUrl);
            });
        });
    }

    setupParallaxEffects() {
        // Subtle parallax effects for sections
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
    }

    setupIntersectionObserver() {
        // Animate elements as they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe commission cards
        document.querySelectorAll('.commission-card').forEach(card => {
            observer.observe(card);
        });

        // Observe work items
        document.querySelectorAll('.work-item').forEach(item => {
            observer.observe(item);
        });
    }

    openImageLightbox(img, fullSizeUrl = null) {
        // Simple lightbox implementation
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        const imageUrl = fullSizeUrl || img.src;
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">✕</button>
                <img src="${imageUrl}" alt="${img.alt}">
            </div>
        `;

        // Add lightbox styles
        if (!document.querySelector('#lightbox-styles')) {
            const styles = document.createElement('style');
            styles.id = 'lightbox-styles';
            styles.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 3000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    overflow: auto;
                    padding: 2rem;
                    box-sizing: border-box;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                }
                .lightbox.show {
                    opacity: 1;
                }
                .lightbox-content {
                    position: relative;
                    max-width: 100%;
                    margin: auto;
                    display: block;
                    min-height: min-content;
                }
                .lightbox img {
                    max-width: 90vw;
                    max-height: 85vh;
                    height: auto;
                    width: auto;
                    border-radius: var(--radius-md);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
                    display: block;
                    margin: 0 auto;
                }
                .lightbox-close {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-size: 1.2rem;
                    font-weight: bold;
                    cursor: pointer;
                    padding: 0.75rem 1rem;
                    min-width: 3rem;
                    height: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                }
                .lightbox-close:hover {
                    background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
                }
                .lightbox-close:active {
                    transform: translateY(0);
                }
                @media (max-width: 768px) {
                    .lightbox {
                        padding: 1rem;
                    }
                    .lightbox img {
                        max-width: 95vw;
                        max-height: 80vh;
                    }
                    .lightbox-close {
                        font-size: 1.1rem;
                        padding: 0.5rem 0.75rem;
                        min-width: 2.5rem;
                        height: 2.5rem;
                        top: -45px;
                        right: 5px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(lightbox);
        setTimeout(() => lightbox.classList.add('show'), 10);

        // Close handlers
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox(lightbox);
            }
        });

        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox(lightbox);
        });

        // Escape key handler
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox(lightbox);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    closeLightbox(lightbox) {
        lightbox.classList.remove('show');
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 300);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new ArtistPortfolio();
    const effects = new PortfolioEffects();
    
    // Handle direct URL navigation (e.g., mysite.com#contact)
    const hash = window.location.hash.substring(1);
    if (hash && ['home', 'commissions', 'tos', 'contact'].includes(hash)) {
        portfolio.navigateToSection(hash);
    }
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'home';
        portfolio.showSection(hash, false);
        portfolio.updateActiveNavButton(hash);
        portfolio.currentSection = hash;
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ArtistPortfolio, PortfolioEffects };
} 