import { CitiesComponent } from '../../../src/app/modules/cities/cities.component'
import { CitiesController, CitiesControllerBuilder, CitiesControllerFactory, CitiesPresenterVM } from '@grenoble-hands-on/web-adapters'
import { RouterTestingModule } from '@angular/router/testing'
import { CityBuilder } from '@grenoble-hands-on/domain'
import { render, RenderResult } from '@testing-library/angular'

describe('CitiesComponent', () => {

    it('display cities', async () => {
        // Given
        const vm = new CitiesPresenterVM()
        vm.cities = [
            CityBuilder.example().withName('Grenoble').build(),
            CityBuilder.example().withName('Lyon').build()
        ]
        const controller = new CitiesControllerBuilder(vm).build()

        // When
        const ui = await new CitiesComponentBuilder().withController(controller).build()

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

    withController(citiesController: CitiesController) {
        this.controller = citiesController
        return this
    }

    async build() {
        const screen = await render(CitiesComponent, {
            providers: [
                {
                    provide: CitiesControllerFactory,
                    useValue: {
                        build: () => this.controller
                    }
                }
            ],
            imports: [
                RouterTestingModule
            ]
        })
        return new CitiesComponentWrapper(screen)
    }
}

class CitiesComponentWrapper {
    constructor(private readonly component: RenderResult<CitiesComponent>) {
    }

    getCitiesDisplay() {
        return this.component.getAllByRole('link').map((el: HTMLElement) => el.textContent?.replace('⭐️', ''))
    }
}
