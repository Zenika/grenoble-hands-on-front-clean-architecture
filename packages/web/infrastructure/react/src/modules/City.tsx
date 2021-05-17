import { Link } from 'react-router-dom'
import { Component } from 'react'
import { CityController, CityControllerFactory, CityPresenterVM } from '@grenoble-hands-on/web-adapters'

type CityProps = { cityControllerFactory: CityControllerFactory, id: string }

export class City extends Component<CityProps, CityPresenterVM> {

    private controller: CityController

    constructor(public props: CityProps) {
        super(props)
        this.controller = this.props.cityControllerFactory.build(this.props.id)
        this.state = this.controller.presenter.vm
    }

    componentDidMount() {
        this.controller.fetchCity()
        this.controller.fetchWeather()

        this.controller.presenter.subscribeVM((state: CityPresenterVM) => {
            this.setState({ ...state })
        })
    }

    render() {
        const vm = this.state
        return (<section>
                <h1 className="title">Cities weather</h1>
                <article className="panel is-primary">
                    <div className="panel-heading"><h2 aria-label="city name">{vm.city?.name}</h2></div>
                    <div className="panel-block">
                        <div className="control">
                            <label className="radio">
                                <input type="radio" id="select-daily-view"
                                       checked={vm.mode === 'daily'}
                                       onChange={() => this.controller.updateMode('daily')}
                                       name="mode"/>
                                Simple
                            </label>
                            <label className="radio">
                                <input type="radio" id="select-hourly-view"
                                       checked={vm.mode === 'hourly'}
                                       onChange={() => this.controller.updateMode('hourly')}
                                       name="mode"/>
                                Detailed
                            </label>
                        </div>
                    </div>
                    <div className="panel-block">
                        <div className="control">
                            <label className="radio">
                                <input type="radio" id="select-celsius-unit"
                                       checked={vm.temperatureUnite === 'C'}
                                       value='C'
                                       onChange={() => this.controller.updateTemperatureUnite('C')}
                                       name="unit"/>
                                C°
                            </label>
                            <label className="radio">
                                <input type="radio" id="select-fahrenheit-unit"
                                       checked={vm.temperatureUnite === 'F'}
                                       value='F '
                                       onChange={() => this.controller.updateTemperatureUnite('F')}
                                       name="unit"/>
                                F°
                            </label>
                        </div>
                    </div>
                    {vm.dailyWeather?.length ? (
                        <div className="panel-block">
                            <table id="daily-weather" className="table is-bordered">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Weather</th>
                                    <th>Max</th>
                                    <th>Min</th>
                                </tr>
                                </thead>
                                <tbody>
                                {vm.dailyWeather.map((weather, i) =>
                                    <tr key={`${i}-${weather.day}`}>
                                        <td>{weather.day}</td>
                                        <td>
                                            <img src={'https://ssl.gstatic.com/onebox/weather/48/' + weather.weather + '.png'}
                                                 alt={weather.weather}/></td>
                                        <td>{weather.temperatureMax + ' ' + weather.unite + '°'}</td>
                                        <td>{weather.temperatureMin + ' ' + weather.unite + '°'}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                    {vm.hourlyWeather?.length ? (
                        <div className="panel-block">
                            <table id="hourly-weather" className="table is-bordered">
                                <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Weather</th>
                                    <th>Temperature</th>
                                </tr>
                                </thead>
                                <tbody>
                                {vm.hourlyWeather.map((weather, i) =>
                                    <tr key={`${i}-${weather.time}`}>
                                        <td>{weather.time}</td>
                                        <td>
                                            <img src={'https://ssl.gstatic.com/onebox/weather/48/' + weather.weather + '.png'}
                                                 alt={weather.weather}/></td>
                                        <td>{weather.temperature + ' ' + weather.unite + '°'}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                    {vm.loading ? <div className="panel-block">Loading...</div> : null}
                    <div className="panel-block">
                        <Link to={'/'} className="button is-rounded">
                            Go back home
                        </Link>
                    </div>
                </article>
            </section>
        )
    }

}
