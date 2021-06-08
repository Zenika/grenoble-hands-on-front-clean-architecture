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
                })
                .build()

            // When
            new CitiesComponentBuilder().withController(controller).build()
        })

        // Then
        expect(hasFetch).toBeTruthy()
    })

    it('bookmark city when set as bookmark button clicked', async () => {
        const cityBookmarked = await new Promise<string>(resolve => {
            // Given
            const vm = new CitiesPresenterVM()
            vm.cities = [CityBuilder.example().build()]
            const controller = new CitiesControllerBuilder(vm)
                .withBookmarkCity((city) => {
                    resolve(city)
                })
                .build()

            // When
            new CitiesComponentBuilder().withController(controller).build().then(ui => {
                ui.bookmarkCity('Grenoble')
            })
        })

        // Then
        expect(cityBookmarked).toBe('Grenoble')
    })

    it('get bookmarked city when city mark as bookmark', async () => {
        // Given
        const vm = new CitiesPresenterVM()
        const GRENOBLE = CityBuilder.example().build()
        vm.cities = [GRENOBLE]
        vm.favoriteCityId = GRENOBLE.name
        const controller = new CitiesControllerBuilder(vm).build()

        // When
        const ui = await new CitiesComponentBuilder().withController(controller).build()
        const cityBookmarked = await ui.getBookmarkCity()

        // Then
        expect(cityBookmarked).toBe(GRENOBLE.name)
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
        return this.component.getAllByRole('link', { hidden: true }).map((el: HTMLElement) => el.textContent?.replace('⭐️', ''))
    }

    async bookmarkCity(city: string) {
        return await this.component.findByText(city).then(el => (el.nextElementSibling as HTMLElement).click())
    }

    async getBookmarkCity() {
        const el = (await this.component.findByText('✅'))
        const cityName = el.parentElement?.previousElementSibling as HTMLElement
        return cityName.textContent
    }
}
