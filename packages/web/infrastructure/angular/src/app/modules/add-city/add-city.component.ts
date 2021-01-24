import {Component} from '@angular/core';
import {AddCityPresenter, AddCityPresenterFactory, AddCityPresenterVM} from '@grenoble-hands-on/web-adapters';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
  providers: [
    {
      provide: AddCityPresenter,
      useFactory: (presenterFactory: AddCityPresenterFactory) => presenterFactory.build(),
      deps: [AddCityPresenterFactory]
    }
  ]
})
export class AddCityComponent {
  vm$: Observable<AddCityPresenterVM> = new Observable<AddCityPresenterVM>(subscriber =>
    this.presenter.onVmUpdate(vm => subscriber.next(vm))
  );

  constructor(private presenter: AddCityPresenter) {
  }

  // TODO test form
  createCity($event: Event) {
    this.presenter.create();
    $event.preventDefault();
  }

  validateCityName($event: Event) {
    this.presenter.validateCityName(($event.target as HTMLInputElement).value);
  }

  validateLatitude($event: Event) {
    this.presenter.validateLatitude(($event.target as HTMLInputElement).value);
  }

  validateLongitude($event: Event) {
    this.presenter.validateLongitude(($event.target as HTMLInputElement).value);
  }
}
