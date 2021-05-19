import React, { Fragment } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import {
    AddCityControllerFactory,
    CitiesControllerFactory,
    CityControllerFactory,
    CityRepositoryInMemory,
    HttpClient,
    NavigationRoute,
    WeatherRepository7Timer
} from '@grenoble-hands-on/web-adapters'
import {
    AddCityUseCase,
    GetCitiesUseCase,
    RetrieveCityDailyWeatherUseCase,
    RetrieveCityHourlyWeatherUseCase
} from '@grenoble-hands-on/domain'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Cities } from './modules/Cities'
import { City } from './modules/City'
import { AddCity } from './modules/AddCity'

function App() {
    const history = useHistory()
    const httpClient: HttpClient = {
        get<T>(url: string): Promise<T> {
            return fetch(url).then(value => value.json())
        }
    }
    const navigation = {
        navigate(route: NavigationRoute): Promise<void> {
            history.push(route)
            return Promise.resolve()
        }
    }

    const cityRepository = new CityRepositoryInMemory()
    const weatherRepository = new WeatherRepository7Timer(httpClient, cityRepository)

    const getCitiesUseCase = new GetCitiesUseCase(cityRepository)
    const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCase(weatherRepository)
    const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCase(weatherRepository)

    const cityControllerFactory = new CityControllerFactory(retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)
    const citiesControllerFactory = new CitiesControllerFactory(getCitiesUseCase)
    const addCityControllerFactory = new AddCityControllerFactory(new AddCityUseCase(cityRepository), navigation)

    return (
        <Fragment>
            <Navbar/>
            <section className="section">
                <div className="container">
                    <Switch>
                        <Route exact path="/">
                            <Cities citiesControllerFactory={citiesControllerFactory}/>
                        </Route>
                        <Route exact path="/create">
                            <AddCity addCityControllerFactory={addCityControllerFactory}/>
                        </Route>
                        <Route path="/city/:id" render={(props) => (
                            <City cityControllerFactory={cityControllerFactory} id={props.match.params.id}/>
                        )}>
                        </Route>
                    </Switch>
                </div>
            </section>
            <Footer/>
        </Fragment>
    )
}

export default App
