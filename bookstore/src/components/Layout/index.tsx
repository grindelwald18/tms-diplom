import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer'
import { Header } from '../Header'
export function Layout () {

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container flex-grow-1 mb-3">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
