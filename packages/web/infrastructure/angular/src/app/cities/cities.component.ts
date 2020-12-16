import { Component, OnInit } from '@angular/core';
import {CitiesPresenter, CitiesPresenterFactory, CitiesPresenterVM} from "@grenoble-hands-on/web-adapters";

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  providers: [
    {
      provide: CitiesPresenter,
      useFactory: (presenterFactory: CitiesPresenterFactory) => presenterFactory.createCitiesPresenter(),
      deps: [CitiesPresenterFactory]
    }
  ]
})
export class CitiesComponent implements OnInit {
  public vm: CitiesPresenterVM = this.citiesPresenter.vm;

  constructor(private citiesPresenter: CitiesPresenter) { }

  ngOnInit(): void {
    this.citiesPresenter.fetchCities()
    this.citiesPresenter.onVmUpdate(vm => {
      this.vm = vm
    })
  }

}
