document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const icon = themeToggleBtn.querySelector('i');
        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // 2. Typing Effect in Hero Section
    const roles = ["Computer Science Student", "Programmer", "Educator", "Blogger", "Digital Creator"];
    const typingText = document.querySelector('.typing-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000); // Start typing effect

    // 3. Smooth Scroll Animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. Project Filter System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // 5. Scroll Animations (Intersection Observer for Skills and Counters)
    const observerOptions = {
        threshold: 0.5
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate Skill Bars
                if (entry.target.classList.contains('progress-bar')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                }
                
                // Animate Counters
                if (entry.target.classList.contains('counter')) {
                    const target = +entry.target.getAttribute('data-target');
                    const duration = 2000; 
                    const increment = target / (duration / 16); // 60fps
                    
                    let currentCount = 0;
                    const updateCounter = () => {
                        currentCount += increment;
                        if (currentCount < target) {
                            entry.target.innerText = Math.ceil(currentCount);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.innerText = target;
                        }
                    };
                    updateCounter();
                }
                
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // 6. AI Chat Functionality
    const chatWidgetBtn = document.getElementById('chat-widget-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // Open/Close chat window
    chatWidgetBtn.addEventListener('click', () => {
        chatWindow.classList.add('active');
        chatWidgetBtn.style.display = 'none'; // Hide bubble when open
    });

    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        chatWidgetBtn.style.display = 'flex'; // Show bubble when closed
    });

    // Handle sending messages
    function handleSendMessage() {
        const text = chatInput.value.trim();
        if (text === '') return;

        // 1. Create and display User message
        const userMsg = document.createElement('div');
        userMsg.classList.add('message', 'user-message');
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);
        
        // Clear input and scroll to bottom
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 2. Simulate AI Typing/Response (Demo Mode)
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.classList.add('message', 'ai-message');
            aiMsg.textContent = "Thanks for reaching out! Right now I am a demo UI. If you need to contact Vijay, please use the contact form above!";
            chatMessages.appendChild(aiMsg);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000); // 1-second delay to feel like it's typing
    }

    // Send on button click
    sendBtn.addEventListener('click', handleSendMessage);

    // Send on 'Enter' key press
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Observe progress bars and counters
    document.querySelectorAll('.progress-bar, .counter').forEach(el => {
        animateOnScroll.observe(el);
    });
});
