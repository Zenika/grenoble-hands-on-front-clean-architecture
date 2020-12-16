import {GetCitiesUseCase} from "@grenoble-hands-on/domain";
import {CitiesPresenter} from "./CitiesPresenter";

export class CitiesPresenterFactory {

    constructor(private getCitiesUseCase: GetCitiesUseCase) {
    }

    createCitiesPresenter(): CitiesPresenter {
        return new CitiesPresenter(this.getCitiesUseCase)
    }
}
