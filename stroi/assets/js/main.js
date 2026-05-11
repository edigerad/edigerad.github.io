// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// Initialize GLightbox
const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    closeButton: true
});

// Navbar scroll behavior
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 100;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navCollapse = document.getElementById('navbarNav');
        if (navCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navCollapse).hide();
        }
    });
});

// Counter animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString() + (target >= 76 ? '+' : '');
                }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Portfolio filter
const filterButtons = document.querySelectorAll('[data-filter]');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Documents filter
const docFilterButtons = document.querySelectorAll('[data-doc-filter]');
const docItems = document.querySelectorAll('.doc-item');

docFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        docFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-doc-filter');

        docItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-doc-category') === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // WhatsApp message
    const whatsappText = encodeURIComponent(
        `Здравствуйте! Меня зовут ${name}` +
        (company ? `, компания ${company}` : '') +
        `. Телефон: ${phone}` +
        (email ? `, Email: ${email}` : '') +
        (message ? `. ${message}` : '')
    );

    window.open(`https://wa.me/77004694550?text=${whatsappText}`, '_blank');

    // Show toast
    const toast = document.createElement('div');
    toast.className = 'toast-success';
    toast.innerHTML = '<i class="bi bi-check-circle me-2"></i> Заявка отправлена через WhatsApp!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);

    this.reset();
});
