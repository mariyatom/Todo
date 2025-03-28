import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <header className="header">
        <Link to="/">
          <h1>todos</h1>
        </Link>
      </header>
      <Outlet />
    </>
  )
}

export default Layout
