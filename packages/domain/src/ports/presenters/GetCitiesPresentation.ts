import { City } from '../../entities/City'

export interface GetCitiesPresentation {
    displayCities(cities: City[]): void
}
