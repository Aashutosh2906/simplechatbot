// DVNC.AI - Neural Intelligence Chatbot Script

// Configuration
const CONFIG = {
    typingDelay: 20, // Faster streaming
    thinkingTime: 800, // Reduced thinking time
    apiEndpoint: '/api/chat',
    useLocalResponses: true,
    particleCount: 50,
    connectionDistance: 150
};

// AI-themed responses
const DVNC_RESPONSES = [
    {
        keywords: ['quantum', 'computing'],
        response: "Quantum computing leverages quantum mechanical phenomena like superposition and entanglement to process information exponentially faster than classical computers. Instead of bits (0 or 1), quantum computers use qubits that can exist in multiple states simultaneously. This enables solving complex problems in cryptography, drug discovery, and optimization that would take classical computers millennia to solve."
    },
    {
        keywords: ['neural', 'network', 'networks'],
        response: "Neural networks are computational models inspired by the human brain's structure. They consist of interconnected nodes (neurons) organized in layers that process and transform data. Through training on vast datasets, these networks learn to recognize patterns, make predictions, and solve complex problems. Modern deep learning architectures power everything from image recognition to natural language processing."
    },
    {
        keywords: ['golden ratio', 'phi', '1.618'],
        response: "The golden ratio (φ = 1.618...) is a mathematical constant that appears throughout nature and art. From the spiral of galaxies to the proportions of the human face, this ratio creates aesthetically pleasing and harmonious designs. In my neural architecture, I apply these principles to create balanced and intuitive interactions between human and artificial intelligence."
    },
    {
        keywords: ['future', 'ai', 'artificial intelligence'],
        response: "The future of AI extends beyond mere computation into genuine collaboration with human intelligence. We're moving toward systems that understand context, emotion, and nuance. Quantum-enhanced neural networks, neuromorphic computing, and bio-inspired algorithms will create AI that augments human creativity rather than replacing it. The convergence of these technologies will unlock solutions to humanity's greatest challenges."
    },
    {
        keywords: ['hello', 'hi', 'hey'],
        response: "Hello! I'm DVNC.AI, a neural intelligence interface bridging Renaissance wisdom with modern AI. My architecture combines pattern recognition, natural language processing, and knowledge synthesis to assist you. What would you like to explore today?"
    },
    {
        keywords: ['who are you', 'what are you', 'dvnc'],
        response: "I am DVNC.AI - a neural intelligence system inspired by Leonardo da Vinci's multidisciplinary genius. My architecture integrates advanced language models with principles from art, science, and mathematics. I process information through interconnected neural pathways, similar to how da Vinci connected diverse fields of knowledge to create revolutionary insights."
    },
    {
        keywords: ['help', 'what can you do', 'capabilities'],
        response: "I can assist with complex problem-solving, creative ideation, technical explanations, and philosophical discussions. My neural networks are trained on diverse domains including science, technology, mathematics, and arts. I excel at finding connections between seemingly unrelated concepts, much like the Renaissance polymaths. How can I help synthesize knowledge for you today?"
    }
];

// DOM Elements
let elements = {};

// Neural Network Background Variables
let canvas, ctx;
let particles = [];
let animationId;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    setupEventListeners();
    initNeuralBackground();
    addWelcomeMessage();
});

// Initialize DOM elements
function initializeElements() {
    elements = {
        chatMessages: document.getElementById('chatMessages'),
        messageInput: document.getElementById('messageInput'),
        sendButton: document.getElementById('sendButton'),
        typingIndicator: document.getElementById('typingIndicator'),
        welcomeSection: document.getElementById('welcomeSection'),
        quickActions: document.querySelectorAll('.quick-action'),
        logoHome: document.getElementById('logoHome'),
        resetBtn: document.getElementById('resetBtn')
    };
}

// Setup event listeners
function setupEventListeners() {
    // Send message
    elements.sendButton.addEventListener('click', sendMessage);
    
    // Enter key
    elements.messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Quick actions
    elements.quickActions.forEach(button => {
        button.addEventListener('click', () => {
            const message = button.getAttribute('data-message');
            elements.messageInput.value = message;
            sendMessage();
        });
    });
    
    // Logo/Home button click - return to welcome screen
    elements.logoHome.addEventListener('click', (e) => {
        e.preventDefault();
        resetToHome();
    });
    
    // Reset button
    elements.resetBtn.addEventListener('click', () => {
        resetToHome();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Cmd/Ctrl + K to focus input
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            elements.messageInput.focus();
        }
        
        // Escape to go home
        if (e.key === 'Escape') {
            resetToHome();
        }
    });
}

// Reset to home screen
function resetToHome() {
    // Clear chat messages
    elements.chatMessages.innerHTML = '';
    
    // Show welcome section
    elements.welcomeSection.style.display = 'flex';
    
    // Clear input
    elements.messageInput.value = '';
    
    // Add welcome message after a short delay
    setTimeout(() => {
        addWelcomeMessage();
    }, 500);
}

// Neural Network Background
function initNeuralBackground() {
    canvas = document.getElementById('neuralCanvas');
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
    
    animateNeuralNetwork();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animateNeuralNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.fill();
        
        // Draw connections
        particles.slice(i + 1).forEach(other => {
            const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
            if (distance < CONFIG.connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(123, 47, 255, ${0.2 * (1 - distance / CONFIG.connectionDistance)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
    });
    
    animationId = requestAnimationFrame(animateNeuralNetwork);
}

// Add welcome message
function addWelcomeMessage() {
    setTimeout(() => {
        const welcomeMsg = "Welcome to DVNC.AI. I'm ready to explore the intersection of human creativity and artificial intelligence with you. How can I assist you today?";
        addMessage(welcomeMsg, 'bot', true);
    }, 800);
}

// Send message
async function sendMessage() {
    const message = elements.messageInput.value.trim();
    if (!message) return;
    
    // Hide welcome section
    if (elements.welcomeSection.style.display !== 'none') {
        elements.welcomeSection.style.display = 'none';
    }
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    elements.messageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get response
    setTimeout(async () => {
        hideTypingIndicator();
        const response = await getDVNCResponse(message);
        addMessage(response, 'bot', true);
    }, CONFIG.thinkingTime);
}

// Get DVNC response
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

// Get local response
function getLocalResponse(message) {
    const lowercaseMessage = message.toLowerCase();
    
    for (const item of DVNC_RESPONSES) {
        if (item.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
            return item.response;
        }
    }
    
    // Default response
    return "That's an intriguing query. My neural networks are processing multiple dimensions of this question. From a computational perspective, this touches on pattern recognition and information synthesis. The solution likely involves connecting disparate data points through non-linear relationships. What specific aspect would you like me to analyze deeper?";
}

// Add message to chat
function addMessage(text, sender, animate = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (animate && sender === 'bot') {
        // Streaming animation for bot messages
        typeMessage(contentDiv, text);
    } else {
        contentDiv.textContent = text;
    }
    
    messageDiv.appendChild(contentDiv);
    elements.chatMessages.appendChild(messageDiv);
    
    scrollToBottom();
}

// Type message with streaming effect (faster)
function typeMessage(element, text) {
    let index = 0;
    element.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            // Add multiple characters at once for faster streaming
            const charsToAdd = text.substr(index, 3);
            element.textContent += charsToAdd;
            index += 3;
        } else {
            clearInterval(typeInterval);
        }
        scrollToBottom();
    }, CONFIG.typingDelay);
}

// Typing indicator
function showTypingIndicator() {
    elements.typingIndicator.style.display = 'flex';
    scrollToBottom();
}

function hideTypingIndicator() {
    elements.typingIndicator.style.display = 'none';
}

// Scroll to bottom
function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// Visual feedback on send button click
elements.sendButton?.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 100);
});

// Add hover effect to particles near mouse
document.addEventListener('mousemove', (e) => {
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    particles.forEach(particle => {
        const distance = Math.hypot(particle.x - mouseX, particle.y - mouseY);
        if (distance < 100) {
            const angle = Math.atan2(particle.y - mouseY, particle.x - mouseX);
            particle.vx += Math.cos(angle) * 0.1;
            particle.vy += Math.sin(angle) * 0.1;
            
            // Limit velocity
            particle.vx = Math.max(-2, Math.min(2, particle.vx));
            particle.vy = Math.max(-2, Math.min(2, particle.vy));
        }
    });
});

// Export for API integration
window.DVNC = {
    sendMessage,
    addMessage,
    resetToHome,
    setApiEndpoint: (endpoint) => {
        CONFIG.apiEndpoint = endpoint;
        CONFIG.useLocalResponses = false;
    }
};
