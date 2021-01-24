import {TestBed} from '@angular/core/testing';

import {CityComponent} from './city.component';
import {
  CityPresenter,
  CityPresenterBuilder,
  CityPresenterFactory,
  CityPresenterVM
} from '@grenoble-hands-on/web-adapters';
import {RouterTestingModule} from '@angular/router/testing';
import {GeoPosition} from '@grenoble-hands-on/domain';
import {By} from '@angular/platform-browser';

describe('CityComponent', () => {

  it('display header with city name', () => {
    // Given
    const vm = new CityPresenterVM();
    vm.city = {name: 'Grenoble', position: new GeoPosition(45, 5)};
    const presenter = new CityPresenterBuilder(vm).build();

    // When
    const {fixture} = new CityComponentBuilder().withPresenter(presenter).build();

    // Then
    const header = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;
    expect(header).toBe('Grenoble');
  });

  it('display daily weather with temperature', () => {
    // Given
    const vm = new CityPresenterVM();
    vm.weather = [
      {weather: 'sunny', temperatureMin: 8, temperatureMax: 15, day: '12/01/2021'}
    ];

    // When
    const {fixture} = new CityComponentBuilder().withPresenter(new CityPresenterBuilder(vm).build()).build();

    // Then
    const weather = fixture.debugElement.queryAll(By.css('#daily-weather tr:not(:first-child)'));
    const weatherCol = weather[0].queryAll(By.css('td'));
    expect(weather.length).toBe(1);
    expect(weatherCol[0].nativeElement.textContent).toBe('12/01/2021');
    expect(weatherCol[2].nativeElement.textContent).toBe('15');
    expect(weatherCol[3].nativeElement.textContent).toBe('8');
  });


});


export class CityComponentBuilder {
  private presenter!: CityPresenter;

  withPresenter(presenter: CityPresenter) {
    this.presenter = presenter;
    return this;
  }

  build() {
    TestBed.configureTestingModule({
      declarations: [CityComponent],
      providers: [
        {
          provide: CityPresenterFactory,
          useValue: {
            build: () => this.presenter
          }
        }
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
    const fixture = TestBed.createComponent(CityComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return {component, fixture};
  }
}
