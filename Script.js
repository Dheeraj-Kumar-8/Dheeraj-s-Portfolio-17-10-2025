// ** NOTE: Replace '15-01-2000' with your actual DOB in DD-MM-YYYY format **
const CORRECT_PASSWORD = '892006'; 

function checkPassword() {
    const inputField = document.getElementById('dob-password');
    const messageElement = document.getElementById('message');
    const loginContainer = document.getElementById('login-container');
    const portfolioContainer = document.getElementById('portfolio-container');
    
    if (inputField.value === CORRECT_PASSWORD) {
        // Correct password: Hide login and show portfolio
        loginContainer.classList.add('hidden');
        portfolioContainer.classList.remove('hidden');
        messageElement.textContent = ""; // Clear any previous error message
        
    } else {
        // Incorrect password: Display error
        messageElement.textContent = "Incorrect Password. Please try again.";
        inputField.value = ''; // Clear the input field
    }
}


/* --- PORTFOLIO NAVIGATION LOGIC (Optional but recommended) --- */

document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.profile-section');
    const sidebar = document.querySelector('.sidebar');
    const moreBtn = document.getElementById('more-toggle');

    function showSection(sectionId) {
        sections.forEach(section => {
            if ('#' + section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');

            // 1. Update active button state
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Show the corresponding section 
            showSection(targetId); 
        });
    });

    // Initially show Home and set active
    showSection('#home');
    const homeBtn = document.querySelector('a[href="#home"]');
    if (homeBtn) homeBtn.classList.add('active');

    // Handle 'More' button to expand sidebar
    if (moreBtn && sidebar) {
        moreBtn.addEventListener('click', () => {
            sidebar.classList.remove('collapsed');
            moreBtn.style.display = 'none';
        });
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const loginContainer = document.getElementById('login-container');
            const portfolioContainer = document.getElementById('portfolio-container');
            const passwordInput = document.getElementById('dob-password');

            // Hide portfolio, show login
            if (portfolioContainer) {
                portfolioContainer.classList.add('hidden');
            }
            if (loginContainer) {
                loginContainer.classList.remove('hidden');
            }

            // Clear password field
            if(passwordInput) {
                passwordInput.value = '';
            }

            // Reset sidebar collapsed state and show 'More' button
            const sidebarEl = document.querySelector('.sidebar');
            const moreButtonEl = document.getElementById('more-toggle');
            if (sidebarEl) sidebarEl.classList.add('collapsed');
            if (moreButtonEl) moreButtonEl.style.display = '';
        });
    }

    /* --- Make images behave like buttons & Contact reveal logic --- */
    // 1) Make all images focusable and clickable by keyboard
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        // Add role and tabindex for accessibility
        img.setAttribute('role', 'button');
        if (!img.hasAttribute('tabindex')) img.setAttribute('tabindex', '0');

        // Keyboard activation (Enter/Space)
        img.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                img.click();
            }
        });
    });

    // 2) Reveal app icons only when contact image is clicked
    const contactCenter = document.querySelector('.contact-center');
    const appsRow = document.querySelector('.contact-apps-row');
    if (contactCenter && appsRow) {
        const toggleApps = (show) => {
            if (show) {
                appsRow.classList.remove('hidden');
                appsRow.style.opacity = '1';
                appsRow.style.pointerEvents = 'auto';
                appsRow.setAttribute('aria-hidden', 'false');
            } else {
                appsRow.style.opacity = '0';
                appsRow.style.pointerEvents = 'none';
                // After transition, keep layout reserved but invisible
                appsRow.classList.add('hidden');
                appsRow.setAttribute('aria-hidden', 'true');
            }
        };

        // Start hidden (in case markup changed)
        toggleApps(false);

        let revealed = false;
        contactCenter.addEventListener('click', (e) => {
            revealed = !revealed;
            toggleApps(revealed);
        });
        // Keyboard support on wrapper too
        contactCenter.setAttribute('role', 'button');
        if (!contactCenter.hasAttribute('tabindex')) contactCenter.setAttribute('tabindex', '0');
        contactCenter.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                contactCenter.click();
            }
        });

        // Prevent clicks on app items from toggling visibility
        appsRow.addEventListener('click', (ev) => {
            ev.stopPropagation();
        });
    }

    // Make code platform logos open their links when clicking the image
    document.querySelectorAll('.code-item').forEach(item => {
        const img = item.querySelector('.code-logo img');
        const link = item.querySelector('a.code-btn');
        if (img && link) {
            img.addEventListener('click', () => {
                window.open(link.href, '_blank', 'noopener,noreferrer');
            });
        }
    });

    // Clicking certificate images opens them in a new tab for full view
    document.querySelectorAll('.cert-card img').forEach(img => {
        img.addEventListener('click', () => {
            const src = img.getAttribute('src');
            if (src) window.open(src, '_blank', 'noopener,noreferrer');
        });
    });
});