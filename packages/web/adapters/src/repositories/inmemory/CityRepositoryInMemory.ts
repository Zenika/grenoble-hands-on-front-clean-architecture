import {City, CityRepository, GeoPosition} from "@grenoble-hands-on/domain";

const INITIAL_CITIES: City[] = [
    {name: "GRENOBLE", position: new GeoPosition(45.183916, 5.703630)},
    {name: "SINGAPOUR", position: new GeoPosition(1.295600, 103.858995)},
    {name: "BORDEAUX", position: new GeoPosition(44.848089, -0.571017)},
    {name: "BREST", position: new GeoPosition(48.389397, -4.499237)},
    {name: "MONTREAL", position: new GeoPosition(45.523000, -73.581700)},
    {name: "LYON", position: new GeoPosition(45.767443, 4.858798)},
    {name: "RENNES", position: new GeoPosition(48.113409, -1.661249)},
    {name: "NANTES", position: new GeoPosition(47.207408, -1.556187)},
    {name: "LILLE", position: new GeoPosition(50.648670, 3.075520)},
    {name: "PARIS", position: new GeoPosition(48.878932, 2.328487)}
]

export class CityRepositoryInMemory implements CityRepository {
    constructor(private cities: City[] = INITIAL_CITIES) {

    }

    getCities(): Promise<City[]> {
        return Promise.resolve(this.cities);
    }

    getCity(city: string): Promise<City> {
        const resolvedCity = this.cities.find(c => c.name == city);
        if (resolvedCity) {
            return Promise.resolve(resolvedCity);
        } else {
            throw new Error(`${city} doesn't exist in this repository`)
        }
    }

}
