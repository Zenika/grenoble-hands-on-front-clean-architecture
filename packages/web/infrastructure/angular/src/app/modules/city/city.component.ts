import { Component, OnInit } from '@angular/core'
import { CityController, CityControllerFactory, CityPresenterVM } from '@grenoble-hands-on/web-adapters'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.scss'],
    providers: [
        {
            provide: CityController,
            useFactory: (presenterFactory: CityControllerFactory,
                         route: ActivatedRoute) => presenterFactory.build(route.snapshot.params.cityId),
            deps: [CityControllerFactory, ActivatedRoute]
        }
    ]
})
export class CityComponent implements OnInit {
    vm$: Observable<CityPresenterVM> = new Observable<CityPresenterVM>(subscriber =>
        this.controller.presenter.subscribeVM(vm => subscriber.next(vm))
    )

    constructor(private controller: CityController) {
    }

    ngOnInit(): void {
        this.controller.fetchCity()
        this.controller.fetchWeather()
    }

    updateMode(mode: 'hourly' | 'daily') {
        this.controller.updateMode(mode)
    }

    updateTemperatureUnite(temperatureUnite: 'C' | 'F') {
        this.controller.updateTemperatureUnite(temperatureUnite)
    }
}
