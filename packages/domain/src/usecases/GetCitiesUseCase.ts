import { CityRepository } from '../ports/repositories/CityRepository'
import { GetCitiesPresentation } from '../ports/presenters/GetCitiesPresentation'

export class GetCitiesUseCase {
    constructor(private cityRepository: CityRepository) {

    }

    async execute(presentation: GetCitiesPresentation) {
        const cities = await this.cityRepository.getCities();
        presentation.displayCities(cities)
    }
}
