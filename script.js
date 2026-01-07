document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follow');

    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower effect
    function animateCursor() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover interactions for cursor
    const links = document.querySelectorAll('a, .work-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            follower.style.borderColor = 'transparent';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.backgroundColor = 'transparent';
            follower.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
    });

    // Work Item Hover Reveal
    const workItems = document.querySelectorAll('.work-item');
    const preview = document.querySelector('.work-preview');

    // Predefine colors for demo since we don't have images yet
    const colors = ['#FF0055', '#00AAFF', '#CCFF00', '#BF00FF'];

    workItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            preview.style.opacity = '1';
            // Simulating image load with color for now
            preview.style.backgroundColor = colors[index % colors.length];
        });

        item.addEventListener('mouseleave', () => {
            preview.style.opacity = '0';
        });

        item.addEventListener('mousemove', (e) => {
            // Optional: slight parallax or movement of the preview
            // preview.style.transform = `translate(-50%, -50%) translate(${(e.clientX - window.innerWidth/2) * 0.05}px, ${(e.clientY - window.innerHeight/2) * 0.05}px)`;
        });
    });
    // Modal Interaction
    const workCards = document.querySelectorAll('.work-card');
    const modal = document.getElementById('work-modal');
    if (modal) {
        const closeModal = modal.querySelector('.close-modal');
        const modalTitle = modal.querySelector('.modal-title');
        const modalCat = modal.querySelector('.modal-cat');
        const modalDesc = modal.querySelector('.modal-desc');
        // Image logic can be added later

        workCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const title = card.getAttribute('data-title');
                const cat = card.getAttribute('data-cat');
                const desc = card.getAttribute('data-desc');

                modalTitle.textContent = title;
                modalCat.textContent = cat;
                modalDesc.textContent = desc;

                modal.style.display = 'flex';
                // Trigger reflow
                void modal.offsetWidth;
                modal.classList.add('active');
            });
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    }

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinksList = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navLinksList) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksList.classList.toggle('active');
            if (navbar) navbar.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = navLinksList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksList.classList.remove('active');
                if (navbar) navbar.classList.remove('active');
            });
        });
    }
    // Loading Animation
    const loader = document.getElementById('loader');
    if (loader) {
        // Check if user has visited in this session
        if (!sessionStorage.getItem('visited')) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.classList.add('hidden');
                    // Optional: remove from DOM after transition
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                    // Set visited flag
                    sessionStorage.setItem('visited', 'true');
                }, 1000); // 1.0 second delay before fading out
            });
        } else {
            // If already visited, hide immediately
            loader.style.display = 'none';
        }
    }
});
