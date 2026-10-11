import { serviceList } from '../data/content.js'

function Services() {
  return (
    <main>
      <h1 className="page-title">Services</h1>
      <div className="svc-grid">
        {serviceList.map((item) => (
          <article className="svc" key={item.name}>
            <img src={item.image} alt="" />
            <h2>{item.name}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Services
