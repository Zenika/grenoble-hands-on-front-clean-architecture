import { AddCityPresenter, AddCityPresenterBuilder, AddCityPresenterFactory, AddCityPresenterVM } from '@grenoble-hands-on/web-adapters'
import { fireEvent, render, RenderResult } from '@testing-library/vue'
import AddCity from '@/views/AddCity.vue'
import { ADD_CITY_PRESENTER_FACTORY } from '@/DependencyInjection'

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
        vm.longitudeError = 'Longitude required'
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
                .withValidateCityName((cityName: string) => {
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
                .withValidateLatitude((latitude: string) => {
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
                .withValidateLongitude((longitude: string) => {
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
        const presenterFactory = { build: () => this.presenter } as AddCityPresenterFactory
        const screen = render(AddCity, {
            global: {
                provide: {
                    [ADD_CITY_PRESENTER_FACTORY as symbol]: presenterFactory
                }
            }
        })
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
        fireEvent.update(this.component.getByLabelText(selector), value)
    }

    submitForm() {
        return fireEvent.submit(this.component.getByRole('form'))
    }
}
