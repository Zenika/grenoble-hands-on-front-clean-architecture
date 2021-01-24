import {CityRepository} from "../../ports/repositories/CityRepository";
import {GetCitiesUseCase} from "../GetCitiesUseCase";
import {GetCitiesPresentation} from "../../ports/presenters/GetCitiesPresentation";

export class GetCitiesUseCaseBuilder {
    public cityRepository!: CityRepository;

    withCityRepository(cityRepository: CityRepository) {
        this.cityRepository = cityRepository
        return this
    }

    build(): GetCitiesUseCase {
        return new GetCitiesUseCase(this.cityRepository!)
    }
}

export class GetCitiesUseCaseStubBuilder extends GetCitiesUseCaseBuilder {
    private execute: (presenter: GetCitiesPresentation) => Promise<void> = () => Promise.resolve();

    withExecute(execute: (presenter: GetCitiesPresentation) => Promise<void>) {
        this.execute = execute;
        return this;
    }

    build(): GetCitiesUseCase {
        return {
            execute: this.execute
        } as GetCitiesUseCase
    }
}