import React from "react";

/*
  Quest Test Series – event page
  Uses the official QUEST design tokens (see the :root block in `css` below).

  Images: put them in your public folder, e.g.
    /public/images/poster.jpg
    /public/images/photo1.jpg ... photo6.jpg
*/

const EVENT = {
  title: "Quest Test Series",
  organiser: "Your Organisation Name",
  date: "Nov 21 - Nov 23, 2026",
  time: "9:00 AM onwards",
  location: "Your College Name, City",
  registerLink: "#",
  poster: "/images/poster.jpg",
  description:
    "Quest Test Series is a three-day event designed to prepare you for placements. On the first day we hold the aptitude test and interview round, the second day is the group discussion, and on the third day the final interviews are conducted.",
  days: [
    { label: "Day 1", text: "Aptitude test and interview round." },
    { label: "Day 2", text: "Group discussion." },
    { label: "Day 3", text: "Final interviews." },
  ],
  gallery: [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
    "/images/photo6.jpg",
  ],
};

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export default function QuestTestSeries() {
  return (
    <div className="qts">
      <style>{css}</style>

      {/* HERO */}
      <header className="qts-hero">
        <div className="qts-hero-inner">
          <div>
            <div className="qts-badges">
              <span className="qts-badge">Featured Event</span>
              <span className="qts-badge">Upcoming</span>
              <span className="qts-badge">In-Person</span>
            </div>

            <h1>{EVENT.title}</h1>
            <p className="qts-by">By {EVENT.organiser}</p>

            <div className="qts-meta">
              <div><CalendarIcon /><span>{EVENT.date}</span></div>
              <div><ClockIcon /><span>{EVENT.time}</span></div>
              <div><PinIcon /><span>{EVENT.location}</span></div>
            </div>
          </div>

          <div className="qts-poster">
            <img src={EVENT.poster} alt={`${EVENT.title} poster`} />
          </div>
        </div>
      </header>

      {/* DESCRIPTION */}
      <section className="qts-section qts-about">
        <h2>About the event</h2>
        <p>{EVENT.description}</p>

        <div className="qts-days">
          {EVENT.days.map((d) => (
            <div className="qts-day" key={d.label}>
              <h3>{d.label}</h3>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTER */}
      <div className="qts-register">
        <a className="qts-btn" href={EVENT.registerLink} target="_blank" rel="noopener noreferrer">
          Register Now
        </a>
      </div>

      {/* GALLERY */}
      <section className="qts-section qts-gallery">
        <h2>Gallery</h2>
        <div className="qts-grid">
          {EVENT.gallery.map((src, i) => (
            <img key={src} src={src} alt={`${EVENT.title} photo ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </section>

      <footer className="qts-footer">&copy; 2026 QUEST</footer>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600&display=swap');

:root {
  --font-primary: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'Space Grotesk', monospace;

  /* Brand colours */
  --color-primary: #8244B3;
  --color-secondary: #A879E6;

  /* Accent colours */
  --accent-teal: #2EEED0;
  --accent-blue: #7C9BFF;

  /* Backgrounds */
  --bg-color: #0B0B14;
  --surface-color: #1A0F2E;
  --surface-hover: #23143E;

  /* Glassmorphism */
  --glass-bg: rgba(26, 15, 46, 0.65);
  --glass-card-bg: rgba(255, 255, 255, 0.035);
  --glass-border: rgba(255, 255, 255, 0.09);
  --glass-border-hover: rgba(168, 121, 230, 0.4);

  /* Typography */
  --text-main: #FFFFFF;
  --text-muted: #CBD5E1;
  --text-dim: #94A3B8;

  /* Gradients */
  --purple-gradient: linear-gradient(135deg, #8244B3 0%, #A879E6 100%);
  --teal-gradient: linear-gradient(135deg, #2EEED0 0%, #7C9BFF 100%);
}

.qts, .qts * { box-sizing: border-box; }
.qts {
  margin: 0;
  min-height: 100vh;
  font-family: var(--font-primary);
  background: var(--bg-color);
  color: var(--text-main);
  line-height: 1.6;
}

/* Hero */
.qts-hero {
  padding: 100px 8vw 70px;
  background: radial-gradient(ellipse at 15% 90%, rgba(130, 68, 179, 0.22), transparent 55%), var(--bg-color);
}
.qts-hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 50px;
  align-items: center;
}
.qts-badges { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 26px; }
.qts-badge {
  border: 1px solid var(--glass-border-hover);
  background: var(--glass-card-bg);
  color: var(--color-secondary);
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
}
.qts-badge {
  cursor: pointer;
  transition: box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
}
.qts-badge:hover {
  border-color: var(--color-secondary);
  background: rgba(168, 121, 230, 0.14);
  color: var(--text-main);
  box-shadow: 0 0 14px rgba(168, 121, 230, 0.55);
}


.qts h1 {
  margin: 0 0 18px;
  font-size: clamp(2.6rem, 8vw, 5.5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 800;
}
.qts-by { margin: 0 0 26px; color: var(--text-dim); }

.qts-meta { display: flex; flex-direction: column; gap: 10px; font-size: 1.1rem; color: var(--text-muted); }
.qts-meta div { display: flex; align-items: center; gap: 12px; }
.qts-meta svg {
  width: 22px; height: 22px; flex-shrink: 0;
  stroke: var(--color-secondary); fill: none; stroke-width: 2;
}

.qts-poster img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 18px;
  background: var(--surface-color);
  border: 1px solid var(--glass-border-hover);
}

/* Sections */
.qts-section { padding: 60px 8vw; }
.qts h2 { margin: 0 0 18px; font-size: 1.8rem; font-weight: 700; }
.qts-about { border-top: 1px solid var(--glass-border); }
.qts-about > p { max-width: 70ch; margin: 0; color: var(--text-muted); font-size: 1.1rem; }

.qts-days {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
  margin-top: 30px;
}
.qts-day {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  padding: 22px;
  backdrop-filter: blur(10px);
  transition: border-color 0.2s ease, background 0.2s ease;
}
.qts-day:hover { border-color: var(--glass-border-hover); background: var(--surface-hover); }
.qts-day h3 { margin: 0 0 6px; color: var(--color-secondary); font-size: 1.15rem; }
.qts-day p { margin: 0; color: var(--text-dim); }

/* Register */
.qts-register { text-align: center; padding: 20px 8vw 60px; }
.qts-btn {
  display: inline-block;
  background: var(--purple-gradient);
  color: var(--text-main);
  font-weight: 700;
  font-size: 1.15rem;
  text-decoration: none;
  padding: 16px 44px;
  border-radius: 12px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.qts-btn:hover { transform: translateY(-2px); opacity: 0.92; }
.qts-btn:focus-visible { outline: 3px solid var(--accent-blue); outline-offset: 3px; }

/* Gallery */
.qts-gallery { border-top: 1px solid var(--glass-border); }
.qts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
.qts-grid img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 12px;
  background: var(--surface-color);
  border: 1px solid var(--glass-border);
  transition: border-color 0.2s ease;
}
.qts-grid img:hover { border-color: var(--glass-border-hover); }

/* Footer */
.qts-footer {
  text-align: center;
  padding: 30px;
  color: var(--text-dim);
  font-size: 0.9rem;
  border-top: 1px solid var(--glass-border);
}

@media (max-width: 900px) {
  .qts-hero-inner { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .qts-btn, .qts-day, .qts-grid img, .qts-badge { transition: none; }
}
`;
