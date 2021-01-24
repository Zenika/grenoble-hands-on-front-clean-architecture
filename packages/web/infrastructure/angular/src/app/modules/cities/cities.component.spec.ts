import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CitiesComponent} from './cities.component';
import {CitiesPresenterBuilder, CitiesPresenterVM} from '@grenoble-hands-on/web-adapters';

describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CitiesComponent],
      providers: [
        {
          provide: CitiesPresenterBuilder,
          useValue: {
            build() {
              return {
                vm: new CitiesPresenterVM(),
                onVmUpdate(subscriber: (vm: CitiesPresenterVM) => void) {
                  subscriber(this.vm);
                },
                fetchCities() {

                }
              };
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
