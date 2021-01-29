import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddCityPresenter, AddCityPresenterFactory, AddCityPresenterVM } from '@grenoble-hands-on/web-adapters'

import { AddCityComponent } from '../../../src/app/modules/add-city/add-city.component'
import { By } from '@angular/platform-browser'
import { AddCityPresenterBuilder } from '../../builders/AddCityPresenterBuilder'

describe('AddCityComponent', () => {

    test('display error on city name', () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.cityNameError = 'City required'
        const presenter = new AddCityPresenterBuilder(vm).build()

        // When
        const ui = new AddCityComponentBuilder().withPresenter(presenter).build()

        // Then
        const error = ui.getCityNameError()
        expect(error).toBe('City required')

    })

    test('display error on latitude', () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.latitudeError = 'Latitude required'
        const presenter = new AddCityPresenterBuilder(vm).build()

        // When
        const ui = new AddCityComponentBuilder().withPresenter(presenter).build()

        // Then
        const error = ui.getLatitudeError()
        expect(error).toBe('Latitude required')
    })

    test('display error on longitude', () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.latitudeError = 'Longitude required'
        const presenter = new AddCityPresenterBuilder(vm).build()

        // When
        const ui = new AddCityComponentBuilder().withPresenter(presenter).build()

        // Then
        const error = ui.getLongitudeError()
        expect(error).toBe('Longitude required')
    })

    test('cannot submit form on error', () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.canCreateCity = false
        const presenter = new AddCityPresenterBuilder(vm).build()

        // When
        const ui = new AddCityComponentBuilder().withPresenter(presenter).build()

        // Then
        expect(ui.isFormDisabled()).toBeTruthy()
    })

    test('validate city name on input change', async () => {
        const updatedCityName = await new Promise(resolve => {
            // Given
            const presenter = new AddCityPresenterBuilder()
                .withValidateCityName(cityName => {
                    resolve(cityName)
                    return Promise.resolve()
                })
                .build()
            const ui = new AddCityComponentBuilder().withPresenter(presenter).build()

            // When
            ui.updateCityName('Grenoble')
        })

        // Then
        expect(updatedCityName).toBe('Grenoble')
    })

    test('validate latitude on input change', async () => {
        const updatedLatitude = await new Promise(resolve => {
            // Given
            const presenter = new AddCityPresenterBuilder()
                .withValidateLatitude(latitude => {
                    resolve(latitude)
                    return Promise.resolve()
                })
                .build()
            const ui = new AddCityComponentBuilder().withPresenter(presenter).build()

            // When
            ui.updateLatitude('12.5')
        })

        // Then
        expect(updatedLatitude).toBe('12.5')
    })

    test('validate longitude on input change', async () => {
        const updatedLongitude = await new Promise(resolve => {
            // Given
            const presenter = new AddCityPresenterBuilder()
                .withValidateLongitude(longitude => {
                    resolve(longitude)
                    return Promise.resolve()
                })
                .build()
            const ui = new AddCityComponentBuilder().withPresenter(presenter).build()

            // When
            ui.updateLongitude('12.5')
        })

        // Then
        expect(updatedLongitude).toBe('12.5')
    })

    test('create city on form submit', async () => {
        const isCityCreated = await new Promise(resolve => {
            // Given
            const presenter = new AddCityPresenterBuilder()
                .withCreate(() => {
                    resolve(true)
                    return Promise.resolve()
                })
                .build()
            const ui = new AddCityComponentBuilder().withPresenter(presenter).build()

            // When
            ui.submitForm()
        })

        // Then
        expect(isCityCreated).toBeTruthy()
    })
})


class AddCityComponentBuilder {
    private presenter!: AddCityPresenter

    withPresenter(presenter: AddCityPresenter) {
        this.presenter = presenter
        return this
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
        }).compileComponents().then()
        const fixture = TestBed.createComponent(AddCityComponent)
        const component = fixture.componentInstance
        fixture.detectChanges()
        return new AddCityComponentWrapper(component, fixture)
    }
}

class AddCityComponentWrapper {
    constructor(private readonly component: AddCityComponent, private readonly fixture: ComponentFixture<AddCityComponent>) {
    }

    getLatitudeError() {
        return this.fixture.debugElement.query(By.css('.help')).nativeElement.textContent
    }

    getCityNameError() {
        return this.fixture.debugElement.query(By.css('.help')).nativeElement.textContent
    }

    getLongitudeError() {
        return this.fixture.debugElement.query(By.css('.help')).nativeElement.textContent
    }

    isFormDisabled() {
        return this.fixture.debugElement.query(By.css('button')).nativeElement.disabled
    }

    updateCityName(value: string) {
        this.updateInput('#city-name-input', value)
    }

    updateLatitude(value: string) {
        this.updateInput('#latitude-input', value)
    }

    updateLongitude(value: string) {
        this.updateInput('#longitude-input', value)
    }

    private updateInput(selector: string, value: string) {
        const input = this.fixture.debugElement.query(By.css(selector)).nativeElement
        input.value = value
        input.dispatchEvent(new Event('change'))
    }

    submitForm() {
        return this.fixture.debugElement.query(By.css('form')).nativeElement.dispatchEvent(new Event('submit'))
    }
}
