/* ============================================================
   script.js — Kochchatti Niwas Griha Pravesh Invitation
   Pure Vanilla JavaScript — No libraries, no frameworks
   ============================================================ */

/* ============================================================
   1. NAVBAR
   ============================================================ */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navbar || !toggle || !navLinks) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.textContent = '☰';
    });
  });
})();


/* ============================================================
   2. SCROLL REVEAL
   ============================================================ */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let index = 0;
        siblings.forEach((el, i) => { if (el === entry.target) index = i; });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (index % 6) * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();


/* ============================================================
   3. VIRTUAL HOUSE TOUR
   ============================================================ */
(function initHouseTour() {
  const tourButtons = document.querySelectorAll('.tour-btn');
  const tourDisplay = document.getElementById('tourDisplay');
  const placeholder = document.getElementById('tourPlaceholder');

  if (!tourButtons.length || !tourDisplay) return;

  const rooms = {
    living: {
      icon:  '🛋️',
      label: 'Living Room',
      sub:   'A warm, open space bathed in natural light — perfect for family evenings and festive gatherings.',
      grad:  'linear-gradient(135deg, #6B1010, #3B0000)'
    },
    kitchen: {
      icon:  '🍳',
      label: 'Kitchen',
      sub:   'The heart of our home. Designed for fragrant curries, morning chai, and meals cooked with love.',
      grad:  'linear-gradient(135deg, #7B4F1E, #4A2A0A)'
    },
    pooja: {
      icon:  '🪔',
      label: 'Pooja Room',
      sub:   'A sacred sanctuary filled with incense and the glow of diyas — where every day begins with gratitude.',
      grad:  'linear-gradient(135deg, #B8860B, #7A5500)'
    },
    bedroom: {
      icon:  '🛏️',
      label: 'Master Bedroom',
      sub:   'A serene retreat designed for peaceful rest and soft morning light.',
      grad:  'linear-gradient(135deg, #2E4A6B, #172438)'
    }
  };

  tourButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const room   = btn.dataset.room;
      const imgSrc = btn.dataset.img;
      const data   = rooms[room];

      tourButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tourDisplay.style.opacity = '0';

      setTimeout(() => {
        if (imgSrc) {
          placeholder.style.background = 'none';
          placeholder.style.position   = 'relative';
          placeholder.style.padding    = '0';
          placeholder.innerHTML =
            '<img src="' + imgSrc + '" alt="' + data.label + '" ' +
            'style="width:100%;height:100%;object-fit:cover;border-radius:0;display:block;position:absolute;inset:0;" ' +
            'onerror="this.style.display=\'none\'" />' +
            '<div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.65));padding:1.5rem;text-align:center;">' +
            '<p style="font-family:var(--font-display);font-size:1.4rem;color:var(--gold-light);">' + data.icon + ' ' + data.label + '</p>' +
            '<p style="font-size:0.88rem;color:rgba(255,248,238,0.82);margin-top:0.3rem;">' + data.sub + '</p>' +
            '</div>';
        } else {
          placeholder.style.background = data.grad;
          placeholder.style.position   = '';
          placeholder.style.padding    = '2rem';
          placeholder.innerHTML =
            '<span class="tour-room-icon">' + data.icon + '</span>' +
            '<p class="tour-room-label">' + data.label + '</p>' +
            '<p class="tour-room-sub">' + data.sub + '</p>';
        }
        tourDisplay.style.opacity = '1';
      }, 350);
    });
  });
})();


/* ============================================================
   4. COUNTDOWN TIMER
   ✅ UPDATED — Event date: 5th March 2026
   ============================================================ */
(function initCountdown() {

  /* ✅ CHANGED TO 5th MARCH 2026 */
  const eventDate = new Date('2026-03-05T07:30:00');

  const daysEl  = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-mins');
  const secsEl  = document.getElementById('cd-secs');
  const labelEl = document.querySelector('.cd-event-label');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) {
    console.warn('Countdown: HTML elements not found');
    return;
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateCountdown() {
    const now  = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      daysEl.textContent  = '00';
      hoursEl.textContent = '00';
      minsEl.textContent  = '00';
      secsEl.textContent  = '00';
      if (labelEl) labelEl.textContent = '🎉 The Griha Pravesh has begun! Welcome home!';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60))      / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60))           / 1000);

    daysEl.textContent  = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent  = pad(minutes);
    secsEl.textContent  = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

})();


/* ============================================================
   5. BLESSINGS + WHATSAPP
   ============================================================ */
(function initBlessings() {
  const form         = document.getElementById('blessingForm');
  const nameInput    = document.getElementById('guestName');
  const msgInput     = document.getElementById('guestMsg');
  const messagesList = document.getElementById('messagesList');
  const placeholder  = document.getElementById('placeholderMsg');

  if (!form || !nameInput || !msgInput || !messagesList) return;

  const YOUR_WHATSAPP_NUMBER = '919880779134';

  var samples = [
    { name: 'Auntie Kamala',    msg: 'May Goddess Lakshmi bless every corner of your beautiful home. So proud of you all! 🙏🌸' },
    { name: 'The Verma Family', msg: 'Congratulations! Wishing Kochchatti Niwas endless happiness, laughter, and love.' }
  ];
  samples.forEach(function(b) { addBlessingCard(b.name, b.msg, true); });

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var name = nameInput.value.trim();
    var msg  = msgInput.value.trim();
    if (!name || !msg) return;

    addBlessingCard(name, msg, false);

    var waText = encodeURIComponent(
      '🙏 *Griha Pravesh Blessing*\n\n' +
      '*Name:* ' + name + '\n' +
      '*Message:* ' + msg
    );
    window.open('https://wa.me/' + YOUR_WHATSAPP_NUMBER + '?text=' + waText, '_blank');

    nameInput.value = '';
    msgInput.value  = '';
    nameInput.focus();
  });

  function addBlessingCard(name, msg, noAnim) {
    if (placeholder) placeholder.style.display = 'none';

    var now     = new Date();
    var timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    var dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    var card = document.createElement('div');
    card.className = 'blessing-card' + (noAnim ? ' no-anim' : '');
    card.innerHTML =
      '<p class="blessing-card-name">🙏 ' + escapeHTML(name) + '</p>' +
      '<p class="blessing-card-msg">'      + escapeHTML(msg)  + '</p>' +
      '<p class="blessing-card-time">'     + dateStr + ' at ' + timeStr + '</p>';

    messagesList.insertBefore(card, messagesList.firstChild);
    if (!noAnim) messagesList.scrollTop = 0;
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();


/* ============================================================
   6. PHOTO GALLERY LIGHTBOX
   ============================================================ */
(function initGallery() {
  var lightbox    = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');

  if (!lightbox || !lightboxImg) return;

  var allImages = Array.from(document.querySelectorAll('.gallery-item img'))
                       .map(function(img) { return img.src; });

  var currentIndex = 0;

  window.openLightbox = function(tile) {
    var src = tile.querySelector('img').src;
    currentIndex = allImages.indexOf(src);
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.prevPhoto = function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    swapImage(allImages[currentIndex]);
  };

  window.nextPhoto = function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % allImages.length;
    swapImage(allImages[currentIndex]);
  };

  function swapImage(src) {
    lightboxImg.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    lightboxImg.style.opacity    = '0';
    lightboxImg.style.transform  = 'scale(0.92)';
    setTimeout(function() {
      lightboxImg.src             = src;
      lightboxImg.style.opacity   = '1';
      lightboxImg.style.transform = 'scale(1)';
    }, 200);
  }

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prevPhoto(e);
    if (e.key === 'ArrowRight') nextPhoto(e);
  });
})();


/* ============================================================
   7. BACKGROUND MUSIC PLAYER
   ============================================================ */
(function initMusicPlayer() {
  var audio = document.getElementById('bgMusic');
  var btn   = document.getElementById('musicBtn');
  var label = document.getElementById('musicLabel');

  if (!audio || !btn || !label) return;

  var hasSource = audio.querySelector('source') !== null;
  if (!hasSource) label.textContent = 'Add music.mp3';

  var isPlaying = false;

  btn.addEventListener('click', function() {
    if (!hasSource) {
      label.textContent = 'Add a source in HTML!';
      setTimeout(function() { label.textContent = 'Add music.mp3'; }, 2500);
      return;
    }
    if (isPlaying) {
      audio.pause();
      btn.textContent   = '🎵';
      label.textContent = 'Music';
      isPlaying = false;
    } else {
      audio.play()
        .then(function() {
          btn.textContent   = '⏸';
          label.textContent = 'Playing';
          isPlaying = true;
        })
        .catch(function(err) {
          console.warn('Audio could not play:', err);
          label.textContent = 'Blocked';
        });
    }
  });
})();


/* ============================================================
   8. SMOOTH SCROLL
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navH = document.getElementById('navbar').offsetHeight;
      var top  = target.getBoundingClientRect().top + window.pageYOffset - navH - 10;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   9. ACTIVE NAV HIGHLIGHT
   ============================================================ */
(function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navItems.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navItems.forEach(function(a) {
          a.style.background = '';
          a.style.color      = '';
          a.style.fontWeight = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.background = 'rgba(200,146,42,0.2)';
            a.style.color      = '#E8B84B';
            a.style.fontWeight = 'bold';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function(s) { observer.observe(s); });
})();
