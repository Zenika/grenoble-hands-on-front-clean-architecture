import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CitiesComponent } from './modules/cities/cities.component'
import { CityComponent } from './modules/city/city.component'
import { HttpClientModule } from '@angular/common/http'
import { FooterComponent } from './shared/components/footer/footer.component'
import { NavbarComponent } from './shared/components/navbar/navbar.component'
import { AddCityComponent } from './modules/add-city/add-city.component'
import { CoreModule } from './core/core.module'

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CityComponent,
    NavbarComponent,
    FooterComponent,
    AddCityComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
