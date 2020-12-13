import {City} from "../../entities/City";

export interface GetCitiesPresenter {
    displayCities(cities: City[]): void
}
