import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CitiesComponent} from "./cities/cities.component";
import {CityComponent} from "./city/city.component";


const routes: Routes = [
  {path: '', component: CitiesComponent},
  {path: ':cityId', component: CityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
