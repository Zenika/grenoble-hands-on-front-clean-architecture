import { City } from '../../entities/City'

export interface CityRepository {
    getCities(): Promise<City[]>

    getCity(city: string): Promise<City>

    addCity(city: City): Promise<void>
}
