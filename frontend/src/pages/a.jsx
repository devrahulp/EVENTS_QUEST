import { useState, useEffect } from "react";

/* Add your real photos: replace src:null with a path like "photos/1.jpg" */
const PHOTOS = [
  { src: null, name: "Aptitude round", sub: "Round 1", art: "a1" },
  { src: null, name: "Technical round", sub: "Round 2", art: "a2" },
  { src: null, name: "Interview panel", sub: "Round 3", art: "a3" },
  { src: null, name: "Winners", sub: "Results", art: "a1" },
  { src: null, name: "Team photo", sub: "Participants", art: "a2" },
  { src: null, name: "Prize distribution", sub: "Closing", art: "a3" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500&display=swap');
:root{
  --font-primary:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;
  --font-mono:'Space Grotesk',monospace;
  --color-primary:#8244B3;--color-secondary:#A879E6;
  --accent-teal:#2EEED0;--accent-blue:#7C9BFF;
  --bg-color:#0B0B14;--surface-color:#1A0F2E;--surface-hover:#23143E;s
  --glass-bg:rgba(26,15,46,.65);--glass-card-bg:rgba(255,255,255,.035);
  --glass-border:rgba(255,255,255,.09);--glass-border-hover:rgba(168,121,230,.4);
  --text-main:#FFFFFF;--text-muted:#CBD5E1;--text-dim:#94A3B8;
  --purple-gradient:linear-gradient(135deg,#8244B3 0%,#A879E6 100%);
  --teal-gradient:linear-gradient(135deg,#2EEED0 0%,#7C9BFF 100%);
  color-scheme:dark;box-sizing:border-box;
  padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);
}
*,*::before,*::after{box-sizing:inherit}
html{height:100%;scroll-padding-top:env(safe-area-inset-top,0px)}
body{margin:0;min-height:100%;background:var(--bg-color);color:var(--text-main);font-family:var(--font-primary);overflow-x:hidden;
  background-image:radial-gradient(60% 50% at 50% 30%,rgba(130,68,179,.28),transparent 70%),radial-gradient(40% 40% at 90% 10%,rgba(124,155,255,.08),transparent 70%)}
a{color:var(--color-secondary);text-decoration:none;transition:color .2s}
a:hover{color:#fff}
:focus-visible{outline:2px solid var(--color-secondary);outline-offset:3px;border-radius:8px}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px}
header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:16px 0;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:12px;font-weight:800;font-size:17px;letter-spacing:.04em;color:#fff}
.mark{width:34px;height:34px;border-radius:50%;background:var(--purple-gradient);display:grid;place-items:center;font-weight:800;box-shadow:0 0 0 3px rgba(168,121,230,.25)}
nav{display:flex;gap:22px}
nav a{display:flex;flex-direction:column;align-items:center;gap:5px;font-size:11px;color:var(--text-muted)}
nav a svg{width:18px;height:18px;stroke:var(--color-secondary);fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
nav a:hover{color:#fff}

/* 1. Centered title */
.title{text-align:center;padding:20px 0 4px}
h1{font-size:clamp(34px,6vw,60px);line-height:1.05;font-weight:700;margin:0 0 8px;letter-spacing:-.01em}
.title p{margin:0 auto;color:var(--text-muted);font-size:clamp(13px,1.6vw,15px)}

/* 2. Event details */
.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:740px;margin:24px auto 0}
.fact{padding:14px 16px;border-radius:18px;background:var(--glass-card-bg);border:1px solid var(--glass-border);text-align:center}
.fact svg{width:20px;height:20px;stroke:var(--color-secondary);fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;margin-bottom:8px}
.fact small{display:block;color:var(--text-dim);font-size:11px;margin-bottom:4px}
.fact b{display:block;font-size:15px;font-weight:600}
.cta{text-align:center;margin-top:18px}
.btn{display:inline-flex;align-items:center;gap:10px;padding:11px 22px;border:0;border-radius:999px;background:var(--purple-gradient);color:#fff;font:600 14px var(--font-primary);cursor:pointer;transition:transform .2s,box-shadow .2s}
.btn:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(130,68,179,.45);color:#fff}

/* 3. About */
.about{margin:32px auto 0;max-width:680px;padding:20px 22px;border-radius:18px;background:var(--glass-card-bg);border:1px solid var(--glass-border);display:grid;gap:10px}
.about h2{margin:0;font-size:18px}
.about p{margin:0;color:var(--text-muted);line-height:1.65;font-size:14px}
.about ul{margin:6px 0 0;padding:0;list-style:none;display:flex;gap:10px;flex-wrap:wrap}
.about li{padding:5px 12px;border-radius:999px;border:1px solid var(--glass-border);font-size:12px;color:var(--text-muted)}
.about li:first-child{border-color:rgba(46,238,208,.4);color:var(--accent-teal)}

/* 4. Photo coverflow (auto-scrolling) */
.gallery{margin-top:34px}
.gallery h2{text-align:center;font-size:18px;margin:0 0 4px}
.gstage{position:relative;max-width:1000px;height:320px;margin:0 auto;perspective:1400px}
.gcard{position:absolute;top:50%;left:50%;width:300px;height:190px;margin:0;border-radius:20px;overflow:hidden;border:1px solid var(--glass-border);cursor:pointer;opacity:0;pointer-events:none;
  transform:translate(-50%,-50%) scale(.5);transition:transform .8s cubic-bezier(.2,.7,.2,1),opacity .6s,border-color .3s;transform-style:preserve-3d}
.gcard img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.gcard::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,20,.15) 0%,rgba(11,11,20,.1) 45%,rgba(11,11,20,.88) 100%)}
.gcard .gtag{position:absolute;z-index:2;top:12px;left:12px;display:flex;align-items:center;gap:6px;font-weight:600;font-size:13px}
.gcard .gtag small{display:block;color:var(--text-muted);font-weight:400;font-size:11px}
.gcard .gtag svg{width:15px;height:15px;stroke:var(--color-secondary);fill:none;stroke-width:2}
.gcard .ginfo{position:absolute;z-index:2;left:14px;right:14px;bottom:14px;display:none}
.gcard .ginfo p{margin:0 0 10px;font-size:14px;font-weight:600;line-height:1.3}
.gbar{display:flex;align-items:center;gap:12px;font:12px var(--font-mono);color:var(--text-muted)}
.gbar i{flex:1;height:2px;background:var(--glass-border);border-radius:2px;overflow:hidden}
.gbar i b{display:block;height:100%;background:var(--purple-gradient);transition:width .6s}
.gcard[data-pos="0"]{opacity:1;pointer-events:auto;z-index:5;width:380px;height:240px;transform:translate(-50%,-50%) translateZ(60px);border-color:var(--glass-border-hover);box-shadow:0 30px 70px rgba(0,0,0,.55),0 0 0 1px rgba(168,121,230,.15)}
.gcard[data-pos="0"] .ginfo{display:block}
.gcard[data-pos="-1"]{opacity:.9;pointer-events:auto;z-index:4;transform:translate(calc(-50% - 330px),-50%) rotateY(32deg) scale(.88)}
.gcard[data-pos="1"]{opacity:.9;pointer-events:auto;z-index:4;transform:translate(calc(-50% + 330px),-50%) rotateY(-32deg) scale(.88)}
.gcard[data-pos="-2"]{opacity:.65;pointer-events:auto;z-index:3;transform:translate(calc(-50% - 500px),-50%) rotateY(38deg) scale(.72)}
.gcard[data-pos="2"]{opacity:.65;pointer-events:auto;z-index:3;transform:translate(calc(-50% + 500px),-50%) rotateY(-38deg) scale(.72)}
.gcard[data-pos="-1"]:hover,.gcard[data-pos="1"]:hover,.gcard[data-pos="-2"]:hover,.gcard[data-pos="2"]:hover{border-color:var(--glass-border-hover);opacity:1}
.gnext{position:absolute;right:0;bottom:0;width:30px;height:30px;border-radius:50%;border:1px solid var(--glass-border);background:var(--glass-bg);backdrop-filter:blur(10px);color:#fff;font-size:20px;cursor:pointer;display:grid;place-items:center;padding:0}
.gnext:hover{border-color:var(--glass-border-hover)}
.gbar{padding-right:38px;position:relative;min-height:30px}
.a1{background:radial-gradient(70% 50% at 70% 20%,rgba(46,238,208,.55),transparent 70%),linear-gradient(160deg,#23143E,#8244B3 60%,#1A0F2E)}
.a2{background:radial-gradient(60% 50% at 30% 25%,rgba(124,155,255,.6),transparent 70%),linear-gradient(160deg,#1A0F2E,#5b3a9a 55%,#0B0B14)}
.a3{background:radial-gradient(60% 50% at 50% 30%,rgba(168,121,230,.5),transparent 70%),linear-gradient(160deg,#23143E,#1A0F2E 70%)}

footer{margin-top:36px;border-top:1px solid var(--glass-border);background:var(--surface-color)}
footer .wrap{display:flex;gap:20px 40px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding-top:14px;padding-bottom:14px;font-size:13px;color:var(--text-muted)}
footer a{color:var(--color-secondary)}
@media(max-width:700px){
  .facts{grid-template-columns:1fr}
  nav{gap:18px}
  .gstage{height:240px}
  .gcard{width:220px;height:140px}
  .gcard[data-pos="0"]{width:260px;height:165px}
  .gcard[data-pos="-1"]{transform:translate(calc(-50% - 150px),-50%) rotateY(32deg) scale(.8)}
  .gcard[data-pos="1"]{transform:translate(calc(-50% + 150px),-50%) rotateY(-32deg) scale(.8)}
  .gcard[data-pos="-2"],.gcard[data-pos="2"]{opacity:0;pointer-events:none}
}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
`;

const PIN = (
  <>
    <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
);

export default function QuestEvents() {
  const N = PHOTOS.length;
  const [cur, setCur] = useState(0);

  useEffect(() => {
    document.title = "Placement IQ | QUEST Events";
  }, []);

  // Auto-scroll: advance every 2.8s, timer restarts after any manual change
  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % N), 2800);
    return () => clearInterval(t);
  }, [cur, N]);

  const go = (i) => setCur(((i % N) + N) % N);

  return (
    <>
      <style>{CSS}</style>

      <div className="wrap">
        <header>
          <a className="brand" href="#top">
            <span className="mark">Q</span>QUEST
          </a>
          <nav aria-label="Main">
            <a href="#top">
              <svg viewBox="0 0 24 24">
                <path d="M4 20h16M6 16l2-9 5 3 5-6 1 12z" />
              </svg>
              Placement IQ
            </a>
            <a href="#about">
              <svg viewBox="0 0 24 24">
                <path d="M9 4h6v4l3 10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2l3-10z" />
              </svg>
              About
            </a>
            <a href="#gallery">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M4 10h16M9 3v4M15 3v4" />
              </svg>
              Gallery
            </a>
            <a href="#register">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
              </svg>
              Register
            </a>
          </nav>
        </header>

        <main id="top">
          {/* 1. Heading, centered at the top */}
          <section className="title">
            <h1>Placement IQ</h1>
            
          </section>

          {/* 2. Event details: edit these three values */}
          <section className="facts" aria-label="Event details">
            <div className="fact">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M4 10h16M9 3v4M15 3v4" />
              </svg>
              <small>Date</small>
              <b id="f-date">17th NOV</b>
            </div>
            <div className="fact">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l3 2" />
              </svg>
              <small>Time</small>
              <b id="f-time">5:15 PM</b>
            </div>
            <div className="fact">
              <svg viewBox="0 0 24 24">{PIN}</svg>
              <small>Place</small>
              <b id="f-place">Media Centre</b>
            </div>
          </section>
          <div className="cta">
            <a className="btn" id="register" href="#register">
              Register 
            </a>
          </div>

          {/* 3. About the event */}
          <section className="about" id="about">
            <h2>About the event</h2>
            <p>
              Placement IQ is a career guidance initiative by Team QUEST aimed at preparing students for the professional world. The session focuses on building industry awareness, developing essential career skills, understanding recruitment processes, and equipping students with the knowledge and confidence needed to navigate future career opportunities.
            </p>
            
          </section>

          {/* 4. Scrolling photos */}
          <section className="gallery" id="gallery" aria-label="Event photos">
            <h2>Event photos</h2>
            <div
              className="gstage"
              id="gstage"
              role="region"
              aria-roledescription="carousel"
              aria-label="Event photos"
            >
              {PHOTOS.map((p, i) => {
                let d = (((i - cur) % N) + N) % N;
                if (d > N / 2) d -= N;
                return (
                  <figure
                    key={i}
                    className={`gcard ${p.art}`}
                    data-i={i}
                    data-pos={d}
                    aria-hidden={d !== 0}
                    onClick={() => go(i)}
                  >
                    {p.src ? <img src={p.src} alt={p.name} /> : null}
                    <div className="gtag">
                      <svg viewBox="0 0 24 24">{PIN}</svg>
                      <div>
                        {p.name}
                        <small>{p.sub}</small>
                      </div>
                    </div>
                    <div className="ginfo">
                      <p>Moments from Placement IQ</p>
                      <div className="gbar">
                        <span className="gn">
                          {String(cur + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                        </span>
                        <i>
                          <b style={{ width: ((cur + 1) / N) * 100 + "%" }} />
                        </i>
                        <button
                          className="gnext"
                          aria-label="Next photo"
                          onClick={(e) => {
                            e.stopPropagation();
                            go(cur + 1);
                          }}
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  </figure>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      <footer>
        <div className="wrap">
          <span>QUEST events team</span>
          <a href="#top">Back to top</a>
          <span>Contact details to be added</span>
        </div>
      </footer>
    </>
  );
}