/* ============================================================
   script.js — Kochchatti Niwas Griha Pravesh Invitation
   Pure Vanilla JavaScript — No libraries, no frameworks
   ============================================================ */

/* ============================================================
   1. NAVBAR — Scroll shrink effect + Mobile hamburger toggle
   ============================================================ */
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (!navbar || !toggle || !navLinks) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.textContent = "☰";
    });
  });
})();

/* ============================================================
   2. SCROLL REVEAL ANIMATION
   ============================================================ */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings =
            entry.target.parentElement.querySelectorAll(".reveal");
          let index = 0;
          siblings.forEach((el, i) => {
            if (el === entry.target) index = i;
          });

          setTimeout(
            () => {
              entry.target.classList.add("visible");
            },
            (index % 6) * 100,
          );

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  revealEls.forEach((el) => observer.observe(el));
})();

/* ============================================================
   3. VIRTUAL HOUSE TOUR
   ============================================================ */
(function initHouseTour() {
  const tourButtons = document.querySelectorAll(".tour-btn");
  const tourDisplay = document.getElementById("tourDisplay");
  const placeholder = document.getElementById("tourPlaceholder");

  if (!tourButtons.length || !tourDisplay) return;

  const rooms = {
    living: {
      icon: "🛋️",
      label: "Living Room",
      sub: "A warm, open space bathed in natural light — perfect for family evenings and festive gatherings.",
      grad: "linear-gradient(135deg, #6B1010, #3B0000)",
    },
    kitchen: {
      icon: "🍳",
      label: "Kitchen",
      sub: "The heart of our home. Designed for fragrant curries, morning chai, and meals cooked with love.",
      grad: "linear-gradient(135deg, #7B4F1E, #4A2A0A)",
    },
    pooja: {
      icon: "🪔",
      label: "Pooja Room",
      sub: "A sacred sanctuary filled with incense and the glow of diyas — where every day begins with gratitude.",
      grad: "linear-gradient(135deg, #B8860B, #7A5500)",
    },
    bedroom: {
      icon: "🛏️",
      label: "Master Bedroom",
      sub: "A serene retreat designed for peaceful rest and soft morning light.",
      grad: "linear-gradient(135deg, #2E4A6B, #172438)",
    },
  };

  tourButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const room = btn.dataset.room;
      const imgSrc = btn.dataset.img;
      const data = rooms[room];

      tourButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      tourDisplay.style.opacity = "0";

      setTimeout(() => {
        if (imgSrc) {
          placeholder.style.background = "none";
          placeholder.style.position = "relative";
          placeholder.style.padding = "0";
          placeholder.innerHTML = `
            <img
              src="${imgSrc}"
              alt="${data.label}"
              style="width:100%;height:100%;object-fit:cover;border-radius:0;display:block;position:absolute;inset:0;"
              onerror="this.style.display='none'"
            />
            <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.65));padding:1.5rem;text-align:center;">
              <p style="font-family:var(--font-display);font-size:1.4rem;color:var(--gold-light);">${data.icon} ${data.label}</p>
              <p style="font-size:0.88rem;color:rgba(255,248,238,0.82);margin-top:0.3rem;">${data.sub}</p>
            </div>
          `;
        } else {
          placeholder.style.background = data.grad;
          placeholder.style.position = "";
          placeholder.style.padding = "2rem";
          placeholder.innerHTML = `
            <span class="tour-room-icon">${data.icon}</span>
            <p class="tour-room-label">${data.label}</p>
            <p class="tour-room-sub">${data.sub}</p>
          `;
        }

        tourDisplay.style.opacity = "1";
      }, 350);
    });
  });
})();

/* ============================================================
   4. COUNTDOWN TIMER
   — counts down from RIGHT NOW to the event date
   — new Date() always gets current time automatically
   — updates every second using setInterval
   ============================================================ */
(function initCountdown() {
  /* ✏️ Set your event date and time here — YYYY-MM-DDTHH:MM:SS */
  const eventDate = new Date();

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");
  const labelEl = document.querySelector(".cd-event-label");

  /* Stop if any element is missing in HTML */
  if (!daysEl || !hoursEl || !minsEl || !secsEl) {
    console.warn("Countdown: one or more elements not found in HTML");
    return;
  }

  /* Pad single digit numbers: 5 → "05" */
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateCountdown() {
    const now = new Date(); /* current date/time right now */
    const diff = eventDate - now; /* milliseconds remaining      */

    /* Event has already passed */
    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      if (labelEl) {
        labelEl.textContent = "🎉 The Griha Pravesh has begun! Welcome home!";
      }
      return;
    }

    /* Calculate days, hours, minutes, seconds from ms */
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    /* Update the DOM */
    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(minutes);
    secsEl.textContent = pad(seconds);
  }

  /* Run once immediately so numbers show right away */
  updateCountdown();

  /* Then update every 1000ms = 1 second */
  setInterval(updateCountdown, 1000);
})();

/* ============================================================
   5. BLESSINGS / GUEST MESSAGES + WHATSAPP
   ============================================================ */
(function initBlessings() {
  const form = document.getElementById("blessingForm");
  const nameInput = document.getElementById("guestName");
  const msgInput = document.getElementById("guestMsg");
  const messagesList = document.getElementById("messagesList");
  const placeholder = document.getElementById("placeholderMsg");

  if (!form || !nameInput || !msgInput || !messagesList) return;

  /* ✏️ Your WhatsApp number — country code + number, no + or spaces */
  const YOUR_WHATSAPP_NUMBER = "919880779134"; /* 91 = India country code */

  /* Pre-loaded sample blessings shown on page load */
  const sampleBlessings = [
    {
      name: "Auntie Kamala",
      msg: "May Goddess Lakshmi bless every corner of your beautiful home. So proud of you all! 🙏🌸",
    },
    {
      name: "The Verma Family",
      msg: "Congratulations! Wishing Kochchatti Niwas endless happiness, laughter, and love.",
    },
  ];
  sampleBlessings.forEach((b) => addBlessingCard(b.name, b.msg, true));

  /* Submit handler */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const msg = msgInput.value.trim();
    if (!name || !msg) return;

    /* 1 — Show card on screen */
    addBlessingCard(name, msg, false);

    /* 2 — Build WhatsApp message */
    const waText = encodeURIComponent(
      "🙏 *Griha Pravesh Blessing*\n\n" +
        "*Name:* " +
        name +
        "\n" +
        "*Message:* " +
        msg,
    );

    /* 3 — Open WhatsApp with pre-filled message */
    const waURL = "https://wa.me/" + YOUR_WHATSAPP_NUMBER + "?text=" + waText;
    window.open(waURL, "_blank");

    /* 4 — Clear fields */
    nameInput.value = "";
    msgInput.value = "";
    nameInput.focus();
  });

  /* Creates and inserts a blessing card into the DOM */
  function addBlessingCard(name, msg, noAnim) {
    if (placeholder) placeholder.style.display = "none";

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateStr = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const card = document.createElement("div");
    card.className = "blessing-card" + (noAnim ? " no-anim" : "");
    card.innerHTML =
      '<p class="blessing-card-name">🙏 ' +
      escapeHTML(name) +
      "</p>" +
      '<p class="blessing-card-msg">' +
      escapeHTML(msg) +
      "</p>" +
      '<p class="blessing-card-time">' +
      dateStr +
      " at " +
      timeStr +
      "</p>";

    /* Newest messages appear at top */
    messagesList.insertBefore(card, messagesList.firstChild);
    if (!noAnim) messagesList.scrollTop = 0;
  }

  /* Escapes HTML to prevent XSS — never skip this */
  function escapeHTML(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();

/* ============================================================
   6. PHOTO GALLERY LIGHTBOX
   ============================================================ */
(function initGallery() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (!lightbox || !lightboxImg) return;

  const allImages = Array.from(
    document.querySelectorAll(".gallery-item img"),
  ).map((img) => img.src);

  let currentIndex = 0;

  window.openLightbox = function (tile) {
    const src = tile.querySelector("img").src;
    currentIndex = allImages.indexOf(src);
    lightboxImg.src = src;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.closeLightbox = function () {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };

  window.prevPhoto = function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    swapImage(allImages[currentIndex]);
  };

  window.nextPhoto = function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % allImages.length;
    swapImage(allImages[currentIndex]);
  };

  function swapImage(src) {
    lightboxImg.style.transition = "opacity 0.2s ease, transform 0.2s ease";
    lightboxImg.style.opacity = "0";
    lightboxImg.style.transform = "scale(0.92)";
    setTimeout(() => {
      lightboxImg.src = src;
      lightboxImg.style.opacity = "1";
      lightboxImg.style.transform = "scale(1)";
    }, 200);
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevPhoto(e);
    if (e.key === "ArrowRight") nextPhoto(e);
  });
})();

/* ============================================================
   7. BACKGROUND MUSIC PLAYER
   ============================================================ */
(function initMusicPlayer() {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  const label = document.getElementById("musicLabel");

  if (!audio || !btn || !label) return;

  const hasSource = audio.querySelector("source") !== null;
  if (!hasSource) label.textContent = "Add music.mp3";

  let isPlaying = false;

  btn.addEventListener("click", () => {
    if (!hasSource) {
      label.textContent = "Add a source in HTML!";
      setTimeout(() => {
        label.textContent = "Add music.mp3";
      }, 2500);
      return;
    }
    if (isPlaying) {
      audio.pause();
      btn.textContent = "🎵";
      label.textContent = "Music";
      isPlaying = false;
    } else {
      audio
        .play()
        .then(() => {
          btn.textContent = "⏸";
          label.textContent = "Playing";
          isPlaying = true;
        })
        .catch((err) => {
          console.warn("Audio could not play:", err);
          label.textContent = "Blocked";
        });
    }
  });
})();

/* ============================================================
   8. SMOOTH SCROLL
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navH = document.getElementById("navbar").offsetHeight;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - navH - 10;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();

/* ============================================================
   9. ACTIVE NAV HIGHLIGHT
   ============================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  if (!sections.length || !navItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navItems.forEach((a) => {
            a.style.background = "";
            a.style.color = "";
            a.style.fontWeight = "";
            if (a.getAttribute("href") === "#" + id) {
              a.style.background = "rgba(200,146,42,0.2)";
              a.style.color = "#E8B84B";
              a.style.fontWeight = "bold";
            }
          });
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => observer.observe(s));
})();
