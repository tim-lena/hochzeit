// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const freizeitSubtabButtons = document.querySelectorAll('.freizeit-subtab-button');
    const freizeitSubtabContents = document.querySelectorAll('.freizeit-subtab-content');

    function switchFreizeitSubtab(subtabName, options = {}) {
        const updateHistory = options.updateHistory ?? true;

        freizeitSubtabButtons.forEach(button => {
            const isActive = button.getAttribute('data-freizeit-tab') === subtabName;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', String(isActive));
        });

        freizeitSubtabContents.forEach(content => {
            content.classList.toggle('active', content.id === `freizeit-${subtabName}`);
        });

        if (updateHistory) {
            history.pushState(null, null, `#freizeit-${subtabName}`);
        }
    }

    function switchTab(tabName, options = {}) {
        const updateHistory = options.updateHistory ?? true;
        const subtab = options.subtab;

        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName);

        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');

            if (tabName === 'freizeit') {
                switchFreizeitSubtab(subtab || 'spiele', { updateHistory });
            } else if (updateHistory) {
                history.pushState(null, null, `#${tabName}`);
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    freizeitSubtabButtons.forEach(button => {
        button.addEventListener('click', function() {
            switchTab('freizeit', {
                subtab: this.getAttribute('data-freizeit-tab')
            });
        });
    });

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            if (hash.startsWith('freizeit-')) {
                switchTab('freizeit', {
                    subtab: hash.replace('freizeit-', ''),
                    updateHistory: false
                });
                return;
            }

            switchTab(hash, { updateHistory: false });
        }
    }

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
        const header = card.querySelector('.game-header');

        header.addEventListener('click', function() {
            const isActive = card.classList.contains('active');

            if (isActive) {
                card.classList.remove('active');
            } else {
                card.classList.add('active');
            }
        });
    });

    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const tabName = this.getAttribute('data-tab-target') || href.substring(1);
            const subtabName = this.getAttribute('data-subtab-target') || this.getAttribute('data-freizeit-subtab');
            const tabButton = document.querySelector(`[data-tab="${tabName}"]`);

            if (tabButton) {
                e.preventDefault();
                switchTab(tabName, { subtab: subtabName });
            }
        });
    });
});
