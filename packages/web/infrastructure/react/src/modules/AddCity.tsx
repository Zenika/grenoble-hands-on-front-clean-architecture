import { AddCityController, AddCityControllerFactory, AddCityPresenterVM } from '@grenoble-hands-on/web-adapters'
import { Component } from 'react'

export type AddCityProps = {
    addCityControllerFactory: AddCityControllerFactory
}

export class AddCity extends Component<AddCityProps, AddCityPresenterVM> {

    private controller: AddCityController

    constructor(public props: AddCityProps) {
        super(props)
        this.controller = this.props.addCityControllerFactory.build()
        this.state = this.controller.presenter.vm
    }

    componentDidMount() {
        this.controller.presenter.subscribeVM((vm: AddCityPresenterVM) => {
            this.setState({ ...vm })
        })
    }

    render() {
        const vm = this.state

        return (
            <section>
                <h1 className="title">Create city</h1>

                <div className="card">
                    <form className="card-content" role="form" onSubmit={() => this.controller.create()}>
                        <div className="field city-name">
                            <label htmlFor="city-name-input" className="label">Name</label>
                            <div className="control">
                                <input id="city-name-input" className="input" type="text"
                                       onChange={($event) => this.controller.validateCityName($event.target.value)}
                                       placeholder="City name"/>
                            </div>
                            {vm.cityNameError ?
                                <p className="help is-danger" role="alert" aria-label="city name error">{vm.cityNameError}</p> : null}
                        </div>
                        <div className="field latitude">
                            <label htmlFor="latitude-input" className="label">Latitude</label>
                            <div className="control">
                                <input id="latitude-input" className="input" type="text"
                                       onChange={($event) => this.controller.validateLatitude($event.target.value)}
                                       placeholder="Latitude"/>
                            </div>
                            {vm.latitudeError ?
                                <p className="help is-danger" role="alert" aria-label="latitude error">{vm.latitudeError}</p> : null}
                        </div>
                        <div className="field longitude">
                            <label htmlFor="longitude-input" className="label">Longitude</label>
                            <div className="control">
                                <input id="longitude-input" className="input" type="text"
                                       onChange={($event) => this.controller.validateLongitude($event.target.value)}
                                       placeholder="Longitude"/>
                            </div>
                            {vm.longitudeError ?
                                <p className="help is-danger" role="alert" aria-label="longitude error">{vm.longitudeError}</p> : null}
                        </div>
                        <div className="control">
                            <button type="submit" className="button is-primary" disabled={!vm.canCreateCity}>Create</button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}
