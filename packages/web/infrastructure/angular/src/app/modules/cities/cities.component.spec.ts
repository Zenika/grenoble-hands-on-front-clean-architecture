import {TestBed} from '@angular/core/testing';

import {CitiesComponent} from './cities.component';
import {
  CitiesPresenter,
  CitiesPresenterBuilder,
  CitiesPresenterFactory,
  CitiesPresenterVM
} from '@grenoble-hands-on/web-adapters';
import {RouterTestingModule} from '@angular/router/testing';
import {CityBuilder} from '@grenoble-hands-on/domain';
import {By} from '@angular/platform-browser';

describe('CitiesComponent', () => {

  it('display cities', () => {
    // Given
    const vm = new CitiesPresenterVM();
    vm.cities = [
      CityBuilder.example().withName('Grenoble').build(),
      CityBuilder.example().withName('Lyon').build()
    ];
    const presenter = new CitiesPresenterBuilder(vm).build();

    // When
    const {fixture} = new CitiesComponentBuilder().withPresenter(presenter).build();

    // Then
    const citiesName = fixture.debugElement.queryAll(By.css('.panel-block h2')).map(dom => dom.nativeElement.textContent);
    expect(citiesName).toEqual(['Grenoble', 'Lyon']);
  });

  it('fetch cities on init', async () => {
    const hasFetch = await new Promise<boolean>(resolve => {
      // Given
      const presenter = new CitiesPresenterBuilder()
        .withFetchCities(() => {
          resolve(true);
          return Promise.resolve();
        })
        .build();

      // When
      new CitiesComponentBuilder().withPresenter(presenter).build();
    });

    // Then
    expect(hasFetch).toBeTruthy();
  });
});


class CitiesComponentBuilder {
  private citiesPresenter!: CitiesPresenter;

  withPresenter(citiesPresenter: CitiesPresenter) {
    this.citiesPresenter = citiesPresenter;
    return this;
  }

  build() {
    TestBed.configureTestingModule({
      declarations: [CitiesComponent],
      providers: [
        {
          provide: CitiesPresenterFactory,
          useValue: {
            build: () => this.citiesPresenter
          }
        }
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
    const fixture = TestBed.createComponent(CitiesComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return {component, fixture};
  }
}
