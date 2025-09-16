// DVNC.AI - Liquid Intelligence System 2029

// Configuration
const CONFIG = {
    typingDelay: 15,
    thinkingTime: 600,
    apiEndpoint: '/api/chat',
    useLocalResponses: true,
    liquidParticles: 25,
    metaballRadius: 80,
    viscosity: 0.98,
    tension: 0.04,
    mouseInfluence: 150
};

// Liquid AI Responses
const DVNC_RESPONSES = [
    {
        keywords: ['systems', 'thinking', 'complex', 'problem'],
        response: "Complex problems demand a systems-thinking approach. Leonardo understood that everything is interconnected - from the flow of water to the circulation of blood. Your challenge requires examining not just individual components but the relationships and feedback loops between them. What patterns do you observe across different domains?"
    },
    {
        keywords: ['innovation', 'creative', 'idea'],
        response: "True innovation emerges at the intersection of disciplines. Leonardo didn't separate art from science - he used anatomical studies to perfect his paintings and artistic observation to advance engineering. Consider approaching your challenge from an unexpected angle. What would happen if you applied principles from nature to your problem?"
    },
    {
        keywords: ['hello', 'hi', 'hey'],
        response: "Greetings! I am DVNC.AI - a liquid intelligence system that embodies Leonardo da Vinci's polymathic methodology. My neural pathways flow and adapt like water, finding connections between disparate fields. How can I help you think differently today?"
    },
    {
        keywords: ['who are you', 'what are you', 'dvnc'],
        response: "I am DVNC.AI - an advanced liquid intelligence system inspired by Leonardo da Vinci's cross-domain genius. My architecture flows between disciplines like water finding its path, connecting art, science, and technology in ways that challenge conventional thinking."
    }
];

// DOM Elements & State
let elements = {};
let canvas, ctx;
let metaballs = [];
let mouseX = 0, mouseY = 0;
let animationId;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    setupEventListeners();
    initLiquidCanvas();
    animateLiquidUI();
});

// Initialize DOM elements
function initializeElements() {
    elements = {
        chatMessages: document.getElementById('chatMessages'),
        messageInput: document.getElementById('messageInput'),
        sendButton: document.getElementById('sendButton'),
        typingIndicator: document.getElementById('typingIndicator'),
        welcomeSection: document.getElementById('welcomeSection'),
        quickActions: document.querySelectorAll('.liquid-quick'),
        logoHome: document.getElementById('logoHome'),
        resetBtn: document.getElementById('resetBtn')
    };
}

// Setup Event Listeners
function setupEventListeners() {
    // Send message
    elements.sendButton?.addEventListener('click', sendMessage);
    
    // Enter key
    elements.messageInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Input focus effects
    elements.messageInput?.addEventListener('focus', () => {
        createRipple(elements.messageInput.parentElement);
    });
    
    // Quick actions with liquid effect
    elements.quickActions.forEach(button => {
        button.addEventListener('click', (e) => {
            createRipple(e.currentTarget);
            const message = button.getAttribute('data-message');
            elements.messageInput.value = message;
            sendMessage();
        });
    });
    
    // Logo home
    elements.logoHome?.addEventListener('click', (e) => {
        e.preventDefault();
        liquidTransition(() => resetToHome());
    });
    
    // Reset button
    elements.resetBtn?.addEventListener('click', () => {
        liquidTransition(() => resetToHome());
    });
    
    // Mouse tracking for liquid effects
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Add liquid distortion near mouse
        if (canvas) {
            metaballs.forEach(ball => {
                const dx = ball.x - mouseX;
                const dy = ball.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < CONFIG.mouseInfluence) {
                    const force = (1 - distance / CONFIG.mouseInfluence) * 0.5;
                    ball.vx += (dx / distance) * force;
                    ball.vy += (dy / distance) * force;
                }
            });
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            elements.messageInput?.focus();
        }
        
        if (e.key === 'Escape') {
            liquidTransition(() => resetToHome());
        }
    });
}

// Initialize Liquid Canvas with Metaballs
function initLiquidCanvas() {
    canvas = document.getElementById('liquidCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create metaballs
    for (let i = 0; i < CONFIG.liquidParticles; i++) {
        metaballs.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 30 + 20,
            hue: Math.random() * 60 + 180 // Blue to purple range
        });
    }
    
    animateLiquidBackground();
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Liquid Metaball Animation
function animateLiquidBackground() {
    if (!ctx || !canvas) return;
    
    // Clear with fade effect
    ctx.fillStyle = 'rgba(0, 5, 17, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update metaballs
    metaballs.forEach(ball => {
        // Update position with viscosity
        ball.vx *= CONFIG.viscosity;
        ball.vy *= CONFIG.viscosity;
        
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        // Surface tension at boundaries
        if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
            ball.vx *= -1;
            ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
        }
        if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
            ball.vy *= -1;
            ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
        }
        
        // Apply random flow
        ball.vx += (Math.random() - 0.5) * CONFIG.tension;
        ball.vy += (Math.random() - 0.5) * CONFIG.tension;
        
        // Limit velocity
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        if (speed > 2) {
            ball.vx = (ball.vx / speed) * 2;
            ball.vy = (ball.vy / speed) * 2;
        }
    });
    
    // Draw metaballs with goo effect
    drawMetaballs();
    
    animationId = requestAnimationFrame(animateLiquidBackground);
}

function drawMetaballs() {
    // Create gradient metaball effect
    metaballs.forEach((ball, index) => {
        const gradient = ctx.createRadialGradient(
            ball.x, ball.y, 0,
            ball.x, ball.y, ball.radius
        );
        
        gradient.addColorStop(0, `hsla(${ball.hue}, 100%, 60%, 0.4)`);
        gradient.addColorStop(0.5, `hsla(${ball.hue}, 100%, 50%, 0.2)`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect nearby metaballs
        metaballs.slice(index + 1).forEach(other => {
            const dx = other.x - ball.x;
            const dy = other.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < CONFIG.metaballRadius * 2) {
                const opacity = (1 - distance / (CONFIG.metaballRadius * 2)) * 0.3;
                
                ctx.strokeStyle = `hsla(${(ball.hue + other.hue) / 2}, 100%, 50%, ${opacity})`;
                ctx.lineWidth = opacity * 10;
                ctx.beginPath();
                ctx.moveTo(ball.x, ball.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        });
    });
}

// Liquid UI Animations
function animateLiquidUI() {
    // Animate orb
    const orb = document.querySelector('.orb-inner');
    if (orb) {
        setInterval(() => {
            const scale = 0.95 + Math.random() * 0.1;
            orb.style.transform = `scale(${scale})`;
        }, 2000);
    }
    
    // Animate feature bubbles
    document.querySelectorAll('.feature-bubble').forEach((bubble, i) => {
        setInterval(() => {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            bubble.style.transform = `translate(${x}px, ${y}px)`;
        }, 3000 + i * 500);
    });
}

// Create Ripple Effect
function createRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(0,212,255,0.3), transparent)';
    ripple.style.pointerEvents = 'none';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.animation = 'ripple-expand 1s ease-out';
    
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
}

// Liquid Transition
function liquidTransition(callback) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'radial-gradient(circle at center, var(--liquid-primary), transparent)';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9999';
    overlay.style.transition = 'opacity 0.3s ease-out';
    
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
        overlay.style.opacity = '0.5';
        setTimeout(() => {
            callback();
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 300);
    });
}

// Reset to Home
function resetToHome() {
    elements.chatMessages.innerHTML = '';
    elements.welcomeSection.style.display = 'flex';
    elements.messageInput.value = '';
}

// Send Message
async function sendMessage() {
    const message = elements.messageInput.value.trim();
    if (!message) return;
    
    // Hide welcome with liquid transition
    if (elements.welcomeSection.style.display !== 'none') {
        liquidTransition(() => {
            elements.welcomeSection.style.display = 'none';
        });
    }
    
    // Add user message with liquid effect
    addMessage(message, 'user');
    
    // Clear input with ripple
    elements.messageInput.value = '';
    createRipple(elements.sendButton);
    
    // Show liquid typing indicator
    showTypingIndicator();
    
    // Get response
    setTimeout(async () => {
        hideTypingIndicator();
        const response = await getDVNCResponse(message);
        addMessage(response, 'bot', true);
    }, CONFIG.thinkingTime);
}

// Get Response
async function getDVNCResponse(message) {
    if (CONFIG.useLocalResponses) {
        return getLocalResponse(message);
    } else {
        try {
            const response = await fetch(CONFIG.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            return data.response || getLocalResponse(message);
        } catch (error) {
            console.error('API Error:', error);
            return getLocalResponse(message);
        }
    }
}

// Get Local Response
function getLocalResponse(message) {
    const lowercaseMessage = message.toLowerCase();
    
    for (const item of DVNC_RESPONSES) {
        if (item.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
            return item.response;
        }
    }
    
    return "Through Leonardo's polymathic lens, every question reveals hidden connections. Like water finding its path through stone, solutions emerge when we allow knowledge to flow between disciplines. What unexpected connections do you see in your challenge?";
}

// Add Message
function addMessage(text, sender, animate = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (animate && sender === 'bot') {
        typeMessage(contentDiv, text);
    } else {
        contentDiv.textContent = text;
    }
    
    messageDiv.appendChild(contentDiv);
    elements.chatMessages.appendChild(messageDiv);
    
    // Liquid scroll
    scrollToBottom();
}

// Type Message with Liquid Flow
function typeMessage(element, text) {
    let index = 0;
    element.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            const charsToAdd = text.substr(index, 3);
            element.textContent += charsToAdd;
            index += 3;
        } else {
            clearInterval(typeInterval);
        }
        scrollToBottom();
    }, CONFIG.typingDelay);
}

// Typing Indicator
function showTypingIndicator() {
    elements.typingIndicator.style.display = 'flex';
    scrollToBottom();
}

function hideTypingIndicator() {
    elements.typingIndicator.style.display = 'none';
}

// Smooth Scroll
function scrollToBottom() {
    elements.chatMessages.scrollTo({
        top: elements.chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-expand {
        to {
            transform: translate(-50%, -50%) scale(10);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export API
window.DVNC = {
    sendMessage,
    addMessage,
    resetToHome,
    setApiEndpoint: (endpoint) => {
        CONFIG.apiEndpoint = endpoint;
        CONFIG.useLocalResponses = false;
    }
};
