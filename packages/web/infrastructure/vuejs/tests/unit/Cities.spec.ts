import { CitiesPresenter, CitiesPresenterBuilder, CitiesPresenterFactory, CitiesPresenterVM } from '@grenoble-hands-on/web-adapters'
import { CityBuilder } from '@grenoble-hands-on/domain'
import { CITIES_PRESENTER_FACTORY } from '@/DependencyInjection'
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
    const screen = render(Cities, {
      global: {
        provide: {
          [CITIES_PRESENTER_FACTORY as symbol]: presenterFactory
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
    return this.component.getAllByRole('link').map(el => el.textContent)
  }
}
