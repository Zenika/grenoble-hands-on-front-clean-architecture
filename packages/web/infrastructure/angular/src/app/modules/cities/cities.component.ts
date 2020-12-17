import {Component, OnInit} from '@angular/core';
import {CitiesPresenter, CitiesPresenterFactory, CitiesPresenterVM} from "@grenoble-hands-on/web-adapters";
import {Observable} from "rxjs";

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
  vm$: Observable<CitiesPresenterVM> = new Observable<CitiesPresenterVM>(subscriber =>
    this.citiesPresenter.onVmUpdate(vm => subscriber.next(vm))
  );

  constructor(private citiesPresenter: CitiesPresenter) {
  }

  ngOnInit(): void {
    this.citiesPresenter.fetchCities()
  }

}
