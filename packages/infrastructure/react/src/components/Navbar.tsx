import { Link } from 'react-router-dom'
import { FunctionComponent } from 'react'

export const Navbar: FunctionComponent = () => {
    return <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="container">
            <Link className="navbar-brand" to={'/'}>
                <h1 className="title navbar-item">
                    Zenika Cities weather
                </h1>
            </Link>
            <div className="navbar-menu">
                <h2 className="navbar-item has-text-white">
                    The best weather app in React
                </h2>
                <Link className="navbar-item has-text-white" to={'/create'}>
                    Add city
                </Link>
            </div>
        </div>
    </nav>
}
