import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCityPresenterFactory, AddCityPresenterVM } from '@grenoble-hands-on/web-adapters';

import { AddCityComponent } from './add-city.component';

describe('AddCityComponent', () => {
  let component: AddCityComponent;
  let fixture: ComponentFixture<AddCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCityComponent ],
      providers: [
        {
          provide: AddCityPresenterFactory,
          useValue: {
            createAddCityPresenter() {
              return {
                vm: new AddCityPresenterVM(),
                onVmUpdate(subscriber: (vm: AddCityPresenterVM) => void) {
                  subscriber(this.vm)
                },
                fetchCities() {

                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
