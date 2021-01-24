import {City} from "../../../entities/City";
import {CityBuilder} from "../../../entities/builder/CityBuilder";
import {CityRepository} from "../CityRepository";

export class CityRepositoryBuilder {
    private addCity: (city: City) => Promise<void> = () => Promise.resolve();
    private getCities: () => Promise<City[]> = () => Promise.resolve([]);
    private getCity: (city: string) => Promise<City> = () => Promise.resolve(CityBuilder.example().build());

    withAddCity(addCity: (city: City) => Promise<void>) {
        this.addCity = addCity
        return this
    }

    withGetCities(getCities: () => Promise<City[]>) {
        this.getCities = getCities;
        return this;
    }

    withGetCity(getCity: (city: string) => Promise<City>) {
        this.getCity = getCity;
        return this;
    }

    build(): CityRepository {
        return {
            addCity: this.addCity,
            getCities: this.getCities,
            getCity: this.getCity
        }
    }
}