import { Component, OnInit } from '@angular/core'
import { CityPresenter, CityPresenterFactory, CityPresenterVM } from '@grenoble-hands-on/web-adapters'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.scss'],
    providers: [
        {
            provide: CityPresenter,
            useFactory: (presenterFactory: CityPresenterFactory,
                         route: ActivatedRoute) => presenterFactory.build(route.snapshot.params.cityId),
            deps: [CityPresenterFactory, ActivatedRoute]
        }
    ]
})
export class CityComponent implements OnInit {
    vm$: Observable<CityPresenterVM> = new Observable<CityPresenterVM>(subscriber =>
        this.cityPresenter.onVmUpdate(vm => subscriber.next(vm))
    )

    constructor(private cityPresenter: CityPresenter) {
    }

    ngOnInit(): void {
        this.cityPresenter.fetchCity().then()
        this.cityPresenter.fetchWeather().then()
    }

    updateMode(mode: 'hourly' | 'daily') {
        this.cityPresenter.updateMode(mode)
    }

    updateTemperatureUnite(temperatureUnite: 'C' | 'F') {
        this.cityPresenter.updateTemperatureUnite(temperatureUnite)
    }
}
