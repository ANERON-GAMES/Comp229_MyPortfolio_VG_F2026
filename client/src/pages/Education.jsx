import { schoolList } from '../data/content.js'

function Education() {
  return (
    <main>
      <h1 className="page-title">Education</h1>
      {schoolList.map((item) => (
        <article className="entry" key={item.school}>
          <h2>{item.school}</h2>
          <span className="muted">{item.dates}</span>
          <p>{item.credential}</p>
        </article>
      ))}
    </main>
  )
}

export default Education
