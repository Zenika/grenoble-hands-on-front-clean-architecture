import {CityRepository} from "../ports/repositories/CityRepository";
import {GetCityRequest} from "../ports/request/GetCityRequest";
import {GetCityPresenter} from "../ports/presenters/GetCityPresenter";

export class GetCityUseCase {
    constructor(private readonly cityRepository: CityRepository) {

    }

    async execute(request: GetCityRequest, presenter: GetCityPresenter) {
        presenter.displayCity(await this.cityRepository.getCity(request.city))
    }

}
