import { App, InjectionKey } from 'vue'
import {
    AddCityControllerFactory,
    CitiesControllerFactory,
    CityControllerFactory,
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

export const CITY_CONTROLLER_FACTORY: InjectionKey<CityControllerFactory> = Symbol()
export const CITIES_CONTROLLER_FACTORY: InjectionKey<CitiesControllerFactory> = Symbol()
export const ADD_CITY_CONTROLLER_FACTORY: InjectionKey<AddCityControllerFactory> = Symbol()

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

    const cityControllerFactory = new CityControllerFactory(getCityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)
    const citiesControllerFactory = new CitiesControllerFactory(getCitiesUseCase)
    const addCityControllerFactory = new AddCityControllerFactory(new AddCityUseCase(cityRepository), navigation)

    app.provide(CITY_CONTROLLER_FACTORY, cityControllerFactory)
    app.provide(CITIES_CONTROLLER_FACTORY, citiesControllerFactory)
    app.provide(ADD_CITY_CONTROLLER_FACTORY, addCityControllerFactory)
}
