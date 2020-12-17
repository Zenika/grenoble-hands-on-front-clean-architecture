import {CityRepositoryInMemory} from "../../../src";
import {City, GeoPosition} from "@grenoble-hands-on/domain";

describe('CityRepositoryInMemory', () => {

    test('get cities', async () => {
        // Given
        const cities: City[] = [
            {name: "GRENOBLE", position: new GeoPosition(45.183916, 5.703630)},
        ];
        const cityRepository = new CityRepositoryInMemory(cities);

        // When
        const citiesFromRepository = await cityRepository.getCities();

        // Then
        expect(citiesFromRepository).toEqual(cities)
    });

    test('get city by name', async () => {
        // Given
        const cities: City[] = [
            {name: "GRENOBLE", position: new GeoPosition(45.183916, 5.703630)},
        ];
        const cityRepository = new CityRepositoryInMemory(cities);

        // When
        const cityFromRepository = await cityRepository.getCity("GRENOBLE");

        // Then
        expect(cityFromRepository).toEqual(cities[0])
    });

    test('throw error when city doesn\'t exist', () => {
        // Given
        const cities: City[] = [
            {name: "GRENOBLE", position: new GeoPosition(45.183916, 5.703630)},
        ];
        const cityRepository = new CityRepositoryInMemory(cities);

        // When
        const request = () => cityRepository.getCity("NOWHERE");

        // Then
        expect(request).toThrowError("NOWHERE doesn't exist in this repository")
    });

    test('add new city', async () => {
        // Given
        const cities: City[] = [];
        const cityRepository = new CityRepositoryInMemory(cities);

        // When
        const cityToAdd = {name: "GRENOBLE", position: new GeoPosition(45.183916, 5.703630)};
        await cityRepository.addCity(cityToAdd);

        // Then
        const cityAdded = await cityRepository.getCity( "GRENOBLE");
        expect(cityAdded).toEqual(cityToAdd)
    });

});
