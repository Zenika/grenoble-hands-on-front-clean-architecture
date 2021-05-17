import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { CitiesController, CitiesControllerBuilder, CitiesControllerFactory, CitiesPresenterVM } from '@grenoble-hands-on/web-adapters'
import { CityBuilder } from '@grenoble-hands-on/domain'
import { Cities } from '../src/modules/Cities'
import { MemoryRouter } from 'react-router-dom'

describe('CitiesComponent', () => {

    it('display cities', () => {
        // Given
        const vm = new CitiesPresenterVM()
        vm.cities = [
            CityBuilder.example().withName('Grenoble').build(),
            CityBuilder.example().withName('Lyon').build()
        ]
        const controller = new CitiesControllerBuilder(vm).build()

        // When
        const ui = new CitiesComponentBuilder().withController(controller).build()

        // Then
        const citiesName = ui.getCitiesDisplay()
        expect(citiesName).toEqual(['Grenoble', 'Lyon'])
    })

    it('fetch cities on init', async () => {
        const hasFetch = await new Promise<boolean>(resolve => {
            // Given
            const controller = new CitiesControllerBuilder()
                .withFetchCities(() => {
                    resolve(true)
                    return Promise.resolve()
                })
                .build()

            // When
            new CitiesComponentBuilder().withController(controller).build()
        })

        // Then
        expect(hasFetch).toBeTruthy()
    })
})


class CitiesComponentBuilder {
    private controller!: CitiesController

    withController(controller: CitiesController) {
        this.controller = controller
        return this
    }

    build() {
        const controllerFactory = { build: () => this.controller } as CitiesControllerFactory
        const screen = render(<Cities citiesControllerFactory={controllerFactory}/>, { wrapper: MemoryRouter })
        return new CitiesComponentWrapper(screen)
    }
}

class CitiesComponentWrapper {
    constructor(private readonly component: RenderResult) {
    }

    getCitiesDisplay() {
        return this.component.getAllByRole('link').map(el => el.textContent)
    }
}
