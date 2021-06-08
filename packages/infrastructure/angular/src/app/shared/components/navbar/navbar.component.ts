import { Component, OnInit } from '@angular/core'
import { NavbarController, NavbarControllerFactory, NavbarPresenterVM } from '@grenoble-hands-on/web-adapters'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers: [
        {
            provide: NavbarController,
            useFactory: (presenterFactory: NavbarControllerFactory) => presenterFactory.build(),
            deps: [NavbarControllerFactory]
        }
    ]
})
export class NavbarComponent implements OnInit {
    vm$: Observable<NavbarPresenterVM> = new Observable<NavbarPresenterVM>(subscriber =>
        this.controller.subscribeVM(vm => subscriber.next(vm))
    )

    constructor(private readonly controller: NavbarController) {
    }

    ngOnInit(): void {
        this.controller.fetchBookmarkCityWeather()
    }

}
