const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const intro = document.getElementById("intro");
const envelopeScreen = document.getElementById("envelopeScreen");
const letterScreen = document.getElementById("letterScreen");
const finalScreen = document.getElementById("finalScreen");
const startBtn = document.getElementById("startBtn");
const envelope = document.getElementById("envelope");
const finishBtn = document.getElementById("finishBtn");
const typed = document.getElementById("typed");

let musicPlaying = false;

/* --- MÚSICA --- */
musicBtn.addEventListener("click", () => {
    if (musicPlaying) {
        music.pause();
        musicBtn.innerHTML = "🔇";
        musicPlaying = false;
    } else {
        music.play();
        musicBtn.innerHTML = "🎵";
        musicPlaying = true;
    }
});

/* --- CAMBIO DE PANTALLA --- */
function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

startBtn.addEventListener("click", () => {
    if (!musicPlaying) {
        music.play().catch(() => {});
        musicPlaying = true;
    }
    showScreen(envelopeScreen);
});

/* --- SOBRE ANIMADO --- */
envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    setTimeout(() => {
        showScreen(letterScreen);
        typeLetter();
    }, 1400); // Tiempo ajustado para que sea más fluido
});

/* --- TEXTO CON SCROLL Y EFECTO MÁQUINA DE ESCRIBIR --- */
const message = `Mi niña de ojos bonitos ❤️

Siéntete feliz por el camino que has recorrido, por tus logros y sobre todo por la valentía y fuerza que tienes para continuar día a día.

Quiero que sepas que me siento muy orgulloso de ti. Tal vez no todas las personas vieron cuánto ayudaste, cuánto cariño les diste a los niños o todo el esfuerzo que pusiste durante estos meses para cumplir tus tareas y tu carrera universitaria. Y aunque yo no pude estar presente en tu día a día, se que diste lo mejor de tí.

Sé lo mucho que te esforzaste a pesar de los bajones emocionales que pudiste tener, a pesar de las dificultades, de sentirte triste, de sentirte sola, insuficiente, de no saber que hacer con tu vida, de no saber como mejorar o encontrar paz; y a pesar de toda esa carga, nuna dejaste de ser la persona increíble que eres. Y eso vale muchísimo más que cualquier reconocimiento.

Estoy seguro de que muchos de tus pequeños recordarán a la chica dulce que siempre estuvo ahí para ellos.

Nunca dudes de lo increíble que eres.

Sin duda la vida esta llena de momentos muy tristes, pero también de alegrías donde puedes encontrar fortaleza y confianza en ti misma. Siempre voy a apoyarte y siempre voy a sentirme orgulloso de la mujer maravillosa que eres.

Con todo mi cariño,
Pimpon ❤️`;

let index = 0;

function typeLetter() {
    typed.innerHTML = "";
    index = 0;
    finishBtn.style.display = "none";
    write();
}

function write() {
    if (index < message.length) {
        typed.innerHTML += message.charAt(index);
        index++;
        
        // Autoscroll suave hacia abajo mientras escribe
        const scrollContainer = document.querySelector('.scrollable-text');
        scrollContainer.scrollTop = scrollContainer.scrollHeight;

        setTimeout(write, 35); // Velocidad de escritura
    } else {
        finishBtn.style.display = "inline-block";
    }
}

finishBtn.addEventListener("click", () => {
    showScreen(finalScreen);
    launchConfetti();
});

/* --- ROSAS ROJAS CAYENDO (Modificado) --- */
const petals = document.getElementById("petals");

function createRose() {
    const r = document.createElement("div");
    r.className = "petal";
    r.innerHTML = "🌹"; // Emojis de rosas en lugar de cuadrados rosas
    r.style.fontSize = (15 + Math.random() * 20) + "px"; // Tamaño aleatorio
    r.style.left = Math.random() * window.innerWidth + "px";
    r.style.animationDuration = (4 + Math.random() * 4) + "s";
    petals.appendChild(r);

    setTimeout(() => {
        r.remove();
    }, 8000);
}
setInterval(createRose, 450);

/* --- CORAZONES Y ESTRELLAS FLOTANTES --- */
const hearts = document.getElementById("hearts");
function createHeart() {
    const h = document.createElement("div");
    h.className = "heart";
    const icons = ["❤", "💖", "💕", "💗"];
    h.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    h.style.left = Math.random() * window.innerWidth + "px";
    h.style.fontSize = (15 + Math.random() * 15) + "px";
    h.style.animationDuration = (8 + Math.random() * 5) + "s";
    hearts.appendChild(h);
    setTimeout(() => h.remove(), 12000);
}
setInterval(createHeart, 900);

const stars = document.getElementById("stars");
for (let i = 0; i < 25; i++) {
    const s = document.createElement("div");
    s.className = "star";
    s.innerHTML = "✦";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = (Math.random() * 2) + "s";
    s.style.fontSize = (8 + Math.random() * 10) + "px";
    stars.appendChild(s);
}

/* --- CONFETI PARA EL FINAL --- */
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
let pieces = [];

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Piece {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -20;
        this.size = 6 + Math.random() * 8;
        this.speed = 3 + Math.random() * 4;
        this.rotation = Math.random() * 360;
        this.spin = Math.random() * 10 - 5;
        this.color = ["#ff8fab", "#ffb3c6", "#ff4e88", "#ffc8dd", "#f8c8ff", "#ffffff"][Math.floor(Math.random() * 6)];
    }
    update() {
        this.y += this.speed;
        this.rotation += this.spin;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function launchConfetti() {
    pieces = [];
    for (let i = 0; i < 150; i++) pieces.push(new Piece());
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach(p => { p.update(); p.draw(); });
    pieces = pieces.filter(p => p.y < confettiCanvas.height + 30);
    if (pieces.length > 0) requestAnimationFrame(animateConfetti);
}

/* --- TOQUE MÁGICO (Estrellitas al tocar la pantalla) --- */
document.body.addEventListener("click", function(e) {
    if (e.target.tagName === 'BUTTON') return; // Evita interferir con los botones
    for(let i = 0; i < 5; i++){
        const spark = document.createElement("div");
        spark.innerHTML = "✨";
        spark.style.position = "fixed";
        spark.style.left = e.clientX + "px";
        spark.style.top = e.clientY + "px";
        spark.style.pointerEvents = "none";
        spark.style.fontSize = (12 + Math.random() * 10) + "px";
        spark.style.transition = "0.8s ease-out";
        spark.style.zIndex = "999";
        document.body.appendChild(spark);
        
        requestAnimationFrame(() => {
            spark.style.transform = `translate(${(Math.random()*100)-50}px, ${(Math.random()*100)-50}px) scale(0)`;
            spark.style.opacity = "0";
        });
        setTimeout(() => spark.remove(), 800);
    }
});