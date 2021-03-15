import { AddCityPresenter, AddCityPresenterFactory, AddCityPresenterVM } from '@grenoble-hands-on/web-adapters'
import { Component } from 'react'

export type AddCityProps = {
    addCityPresenterFactory: AddCityPresenterFactory
}

export class AddCity extends Component<AddCityProps, AddCityPresenterVM> {

    private addCityPresenter: AddCityPresenter

    constructor(public props: AddCityProps) {
        super(props)
        this.addCityPresenter = this.props.addCityPresenterFactory.build()
        this.state = this.addCityPresenter.vm
    }

    componentDidMount() {
        this.addCityPresenter.onVmUpdate((vm: AddCityPresenterVM) => {
            this.setState({ ...vm })
        })
    }

    render() {
        const vm = this.state

        const test = (g: string) => {
            this.addCityPresenter.validateCityName(g)
        }

        return (
            <section>
                <h1 className="title">Create city</h1>

                <div className="card">
                    <form className="card-content" onSubmit={() => this.addCityPresenter.create()}>
                        <div className="field city-name">
                            <label htmlFor="city-name-input" className="label">Name</label>
                            <div className="control">
                                <input id="city-name-input" className="input" type="text"
                                       onChange={($event) => test($event.target.value)}
                                       placeholder="City name"/>
                            </div>
                            {vm.cityNameError ? <p className="help is-danger">{vm.cityNameError}</p> : null}
                        </div>
                        <div className="field latitude">
                            <label htmlFor="latitude-input" className="label">Latitude</label>
                            <div className="control">
                                <input id="latitude-input" className="input" type="text"
                                       onChange={($event) => this.addCityPresenter.validateLatitude($event.target.value)}
                                       placeholder="Latitude"/>
                            </div>
                            {vm.latitudeError ? <p className="help is-danger">{vm.latitudeError}</p> : null}
                        </div>
                        <div className="field longitude">
                            <label htmlFor="longitude-input" className="label">Longitude</label>
                            <div className="control">
                                <input id="longitude-input" className="input" type="text"
                                       onChange={($event) => this.addCityPresenter.validateLongitude($event.target.value)}
                                       placeholder="Longitude"/>
                            </div>
                            {vm.longitudeError ? <p className="help is-danger">{vm.longitudeError}</p> : null}
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
