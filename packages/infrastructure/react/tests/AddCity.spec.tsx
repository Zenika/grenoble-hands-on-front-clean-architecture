import { AddCityController, AddCityControllerBuilder, AddCityControllerFactory, AddCityPresenterVM } from '@grenoble-hands-on/web-adapters'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { AddCity } from '../src/modules/AddCity'

describe('AddCityComponent', () => {

    test('display error on city name', () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.cityNameError = 'City required'
        const controller = new AddCityControllerBuilder(vm).build()

        // When
        const ui = new AddCityComponentBuilder().withController(controller).build()

        // Then
        const error = ui.getCityNameError()
        expect(error).toBe('City required')

    })

    test('display error on latitude', () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.latitudeError = 'Latitude required'
        const controller = new AddCityControllerBuilder(vm).build()

        // When
        const ui = new AddCityComponentBuilder().withController(controller).build()

        // Then
        const error = ui.getLatitudeError()
        expect(error).toBe('Latitude required')
    })

    test('display error on longitude', () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.longitudeError = 'Longitude required'
        const controller = new AddCityControllerBuilder(vm).build()

        // When
        const ui = new AddCityComponentBuilder().withController(controller).build()

        // Then
        const error = ui.getLongitudeError()
        expect(error).toBe('Longitude required')
    })

    test('cannot submit form on error', () => {
        // Given
        const vm = new AddCityPresenterVM()
        vm.canCreateCity = false
        const controller = new AddCityControllerBuilder(vm).build()

        // When
        const ui = new AddCityComponentBuilder().withController(controller).build()

        // Then
        expect(ui.isFormDisabled()).toBeTruthy()
    })

    test('validate city name on input change', async () => {
        const updatedCityName = await new Promise(resolve => {
            // Given
            const controller = new AddCityControllerBuilder()
                .withValidateCityName(cityName => {
                    resolve(cityName)
                    return Promise.resolve()
                })
                .build()
            const ui = new AddCityComponentBuilder().withController(controller).build()

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
            const ui = new AddCityComponentBuilder().withController(controller).build()

            // When
            ui.updateLatitude('12.5')
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
            const ui = new AddCityComponentBuilder().withController(controller).build()

            // When
            ui.updateLongitude('12.5')
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
            const ui = new AddCityComponentBuilder().withController(controller).build()

            // When
            ui.submitForm()
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

    build() {
        const presenterFactory = { build: () => this.controller } as AddCityControllerFactory
        const screen = render(<AddCity addCityControllerFactory={presenterFactory}/>, { wrapper: MemoryRouter })
        return new AddCityComponentWrapper(screen)
    }
}

class AddCityComponentWrapper {
    constructor(private readonly component: RenderResult) {
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
        fireEvent.change(
            this.component.getByLabelText(selector),
            {
                target: {
                    value: value
                },
            }
        )
    }

    submitForm() {
        return fireEvent.submit(this.component.getByRole('form'))
    }
}
