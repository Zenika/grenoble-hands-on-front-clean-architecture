import {Component, OnInit} from '@angular/core';
import {CityPresenter, CityPresenterFactory, CityPresenterVM} from '@grenoble-hands-on/web-adapters';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  providers: [
    {
      provide: CityPresenter,
      useFactory: (presenterFactory: CityPresenterFactory) => presenterFactory.build(),
      deps: [CityPresenterFactory]
    }
  ]
})
export class CityComponent implements OnInit {
  vm$: Observable<CityPresenterVM> = new Observable<CityPresenterVM>(subscriber =>
    this.cityPresenter.onVmUpdate(vm => subscriber.next(vm))
  );

  constructor(private cityPresenter: CityPresenter, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cityPresenter.fetchCityWithWeather(this.route.snapshot.params.cityId);
  }

}
