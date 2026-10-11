import { NavLink } from 'react-router-dom'
import logo from '../assets/aneron-text.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/records', label: 'Records' }
]

function Navbar() {
  const token = localStorage.getItem('token') || ''
  const name = localStorage.getItem('name') || ''

  function signOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    window.location.hash = '#/signin'
  }

  return (
    <header>
      <NavLink to="/" className="brand">
        <img src={logo} alt="ANERON" />
      </NavLink>
      <nav>
        <ul>
          {links.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            </li>
          ))}
          {token ? (
            <li><button className="btn" type="button" onClick={signOut}>{name || 'Sign out'}</button></li>
          ) : (
            <>
              <li><NavLink to="/signin">Sign in</NavLink></li>
              <li><NavLink to="/signup">Sign up</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
