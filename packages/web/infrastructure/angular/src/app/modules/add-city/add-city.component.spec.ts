import {TestBed} from '@angular/core/testing';
import {
  AddCityPresenter,
  AddCityPresenterBuilder,
  AddCityPresenterFactory,
  AddCityPresenterVM
} from '@grenoble-hands-on/web-adapters';

import {AddCityComponent} from './add-city.component';
import {CitiesComponent} from '../cities/cities.component';
import {By} from '@angular/platform-browser';

describe('AddCityComponent', () => {

  it('display error on city name', () => {
    // Given
    const vm = new AddCityPresenterVM();
    vm.cityNameError = 'City required';
    const presenter = new AddCityPresenterBuilder(vm).build();

    // When
    const {fixture} = new AddCityComponentBuilder().withPresenter(presenter).build();

    // Then
    const error = fixture.debugElement.query(By.css('.help')).nativeElement.textContent;
    expect(error).toBe('City required');

  });

  it('display error on latitude', () => {
    // Given
    const vm = new AddCityPresenterVM();
    vm.latitudeError = 'Latitude required';
    const presenter = new AddCityPresenterBuilder(vm).build();

    // When
    const {fixture} = new AddCityComponentBuilder().withPresenter(presenter).build();

    // Then
    const error = fixture.debugElement.query(By.css('.help')).nativeElement.textContent;
    expect(error).toBe('Latitude required');
  });

  it('display error on longitude', () => {
    // Given
    const vm = new AddCityPresenterVM();
    vm.latitudeError = 'Longitude required';
    const presenter = new AddCityPresenterBuilder(vm).build();

    // When
    const {fixture} = new AddCityComponentBuilder().withPresenter(presenter).build();

    // Then
    const error = fixture.debugElement.query(By.css('.help')).nativeElement.textContent;
    expect(error).toBe('Longitude required');
  });

  it('cannot submit form on error', () => {
    // Given
    const vm = new AddCityPresenterVM();
    vm.canCreateCity = false;
    const presenter = new AddCityPresenterBuilder(vm).build();

    // When
    const {fixture} = new AddCityComponentBuilder().withPresenter(presenter).build();

    // Then
    const idDisabled = fixture.debugElement.query(By.css('button')).attributes.disabled !== undefined;
    expect(idDisabled).toBeTruthy();
  });
});


class AddCityComponentBuilder {
  private presenter!: AddCityPresenter;

  withPresenter(presenter: AddCityPresenter) {
    this.presenter = presenter;
    return this;
  }

  build() {
    TestBed.configureTestingModule({
      declarations: [AddCityComponent],
      providers: [
        {
          provide: AddCityPresenterFactory,
          useValue: {
            build: () => this.presenter
          }
        }
      ],
      imports: []
    })
      .compileComponents();
    const fixture = TestBed.createComponent(AddCityComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return {component, fixture};
  }
}
