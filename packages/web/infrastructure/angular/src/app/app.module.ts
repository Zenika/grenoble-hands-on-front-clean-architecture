import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CitiesComponent} from './cities/cities.component';
import {
  CityRepositoryInMemory,
  WeatherRepositoryHttp,
  HttpClient as IHttpClient
} from "@grenoble-hands-on/web-adapters";
import {GetCitiesUseCase, GetCityUseCase, CityRepository, WeatherRepository} from "@grenoble-hands-on/domain";
import { CityComponent } from './city/city.component';
import {RetrieveCityWeatherUseCase} from "@grenoble-hands-on/domain/dist/usecases/RetrieveCityWeatherUseCase";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {NavbarComponent} from "./shared/components/navbar/navbar.component";

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CityComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
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
      provide: RetrieveCityWeatherUseCase,
      useFactory: (weatherRepository: WeatherRepository) => new RetrieveCityWeatherUseCase(weatherRepository),
      deps: ['WeatherRepository']
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
