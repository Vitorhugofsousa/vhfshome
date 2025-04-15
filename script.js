document.addEventListener('DOMContentLoaded', () => {
    // Gerenciamento do tema
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Verificar preferência do usuário e tema salvo
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    // Função para aplicar o tema
    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            body.classList.remove('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Aplicar tema inicial
    if (savedTheme) {
        applyTheme(savedTheme === 'dark');
    } else {
        applyTheme(prefersDarkScheme.matches);
    }

    // Listener para mudança de preferência do sistema
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!savedTheme) {
            applyTheme(e.matches);
        }
    });

    // Listener para botão de alternância
    themeToggle.addEventListener('click', () => {
        const isDark = !body.classList.contains('dark-mode');
        applyTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de scroll para elementos
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Adiciona animação ao ícone do menu
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Fechar o menu quando um link é clicado
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

// Função para carregar dashboards
function loadDashboard(dashboardId) {
    const container = document.querySelector('.dashboard-container');
    // Aqui você pode implementar a lógica para carregar diferentes dashboards
    // Por exemplo, usando iframes para Power BI ou Tableau
    container.innerHTML = `
        <iframe 
            src="SEU_DASHBOARD_URL" 
            frameborder="0" 
            allowFullScreen="true"
            style="width: 100%; height: 600px;"
        ></iframe>
    `;
}