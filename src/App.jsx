import { useEffect, useRef, useState } from 'react'
import {
  motion, useScroll, useSpring, useInView, useMotionValue, useTransform, animate, AnimatePresence,
} from 'framer-motion'
import {
  FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiDownload, FiArrowUpRight, FiExternalLink, FiMenu, FiX, FiSun, FiMoon,
} from 'react-icons/fi'
import { profile, stats, skills, projects, experience, education } from './data'
import me from './assets/me.jpg'

const nav = [['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['experience', 'Experience'], ['contact', 'Contact']]

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
}

function Reveal({ children, i = 0, className = '' }) {
  return (
    <motion.div className={className} variants={reveal} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {children}
    </motion.div>
  )
}

function SectionTitle({ kicker, children }) {
  return (
    <Reveal className="section-title">
      <span className="kicker">{kicker}</span>
      <h2>{children}</h2>
    </Reveal>
  )
}

/* ---------- Typewriter ---------- */
function Typewriter({ words }) {
  const [text, setText] = useState('')
  const [w, setW] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const full = words[w]
    const t = setTimeout(() => {
      if (!del) {
        setText(full.slice(0, text.length + 1))
        if (text.length + 1 === full.length) setTimeout(() => setDel(true), 1400)
      } else {
        setText(full.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDel(false); setW((w + 1) % words.length) }
      }
    }, del ? 35 : 75)
    return () => clearTimeout(t)
  }, [text, del, w, words])
  return <span className="typed">{text}<i className="caret" /></span>
}

/* ---------- Counter ---------- */
function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => Math.round(v))
  useEffect(() => { if (inView) animate(mv, value, { duration: 1.6, ease: 'easeOut' }) }, [inView, value, mv])
  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>
}

/* ---------- Cursor glow ---------- */
function CursorGlow() {
  const x = useSpring(useMotionValue(-500), { stiffness: 120, damping: 20 })
  const y = useSpring(useMotionValue(-500), { stiffness: 120, damping: 20 })
  useEffect(() => {
    const m = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200) }
    window.addEventListener('pointermove', m)
    return () => window.removeEventListener('pointermove', m)
  }, [x, y])
  return <motion.div className="cursor-glow" style={{ x, y }} />
}

/* ---------- Magnetic button ---------- */
function Magnetic({ children, className = '', ...props }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const leave = () => { x.set(0); y.set(0) }
  return (
    <motion.a ref={ref} className={className} style={{ x, y }} onPointerMove={move} onPointerLeave={leave} whileTap={{ scale: 0.95 }} {...props}>
      {children}
    </motion.a>
  )
}

/* ---------- 3D tilt card ---------- */
function Tilt({ children, className = '', style }) {
  const ref = useRef(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 })
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 })
  const mx = useMotionValue(50), my = useMotionValue(50)
  const glow = useTransform([mx, my], ([a, b]) => `radial-gradient(400px circle at ${a}% ${b}%, rgba(124,92,255,.22), transparent 45%)`)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 10); rx.set((0.5 - py) * 10); mx.set(px * 100); my.set(py * 100)
  }
  const leave = () => { rx.set(0); ry.set(0) }
  return (
    <motion.div ref={ref} className={className} style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 900 }} onPointerMove={move} onPointerLeave={leave}>
      <motion.div className="tilt-glow" style={{ background: glow }} />
      {children}
    </motion.div>
  )
}

/* ---------- Navbar ---------- */
function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const ids = nav.map(([id]) => id)
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    ids.forEach((id) => { const el = document.getElementById(id); el && obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return (
    <motion.header className="nav" initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
      <a href="#top" className="logo">IA<span>.</span></a>
      <nav className={open ? 'links open' : 'links'}>
        {nav.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
            {label}
            {active === id && <motion.i layoutId="pill" className="pill" />}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="icon-btn" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <button className="icon-btn menu" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
      </div>
    </motion.header>
  )
}

/* ---------- Hero ---------- */
function Hero() {
  const { scrollY } = useScroll()
  const yImg = useTransform(scrollY, [0, 600], [0, 80])
  const yText = useTransform(scrollY, [0, 600], [0, -40])
  const name = profile.name.split(' ')
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <motion.div style={{ y: yText }}>
          <motion.span className="badge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <i className="dot" /> Open to new opportunities
          </motion.span>
          <h1>
            <motion.span className="hello" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Hi, I'm</motion.span>
            {name.map((n, i) => (
              <span className="word-mask" key={n}>
                <motion.span className="grad" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.4 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                  {n}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <Typewriter words={profile.roles} />
          </motion.p>
          <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            I build fast, scalable web apps — from live fleet-tracking maps to polished e-commerce flows — with React, Next.js and TypeScript.
          </motion.p>
          <motion.div className="cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }}>
            <Magnetic href="#projects" className="btn primary">View my work <FiArrowUpRight /></Magnetic>
            <Magnetic href={profile.resume} download className="btn ghost"><FiDownload /> Download CV</Magnetic>
          </motion.div>
          <motion.div className="socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }}>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><FiMail /></a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: yImg }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="ring r1" /><div className="ring r2" />
          <div className="photo"><img src={me} alt="Intezar Ahmad" /></div>
          <motion.div className="chip c1" animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4 }}>⚛️ React</motion.div>
          <motion.div className="chip c2" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5 }}>▲ Next.js</motion.div>
          <motion.div className="chip c3" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5 }}>TS TypeScript</motion.div>
          <motion.div className="chip c4" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3.8 }}>📍 Live Maps</motion.div>
        </motion.div>
      </div>
      <motion.div className="scroll-hint" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><span /></motion.div>
    </section>
  )
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = skills.flatMap((g) => g.items)
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">{row.map((t, i) => <span key={i}>{t}<b>✦</b></span>)}</div>
    </div>
  )
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle kicker="01 — About">Building products that <em>move</em> in real time.</SectionTitle>
        <div className="about-grid">
          <Reveal><p className="about-text">{profile.summary}</p>
            <div className="meta">
              <span><FiMapPin /> {profile.location}</span>
              <span><FiMail /> {profile.email}</span>
            </div>
          </Reveal>
          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} i={i} className="stat">
                <strong><Counter value={s.value} suffix={s.suffix} /></strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Skills ---------- */
function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle kicker="02 — Skills">My <em>toolbox</em></SectionTitle>
        <div className="skill-grid">
          {skills.map((g, gi) => (
            <Reveal key={g.group} i={gi} className="card skill-card">
              <h3>{g.group}</h3>
              <div className="tags">
                {g.items.map((t, i) => (
                  <motion.span key={t} className="tag" whileHover={{ y: -4, scale: 1.06 }} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Projects ---------- */
const icons = { truck: '🚚', map: '🛰️', cart: '🛒', meal: '🥗' }

function ProjectCard({ p, i }) {
  return (
    <Reveal i={i % 3}>
      <Tilt className={`card project ${p.featured ? 'feat' : ''}`}>
        <div className="thumb" style={p.img ? undefined : { '--h': p.hue }}>
          {p.img ? <img src={p.img} alt={p.title} loading="lazy" /> : (
            <div className="art">
              <span className="art-icon">{icons[p.icon]}</span>
              <i className="blob b1" /><i className="blob b2" />
              <div className="grid-lines" />
            </div>
          )}
          {p.featured && <span className="ribbon">Featured</span>}
        </div>
        <div className="p-body">
          <span className="p-tag">{p.tag}</span>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
          {(p.github || p.demo) && (
            <div className="p-links">
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Live demo <FiExternalLink /></a>}
              {p.github && <a href={p.github} target="_blank" rel="noreferrer">Code <FiGithub /></a>}
            </div>
          )}
        </div>
      </Tilt>
    </Reveal>
  )
}

function Projects() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Professional', 'Personal & Team']
  const list = projects.filter((p) => filter === 'All' || (filter === 'Professional' ? p.featured : !p.featured))
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle kicker="03 — Projects">Selected <em>work</em></SectionTitle>
        <Reveal className="filters">
          {filters.map((f) => (
            <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
              {f}{filter === f && <motion.i layoutId="fpill" className="pill" />}
            </button>
          ))}
        </Reveal>
        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div layout key={p.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35 }}>
                <ProjectCard p={p} i={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Experience ---------- */
function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionTitle kicker="04 — Experience">Where I've <em>worked</em></SectionTitle>
        <div className="timeline" ref={ref}>
          <div className="line"><motion.div className="fill" style={{ height: h }} /></div>
          {experience.map((e, i) => (
            <Reveal key={e.company} i={0} className="t-item">
              <span className="t-dot" />
              <div className="card t-card">
                <div className="t-head">
                  <div><h3>{e.role}</h3><span className="company">{e.company}</span></div>
                  <span className="period">{e.period}</span>
                </div>
                <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="edu-title"><h3>Education</h3></Reveal>
        <div className="edu-grid">
          {education.map((e, i) => (
            <Reveal key={e.title} i={i} className="card edu">
              <span className="years">{e.years}</span>
              <h4>{e.title}</h4>
              <p>{e.place}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="contact-card">
          <div className="orb o1" /><div className="orb o2" />
          <span className="kicker">05 — Contact</span>
          <h2>Let's build something <em>great</em> together.</h2>
          <p>Have a project, role or idea in mind? My inbox is always open.</p>
          <div className="cta center">
            <Magnetic href={`mailto:${profile.email}`} className="btn primary"><FiMail /> {profile.email}</Magnetic>
            <Magnetic href={`tel:${profile.phone.replace(/\s/g, '')}`} className="btn ghost"><FiPhone /> {profile.phone}</Magnetic>
          </div>
          <div className="socials center">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          </div>
        </Reveal>
        <footer>© {new Date().getFullYear()} Intezar Ahmad · Built with React & Framer Motion</footer>
      </div>
    </section>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark' } catch { return 'dark' }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])
  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <CursorGlow />
      <div className="aurora"><i /><i /><i /></div>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
