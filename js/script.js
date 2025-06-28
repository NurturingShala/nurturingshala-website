// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
// determineDosha function is defined in dosha.js

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Add animation to mobile menu icon
mobileMenu.addEventListener('click', function() {
    const spans = this.querySelectorAll('span');
    spans[0].style.transform = this.classList.contains('active') ? 'rotate(45deg) translateY(10px)' : '';
    spans[1].style.opacity = this.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = this.classList.contains('active') ? 'rotate(-45deg) translateY(-10px)' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});


// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Dosha Survey Functionality
document.addEventListener('DOMContentLoaded', function() {
    const doshaForm = document.getElementById('doshaForm');
    const doshaResult = document.getElementById('doshaResult');
    
    if (doshaForm) {
        doshaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateDosha();
        });
        
        // Add change listeners to update progress
        const radioButtons = doshaForm.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', updateProgress);
        });
    }
});

function updateProgress() {
    const totalQuestions = 11;
    const answeredQuestions = new Set();
    
    // Count unique answered questions
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => {
        answeredQuestions.add(radio.name);
    });
    
    const progress = (answeredQuestions.size / totalQuestions) * 100;
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill && progressText) {
        progressFill.style.width = progress + '%';
        progressText.textContent = `${answeredQuestions.size} of ${totalQuestions} questions completed`;
        
        // Update submit button state
        const submitButton = document.querySelector('.survey-submit');
        if (answeredQuestions.size === totalQuestions) {
            submitButton.style.opacity = '1';
            submitButton.style.pointerEvents = 'auto';
            submitButton.textContent = 'DISCOVER MY DOSHA';
        } else {
            submitButton.style.opacity = '0.6';
            submitButton.style.pointerEvents = 'none';
            submitButton.textContent = `Complete ${totalQuestions - answeredQuestions.size} more questions`;
        }
    }
}

function calculateDosha() {
    const formData = new FormData(document.getElementById('doshaForm'));
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    // Check if all questions are answered
    const questions = document.querySelectorAll('input[type="radio"]');
    const questionNames = [...new Set([...questions].map(q => q.name))];
    const answeredQuestions = [...formData.keys()];
    
    if (answeredQuestions.length < questionNames.length) {
        alert('Please answer all questions to discover your dosha.');
        return;
    }
    
    const answers = [];
    for (let [key, value] of formData.entries()) {
        scores[value]++;
        answers.push(value);
    }

    const { dominant, secondary } = typeof determineDosha === 'function'
        ? determineDosha(answers)
        : { dominant: null, secondary: null };

    console.log('Scores:', scores); // Debug line
    console.log('Dominant:', dominant); // Debug line

    displayResult(dominant, secondary, scores);
}

function displayResult(dominant, secondary, scores) {
    const resultContent = document.getElementById('resultContent');
    const recommendations = document.getElementById('recommendations');
    const doshaResult = document.getElementById('doshaResult');
    
    const doshaInfo = {
        vata: {
            name: 'Vata',
            element: 'Air & Space',
            qualities: 'Light, Cold, Dry, Rough, Moving, Quick',
            description: 'Vata types are energetic, creative, and flexible when balanced. They tend to be thin, quick-thinking, and love movement and change.',
            characteristics: [
                { title: 'Physical', content: 'Thin build, dry skin, cold hands/feet, variable appetite' },
                { title: 'Mental', content: 'Creative, quick thinking, enthusiastic, good at initiating' },
                { title: 'Emotional', content: 'Joyful, adaptable, but can become anxious or worried' }
            ],
            recommendations: {
                diet: ['Warm, cooked foods', 'Sweet, sour, salty tastes', 'Regular meal times', 'Warm drinks'],
                lifestyle: ['Regular routine', 'Adequate rest', 'Gentle exercise', 'Warm environments'],
                yoga: ['Grounding poses', 'Slow, steady practice', 'Focus on stability', 'Restorative yoga']
            }
        },
        pitta: {
            name: 'Pitta',
            element: 'Fire & Water',
            qualities: 'Hot, Sharp, Light, Oily, Liquid, Spreading',
            description: 'Pitta types are intelligent, focused, and determined when balanced. They have strong digestion, leadership qualities, and enjoy challenges.',
            characteristics: [
                { title: 'Physical', content: 'Medium build, warm body, good appetite, soft skin' },
                { title: 'Mental', content: 'Sharp intellect, focused, goal-oriented, good leadership' },
                { title: 'Emotional', content: 'Confident, courageous, but can become irritable or critical' }
            ],
            recommendations: {
                diet: ['Cool, fresh foods', 'Sweet, bitter, astringent tastes', 'Avoid spicy foods', 'Cool drinks'],
                lifestyle: ['Moderate exercise', 'Cool environments', 'Avoid overheating', 'Regular breaks'],
                yoga: ['Cooling poses', 'Moderate intensity', 'Moon salutations', 'Avoid hot yoga']
            }
        },
        kapha: {
            name: 'Kapha',
            element: 'Earth & Water',
            qualities: 'Heavy, Slow, Cool, Oily, Smooth, Stable',
            description: 'Kapha types are calm, loving, and patient when balanced. They have strong immunity, steady energy, and excellent long-term memory.',
            characteristics: [
                { title: 'Physical', content: 'Larger build, smooth skin, strong immunity, slow digestion' },
                { title: 'Mental', content: 'Calm, steady, good memory, methodical thinking' },
                { title: 'Emotional', content: 'Loving, patient, loyal, but can become attached or lethargic' }
            ],
            recommendations: {
                diet: ['Light, warm foods', 'Pungent, bitter, astringent tastes', 'Smaller portions', 'Warm spices'],
                lifestyle: ['Regular vigorous exercise', 'Early rising', 'Stimulating activities', 'Dry environments'],
                yoga: ['Energizing poses', 'Dynamic practice', 'Sun salutations', 'Heating breaths']
            }
        }
    };
    
    const primaryDosha = doshaInfo[dominant];
    const isDual = scores[secondary] > 0 && (scores[dominant] - scores[secondary] <= 2);
    
    resultContent.innerHTML = `
        <div class="dosha-header">
            <div class="dosha-badge ${dominant}">
                <h2>${primaryDosha.name} ${isDual ? `+ ${doshaInfo[secondary].name}` : ''}</h2>
                <span class="dosha-element">${primaryDosha.element}</span>
            </div>
        </div>
        
        <div class="dosha-description">
            <div class="dosha-summary">
                <h4>Your Ayurvedic Constitution</h4>
                <p><strong>Primary Dosha:</strong> ${primaryDosha.name} ${isDual ? `with secondary ${doshaInfo[secondary].name}` : ''}</p>
                <p><strong>Element:</strong> ${primaryDosha.element}</p>
                <p><strong>Key Qualities:</strong> ${primaryDosha.qualities}</p>
            </div>
            
            <div class="dosha-explanation">
                <p>${primaryDosha.description}</p>
            </div>
            
            <div class="dosha-characteristics">
                ${primaryDosha.characteristics.map(char => `
                    <div class="characteristic-item">
                        <h5>${char.title}</h5>
                        <p>${char.content}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    recommendations.innerHTML = `
        <div class="recommendations-grid">
            <div class="recommendation-category">
                <h5>Dietary Guidelines</h5>
                <ul>
                    ${primaryDosha.recommendations.diet.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="recommendation-category">
                <h5>Lifestyle Tips</h5>
                <ul>
                    ${primaryDosha.recommendations.lifestyle.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="recommendation-category">
                <h5>Yoga Practice</h5>
                <ul>
                    ${primaryDosha.recommendations.yoga.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Update button text to show result
    const submitButton = document.querySelector('.survey-submit');
    submitButton.textContent = `Your Dosha: ${primaryDosha.name}${isDual ? ` with ${doshaInfo[secondary].name}` : ''}`;
    submitButton.classList.add('completed');
    
    // Add confetti effect
    createConfetti();
    
    doshaResult.style.display = 'block';
    
    // Smooth scroll with delay for animation
    setTimeout(() => {
        doshaResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
}

// Confetti effect for survey completion
function createConfetti() {
    const colors = ['#7C9885', '#9CAF88', '#E8DCC4', '#FAF8F3'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationName = 'confettiFall';
        confetti.style.animationTimingFunction = 'linear';
        confetti.style.animationFillMode = 'forwards';
        confettiContainer.appendChild(confetti);
    }

    // Add CSS animation
    if (!document.getElementById('confettiStyles')) {
        const style = document.createElement('style');
        style.id = 'confettiStyles';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Clean up after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}