import { App, InjectionKey } from 'vue'
import {
    AddCityPresenterFactory,
    CitiesPresenterFactory,
    CityPresenterFactory,
    CityRepositoryInMemory,
    HttpClient,
    NavigationRoute,
    WeatherRepository7Timer
} from '@grenoble-hands-on/web-adapters'
import router from '@/router'
import {
    AddCityUseCase,
    GetCitiesUseCase,
    GetCityUseCase,
    RetrieveCityDailyWeatherUseCase,
    RetrieveCityHourlyWeatherUseCase
} from '@grenoble-hands-on/domain'

export const CITY_PRESENTER_FACTORY: InjectionKey<CityPresenterFactory> = Symbol()
export const CITIES_PRESENTER_FACTORY: InjectionKey<CitiesPresenterFactory> = Symbol()
export const ADD_CITY_PRESENTER_FACTORY: InjectionKey<AddCityPresenterFactory> = Symbol()

export const dependencies = (app: App) => {
    const httpClient: HttpClient = {
        get<T>(url: string): Promise<T> {
            return fetch(url).then(value => value.json())
        }
    }
    const navigation = {
        navigate(route: NavigationRoute): Promise<void> {
            return router.push(route).then()
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

    app.provide(CITY_PRESENTER_FACTORY, cityPresenterFactory)
    app.provide(CITIES_PRESENTER_FACTORY, citiesPresenterFactory)
    app.provide(ADD_CITY_PRESENTER_FACTORY, addCityPresenterFactory)
}
