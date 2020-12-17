import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CitiesComponent} from "./modules/cities/cities.component";
import {CityComponent} from "./modules/city/city.component";
import {AddCityComponent} from "./modules/add-city/add-city.component";


const routes: Routes = [
  {path: '', component: CitiesComponent},
  {path: 'create', component: AddCityComponent},
  {path: ':cityId', component: CityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
