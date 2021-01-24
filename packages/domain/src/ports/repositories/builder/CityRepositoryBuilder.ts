import {City, CityRepository} from "@grenoble-hands-on/domain";

export class CityRepositoryBuilder {
    private addCity: (city: City) => Promise<void> = (() => Promise.resolve());
    private getCities: () => Promise<City[]> = () => Promise.resolve([]);

    withAddCity(addCity: (city: City) => Promise<void>) {
        this.addCity = addCity
        return this
    }

    withGetCities(getCities: () => Promise<City[]>) {
        this.getCities = getCities;
        return this;
    }

    build(): CityRepository {
        return {
            addCity: this.addCity,
            getCities: this.getCities,
            getCity: () => Promise.resolve({} as City)
        }
    }
}