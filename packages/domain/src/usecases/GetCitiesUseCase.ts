import {CityRepository} from "../ports/repositories/CityRepository";
import {GetCitiesPresentation} from "../ports/presenters/GetCitiesPresentation";

export class GetCitiesUseCase {
    constructor(private cityRepository: CityRepository) {

    }

    async execute(presenter: GetCitiesPresentation) {
        const cities = await this.cityRepository.getCities();
        presenter.displayCities(cities)
    }
}
