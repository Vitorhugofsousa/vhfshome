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

    // Carregar projetos
    loadProjects();

    // Modal de seleção de download do CV
    const openCvModalBtn = document.getElementById('open-cv-modal');
    const cvModal = document.getElementById('cv-modal');
    const closeCvModalBtn = document.getElementById('close-cv-modal');

    if (openCvModalBtn && cvModal && closeCvModalBtn) {
        openCvModalBtn.addEventListener('click', () => {
            cvModal.style.display = 'flex';
        });
        closeCvModalBtn.addEventListener('click', () => {
            cvModal.style.display = 'none';
        });
        // Fechar ao clicar fora do modal
        window.addEventListener('click', (e) => {
            if (e.target === cvModal) {
                cvModal.style.display = 'none';
            }
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

// Função para carregar projetos
async function loadProjects() {
    try {
        const response = await fetch('/source/projects.json');
        const data = await response.json();
        const projetosGrid = document.querySelector('.projetos-grid');
        
        if (!projetosGrid) return;

        projetosGrid.innerHTML = data.projetos.map(projeto => `
            <div class="projeto-card">
                ${projeto.imagem ? `<img src="${projeto.imagem}" alt="${projeto.titulo}" style="width:100%;border-radius:8px;margin-bottom:1rem;">` : ''}
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
                <div class="projeto-links">
                    <a href="${projeto.github}" target="_blank" class="btn btn-secondary">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${projeto.vercel.startsWith('http') ? projeto.vercel : 'https://' + projeto.vercel}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Ver Projeto
                    </a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
    }
}