import {City} from "../../entities/City";

export enum NewCityFields {cityName = 'cityName', latitude = 'latitude', longitude = 'longitude'}

export type AddCityErrors = Map<NewCityFields, string>


export interface AddCityPresentation {
    notifyNewCityInvalid(errors: AddCityErrors): void
    notifyCityAdded(city: City): void
}

