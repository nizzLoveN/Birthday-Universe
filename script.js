/* =======================================================
   A LITTLE UNIVERSE FOR YOU - INTERACTION LOGIC
   ======================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SCROLL REVEAL ANIMATION (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.fade-up');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- 2. MUSIC PLAYER LOGIC ---
    const bgMusic = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const iconPlay = document.querySelector('.icon-play');
    const iconPause = document.querySelector('.icon-pause');
    const progressFill = document.getElementById('progress-fill');
    const progressBg = document.getElementById('progress-bg');
    let isPlaying = false;

    // Toggle Play/Pause
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
        } else {
            bgMusic.play().catch(e => console.log("Audio autoplay prevented by browser"));
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        }
        isPlaying = !isPlaying;
    });

    // Update Progress Bar
    bgMusic.addEventListener('timeupdate', () => {
        if(bgMusic.duration) {
            const progressPercent = (bgMusic.currentTime / bgMusic.duration) * 100;
            progressFill.style.width = `${progressPercent}%`;
        }
    });

    // Seek in Progress Bar
    progressBg.addEventListener('click', (e) => {
        const width = progressBg.clientWidth;
        const clickX = e.offsetX;
        const duration = bgMusic.duration;
        bgMusic.currentTime = (clickX / width) * duration;
    });

    // --- 3. 30 ROMANTIC QUOTES GENERATOR & CAROUSEL ---
    const quotes = [
        "Semoga langkahmu selalu dipenuhi hal baik, dan semoga aku selalu punya kesempatan melihat senyummu.",
        "Bukan tentang seberapa lama kita saling mengenal, tapi seberapa dalam kau membuatku merasa pulang.",
        "Di antara miliaran manusia, menemukanmu adalah kebetulan yang paling aku syukuri.",
        "Setiap hari bersamamu adalah lembaran puisi yang tidak pernah selesai kutulis.",
        "Kau adalah tenang dalam setiap badai, dan terang dalam setiap gelapku.",
        "Mencintaimu bukan sekadar perasaan, tapi sebuah keputusan yang selalu aku rayakan setiap hari.",
        "Tawamu adalah melodi favorit yang selalu ingin kudengar sepanjang sisa hidupku.",
        "Tidak ada tempat yang lebih nyaman selain di sampingmu.",
        "Aku mencintaimu, lebih dari kata-kata yang bisa aku susun hari ini.",
        "Kehadiranmu mengubah hal-hal biasa menjadi memori yang luar biasa.",
        "Jika waktu bisa dihentikan, aku ingin menghentikannya di saat kau menatap mataku.",
        "Kau membuat dunia yang bising ini terasa begitu damai.",
        "Bagiku, keindahan sejati adalah saat melihat matamu berbinar membicarakan mimpimu.",
        "Tidak ada jarak yang terlalu jauh jika kau adalah tujuannya.",
        "Aku ingin menjadi alasan di balik senyummu, sama seperti kau menjadi alasan di balik bahagiaku.",
        "Mencintaimu adalah bagian paling natural dari keberadaanku.",
        "Setiap detak jantungku rasanya selalu memanggil namamu.",
        "Kau adalah seni paling indah yang pernah diciptakan semesta.",
        "Dalam setiap doa, namamu adalah satu-satunya yang tak pernah terlewatkan.",
        "Hari ini usiamu bertambah, dan begitu juga dengan rasa cintaku padamu.",
        "Semesta pasti sedang tersenyum saat kau dilahirkan ke dunia ini.",
        "Kehadiranmu adalah hadiah terindah yang tak pernah berani kuminta.",
        "Bersamamu, aku belajar bahwa cinta adalah tentang bertumbuh bersama.",
        "Jalan kita masih panjang, dan aku bersyukur karena kau yang menggenggam tanganku.",
        "Kau bukan hanya duniaku, kau adalah seluruh alam semestaku.",
        "Setiap detik bersamamu adalah cerita yang tidak ingin aku akhiri.",
        "Bahkan dalam diam, kau tetap menjadi hal paling menenangkan yang kumiliki.",
        "Semoga di usiamu yang baru, semua mimpimu perlahan menjadi nyata, dan aku ada di sana untuk melihatnya.",
        "Aku memilihmu hari ini, esok, dan di sisa waktu yang aku punya.",
        "Selamat ulang tahun, cintaku. Semoga kita selalu bersama di setiap perayaanmu selanjutnya."
    ];

    const quotesContainer = document.getElementById('quotes-container');
    let currentQuoteIndex = 0;

    // Inject all quotes as hidden elements
    quotes.forEach((quote, index) => {
        const p = document.createElement('p');
        p.className = 'quote-text';
        if (index === 0) p.classList.add('active');
        p.innerText = `"${quote}"`;
        quotesContainer.appendChild(p);
    });

    const quoteElements = document.querySelectorAll('.quote-text');
    
    // Rotate Quotes every 6 seconds
    setInterval(() => {
        quoteElements[currentQuoteIndex].classList.remove('active');
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        quoteElements[currentQuoteIndex].classList.add('active');
    }, 6000);

    // --- 4. FLOATING PARTICLES (Sparkles/Hearts) GENERATOR ---
    function createParticles() {
        const container = document.getElementById('ambient-canvas');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 6 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 182, 193, 0.4)'; // Soft blush
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
            
            container.appendChild(particle);
        }
    }
    
    // Add CSS Keyframe for floating dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes floatParticle {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
    createParticles();


    // --- 5. MINI GAME: COLLECT THE HEARTS ---
    const startGameBtn = document.getElementById('start-game-btn');
    const gameCanvas = document.getElementById('game-canvas');
    const scoreDisplay = document.getElementById('score');
    const gameReward = document.getElementById('game-reward');
    
    let score = 0;
    let gameInterval;
    const targetScore = 10;

    startGameBtn.addEventListener('click', () => {
        startGameBtn.style.display = 'none';
        score = 0;
        scoreDisplay.innerText = score;
        gameReward.classList.add('hidden');
        
        // Spawn hearts every 800ms
        gameInterval = setInterval(spawnHeart, 800);
    });

    function spawnHeart() {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * (gameCanvas.clientWidth - 30) + 'px';
        
        // Random speed
        const duration = Math.random() * 2 + 2; 
        heart.style.animationDuration = duration + 's';

        // Click to catch
        heart.addEventListener('click', () => {
            score++;
            scoreDisplay.innerText = score;
            heart.remove();
            createPopEffect(heart.style.left, heart.style.top); // Optional polish

            if (score >= targetScore) {
                endGame();
            }
        });

        // Remove if it falls out of bounds
        heart.addEventListener('animationend', () => {
            heart.remove();
        });

        gameCanvas.appendChild(heart);
    }

    function endGame() {
        clearInterval(gameInterval);
        // Clear remaining hearts
        gameCanvas.innerHTML = '';
        gameReward.classList.remove('hidden');
    }

    function createPopEffect(x, y) {
        // Simple visual feedback when catching a heart can be added here
    }

    // --- 6. SURPRISE GIFT INTERACTION ---
    const giftBox = document.getElementById('gift-box');
    const giftMessage = document.getElementById('gift-message');
    const giftHint = document.querySelector('.gift-hint');

    giftBox.addEventListener('click', () => {
        if (!giftBox.classList.contains('opened')) {
            giftBox.classList.add('opened');
            giftHint.style.display = 'none';
            
            setTimeout(() => {
                giftMessage.classList.remove('hidden');
            }, 600);
        }
    });

    // --- 7. DIGITAL LETTER INTERACTION ---
    const envelope = document.getElementById('envelope');
    const letterHint = document.querySelector('.letter-hint');
    let isEnvelopeOpen = false;

    envelope.addEventListener('click', () => {
        if (!isEnvelopeOpen) {
            envelope.classList.add('open');
            letterHint.style.display = 'none';
            isEnvelopeOpen = true;
        }
    });

    // --- 8. SECRET MESSAGE MODAL ---
    const secretTrigger = document.getElementById('secret-trigger');
    const secretModal = document.getElementById('secret-modal');
    const closeSecret = document.getElementById('close-secret');

    secretTrigger.addEventListener('click', () => {
        secretModal.classList.add('show');
    });

    closeSecret.addEventListener('click', () => {
        secretModal.classList.remove('show');
    });

});

// Global smooth scroll function
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
