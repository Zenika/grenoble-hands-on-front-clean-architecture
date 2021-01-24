import {GetCitiesUseCase} from "@grenoble-hands-on/domain";
import {CitiesPresenter} from "../CitiesPresenter";

export class CitiesPresenterBuilder {
    private getCitiesUseCase!: GetCitiesUseCase

    constructor() {
    }

    withUseCase(getCitiesUseCase: GetCitiesUseCase) {
        this.getCitiesUseCase = getCitiesUseCase
        return this
    }

    build(): CitiesPresenter {
        return new CitiesPresenter(this.getCitiesUseCase)
    }
}
