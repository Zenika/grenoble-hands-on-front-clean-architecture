import {
    AddCityPresentation,
    AddCityRequest,
    AddCityUseCaseBuilder,
    CityBuilder,
    NewCityFields
} from "@grenoble-hands-on/domain";
import {AddCityPresenter, FakeNavigation} from "@grenoble-hands-on/web-adapters";

describe('AddCityPresenter', () => {
    test('display city error on validate name', () => {
        // Given
        const useCase = new AddCityUseCaseBuilder()
            .withValidate((addCityRequest: AddCityRequest, presenter: AddCityPresentation) => {
                const errors = new Map<NewCityFields, string>();
                errors.set(NewCityFields.cityName, "City name required")
                presenter.notifyNewCityInvalid(errors)
                return errors
            })
            .build()

        const presenter = new AddCityPresenter(useCase, new FakeNavigation())

        // When
        presenter.validateCityName('')

        // Then
        expect(presenter.vm.cityNameError).toBe("City name required")
        expect(presenter.vm.cityNameTouched).toBeTruthy()
        expect(presenter.vm.canCreateCity).toBeFalsy()
    });

    test('display city error on validate latitude', () => {
        // Given
        const useCase = new AddCityUseCaseBuilder()
            .withValidate((addCityRequest: AddCityRequest, presenter: AddCityPresentation) => {
                const errors = new Map<NewCityFields, string>();
                errors.set(NewCityFields.latitude, "Latitude required")
                presenter.notifyNewCityInvalid(errors)
                return errors
            })
            .build()
        const presenter = new AddCityPresenter(useCase, new FakeNavigation())

        // When
        presenter.validateLatitude('')

        // Then
        expect(presenter.vm.latitudeError).toBe("Latitude required")
        expect(presenter.vm.latitudeTouched).toBeTruthy()
        expect(presenter.vm.canCreateCity).toBeFalsy()
    });

    test('display city error on validate longitude', () => {
        // Given
        const useCase = new AddCityUseCaseBuilder()
            .withValidate((addCityRequest: AddCityRequest, presenter: AddCityPresentation) => {
                const errors = new Map<NewCityFields, string>();
                errors.set(NewCityFields.longitude, "Longitude required")
                presenter.notifyNewCityInvalid(errors)
                return errors
            })
            .build()
        const presenter = new AddCityPresenter(useCase, new FakeNavigation())

        // When
        presenter.validateLongitude('')

        // Then
        expect(presenter.vm.longitudeError).toBe("Longitude required")
        expect(presenter.vm.longitudeTouched).toBeTruthy()
        expect(presenter.vm.canCreateCity).toBeFalsy()
    });

    test('display city error on create', () => {
        // Given
        const useCase = new AddCityUseCaseBuilder()
            .withExecute((addCityRequest: AddCityRequest, presenter: AddCityPresentation) => {
                const errors = new Map<NewCityFields, string>();
                errors.set(NewCityFields.cityName, "City name required")
                errors.set(NewCityFields.latitude, "Latitude required")
                errors.set(NewCityFields.longitude, "Longitude required")
                presenter.notifyNewCityInvalid(errors)
                return Promise.resolve()
            })
            .build()
        const presenter = new AddCityPresenter(useCase, new FakeNavigation())

        // When
        presenter.create()

        // Then
        expect(presenter.vm.canCreateCity).toBeFalsy()
    });

    test('redirect to city on create success', () => {
        // Given
        const city = CityBuilder.example().build();
        const useCase = new AddCityUseCaseBuilder()
            .withExecute((addCityRequest: AddCityRequest, presenter: AddCityPresentation) => {
                presenter.notifyCityAdded(city)
                return Promise.resolve()
            })
            .build()
        const navigation = new FakeNavigation();
        const presenter = new AddCityPresenter(useCase, navigation)

        // When
        presenter.create()

        // Then
        expect(navigation.currentRoute).toBe(`/city/${city.name}`)
    });
});
