import { projectList } from '../data/content.js'

function Projects() {
  return (
    <main>
      <h1 className="page-title">Projects</h1>
      {projectList.map((item) => (
        <article className="project-card" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="project-body">
            <h2>{item.name}</h2>
            <span className="muted">{item.year} · {item.role}</span>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </main>
  )
}

export default Projects
