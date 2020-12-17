import {NgModule} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  AddCityPresenterFactory,
  CitiesPresenterFactory,
  CityPresenterFactory,
  CityRepositoryInMemory,
  HttpClient as IHttpClient,
  WeatherRepositoryHttp
} from "@grenoble-hands-on/web-adapters";
import {
  AddNewCityUseCase,
  CityRepository,
  GetCitiesUseCase,
  GetCityUseCase,
  RetrieveCityWeatherUseCase,
  WeatherRepository
} from "@grenoble-hands-on/domain";

@NgModule({
  imports: [],
  exports: [],
  providers: [
    {
      provide: 'IHttpClient',
      useFactory: (httpClient: HttpClient) => ({
        get<T>(url: string): Promise<T> {
          return httpClient.get<T>(url).toPromise()
        }
      }),
      deps: [HttpClient]
    },
    {
      provide: 'CityRepository',
      useValue: new CityRepositoryInMemory()
    },
    {
      provide: 'WeatherRepository',
      useFactory: (httpClient: IHttpClient) => new WeatherRepositoryHttp(httpClient),
      deps: ['IHttpClient']
    },
    {
      provide: GetCitiesUseCase,
      useFactory: (cityRepository: CityRepository) => new GetCitiesUseCase(cityRepository),
      deps: ['CityRepository']
    },
    {
      provide: GetCityUseCase,
      useFactory: (cityRepository: CityRepository) => new GetCityUseCase(cityRepository),
      deps: ['CityRepository']
    },
    {
      provide: AddNewCityUseCase,
      useFactory: (cityRepository: CityRepository) => new AddNewCityUseCase(cityRepository),
      deps: ['CityRepository']
    },
    {
      provide: RetrieveCityWeatherUseCase,
      useFactory: (weatherRepository: WeatherRepository) => new RetrieveCityWeatherUseCase(weatherRepository),
      deps: ['WeatherRepository']
    },
    {
      provide: CityPresenterFactory,
      useFactory: (getCityUseCase: GetCityUseCase, retrieveCityWeatherUseCase: RetrieveCityWeatherUseCase) => new CityPresenterFactory(getCityUseCase, retrieveCityWeatherUseCase),
      deps: [GetCityUseCase, RetrieveCityWeatherUseCase]
    },
    {
      provide: CitiesPresenterFactory,
      useFactory: (getCitiesUseCase: GetCitiesUseCase) => new CitiesPresenterFactory(getCitiesUseCase),
      deps: [GetCitiesUseCase]
    },
    {
      provide: AddCityPresenterFactory,
      useFactory: (addNewCityUseCase: AddNewCityUseCase) => new AddCityPresenterFactory(addNewCityUseCase),
      deps: [AddNewCityUseCase]
    },
  ]
})
export class CoreModule {
}
