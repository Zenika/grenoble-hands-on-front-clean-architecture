import {AddCityRequest, AddCityPresentation, AddCityUseCase, NewCityFields} from "@grenoble-hands-on/domain";
import {AddCityPresenter} from "../../src";

describe('AddCityPresenter', () => {
    test('display city error on validate name', () => {
        // Given
        const useCase = {
            validate(addCityRequest: AddCityRequest, presenter: AddCityPresentation): Map<NewCityFields, string> {
                const errors = new Map<NewCityFields, string>();
                errors.set(NewCityFields.cityName, "City name required")
                presenter.notifyNewCityInvalid(errors)
                return errors
            }
        } as AddCityUseCase
        const presenter = new AddCityPresenter(useCase)

        // When
        presenter.validateCityName('')

        // Then
        expect(presenter.vm.cityNameError).toBe("City name required")
        expect(presenter.vm.canCreateCity).toBeFalsy()
    });

    test('display city error on validate latitude', () => {
        // Given
        const useCase = {
            validate(addCityRequest: AddCityRequest, presenter: AddCityPresentation): Map<NewCityFields, string> {
                const errors = new Map<NewCityFields, string>();
                errors.set(NewCityFields.latitude, "Latitude required")
                presenter.notifyNewCityInvalid(errors)
                return errors
            }
        } as AddCityUseCase
        const presenter = new AddCityPresenter(useCase)

        // When
        presenter.validateLatitude('')

        // Then
        expect(presenter.vm.latitudeError).toBe("Latitude required")
        expect(presenter.vm.canCreateCity).toBeFalsy()
    });

    test('display city error on validate longitude', () => {
        // Given
        const useCase = {
            validate(addCityRequest: AddCityRequest, presenter: AddCityPresentation): Map<NewCityFields, string> {
                const errors = new Map<NewCityFields, string>();
                errors.set(NewCityFields.longitude, "Longitude required")
                presenter.notifyNewCityInvalid(errors)
                return errors
            }
        } as AddCityUseCase
        const presenter = new AddCityPresenter(useCase)

        // When
        presenter.validateLongitude('')

        // Then
        expect(presenter.vm.longitudeError).toBe("Longitude required")
        expect(presenter.vm.canCreateCity).toBeFalsy()
    });

    test('display city error on create', () => {
        // Given
        const useCase = {
            execute(addCityRequest: AddCityRequest, presenter: AddCityPresentation) {
                const errors = new Map<NewCityFields, string>();
                errors.set(NewCityFields.cityName, "City name required")
                errors.set(NewCityFields.latitude, "Latitude required")
                errors.set(NewCityFields.longitude, "Longitude required")
                presenter.notifyNewCityInvalid(errors)
            }
        } as AddCityUseCase
        const presenter = new AddCityPresenter(useCase)

        // When
        presenter.create()

        // Then
        expect(presenter.vm.canCreateCity).toBeFalsy()
    });
});
