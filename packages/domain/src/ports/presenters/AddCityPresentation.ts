import {City} from "../../entities/City";

export enum NewCityFields {cityName = 'cityName', latitude = 'latitude', longitude = 'longitude'}

export interface AddCityPresentation {
    notifyNewCityInvalid(errors: Map<NewCityFields, string>): void
    notifyCityAdded(city: City): void
}

