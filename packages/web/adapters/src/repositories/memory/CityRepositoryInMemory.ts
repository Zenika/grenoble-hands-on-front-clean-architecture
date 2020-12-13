import {CityRepository} from "@grenoble-hands-on/domain/src/ports/repositories/CityRepository";
import {City} from "@grenoble-hands-on/domain/src/entities/City";
import {GeoPosition} from "@grenoble-hands-on/domain/src/entities/GeoPosition";

export class CityRepositoryInMemory implements CityRepository {
    getCities(): Promise<City[]> {
        return Promise.resolve([]);
    }

    getCity(city: string): Promise<City> {
        return Promise.resolve({
            name: 'Grenoble',
            position: new GeoPosition(45, 5)
        });
    }

}
