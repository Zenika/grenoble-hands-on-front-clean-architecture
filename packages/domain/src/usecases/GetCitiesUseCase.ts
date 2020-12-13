import {CityRepository} from "../ports/repositories/CityRepository";
import {GetCitiesPresenter} from "../ports/presenters/GetCitiesPresenter";

export class GetCitiesUseCase {
    constructor(private cityRepository: CityRepository) {

    }

    async execute(presenter: GetCitiesPresenter) {
        const cities = await this.cityRepository.getCities();
        presenter.displayCities(cities)
    }
}
