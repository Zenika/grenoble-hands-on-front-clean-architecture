import { InjectionToken, NgModule } from '@angular/core'
import { HttpClient as AngularHttpClient } from '@angular/common/http'
import {
    AddCityControllerFactory, BookmarkCityRepositoryLocalStorage,
    CitiesControllerFactory,
    CityControllerFactory,
    CityRepositoryInMemory,
    HttpClient,
    Navigation,
    NavigationRoute,
    WeatherRepository7Timer
} from '@grenoble-hands-on/web-adapters'
import {
    AddCityUseCase, BookmarkCityUseCase, BookmarkRepository,
    CityRepository, GetBookmarkCityUseCase,
    GetCitiesUseCase,
    RetrieveCityDailyWeatherUseCase, RetrieveCityHourlyWeatherUseCase,
    WeatherRepository
} from '@grenoble-hands-on/domain'
import { Router } from '@angular/router'

export const IHttpClient = new InjectionToken<HttpClient>('HttpClient')
export const INavigation = new InjectionToken<Navigation>('Navigation')
export const ICityRepository = new InjectionToken<CityRepository>('CityRepository')
export const IWeatherRepository = new InjectionToken<WeatherRepository>('WeatherRepository')
export const IBookmarkRepository = new InjectionToken<BookmarkRepository>('BookmarkRepository')

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
            provide: IBookmarkRepository,
            useValue: new BookmarkCityRepositoryLocalStorage(localStorage)
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
            provide: BookmarkCityUseCase,
            useFactory: (bookmarkCityRepository: BookmarkRepository) =>
                new BookmarkCityUseCase(bookmarkCityRepository),
            deps: [IBookmarkRepository]
        },
        {
            provide: GetBookmarkCityUseCase,
            useFactory: (bookmarkCityRepository: BookmarkRepository) =>
                new GetBookmarkCityUseCase(bookmarkCityRepository),
            deps: [IBookmarkRepository]
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
            provide: CityControllerFactory,
            useFactory: (
                retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase,
                retrieveCityHourlyWeatherUseCase: RetrieveCityHourlyWeatherUseCase
            ) => (
                new CityControllerFactory(retrieveCityWeatherUseCase, retrieveCityHourlyWeatherUseCase)
            ),
            deps: [RetrieveCityDailyWeatherUseCase, RetrieveCityHourlyWeatherUseCase]
        },
        {
            provide: CitiesControllerFactory,
            useFactory: (getCitiesUseCase: GetCitiesUseCase,
                         bookmarkCityUseCase: BookmarkCityUseCase,
                         getBookmarkCityUseCase: GetBookmarkCityUseCase) =>
                new CitiesControllerFactory(getCitiesUseCase, bookmarkCityUseCase, getBookmarkCityUseCase),
            deps: [GetCitiesUseCase, BookmarkCityUseCase, GetBookmarkCityUseCase]
        },
        {
            provide: AddCityControllerFactory,
            useFactory: (addNewCityUseCase: AddCityUseCase, navigation: Navigation) =>
                new AddCityControllerFactory(addNewCityUseCase, navigation),
            deps: [AddCityUseCase, INavigation]
        },
    ]
})
export class CoreModule {
}
