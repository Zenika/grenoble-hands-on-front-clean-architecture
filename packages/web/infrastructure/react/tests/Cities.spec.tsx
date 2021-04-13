import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { CitiesPresenter, CitiesPresenterBuilder, CitiesPresenterFactory, CitiesPresenterVM } from '@grenoble-hands-on/web-adapters'
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
        const presenter = new CitiesPresenterBuilder(vm).build()

        // When
        const ui = new CitiesComponentBuilder().withPresenter(presenter).build()

        // Then
        const citiesName = ui.getCitiesDisplay()
        expect(citiesName).toEqual(['Grenoble', 'Lyon'])
    })

    it('fetch cities on init', async () => {
        const hasFetch = await new Promise<boolean>(resolve => {
            // Given
            const presenter = new CitiesPresenterBuilder()
                .withFetchCities(() => {
                    resolve(true)
                    return Promise.resolve()
                })
                .build()

            // When
            new CitiesComponentBuilder().withPresenter(presenter).build()
        })

        // Then
        expect(hasFetch).toBeTruthy()
    })
})


class CitiesComponentBuilder {
    private presenter!: CitiesPresenter

    withPresenter(presenter: CitiesPresenter) {
        this.presenter = presenter
        return this
    }

    build() {
        const presenterFactory = { build: () => this.presenter } as CitiesPresenterFactory
        const screen = render(<Cities citiesPresenterFactory={presenterFactory}/>, { wrapper: MemoryRouter })
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
