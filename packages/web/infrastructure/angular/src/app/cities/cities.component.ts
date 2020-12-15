import { Component, OnInit } from '@angular/core';
import {CitiesPresenter, CitiesPresenterVM} from "@grenoble-hands-on/web-adapters";
import {GetCitiesUseCase} from "@grenoble-hands-on/domain";

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  providers: [
    {
      provide: CitiesPresenter,
      useFactory: (getCitiesUseCase: GetCitiesUseCase) => new CitiesPresenter(getCitiesUseCase),
      deps: [GetCitiesUseCase]
    }
  ]
})
export class CitiesComponent implements OnInit {
  public vm: CitiesPresenterVM = this.citiesPresenter.vm;

  constructor(private citiesPresenter: CitiesPresenter) { }

  ngOnInit(): void {
    this.citiesPresenter.fetchCities()
    this.citiesPresenter.onVmUpdate(vm => {
      console.log(vm)
      this.vm = vm
    })
  }

}
