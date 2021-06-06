import { Link } from 'react-router-dom'
import { Component } from 'react'
import { NavbarController, NavbarControllerFactory, NavbarPresenterVM } from '@grenoble-hands-on/web-adapters'
import { WeatherWidget } from './WeatherWidget'


export type NavbarProps = {
    navbarControllerFactory: NavbarControllerFactory
}

export class Navbar extends Component<NavbarProps, NavbarPresenterVM> {

    private controller: NavbarController

    constructor(public props: NavbarProps) {
        super(props)
        this.controller = this.props.navbarControllerFactory.build()
        this.state = this.controller.vm
    }

    componentDidMount() {
        this.controller.subscribeVM((vm: NavbarPresenterVM) => {
            console.log(vm)
            this.setState({ ...vm })
        })
        this.controller.fetchBookmarkCityWeather()
    }

    render() {
        const vm = this.state

        return (
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
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
                        <div className="navbar-end">
                            {vm.bookmarkCityWeather &&
                            <div className="navbar-item has-text-white">
                              <WeatherWidget weather={vm.bookmarkCityWeather!}/>
                            </div>
                            }
                            {vm.bookmarkCityWeatherMessage &&
                            <div className="navbar-item has-text-white"
                                 aria-label="weather not display">{vm.bookmarkCityWeatherMessage}
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

