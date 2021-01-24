import {CityRepository} from "../../ports/repositories/CityRepository";
import {AddCityUseCase} from "../AddCityUseCase";
import {AddCityRequest} from "../../ports/request/AddCityRequest";
import {AddCityErrors, AddCityPresentation, NewCityFields} from "../../ports/presenters/AddCityPresentation";

export class AddCityUseCaseBuilder {
    private cityRepository!: CityRepository;

    withCityRepository(cityRepository: CityRepository) {
        this.cityRepository = cityRepository
        return this
    }

    build(): AddCityUseCase {
        return new AddCityUseCase(this.cityRepository!)
    }
}

export class AddCityUseCaseStubBuilder extends AddCityUseCaseBuilder {
    private execute: (addCityRequest: AddCityRequest, presenter: AddCityPresentation) => Promise<void> = () => Promise.resolve();
    private validate: (addCityRequest: AddCityRequest, presenter: AddCityPresentation) => AddCityErrors = () => new Map<NewCityFields, string>();

    withExecute(execute: (addCityRequest: AddCityRequest, presenter: AddCityPresentation) => Promise<void>) {
        this.execute = execute;
        return this;
    }

    withValidate(validate: (addCityRequest: AddCityRequest, presenter: AddCityPresentation) => AddCityErrors) {
        this.validate = validate;
        return this;
    }

    build(): AddCityUseCase {
        return {
            execute: this.execute,
            validate: this.validate
        } as AddCityUseCase
    }
}