import React, { Component, Fragment } from 'react'
import { City } from '@grenoble-hands-on/domain'
import { Link } from 'react-router-dom'
import { CitiesController, CitiesControllerFactory, CitiesPresenterVM } from '@grenoble-hands-on/web-adapters'

export class Cities extends Component<{ citiesControllerFactory: CitiesControllerFactory }, CitiesPresenterVM> {

    private controller: CitiesController

    constructor(public props: { citiesControllerFactory: CitiesControllerFactory }) {
        super(props)
        this.controller = this.props.citiesControllerFactory.build()
        this.state = this.controller.vm
    }

    componentDidMount() {
        this.controller.fetchCities()
        this.controller.subscribeVM((vm: CitiesPresenterVM) => {
            this.setState({ ...vm })
        })
    }

    render() {
        const vm = this.state
        return (
            <Fragment>
                <h1 className="title">Offices</h1>
                <div className="panel">
                    {vm.cities?.map((city: City) => (
                        <Link className="panel-block p-4 is-justify-content-space-between is-align-content-center" to={'/city/' + city.name}
                              key={city.name}>
                            <h2 className="subtitle">{city.name}</h2>
                            <button className={`button ${vm.favoriteCityId === city.name ? 'is-success' : ''}`} onClick={($event) => {
                                $event.stopPropagation()
                                $event.preventDefault()
                                this.controller.bookmarkCity(city.name)
                            }}>
                                <span className="icon is-small">⭐️</span>
                            </button>
                        </Link>
                    ))}
                </div>
            </Fragment>
        )
    }
}
