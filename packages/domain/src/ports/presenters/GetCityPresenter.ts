import {City} from "../entities/City";

export interface GetCityPresenter {
    displayCity(city: City): void
}
