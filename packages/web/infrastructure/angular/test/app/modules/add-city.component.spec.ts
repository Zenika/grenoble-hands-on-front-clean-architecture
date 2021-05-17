import { AddCityController, AddCityControllerBuilder, AddCityControllerFactory, AddCityPresenterVM } from '@grenoble-hands-on/web-adapters'

import { AddCityComponent } from '../../../src/app/modules/add-city/add-city.component'
import { fireEvent, render, RenderResult } from '@testing-library/angular'
import { RouterTestingModule } from '@angular/router/testing'

describe('AddCityComponent', () => {

    test('display error on city name', async () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.cityNameError = 'City required'
        const controller = new AddCityControllerBuilder(vm).build()

        // When
        const ui = await new AddCityComponentBuilder().withController(controller).build()

        // Then
        const error = ui.getCityNameError()
        expect(error).toBe('City required')

    })

    test('display error on latitude', async () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.latitudeError = 'Latitude required'
        const controller = new AddCityControllerBuilder(vm).build()

        // When
        const ui = await new AddCityComponentBuilder().withController(controller).build()

        // Then
        const error = ui.getLatitudeError()
        expect(error).toBe('Latitude required')
    })

    test('display error on longitude', async () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.longitudeError = 'Longitude required'
        const controller = new AddCityControllerBuilder(vm).build()

        // When
        const ui = await new AddCityComponentBuilder().withController(controller).build()

        // Then
        const error = ui.getLongitudeError()
        expect(error).toBe('Longitude required')
    })

    test('cannot submit form on error', async () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.canCreateCity = false
        const controller = new AddCityControllerBuilder(vm).build()

        // When
        const ui = await new AddCityComponentBuilder().withController(controller).build()

        // Then
        expect(ui.isFormDisabled()).toBeTruthy()
    })

    test('validate city name on input change', async () => {
        const updatedCityName = await new Promise(async resolve => {
            // Given
            const controller = new AddCityControllerBuilder()
                .withValidateCityName(cityName => {
                    resolve(cityName)
                    return Promise.resolve()
                })
                .build()
            const ui = await new AddCityComponentBuilder().withController(controller).build()

            // When
            ui.updateCityName('Grenoble')
        })

        // Then
        expect(updatedCityName).toBe('Grenoble')
    })

    test('validate latitude on input change', async () => {
        const updatedLatitude = await new Promise(resolve => {
            // Given
            const controller = new AddCityControllerBuilder()
                .withValidateLatitude(latitude => {
                    resolve(latitude)
                    return Promise.resolve()
                })
                .build()
            new AddCityComponentBuilder()
                .withController(controller)
                .build()
                .then(ui => {
                    // When
                    ui.updateLatitude('12.5')
                })
        })


        // Then
        expect(updatedLatitude).toBe('12.5')
    })

    test('validate longitude on input change', async () => {
        const updatedLongitude = await new Promise(resolve => {
            // Given
            const controller = new AddCityControllerBuilder()
                .withValidateLongitude(longitude => {
                    resolve(longitude)
                    return Promise.resolve()
                })
                .build()

            // When
            new AddCityComponentBuilder()
                .withController(controller)
                .build()
                .then(ui => {
                    // When
                    ui.updateLongitude('12.5')
                })
        })

        // Then
        expect(updatedLongitude).toBe('12.5')
    })

    test('create city on form submit', async () => {
        const isCityCreated = await new Promise(resolve => {
            // Given
            const controller = new AddCityControllerBuilder()
                .withCreate(() => {
                    resolve(true)
                    return Promise.resolve()
                })
                .build()

            new AddCityComponentBuilder()
                .withController(controller)
                .build()
                .then(ui => {
                    // When
                    ui.submitForm()
                })
        })

        // Then
        expect(isCityCreated).toBeTruthy()
    })
})


class AddCityComponentBuilder {
    private controller!: AddCityController

    withController(controller: AddCityController) {
        this.controller = controller
        return this
    }

    async build() {
        const screen = await render(AddCityComponent, {
            providers: [
                {
                    provide: AddCityControllerFactory,
                    useValue: {
                        build: () => this.controller
                    }
                }
            ],
            imports: [
                RouterTestingModule
            ]
        })
        return new AddCityComponentWrapper(screen)
    }
}

class AddCityComponentWrapper {
    constructor(private readonly component: RenderResult<AddCityComponent>) {
    }

    getLatitudeError() {
        return this.component.getByLabelText('latitude error').textContent
    }

    getCityNameError() {
        return this.component.getByLabelText('city name error').textContent
    }

    getLongitudeError() {
        return this.component.getByLabelText('longitude error').textContent
    }

    isFormDisabled() {
        return this.component.getByRole('button', { name: /create/i }).hasAttribute('disabled')
    }

    updateCityName(value: string) {
        this.updateInput('Name', value)
    }

    updateLatitude(value: string) {
        this.updateInput('Latitude', value)
    }

    updateLongitude(value: string) {
        this.updateInput('Longitude', value)
    }

    private updateInput(selector: string, value: string) {
        const input = this.component.getByLabelText(selector) as HTMLInputElement
        input.value = value
        input.dispatchEvent(new Event('change'))
    }

    submitForm() {
        return fireEvent.submit(this.component.getByRole('form'))
    }
}
