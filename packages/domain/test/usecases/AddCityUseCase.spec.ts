import {AddCityRequest, AddCityPresentation, AddCityUseCase, City, CityRepository, NewCityFields} from "@grenoble-hands-on/domain";

describe('Add new city use case', () => {
    test('add city to repository when valid', async () => {
        const cityAdded: City = await new Promise(resolve => {
            // Given
            const cityRepository: Partial<CityRepository> = {
                addCity(city: City) {
                    resolve(city)
                    return Promise.resolve()
                }
            };
            const useCase = new AddCityUseCase(cityRepository as CityRepository)

            // When
            const presenter = {
                notifyNewCityInvalid() {
                },
                notifyCityAdded() {}
            };
            useCase.execute(new AddCityRequest("Pekin", "-2", "13"), presenter as AddCityPresentation)
        });

        // Then
        expect(cityAdded.name).toBe("Pekin")
        expect(cityAdded.position.latitude).toBe(-2)
        expect(cityAdded.position.longitude).toBe(13)
    });

    test('do no add city to repository when invalid', async () => {
        // Given
        const cityRepository: Partial<CityRepository> = {
            addCity: jest.fn()
        };
        const useCase = new AddCityUseCase(cityRepository as CityRepository)

        // When
        const presenter = {
            notifyNewCityInvalid(_: Map<NewCityFields, string>) {
            },
            notifyCityAdded() {}
        };
        await useCase.execute(new AddCityRequest("Pekin", "", ""), presenter as AddCityPresentation)

        // Then
        expect(cityRepository.addCity).not.toHaveBeenCalled()
    });

    test('city with empty name display error', async () => {
        // Given
        const cityRepository: Partial<CityRepository> = {};
        const useCase = new AddCityUseCase(cityRepository as CityRepository)

        // When
        const errors: Map<NewCityFields, string> = await new Promise(resolve => useCase.execute(new AddCityRequest("", "-2", "13"), {
            notifyNewCityInvalid(err: Map<NewCityFields, string>) {
                resolve(err)
            },
            notifyCityAdded() {}
        }));

        // Then
        expect(errors.has(NewCityFields.cityName)).toBeTruthy()
        expect(errors.get(NewCityFields.cityName)).toBe("City name is required")
    });

    test('city with empty latitude display error', async () => {
        // Given
        const cityRepository: Partial<CityRepository> = {};
        const useCase = new AddCityUseCase(cityRepository as CityRepository)

        // When
        const errors: Map<NewCityFields, string> = await new Promise(resolve => useCase.execute(new AddCityRequest("Fontaine", "", "5"), {
            notifyNewCityInvalid(err: Map<NewCityFields, string>) {
                resolve(err)
            },
            notifyCityAdded() {}
        }));

        // Then
        expect(errors.has(NewCityFields.latitude)).toBeTruthy()
        expect(errors.get(NewCityFields.latitude)).toBe("Latitude is required")
    });

    test('city with empty longitude display error', async () => {
        // Given
        const cityRepository: Partial<CityRepository> = {};
        const useCase = new AddCityUseCase(cityRepository as CityRepository)

        // When
        const errors: Map<NewCityFields, string> = await new Promise(resolve => useCase.execute(new AddCityRequest("Fontaine", "45", ""), {
            notifyNewCityInvalid(err: Map<NewCityFields, string>) {
                resolve(err)
            },
            notifyCityAdded() {}
        }));

        // Then
        expect(errors.has(NewCityFields.longitude)).toBeTruthy()
        expect(errors.get(NewCityFields.longitude)).toBe("Longitude is required")
    });

    ["abc", "412", "-193.5"].forEach((input) => {

        test(`city with invalid longitude display error : ${input}`, async () => {
            // Given
            const cityRepository: Partial<CityRepository> = {};
            const useCase = new AddCityUseCase(cityRepository as CityRepository)

            // When
            const errors: Map<NewCityFields, string> = await new Promise(resolve => useCase.execute(new AddCityRequest("Fontaine", "45", input), {
                notifyNewCityInvalid(err: Map<NewCityFields, string>) {
                    resolve(err)
                },
                notifyCityAdded() {}
            }));

            // Then
            expect(errors.has(NewCityFields.longitude)).toBeTruthy()
            expect(errors.get(NewCityFields.longitude)).toBe("Longitude must be an number between -180 and 180")
        });

    });

    ["abc", "412", "-193.5"].forEach((input) => {

        test(`city with invalid latitude display error : ${input}`, async () => {
            // Given
            const cityRepository: Partial<CityRepository> = {};
            const useCase = new AddCityUseCase(cityRepository as CityRepository)

            // When
            const errors: Map<NewCityFields, string> = await new Promise(resolve => useCase.execute(new AddCityRequest("Fontaine", input, "5"), {
                notifyNewCityInvalid(err: Map<NewCityFields, string>) {
                    resolve(err)
                },
                notifyCityAdded() {}
            }));

            // Then
            expect(errors.has(NewCityFields.latitude)).toBeTruthy()
            expect(errors.get(NewCityFields.latitude)).toBe("Latitude must be an number between -180 and 180")
        });

    })

    test('notify city added on success', async () => {
        const cityAdded: City = await new Promise(resolve => {
            // Given
            const cityRepository: Partial<CityRepository> = {
                addCity() {
                    return Promise.resolve()
                }
            };
            const useCase = new AddCityUseCase(cityRepository as CityRepository)

            // When
            const presenter = {
                notifyNewCityInvalid() {
                },
                notifyCityAdded(city: City) {
                    resolve(city)
                }
            };
            useCase.execute(new AddCityRequest("Pekin", "-2", "13"), presenter as AddCityPresentation)
        });

        // Then
        expect(cityAdded).not.toBeNull()
    });
});
