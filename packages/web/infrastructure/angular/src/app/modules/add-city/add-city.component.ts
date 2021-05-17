import { Component } from '@angular/core'
import { AddCityController, AddCityControllerFactory, AddCityPresenterVM } from '@grenoble-hands-on/web-adapters'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-add-city',
    templateUrl: './add-city.component.html',
    styleUrls: ['./add-city.component.scss'],
    providers: [
        {
            provide: AddCityController,
            useFactory: (presenterFactory: AddCityControllerFactory) => presenterFactory.build(),
            deps: [AddCityControllerFactory]
        }
    ]
})
export class AddCityComponent {
    vm$: Observable<AddCityPresenterVM> = new Observable<AddCityPresenterVM>(subscriber =>
        this.controller.presenter.subscribeVM(vm => subscriber.next(vm))
    )

    constructor(private controller: AddCityController) {
    }

    createCity($event: Event) {
        this.controller.create()
        $event.preventDefault()
    }

    validateCityName($event: Event) {
        this.controller.validateCityName(($event.target as HTMLInputElement).value)
    }

    validateLatitude($event: Event) {
        this.controller.validateLatitude(($event.target as HTMLInputElement).value)
    }

    validateLongitude($event: Event) {
        this.controller.validateLongitude(($event.target as HTMLInputElement).value)
    }
}
