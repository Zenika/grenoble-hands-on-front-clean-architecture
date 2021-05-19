import { AddCityPresentation, AddCityRequest, CityBuilder, NewCityFields } from '@grenoble-hands-on/domain'
import { AddCityController, AddCityPresenter, FakeNavigation } from '@grenoble-hands-on/web-adapters'
import { AddCityUseCaseBuilder } from '../builder/AddCityUseCaseBuilder'

describe('AddCityController', () => {
    test('display city error on validate name', () => {
        // Given
        const useCase = new AddCityUseCaseBuilder()
            .withValidate((addCityRequest: AddCityRequest, presenter: AddCityPresentation) => {
                const errors = new Map<NewCityFields, string>()
                errors.set(NewCityFields.cityName, 'City name required')
                presenter.notifyNewCityInvalid(errors)
                return errors
            })
            .build()

        const controller = new AddCityController(useCase, new AddCityPresenter(new FakeNavigation()))

        // When
        controller.validateCityName('')

        // Then
        expect(controller.vm.cityNameError).toBe('City name required')
        expect(controller.vm.cityNameTouched).toBeTruthy()
        expect(controller.vm.canCreateCity).toBeFalsy()
    })

    test('display city error on validate latitude', () => {
        // Given
        const useCase = new AddCityUseCaseBuilder()
            .withValidate((addCityRequest: AddCityRequest, presenter: AddCityPresentation) => {
                const errors = new Map<NewCityFields, string>()
                errors.set(NewCityFields.latitude, 'Latitude required')
                presenter.notifyNewCityInvalid(errors)
                return errors
            })
            .build()
        const controller = new AddCityController(useCase, new AddCityPresenter(new FakeNavigation()))

        // When
        controller.validateLatitude('')

        // Then
        expect(controller.vm.latitudeError).toBe('Latitude required')
        expect(controller.vm.latitudeTouched).toBeTruthy()
        expect(controller.vm.canCreateCity).toBeFalsy()
    })

    test('display city error on validate longitude', () => {
        // Given
        const useCase = new AddCityUseCaseBuilder()
            .withValidate((addCityRequest: AddCityRequest, presenter: AddCityPresentation) => {
                const errors = new Map<NewCityFields, string>()
                errors.set(NewCityFields.longitude, 'Longitude required')
                presenter.notifyNewCityInvalid(errors)
                return errors
            })
            .build()
        const controller = new AddCityController(useCase, new AddCityPresenter(new FakeNavigation()))

        // When
        controller.validateLongitude('')

        // Then
        expect(controller.vm.longitudeError).toBe('Longitude required')
        expect(controller.vm.longitudeTouched).toBeTruthy()
        expect(controller.vm.canCreateCity).toBeFalsy()
    })

    test('display city error on create', () => {
        // Given
        const useCase = new AddCityUseCaseBuilder()
            .withExecute((addCityRequest: AddCityRequest, presenter: AddCityPresentation) => {
                const errors = new Map<NewCityFields, string>()
                errors.set(NewCityFields.cityName, 'City name required')
                errors.set(NewCityFields.latitude, 'Latitude required')
                errors.set(NewCityFields.longitude, 'Longitude required')
                presenter.notifyNewCityInvalid(errors)
                return Promise.resolve()
            })
            .build()
        const controller = new AddCityController(useCase, new AddCityPresenter(new FakeNavigation()))

        // When
        controller.create()

        // Then
        expect(controller.vm.canCreateCity).toBeFalsy()
    })

    test('redirect to city on create success', async () => {
        // Given
        const city = CityBuilder.example().build()
        const navigation = new FakeNavigation()

        await new Promise<void>(resolve => {
            const useCase = new AddCityUseCaseBuilder()
                .withExecute((addCityRequest: AddCityRequest, presenter: AddCityPresentation) => {
                    presenter.notifyCityAdded(city)
                    return Promise.resolve().then(() => resolve())
                })
                .build()
            const controller = new AddCityController(useCase, new AddCityPresenter(navigation))

            // When
            controller.create()
        })

        // Then
        expect(navigation.currentRoute).toBe(`/city/${city.name}`)
    })
})
