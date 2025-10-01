document.addEventListener('DOMContentLoaded', () => {
    // Load Navigation
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        fetch('nav.html')
            .then(res => res.text())
            .then(text => {
                navPlaceholder.innerHTML = text;
                const hamburger = document.querySelector('.hamburger-menu');
                const mainNav = document.querySelector('.main-nav');
                if (hamburger && mainNav) {
                    hamburger.addEventListener('click', () => {
                        mainNav.classList.toggle('is-open');
                    });
                }
            })
            .catch(error => console.error('Error loading navigation:', error));
    }

    // Load Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(res => res.text())
            .then(text => {
                footerPlaceholder.innerHTML = text;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});
