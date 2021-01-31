import { InjectionToken, NgModule } from '@angular/core'
import { HttpClient as AngularHttpClient } from '@angular/common/http'
import {
    AddCityPresenterFactory,
    CitiesPresenterFactory,
    CityPresenterFactory,
    CityRepositoryInMemory,
    HttpClient,
    Navigation,
    NavigationRoute,
    WeatherRepository7Timer
} from '@grenoble-hands-on/web-adapters'
import {
    AddCityUseCase,
    CityRepository,
    GetCitiesUseCase,
    GetCityUseCase,
    RetrieveCityDailyWeatherUseCase, RetrieveCityHourlyWeatherUseCase,
    WeatherRepository
} from '@grenoble-hands-on/domain'
import { Router } from '@angular/router'

export const IHttpClient = new InjectionToken<HttpClient>('HttpClient')
export const INavigation = new InjectionToken<Navigation>('Navigation')
export const ICityRepository = new InjectionToken<CityRepository>('CityRepository')
export const IWeatherRepository = new InjectionToken<WeatherRepository>('WeatherRepository')

@NgModule({
    imports: [],
    exports: [],
    providers: [
        {
            provide: IHttpClient,
            useFactory: (httpClient: AngularHttpClient): HttpClient => ({
                get<T>(url: string): Promise<T> {
                    return httpClient.get<T>(url).toPromise()
                }
            }),
            deps: [AngularHttpClient]
        },
        {
            provide: INavigation,
            useFactory: (router: Router): Navigation => ({
                navigate(route: NavigationRoute): Promise<void> {
                    return router.navigateByUrl(route.toString()).then(() => Promise.resolve())
                }
            }),
            deps: [Router]
        },
        {
            provide: ICityRepository,
            useValue: new CityRepositoryInMemory()
        },
        {
            provide: IWeatherRepository,
            useFactory: (httpClient: HttpClient, cityRepository: CityRepository) => new WeatherRepository7Timer(httpClient, cityRepository),
            deps: [IHttpClient, ICityRepository]
        },
        {
            provide: GetCitiesUseCase,
            useFactory: (cityRepository: CityRepository) =>
                new GetCitiesUseCase(cityRepository),
            deps: [ICityRepository]
        },
        {
            provide: GetCityUseCase,
            useFactory: (cityRepository: CityRepository) =>
                new GetCityUseCase(cityRepository),
            deps: [ICityRepository]
        },
        {
            provide: AddCityUseCase,
            useFactory: (cityRepository: CityRepository) =>
                new AddCityUseCase(cityRepository),
            deps: [ICityRepository]
        },
        {
            provide: RetrieveCityDailyWeatherUseCase,
            useFactory: (weatherRepository: WeatherRepository) =>
                new RetrieveCityDailyWeatherUseCase(weatherRepository),
            deps: [IWeatherRepository]
        },
        {
            provide: RetrieveCityHourlyWeatherUseCase,
            useFactory: (weatherRepository: WeatherRepository) =>
                new RetrieveCityHourlyWeatherUseCase(weatherRepository),
            deps: [IWeatherRepository]
        },
        {
            provide: CityPresenterFactory,
            useFactory: (
                getCityUseCase: GetCityUseCase,
                retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase,
                retrieveCityHourlyWeatherUseCase: RetrieveCityHourlyWeatherUseCase
            ) => (
                new CityPresenterFactory(getCityUseCase, retrieveCityWeatherUseCase, retrieveCityHourlyWeatherUseCase)
            ),
            deps: [GetCityUseCase, RetrieveCityDailyWeatherUseCase, RetrieveCityHourlyWeatherUseCase]
        },
        {
            provide: CitiesPresenterFactory,
            useFactory: (getCitiesUseCase: GetCitiesUseCase) =>
                new CitiesPresenterFactory(getCitiesUseCase),
            deps: [GetCitiesUseCase]
        },
        {
            provide: AddCityPresenterFactory,
            useFactory: (addNewCityUseCase: AddCityUseCase, navigation: Navigation) =>
                new AddCityPresenterFactory(addNewCityUseCase, navigation),
            deps: [AddCityUseCase, INavigation]
        },
    ]
})
export class CoreModule {
}
