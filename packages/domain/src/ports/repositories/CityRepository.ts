import {City} from "../../entities/City";

export interface CityRepository {
    getCities(): Promise<City[]>
    getCity(city: string): Promise<City>
}
