const FLAMES_MEANINGS = {
    F: { label: "Friends", emoji: "👫", desc: "Great friends forever!" },
    L: { label: "Love", emoji: "💕", desc: "True love blossoms!" },
    A: { label: "Affection", emoji: "🥰", desc: "Deep affection & care!" },
    M: { label: "Marriage", emoji: "💍", desc: "Wedding bells ringing!" },
    E: { label: "Enemies", emoji: "😤", desc: "Playful rivalry!" },
    S: { label: "Soulmates", emoji: "💫", desc: "Destined to be together!" }
};

const MESSAGES = [
    "The stars align for you two! ✨",
    "Cupid's arrow hit the mark! 💘",
    "A match made in heaven! 🌟",
    "Love is in the air! 💖",
    "Your hearts beat as one! 💓",
    "Destiny brought you together! 🌙",
    "Pure magic between you! ✨",
    "Forever and always! 💍"
];

function createBackgroundHearts() {
    const container = document.getElementById('bgHearts');
    const heartCount = 25;
    const hearts = ['💖', '💕', '💗', '💓', '💞', '💝', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🤎', '🖤', '💌', '💋', '💑', '💏'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 3 + 2) + 'rem';
        heart.style.animationDelay = Math.random() * 20 + 's';
        heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(heart);
    }
}

function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const elements = ['🌸', '🌺', '🌹', '🌷', '🌻', '🌼', '💐', '🦋', '✨', '💫', '⭐', '🌟', '💎', '🎀', '🍓', '🍒', '🧁', '🍰', '🍫', '☕'];
    const count = 15;
    
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'float-element';
        el.textContent = elements[Math.floor(Math.random() * elements.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        el.style.animationDelay = Math.random() * 15 + 's';
        el.style.animationDuration = (Math.random() * 8 + 10) + 's';
        container.appendChild(el);
    }
}

function calculateFLAMES(name1, name2) {
    const combined = (name1 + name2).toLowerCase().replace(/[^a-z]/g, '');
    const charCount = {};
    
    for (const char of combined) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    let remainingCount = 0;
    for (const count of Object.values(charCount)) {
        if (count % 2 !== 0) remainingCount++;
    }
    
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let index = 0;
    
    while (flames.length > 1) {
        index = (index + remainingCount - 1) % flames.length;
        flames.splice(index, 1);
    }
    
    return flames[0];
}

function calculateLoveScore(name1, name2) {
    const str = (name1 + name2).toLowerCase();
    let score = 0;
    
    for (let i = 0; i < str.length; i++) {
        score += str.charCodeAt(i);
    }
    
    score = (score * 7 + name1.length * 13 + name2.length * 11) % 101;
    return Math.max(45, Math.min(100, score));
}

function animateScore(targetScore) {
    const scoreValue = document.getElementById('scoreValue');
    const barFill = document.getElementById('barFill');
    let currentScore = 0;
    const duration = 1500;
    const startTime = Date.now();
    
    function updateScore() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        currentScore = Math.round(targetScore * eased);
        scoreValue.textContent = currentScore + '%';
        barFill.style.width = currentScore + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateScore);
        }
    }
    
    requestAnimationFrame(updateScore);
}

function showResult(flamesResult, score) {
    const resultSection = document.getElementById('resultSection');
    const flamesLetters = document.querySelectorAll('.flame-letter');
    const flamesMeaning = document.getElementById('flamesMeaning');
    const message = document.getElementById('message');
    
    flamesLetters.forEach(letter => {
        letter.classList.remove('active');
        if (letter.dataset.letter === flamesResult) {
            letter.classList.add('active');
        }
    });
    
    const meaning = FLAMES_MEANINGS[flamesResult];
    flamesMeaning.innerHTML = `<span class="emoji">${meaning.emoji}</span> ${meaning.label} - ${meaning.desc}`;
    
    message.textContent = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    
    resultSection.hidden = false;
    animateScore(score);
}

function resetCalculator() {
    document.getElementById('name1').value = '';
    document.getElementById('name2').value = '';
    document.getElementById('resultSection').hidden = true;
    document.getElementById('calculateBtn').disabled = false;
    document.querySelector('.btn-text').hidden = false;
    document.querySelector('.btn-loader').hidden = true;
    
    document.querySelectorAll('.flame-letter').forEach(l => l.classList.remove('active'));
    document.getElementById('flamesMeaning').textContent = '';
    document.getElementById('message').textContent = '';
    document.getElementById('barFill').style.width = '0%';
    document.getElementById('scoreValue').textContent = '0%';
    
    document.getElementById('name1').focus();
}

function handleCalculate() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    const btn = document.getElementById('calculateBtn');
    
    if (!name1 || !name2) {
        shakeInputs();
        return;
    }
    
    btn.disabled = true;
    document.querySelector('.btn-text').hidden = true;
    document.querySelector('.btn-loader').hidden = false;
    
    setTimeout(() => {
        const flamesResult = calculateFLAMES(name1, name2);
        const score = calculateLoveScore(name1, name2);
        showResult(flamesResult, score);
        
        btn.disabled = false;
        document.querySelector('.btn-text').hidden = false;
        document.querySelector('.btn-loader').hidden = true;
    }, 1200);
}

function shakeInputs() {
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach((input, i) => {
        if (!input.value.trim()) {
            input.style.animation = 'none';
            input.offsetHeight;
            input.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => input.style.animation = '', 500);
        }
    });
}

function swapNames() {
    const name1 = document.getElementById('name1');
    const name2 = document.getElementById('name2');
    const temp = name1.value;
    name1.value = name2.value;
    name2.value = temp;
    
    const btn = document.getElementById('swapBtn');
    btn.style.transform = 'rotate(180deg) scale(1.1)';
    setTimeout(() => btn.style.transform = '', 300);
}

document.addEventListener('DOMContentLoaded', () => {
    createBackgroundHearts();
    createFloatingElements();
    
    document.getElementById('calculateBtn').addEventListener('click', handleCalculate);
    document.getElementById('resetBtn').addEventListener('click', resetCalculator);
    document.getElementById('swapBtn').addEventListener('click', swapNames);
    
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleCalculate();
        });
    });
    
    document.getElementById('name1').focus();
});

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-8px); }
        40%, 80% { transform: translateX(8px); }
    }
`;
document.head.appendChild(shakeStyle);