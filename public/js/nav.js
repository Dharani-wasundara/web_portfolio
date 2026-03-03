/* ─── Shared Navigation JS ─────────────────────────────────────────── */

(function () {
    const pages = [
        { label: 'Home', href: '/index.html' },
        { label: 'About', href: '/about.html' },
        { label: 'Projects', href: '/projects.html' },
        { label: 'Experience', href: '/experience.html' },
        { label: 'Contact', href: '/contact.html', cta: true }
    ];

    function currentPage() {
        const p = window.location.pathname;
        const f = p.split('/').pop() || 'index.html';
        return f === '' ? 'index.html' : f;
    }

    function buildNav() {
        const current = currentPage();

        /* ── Navbar ── */
        const navbar = document.createElement('nav');
        navbar.id = 'navbar';

        const logo = document.createElement('a');
        logo.className = 'nav-logo';
        logo.href = '/index.html';
        logo.textContent = 'DW';

        const ul = document.createElement('ul');
        ul.className = 'nav-links';

        pages.forEach(p => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = p.href;
            a.textContent = p.label;
            if (p.cta) a.classList.add('nav-cta');
            const pFile = p.href.replace('/', '');
            if (current === pFile) a.classList.add('active');
            li.appendChild(a);
            ul.appendChild(li);
        });

        const hamburger = document.createElement('button');
        hamburger.className = 'nav-hamburger';
        hamburger.setAttribute('aria-label', 'Toggle menu');
        hamburger.innerHTML = '<span></span><span></span><span></span>';

        navbar.appendChild(logo);
        navbar.appendChild(ul);
        navbar.appendChild(hamburger);
        document.body.prepend(navbar);

        /* ── Mobile menu ── */
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'nav-mobile';

        pages.forEach(p => {
            const a = document.createElement('a');
            a.href = p.href;
            a.textContent = p.label;
            const pFile = p.href.replace('/', '');
            if (current === pFile) a.classList.add('active');
            mobileMenu.appendChild(a);
        });

        document.body.insertBefore(mobileMenu, navbar.nextSibling);

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        /* ── Scroll shadow ── */
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    /* ── Go-to-top button ── */
    function buildGoTop() {
        const btn = document.createElement('button');
        btn.id = 'go-top';
        btn.innerHTML = '&#8679;';
        btn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 400);
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── Footer ── */
    function buildFooter() {
        const footer = document.createElement('footer');
        footer.innerHTML = `<p>© 2026 <span>Dharani Wasundara</span>. Crafted with passion.</p>`;
        document.body.appendChild(footer);
    }

    /* ── Scroll-reveal ── */
    function initReveal() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    /* ── Skill bar animation ── */
    function initSkillBars() {
        const fills = document.querySelectorAll('.skill-bar-fill');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.width = e.target.dataset.level + '%';
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });
        fills.forEach(f => obs.observe(f));
    }

    /* ── Init on DOM ready ── */
    function init() {
        buildNav();
        buildGoTop();
        buildFooter();
        initReveal();
        initSkillBars();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
