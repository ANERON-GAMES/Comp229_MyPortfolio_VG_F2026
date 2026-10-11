function About() {
  return (
    <main>
      <h1 className="page-title">About</h1>
      <div className="about-wrap">
        <img src="./images/id-plate.png" alt="ANERON" />
        <div>
          <h2>Vadim Gubin</h2>
          <span className="muted">Toronto</span>
          <p>
            I am Vadim Gubin. I study Game Programming at Centennial College
            in Toronto. Most of my C# time goes to Bloodrain, a first-person
            Unity game for Aneron Games.
          </p>
          <p style={{ marginTop: '1.4rem' }}>
            <a className="btn" href="./Vadim_Gubin_Resume.pdf" target="_blank" rel="noreferrer">
              Resume (PDF)
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

export default About
