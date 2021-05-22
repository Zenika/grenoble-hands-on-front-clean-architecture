import { App, InjectionKey } from 'vue'
import {
    AddCityControllerFactory, BookmarkCityRepositoryLocalStorage,
    CitiesControllerFactory,
    CityControllerFactory,
    CityRepositoryInMemory,
    HttpClient,
    NavigationRoute,
    WeatherRepository7Timer
} from '@grenoble-hands-on/web-adapters'
import router from '@/router'
import {
    AddCityUseCase, BookmarkCityUseCase, GetBookmarkCityUseCase,
    GetCitiesUseCase,
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
    const bookmarkCityRepository = new BookmarkCityRepositoryLocalStorage(window.localStorage)

    const getCitiesUseCase = new GetCitiesUseCase(cityRepository)
    const addCityUseCase = new AddCityUseCase(cityRepository)
    const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCase(weatherRepository)
    const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCase(weatherRepository)
    const bookmarkCityUseCase = new BookmarkCityUseCase(bookmarkCityRepository)
    const getBookmarkCityUseCase = new GetBookmarkCityUseCase(bookmarkCityRepository)

    const cityControllerFactory = new CityControllerFactory(retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)
    const citiesControllerFactory = new CitiesControllerFactory(getCitiesUseCase, bookmarkCityUseCase, getBookmarkCityUseCase)
    const addCityControllerFactory = new AddCityControllerFactory(addCityUseCase, navigation)

    app.provide(CITY_CONTROLLER_FACTORY, cityControllerFactory)
    app.provide(CITIES_CONTROLLER_FACTORY, citiesControllerFactory)
    app.provide(ADD_CITY_CONTROLLER_FACTORY, addCityControllerFactory)
}
