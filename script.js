// Leonardo Da Vinci Futuristic Chatbot Script

// Configuration
const CONFIG = {
    typingDelay: 50,
    thinkingTime: 1500,
    annotationInterval: 8000,
    goldenRatio: 1.618,
    apiEndpoint: '/api/chat', // Replace with your API endpoint if needed
    useLocalResponses: true // Set to false when you have a real backend
};

// Renaissance-themed responses (for demo/fallback)
const LEONARDO_RESPONSES = [
    {
        keywords: ['golden ratio', 'phi', 'mathematics'],
        response: "Ah, the divine proportion! φ = 1.618... This mathematical constant appears throughout nature - from the spiral of shells to the arrangement of flower petals. In my designs, I use this ratio to achieve perfect harmony. The human body itself follows these proportions, as shown in my Vitruvian Man. This is not mere coincidence, but evidence of the underlying mathematical order of creation."
    },
    {
        keywords: ['art', 'painting', 'mona lisa'],
        response: "Art is the supreme form of human expression, where science and beauty converge. The Mona Lisa's smile captures not just a moment, but the eternal mystery of human emotion. Through sfumato - the delicate blending of colors and tones - we can represent the softness of flesh and the atmosphere itself. Remember: painting is poetry that is seen rather than felt."
    },
    {
        keywords: ['innovation', 'invention', 'future'],
        response: "Innovation springs from observing nature with curious eyes. My flying machines were inspired by birds, my hydraulic systems by rivers. The future belongs to those who can see beyond the present limitations. I envision cities with multiple levels, machines that harness the power of water and wind, and devices that extend human capabilities. The only limit is imagination coupled with understanding."
    },
    {
        keywords: ['wisdom', 'knowledge', 'learning'],
        response: "Learning never exhausts the mind, rather it ignites it with endless possibility. I have been impressed with the urgency of doing - knowing is not enough, we must apply; willing is not enough, we must do. Obstacles cannot crush me; every obstacle yields to stern resolve. The noblest pleasure is the joy of understanding."
    },
    {
        keywords: ['science', 'anatomy', 'nature'],
        response: "To understand the human body, I performed over 30 dissections, revealing the miraculous machinery within. Each organ, each muscle, is perfectly designed for its function. Nature is the supreme teacher - her laws govern all things. The eye, which is called the window of the soul, is the principal means by which understanding may most fully appreciate the infinite works of nature."
    },
    {
        keywords: ['hello', 'hi', 'greetings'],
        response: "Greetings, curious soul! Like the opening of a flower to the morning sun, our conversation begins. I am here to share the wisdom of art, science, and the eternal dance between them. What mysteries of the universe shall we explore together today?"
    },
    {
        keywords: ['who are you', 'leonardo', 'da vinci'],
        response: "I am Leonardo, a student of all that can be known. Artist, scientist, engineer - these are but facets of the same crystal of understanding. Born in Vinci, I have dedicated my life to unraveling nature's secrets and creating beauty that transcends time. Through this digital incarnation, my spirit of inquiry lives on. How may I illuminate your path today?"
    },
    {
        keywords: ['help', 'what can you do', 'capabilities'],
        response: "I can guide you through the realms of art and science, philosophy and innovation. Ask me about the golden ratio that governs beauty, the principles of flight I discovered centuries before they took to the skies, or the intersection of anatomy and art. I can inspire your creativity, explain the mechanics of nature, or discuss the profound connections between all things. What sparks your curiosity?"
    }
];

// Latin phrases for floating annotations
const ANNOTATIONS = [
    "Ostinato rigore",
    "Dimmi dimmi",
    "Saper vedere",
    "La pittura è mentale",
    "Ogni nostra cognizione",
    "Principia della scienza",
    "Arte e natura",
    "Divina proportione",
    "Mechanics naturae",
    "Corpus perfectum"
];

// DOM Elements
const elements = {
    chatMessages: null,
    messageInput: null,
    sendButton: null,
    typingIndicator: null,
    welcomeSection: null,
    quickActions: null,
    annotationsContainer: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    setupEventListeners();
    setupAnimations();
    startAnnotations();
    addWelcomeMessage();
});

// Initialize DOM elements
function initializeElements() {
    elements.chatMessages = document.getElementById('chatMessages');
    elements.messageInput = document.getElementById('messageInput');
    elements.sendButton = document.getElementById('sendButton');
    elements.typingIndicator = document.getElementById('typingIndicator');
    elements.welcomeSection = document.getElementById('welcomeSection');
    elements.quickActions = document.querySelectorAll('.quick-action');
    elements.annotationsContainer = document.querySelector('.annotations-container');
}

// Setup event listeners
function setupEventListeners() {
    // Send button click
    elements.sendButton.addEventListener('click', sendMessage);
    
    // Enter key press
    elements.messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Quick action buttons
    elements.quickActions.forEach(button => {
        button.addEventListener('click', () => {
            const message = button.getAttribute('data-message');
            elements.messageInput.value = message;
            sendMessage();
        });
    });
    
    // Input focus effects
    elements.messageInput.addEventListener('focus', () => {
        elements.messageInput.parentElement.classList.add('focused');
    });
    
    elements.messageInput.addEventListener('blur', () => {
        elements.messageInput.parentElement.classList.remove('focused');
    });
}

// Setup animations
function setupAnimations() {
    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const vitruvian = document.querySelector('.vitruvian-bg');
        if (vitruvian) {
            const translateX = (x - 0.5) * 20;
            const translateY = (y - 0.5) * 20;
            vitruvian.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px))`;
        }
    });
}

// Start floating annotations
function startAnnotations() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFloatingAnnotation();
        }
    }, CONFIG.annotationInterval);
}

// Create floating annotation
function createFloatingAnnotation() {
    const annotation = document.createElement('div');
    annotation.className = 'annotation';
    annotation.textContent = ANNOTATIONS[Math.floor(Math.random() * ANNOTATIONS.length)];
    
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    const rotation = Math.random() * 10 - 5;
    
    annotation.style.left = `${x}%`;
    annotation.style.top = `${y}%`;
    annotation.style.transform = `rotate(${rotation}deg)`;
    
    elements.annotationsContainer.appendChild(annotation);
    
    // Remove after animation
    setTimeout(() => {
        annotation.remove();
    }, 10000);
}

// Add welcome message
function addWelcomeMessage() {
    setTimeout(() => {
        const welcomeMsg = "Welcome, seeker of knowledge! I am Leonardo, bridging centuries to converse with you through this digital canvas. How may I illuminate your understanding today?";
        addMessage(welcomeMsg, 'bot', true);
    }, 1000);
}

// Send message
async function sendMessage() {
    const message = elements.messageInput.value.trim();
    if (!message) return;
    
    // Hide welcome section on first message
    if (elements.welcomeSection.style.display !== 'none') {
        elements.welcomeSection.style.display = 'none';
    }
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input and add ripple effect
    elements.messageInput.value = '';
    elements.sendButton.classList.add('sending');
    setTimeout(() => elements.sendButton.classList.remove('sending'), 600);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get response
    setTimeout(async () => {
        hideTypingIndicator();
        const response = await getLeonardoResponse(message);
        addMessage(response, 'bot', true);
    }, CONFIG.thinkingTime);
}

// Get Leonardo's response
async function getLeonardoResponse(message) {
    if (CONFIG.useLocalResponses) {
        // Use local responses for demo
        return getLocalResponse(message);
    } else {
        // Call your actual API
        try {
            const response = await fetch(CONFIG.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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

// Get local response based on keywords
function getLocalResponse(message) {
    const lowercaseMessage = message.toLowerCase();
    
    // Find matching response based on keywords
    for (const item of LEONARDO_RESPONSES) {
        if (item.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
            return item.response;
        }
    }
    
    // Default response
    return "Fascinating inquiry! Like the interconnected gears of my mechanical designs, every question leads to deeper understanding. The answer you seek lies at the intersection of observation and imagination. Consider how nature herself might solve this puzzle - for she is the supreme teacher. What patterns do you observe? What connections emerge when you look with the eyes of both artist and scientist?";
}

// Add message to chat
function addMessage(text, sender, animate = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (animate && sender === 'bot') {
        // Typing animation for bot messages
        typeMessage(contentDiv, text);
    } else {
        contentDiv.textContent = text;
    }
    
    // Add timestamp
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = getCurrentTime();
    contentDiv.appendChild(timeDiv);
    
    messageDiv.appendChild(contentDiv);
    elements.chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    scrollToBottom();
}

// Type message with animation
function typeMessage(element, text) {
    let index = 0;
    element.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
            // Add timestamp after typing completes
            const timeDiv = document.createElement('div');
            timeDiv.className = 'message-time';
            timeDiv.textContent = getCurrentTime();
            element.appendChild(timeDiv);
        }
        scrollToBottom();
    }, CONFIG.typingDelay);
}

// Show typing indicator
function showTypingIndicator() {
    elements.typingIndicator.style.display = 'flex';
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    elements.typingIndicator.style.display = 'none';
}

// Scroll to bottom of chat
function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${period}`;
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K to focus input
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        elements.messageInput.focus();
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        elements.messageInput.value = '';
        elements.messageInput.blur();
    }
});

// Add visual feedback for voice (future feature)
function initVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        // Voice recognition can be added here
        console.log('Voice recognition available');
    }
}

// Golden ratio calculations for dynamic layouts
function applyGoldenRatio() {
    const width = window.innerWidth;
    const goldenWidth = Math.floor(width / CONFIG.goldenRatio);
    // Apply golden ratio to layout if needed
}

// Window resize handler
window.addEventListener('resize', () => {
    applyGoldenRatio();
});

// Add pulse effect to logo
setInterval(() => {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.animation = 'none';
        setTimeout(() => {
            logo.style.animation = '';
        }, 10);
    }
}, 10000);

// Export for potential API integration
window.LeonardoChatbot = {
    sendMessage,
    addMessage,
    clearChat: () => {
        elements.chatMessages.innerHTML = '';
        elements.welcomeSection.style.display = 'block';
    },
    setApiEndpoint: (endpoint) => {
        CONFIG.apiEndpoint = endpoint;
        CONFIG.useLocalResponses = false;
    }
};
