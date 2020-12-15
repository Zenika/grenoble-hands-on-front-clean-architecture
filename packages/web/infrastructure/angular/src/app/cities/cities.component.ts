import { Component, OnInit } from '@angular/core';
import {CitiesPresenter, CitiesPresenterVM} from "@grenoble-hands-on/web-adapters";

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
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
