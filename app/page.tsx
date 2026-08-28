'use client'

import { useState } from 'react'

const factions = [
  { label: 'POLICE', title: 'Keep the city in line.', copy: 'Build your career through the ranks, run operations, and decide what justice looks like.', tone: 'violet' },
  { label: 'GANGS', title: 'Own your territory.', copy: 'Form alliances, defend your block, and climb from street deals to city-wide influence.', tone: 'plum' },
  { label: 'GOVERNMENT', title: 'Power is a position.', copy: 'Shape laws, manage the city, and play the long game from behind the desk.', tone: 'slate' },
]

export default function Home() {
  const [active, setActive] = useState('Overview')
  const [joined, setJoined] = useState(false)

  return (
    <main className="site-shell">
      <div className="grain" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="CRMP home">
          <span className="brand-mark"><i /><i /><i /></span>
          <span><b>CRMP</b><small>CRIMINAL RUSSIA MULTIPLAYER</small></span>
        </a>
        <nav aria-label="Primary navigation">
          {['Overview', 'Factions', 'World', 'Roadmap'].map((item) => (
            <a key={item} className={active === item ? 'active' : ''} href={`#${item.toLowerCase()}`} onClick={() => setActive(item)}>{item}</a>
          ))}
        </nav>
        <button className="nav-cta" onClick={() => setJoined(true)}>{joined ? 'You are on the list' : 'Join the waitlist'} <span>↗</span></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-art" role="img" aria-label="Rainy neon city at night" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow"><span className="live-dot" /> DEVELOPMENT BUILD 0.2.0 <span className="line" /></div>
          <h1>The city is<br /><em>yours</em> to write.</h1>
          <p className="hero-copy">A living roleplay world where every choice has a consequence. Rise through the ranks, build an empire, or change the rules entirely.</p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => setJoined(true)}>{joined ? 'Waitlist joined' : 'Get early access'} <span>↗</span></button>
            <a className="ghost-btn" href="#factions"><span className="play-icon">▶</span> Explore the world</a>
          </div>
          <div className="hero-meta"><span><b>01</b> OPEN WORLD</span><span><b>02</b> PLAYER-DRIVEN</span><span><b>03</b> ALWAYS EVOLVING</span></div>
        </div>
        <div className="scroll-cue"><span /> Scroll to discover</div>
      </section>

      <section className="status-section" id="roadmap">
        <div className="section-kicker">STATUS // 001</div>
        <div className="status-layout">
          <div><h2>Still building.<br /><span>Already alive.</span></h2><p>CRMP is being shaped with the community, one system at a time. The foundation is in place. The city is waking up.</p></div>
          <div className="progress-card"><div className="progress-top"><span>DEVELOPMENT COMPLETION</span><strong>20<span>%</span></strong></div><div className="progress-track"><div className="progress-fill" /></div><div className="progress-bottom"><span>FOUNDATION PHASE</span><span>BUILDING IN PUBLIC</span></div></div>
        </div>
      </section>

      <section className="factions-section" id="factions">
        <div className="section-heading"><div><div className="section-kicker">CHOOSE YOUR PATH // 002</div><h2>One city.<br /><span>Infinite stories.</span></h2></div><p>No heroes. No villains. Just people trying to make it through the night. Who will you become?</p></div>
        <div className="faction-grid">{factions.map((f, i) => <article className={`faction-card ${f.tone}`} key={f.label}><div className="card-number">0{i + 1}</div><div className="faction-symbol">{i === 0 ? '✦' : i === 1 ? '◆' : '▣'}</div><div className="card-copy"><span>{f.label}</span><h3>{f.title}</h3><p>{f.copy}</p><a href="#top">Discover role <b>↗</b></a></div></article>)}</div>
      </section>

      <section className="world-section" id="world"><div className="world-image" /><div className="world-copy"><div className="section-kicker">THE SETTING // 003</div><h2>Welcome to<br /><span>Novaya Zemlya.</span></h2><p>A fictional city inspired by the raw beauty and restless energy of modern Russia. From the high-rise center to the industrial outskirts, every street has a story.</p><a className="text-link" href="#top">Read the world guide <b>↗</b></a></div></section>

      <footer><div className="brand"><span className="brand-mark"><i /><i /><i /></span><span><b>CRMP</b><small>CRIMINAL RUSSIA MULTIPLAYER</small></span></div><span>© 2026 CRMP PROJECT</span><span>MADE FOR THE ONES WHO PLAY THEIR PART</span></footer>
    </main>
  )
}
