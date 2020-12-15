import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CitiesComponent} from './cities/cities.component';
import {
  CitiesPresenter,
  CityPresenter,
  CityRepositoryInMemory,
  WeatherRepositoryHttp
} from "@grenoble-hands-on/web-adapters";
import {GetCitiesUseCase, GetCityUseCase} from "@grenoble-hands-on/domain";
import { CityComponent } from './city/city.component';
import {RetrieveCityWeatherUseCase} from "@grenoble-hands-on/domain/dist/usecases/RetrieveCityWeatherUseCase";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: CitiesPresenter,
      useFactory: () => new CitiesPresenter(new GetCitiesUseCase(new CityRepositoryInMemory()))
    },
    {
      provide: CityPresenter,
      useFactory: (httpClient: HttpClient) => new CityPresenter(new GetCityUseCase(new CityRepositoryInMemory()), new RetrieveCityWeatherUseCase(new WeatherRepositoryHttp({
        get<T>(url: string): Promise<T> {
          console.log(httpClient)
          return httpClient.get<T>(url).toPromise()
        }
      }))),
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
