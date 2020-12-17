import {AddCityRequest, AddNewCityPresenter, AddNewCityUseCase, NewCityFields} from "@grenoble-hands-on/domain";
import {AddCityPresenter} from "../../src";

describe('AddCityPresenter', () => {
    test('display city error on validate', () => {
        // Given
        const useCase = {
            validate(addCityRequest: AddCityRequest, presenter: AddNewCityPresenter): Map<NewCityFields, string> {
                const errors = new Map<NewCityFields, string>();
                errors.set(NewCityFields.cityName, "City name required")
                presenter.notifyNewCityInvalid(errors)
                return errors
            }
        } as AddNewCityUseCase
        const presenter = new AddCityPresenter(useCase)

        // When
        presenter.validateCityName('')

        // Then
        expect(presenter.vm.cityNameError).toBe("City name required")
    });
});
