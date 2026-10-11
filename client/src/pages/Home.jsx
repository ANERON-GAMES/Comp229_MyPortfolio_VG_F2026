import { Link, useLocation } from 'react-router-dom'

function Home() {
  const location = useLocation()
  const incoming = location.state && location.state.contact

  return (
    <main>
      {incoming ? (
        <section className="receipt">
          <h2>Thanks</h2>
          <p>{incoming.firstName} {incoming.lastName}</p>
          <p>{incoming.email} / {incoming.contactNumber}</p>
          <p>{incoming.message}</p>
        </section>
      ) : null}

      <section className="hero">
        <h1>Absolute<br />Rationalism</h1>
        <p>
          I make games in Unity and web pages for school. Studio is Aneron Games, Toronto.
        </p>
        <Link className="btn" to="/about">About me</Link>
      </section>

      <section className="grid-3">
        <article className="node">
          <span className="node-id">CORE</span>
          <h2>Games</h2>
          <p>Unity, C#, systems. Bloodrain is the current title.</p>
        </article>
        <article className="node">
          <span className="node-id">ARCH</span>
          <h2>Web</h2>
          <p>Front-end work from COMP213 through this React site.</p>
        </article>
        <article className="node">
          <span className="node-id">STUDIO</span>
          <h2>ANERON</h2>
          <p>Black and white only. Orbitron on the brand. No extra colour.</p>
        </article>
      </section>
    </main>
  )
}

export default Home
