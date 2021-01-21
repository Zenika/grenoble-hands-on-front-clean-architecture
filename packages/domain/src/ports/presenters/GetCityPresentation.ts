import {City} from "../../entities/City";

export interface GetCityPresentation {
    displayCity(city: City): void
}
