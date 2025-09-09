// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Gallery Image Rotation
const galleryImages = [
    'images/alpha nobre.jpg',
    'images/alfa1.jpeg',
    'images/pagina 1.jpeg',
    'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg',
    'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg'
];

let currentImageIndex = 0;
const galleryImage = document.getElementById('gallery-image');

function rotateGalleryImage() {
    if (galleryImage) {
        galleryImage.style.opacity = '0';
        
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            galleryImage.src = galleryImages[currentImageIndex];
            galleryImage.style.opacity = '1';
        }, 250);
    }
}

// Start gallery rotation
if (galleryImage) {
    setInterval(rotateGalleryImage, 5000);
}

// Calendar Generation
function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    
    if (!calendarGrid || !currentMonthElement) return;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const today = now.getDate();

    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Clear previous calendar
    calendarGrid.innerHTML = '';

    // Add day headers
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.padding = '8px';
        dayHeader.style.backgroundColor = 'var(--primary-color)';
        dayHeader.style.color = 'var(--text-light)';
        dayHeader.style.borderRadius = '4px';
        calendarGrid.appendChild(dayHeader);
    });

    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Add empty cells for previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.textContent = daysInPrevMonth - i;
        dayElement.className = 'calendar-day other-month';
        calendarGrid.appendChild(dayElement);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.className = 'calendar-day';
        
        if (day === today) {
            dayElement.classList.add('today');
        }
        
        calendarGrid.appendChild(dayElement);
    }

    // Add empty cells for next month
    const totalCells = calendarGrid.children.length - 7; // Subtract header row
    const remainingCells = 42 - totalCells; // 6 rows × 7 days = 42 cells
    
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.className = 'calendar-day other-month';
        calendarGrid.appendChild(dayElement);
    }
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
});

// Smooth scrolling for anchor links
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

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .contact-info');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});