const cvUrls = {
    pt: "https://drive.google.com/file/d/1MWtFlEsGJJBWqxWIaS7QZPU7j9YYH2cH/view?usp=sharing",
    en: "https://drive.google.com/file/d/12Sx4j5C-McgLa5kEKJVC3kKzmXdvZ8-r/view?usp=sharing"
};

// Dicionário básico de traduções (você pode expandir isso depois para o site todo)
const translations = {
    pt: {
        cvButton: "Visualizar Currículo",
    },
    en: {
        cvButton: "View Resume",
    }
};

let currentLang = 'pt'; // Idioma padrão

// Função para aplicar o idioma
function applyLanguage(lang) {
    currentLang = lang;
    
    // 1. Atualiza o link e o texto do botão do currículo
    const cvLink = document.getElementById('cv-link');
    if (cvLink) {
        cvLink.href = cvUrls[lang];
        cvLink.textContent = translations[lang].cvButton;
    }

    // 2. Atualiza outros textos da página (exemplo no Hero)
    const heroDesc = document.getElementById('hero-desc');
    if (heroDesc) {
        heroDesc.textContent = translations[lang].heroDesc;
    }

    // 3. Atualiza o texto do botão de toggle no navbar (mostra a opção OPOSTA)
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'pt' ? 'EN' : 'PT';
    }
    
}

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica de Idioma ---
    
    // Detectar idioma do navegador do usuário
    const browserLang = navigator.language || navigator.userLanguage;
    // Se começar com 'pt' (ex: pt-BR, pt-PT), usa pt. Caso contrário, usa en.
    const initialLang = browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
    
    // Aplica o idioma inicial
    applyLanguage(initialLang);

    // Listener para o botão de trocar idioma
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'pt' ? 'en' : 'pt';
            applyLanguage(newLang);
        });
    }

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

    // Carregar projetos e habilidades
    loadProjects();
    loadSkills();
    loadSoftSkills();
    loadCertificados();

});

// Função para carregar habilidades
async function loadSkills() {
    try {
        const response = await fetch('/source/habilidades.json');
        const data = await response.json();
        const container = document.getElementById('habilidades-container');
        
        if (!container) return;

        container.innerHTML = data.habilidades.map(skill => `
            <div class="skill-card">
                ${skill.icone}
                <h3>${skill.nome}</h3>
                <p>${skill.descricao}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar habilidades:', error);
    }
}

//função para chamar soft skills
async function loadSoftSkills() {
    try {
        const response = await fetch('/source/soft_skills.json');
        const data = await response.json();
        const container = document.getElementById('softskills-container');

        if (!container) return;

        container.innerHTML = data.softskills.map(skill => `
            <div class="skill-card">
                ${skill.icone}
                <h3>${skill.nome}</h3>
                <p>${skill.descricao}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar soft skills:', error);
    }
}

// Carregando certificados
async function loadCertificados() {
    try {
        const response = await fetch('/source/certificates.json');
        const data = await response.json();
        const container = document.getElementById('certificados-container');

        if (!container) return;

        const cardHTML = data.certificados.map(cert => `
            <div class="cert-card">
                ${cert.icone}
                <h3>${cert.nome}</h3>
                <p class="cert-emissor">${cert.emissor}</p>
                <span class="cert-codigo">${cert.codigo}</span>
            </div>
        `).join('');

        container.innerHTML = cardHTML + cardHTML;

        const wrapper = container.closest('.carousel-wrapper1');
        let animationId;
        const speed = 1;

        // Deixa o browser renderizar antes de medir
        requestAnimationFrame(() => {
            const halfWidth = container.scrollWidth / 2;
            let position = 0;

            function animate() {
                position -= speed;

                // Quando terminou o primeiro conjunto, volta silenciosamente ao início
                if (position <= -halfWidth) {
                    position = 0;
                }

                container.style.transform = `translateX(${position}px)`;
                animationId = requestAnimationFrame(animate);
            }

            animationId = requestAnimationFrame(animate);

            wrapper.addEventListener('mouseenter', () => cancelAnimationFrame(animationId));
            wrapper.addEventListener('mouseleave', () => {
                animationId = requestAnimationFrame(animate);
            });
        });

    } catch (error) {
        console.error('Erro ao carregar certificados:', error);
    }
}

// Função para carregar projetos
async function loadProjects() {
    try {
        const response = await fetch('/source/projects.json');
        const data = await response.json();
        const container = document.querySelector('.projetos-container');
        
        if (!container) return;

        const categories = {
            "Engineering & Science": [],
            "Dashboards & Analytics": [], 
            "Web & Others": []
        }

        // Agrupa os projetos baseados no atributo "categoria" do seu JSON
        data.projetos.forEach(projeto => {
            const cat = projeto.categoria;
            if (cat === "Engineering & Science") {
                categories["Engineering & Science"].push(projeto);
            } else if (cat === "Dashboards & analytics" || cat === "Data & Analytics" || cat === "Dashboards & Analytics") {
                categories["Dashboards & Analytics"].push(projeto);
            } else {
                categories["Web & Others"].push(projeto);
            }
        });

        container.innerHTML = Object.keys(categories).map((categoria, index) => {
            const projetos = categories[categoria];
            if (projetos.length === 0) return ''; // Pula categorias sem projetos

            // Cria um ID único e limpo para o toggle
            const catId = categoria.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
            
            // Verifica se é a primeira categoria (index 0) para deixá-la aberta e com o ícone correto
            const isActiveClass = index === 0 ? 'active' : '';
            const iconClass = index === 0 ? 'fa-chevron-up' : 'fa-chevron-down';

            return `
                <div class="projeto-category-toggle">
                    <button class="toggle-btn" onclick="toggleCategory('${catId}')">
                        ${categoria} <i class="fas ${iconClass}"></i>
                    </button>
                    <div class="toggle-content ${isActiveClass}" id="${catId}">
                        <div class="carousel-wrapper">
                            <button class="carousel-btn prev" onclick="moveCarousel('${catId}', -1)">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <div class="carousel-track" id="track-${catId}">
                                ${projetos.map(projeto => `
                                    <div class="projeto-card">
                                        <div class="projeto-card-head">
                                        ${projeto.imagem ? `<img src="${projeto.imagem}" alt="${projeto.titulo}" class="projeto-imagem" style="width:100%;border-radius:8px;margin-bottom:1rem;">` : ''}
                                        <h3>${projeto.titulo}</h3>
                                        <p>${projeto.descricao}</p>
                                        </div>
                                        <div class="projeto-linguagens">
                                            ${projeto.linguagens ? projeto.linguagens.map(lang => `
                                                <span class="linguagem-tag">${lang}</span>
                                            `).join('') : ''}
                                        </div>
                                        <div class="projeto-links">
                                            <a href="${projeto.github}" target="_blank" class="btn btn-secondary">
                                                <i class="fab fa-github"></i> GitHub
                                            </a>
                                            <a href="${projeto.vercel.startsWith('http') ? projeto.vercel : 'https://' + projeto.vercel}" target="_blank" class="btn btn-primary">
                                                <i class="fas fa-external-link-alt"></i> Ver Projeto
                                            </a>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="carousel-btn next" onclick="moveCarousel('${catId}', 1)">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
    }
}

// Funções para controlar o abre/fecha e o carrossel (devem ficar no escopo global)
window.toggleCategory = function(id) {
    const content = document.getElementById(id);
    const icon = content.previousElementSibling.querySelector('i');
    content.classList.toggle('active');
    
    if(content.classList.contains('active')) {
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
};

window.moveCarousel = function(id, direction) {
    const track = document.getElementById(`track-${id}`);
    const card = track.querySelector('.projeto-card');
    if (card) {
        // Move o tamanho do card + o gap (32px = 2rem)
        const scrollAmount = card.offsetWidth + 32; 
        track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
};