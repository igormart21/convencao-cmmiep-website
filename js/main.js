// CGMEB Site - JavaScript Principal

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização dos componentes
    initNavigation();
    initSearch();
    initAnimations();
    initForms();
});

// Navegação mobile
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Alternar ícone do botão
            const icon = navToggle.querySelector('svg');
            if (navMenu.classList.contains('active')) {
                icon.innerHTML = '<path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path>';
            } else {
                icon.innerHTML = '<path d="M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16 16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64 224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256 32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16 16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z"></path>';
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Sistema de busca
function initSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                // Implementar busca local ou redirecionar para página de resultados
                performSearch(query);
            }
        });
        
        // Busca em tempo real (opcional)
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                // Implementar busca em tempo real
                debounceSearch(query);
            }
        });
    }
}

// Função de busca
function performSearch(query) {
    // Aqui você pode implementar a lógica de busca
    // Por exemplo, buscar em elementos da página ou fazer uma requisição AJAX
    console.log('Buscando por:', query);
    
    // Exemplo de busca simples em elementos da página
    const elements = document.querySelectorAll('h1, h2, h3, p');
    const results = [];
    
    elements.forEach(element => {
        if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
            results.push(element);
        }
    });
    
    if (results.length > 0) {
        // Destacar resultados
        highlightResults(results);
        // Scroll para o primeiro resultado
        results[0].scrollIntoView({ behavior: 'smooth' });
    } else {
        alert('Nenhum resultado encontrado para: ' + query);
    }
}

// Destacar resultados da busca
function highlightResults(results) {
    // Remover destaques anteriores
    document.querySelectorAll('.search-highlight').forEach(el => {
        el.classList.remove('search-highlight');
    });
    
    // Destacar novos resultados
    results.forEach(element => {
        element.classList.add('search-highlight');
    });
}

// Debounce para busca em tempo real
function debounceSearch(query) {
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        performSearch(query);
    }, 300);
}

// Animações
function initAnimations() {
    // Animação de fade-in para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.card, .section-title');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Formulários
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            if (validateForm(this)) {
                submitForm(this);
            }
        });
    });
}

// Validação de formulário
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            showError(input, 'Este campo é obrigatório');
        } else {
            input.classList.remove('error');
            hideError(input);
        }
    });
    
    // Validação de email
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        if (input.value && !isValidEmail(input.value)) {
            isValid = false;
            input.classList.add('error');
            showError(input, 'Email inválido');
        }
    });
    
    return isValid;
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar erro
function showError(input, message) {
    hideError(input); // Remove erro anterior se existir
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

// Esconder erro
function hideError(input) {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Enviar formulário
function submitForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simular envio (substitua pela sua lógica de envio)
    console.log('Dados do formulário:', data);
    
    // Mostrar mensagem de sucesso
    showSuccessMessage('Formulário enviado com sucesso!');
    
    // Limpar formulário
    form.reset();
}

// Mostrar mensagem de sucesso
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Remover mensagem após 3 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Smooth scroll para links âncora
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

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
    initLazyLoading();
}

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Adicionar estilos para mensagens de erro e sucesso
const style = document.createElement('style');
style.textContent = `
    .error-message {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .success-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    .error {
        border-color: #e74c3c !important;
    }
    
    .search-highlight {
        background-color: #ffeb3b;
        padding: 2px 4px;
        border-radius: 2px;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
