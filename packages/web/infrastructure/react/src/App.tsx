import React, { Fragment } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import {
    AddCityPresenterFactory,
    CitiesPresenterFactory,
    CityPresenterFactory,
    CityRepositoryInMemory,
    HttpClient,
    NavigationRoute,
    WeatherRepository7Timer
} from '@grenoble-hands-on/web-adapters'
import {
    AddCityUseCase,
    GetCitiesUseCase,
    GetCityUseCase,
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
            debugger
            history.push(route)
            return Promise.resolve()
        }
    }

    const cityRepository = new CityRepositoryInMemory()
    const weatherRepository = new WeatherRepository7Timer(httpClient, cityRepository)

    const getCityUseCase = new GetCityUseCase(cityRepository)
    const getCitiesUseCase = new GetCitiesUseCase(cityRepository)
    const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCase(weatherRepository)
    const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCase(weatherRepository)

    const cityPresenterFactory = new CityPresenterFactory(getCityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)
    const citiesPresenterFactory = new CitiesPresenterFactory(getCitiesUseCase)
    const addCityPresenterFactory = new AddCityPresenterFactory(new AddCityUseCase(cityRepository), navigation)

    return (
        <Fragment>
            <Navbar/>
            <section className="section">
                <div className="container">
                    <Switch>
                        <Route exact path="/">
                            <Cities citiesPresenterFactory={citiesPresenterFactory}/>
                        </Route>
                        <Route exact path="/create">
                            <AddCity addCityPresenterFactory={addCityPresenterFactory}/>
                        </Route>
                        <Route path="/city/:id" render={(props) => (
                            <City cityPresenterFactory={cityPresenterFactory} id={props.match.params.id}/>
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
