import { CitiesController, CitiesControllerBuilder, CitiesControllerFactory, CitiesPresenterVM } from '@grenoble-hands-on/web-adapters'
import { CityBuilder } from '@grenoble-hands-on/domain'
import { CITIES_CONTROLLER_FACTORY } from '@/DependencyInjection'
import { render, RenderResult } from '@testing-library/vue'
import Cities from '@/views/Cities.vue'
import { RouterLinkStub } from '@vue/test-utils'

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
    const screen = render(Cities, {
      global: {
        provide: {
          [CITIES_CONTROLLER_FACTORY as symbol]: controllerFactory
        },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    return new CitiesComponentWrapper(screen)
  }
}

class CitiesComponentWrapper {
  constructor(private readonly component: RenderResult) {
  }

  getCitiesDisplay() {
    return this.component.getAllByRole('link').map(el => el.textContent?.replace('⭐️', ''))
  }
}
