import {TestBed} from '@angular/core/testing';

import {CityComponent} from './city.component';
import {CityPresenterFactory} from '@grenoble-hands-on/web-adapters';
import {RouterTestingModule} from '@angular/router/testing';
import {CityPresenterVM} from '@grenoble-hands-on/web-adapters';
import {GeoPosition} from '@grenoble-hands-on/domain';
import {By} from '@angular/platform-browser';

describe('CityComponent', () => {

  it('display header with city name', () => {
    // Given
    const vm = new CityPresenterVM();
    vm.city = {name: 'Grenoble', position: new GeoPosition(45, 5)};

    // When
    const {fixture} = mountComponent(vm);

    // Then
    const header = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;
    expect(header).toBe('Grenoble');
  });

  it('display daily weather with temperature', () => {
    // Given
    const vm = new CityPresenterVM();
    vm.weather = [
      {weather: 'sunny', temperatureMin: 8, temperatureMax: 15, day: new Date()}
    ];

    // When
    const {fixture} = mountComponent(vm);

    // Then
    const weather = fixture.debugElement.queryAll(By.css('#daily-weather tr:not(:first-child)'));
    const weatherCol = weather[0].queryAll(By.css('td'));
    expect(weather.length).toBe(1);
    // expect(weatherCol[0].nativeElement.textContent).toBe('day')
    expect(weatherCol[2].nativeElement.textContent).toBe('15');
    expect(weatherCol[3].nativeElement.textContent).toBe('8');
  });


});


function mountComponent(vm: CityPresenterVM = new CityPresenterVM()) {
  TestBed.configureTestingModule({
    declarations: [CityComponent],
    providers: [
      {
        provide: CityPresenterFactory,
        useValue: {
          createCityPresenter() {
            return {
              onVmUpdate(subscriber: (vm: CityPresenterVM) => void) {
                subscriber(vm);
              },
              fetchCityWithWeather() {

              }
            };
          }
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
