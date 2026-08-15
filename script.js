const dialog = document.querySelector('.contact-dialog');
document.querySelector('.contact-button').addEventListener('click', () => dialog.showModal());
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
if (menuToggle && sidebar) {
    const setMenuOpen = (open) => {
        sidebar.classList.toggle('is-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        document.body.classList.toggle('menu-open', open);
        if (mainContent) mainContent.inert = open;
    };
    menuToggle.addEventListener('click', () => setMenuOpen(!sidebar.classList.contains('is-open')));
    sidebar.querySelectorAll('.nav-list a, .sidebar-footer a').forEach((link) => {
        link.addEventListener('click', () => setMenuOpen(false));
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidebar.classList.contains('is-open')) setMenuOpen(false);
    });
}

const homeSections = [
    { link: document.querySelector('.nav-link[href="#inicio"]'), el: document.querySelector('.hero') },
    { link: document.querySelector('.nav-link[href="#proyectos"]'), el: document.querySelector('.projects') }
].filter((entry) => entry.link && entry.el);
if (homeSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const match = homeSections.find((section) => section.el === entry.target);
            if (!match) return;
            homeSections.forEach((section) => {
                section.link.classList.remove('active');
                section.link.removeAttribute('aria-current');
            });
            match.link.classList.add('active');
            match.link.setAttribute('aria-current', 'true');
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    homeSections.forEach((section) => sectionObserver.observe(section.el));
}

document.querySelectorAll('.hscroll-viewport').forEach((viewport) => {
    const track = viewport.querySelector('.hscroll');
    const arrow = viewport.querySelector('.hscroll-arrow');
    if (!track || !arrow) return;
    const updateArrow = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        arrow.hidden = track.scrollLeft >= maxScroll - 4;
    };
    arrow.addEventListener('click', () => {
        track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
    });
    track.addEventListener('scroll', updateArrow);
    window.addEventListener('resize', updateArrow);
    updateArrow();
});
