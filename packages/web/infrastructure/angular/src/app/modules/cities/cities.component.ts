import { Component, OnInit } from '@angular/core'
import { CitiesController, CitiesControllerFactory, CitiesPresenterVM } from '@grenoble-hands-on/web-adapters'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.scss'],
    providers: [
        {
            provide: CitiesController,
            useFactory: (presenterFactory: CitiesControllerFactory) => presenterFactory.build(),
            deps: [CitiesControllerFactory]
        }
    ]
})
export class CitiesComponent implements OnInit {
    vm$: Observable<CitiesPresenterVM> = new Observable<CitiesPresenterVM>(subscriber =>
        this.controller.presenter.subscribeVM(vm => subscriber.next(vm))
    )

    constructor(private controller: CitiesController) {
    }

    ngOnInit(): void {
        this.controller.fetchCities()
    }

}
