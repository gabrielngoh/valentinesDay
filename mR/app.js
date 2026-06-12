 
  (() => {
    'use strict';

    // Stars in hero
    const starsContainer = document.getElementById('hero-stars');
    for (let i = 0; i < 55; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2.5 + 0.8;
      s.style.cssText = `
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        width:${size}px; height:${size}px;
        animation-delay:${Math.random()*4}s;
        animation-duration:${2+Math.random()*3}s;
      `;
      starsContainer.appendChild(s);
    }

    // Particles
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize, {passive:true});

    const COLORS = ['#C9A84C','#7A9E7E','#A8C5AC','#E8D08A'];
    const particles = Array.from({length:40}, () => ({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: Math.random()*2.5+1,
      sx: (Math.random()-.5)*.35,
      sy: -(Math.random()*.5+0.18),
      o: Math.random()*.5+0.15,
      cross: Math.random()>.55,
      c: COLORS[Math.floor(Math.random()*COLORS.length)]
    }));

    function drawParticles() {
      ctx.clearRect(0,0,W,H);
      particles.forEach(p => {
        p.y += p.sy; p.x += p.sx;
        if(p.y < -8) { p.y = H+8; p.x = Math.random()*W; }
        ctx.globalAlpha = p.o;
        ctx.strokeStyle = ctx.fillStyle = p.c;
        ctx.lineWidth = 1;
        if(p.cross){
          const s = p.r*2.2;
          ctx.beginPath();
          ctx.moveTo(p.x-s,p.y); ctx.lineTo(p.x+s,p.y);
          ctx.moveTo(p.x,p.y-s); ctx.lineTo(p.x,p.y+s*.65);
          ctx.stroke();
        } else {
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        }
      });
      ctx.globalAlpha=1;
      requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // Scroll progress
    const bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      bar.style.width = pct + '%';
    }, {passive:true});

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); }});
    }, {threshold:.1, rootMargin:'0px 0px -28px 0px'});
    reveals.forEach(el => observer.observe(el));

    // Language
    const langBtns = document.querySelectorAll('.lang-btn');
    function setLang(lang) {
      document.documentElement.lang = lang;
      document.querySelectorAll('[data-lang]').forEach(el => {
        el.classList.toggle('active-lang', el.dataset.lang === lang);
      });
      langBtns.forEach(b => {
        const a = b.dataset.targetLang === lang;
        b.classList.toggle('active', a);
        b.setAttribute('aria-pressed', a);
      });
    }
    langBtns.forEach(b => b.addEventListener('click', () => setLang(b.dataset.targetLang)));
    setLang('fr');

    // Hero parallax
    const photoWrap = document.querySelector('.hero-photo-wrap');
    let tick = false;
    window.addEventListener('scroll', () => {
      if(!tick){ requestAnimationFrame(()=>{ if(window.scrollY<window.innerHeight) photoWrap.style.transform=`translateY(${window.scrollY*.1}px)`; tick=false; }); tick=true; }
    },{passive:true});

    // CTA smooth scroll
    document.getElementById('hero-cta').addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('about').scrollIntoView({behavior:'smooth'});
    });

  })();
