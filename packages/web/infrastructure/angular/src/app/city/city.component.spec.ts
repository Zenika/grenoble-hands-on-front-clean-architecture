import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityComponent } from './city.component';
import {CityPresenterFactory} from "@grenoble-hands-on/web-adapters/dist/presenters/CityPresenterFactory";
import {RouterTestingModule} from "@angular/router/testing";
import {CityPresenterVM} from "@grenoble-hands-on/web-adapters";

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityComponent ],
      providers: [
        {
          provide: CityPresenterFactory,
          useValue: {
            createCityPresenter() {
              return {
                vm: new CityPresenterVM(),
                onVmUpdate() {

                },
                fetchCityWithWeather() {

                }
              }
            }
          }
        }
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
