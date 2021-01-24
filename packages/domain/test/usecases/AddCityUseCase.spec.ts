import {
    AddCityErrors,
    AddCityPresentationBuilder,
    AddCityRequest,
    AddCityUseCase,
    City,
    CityRepositoryBuilder,
    NewCityFields,
} from "@grenoble-hands-on/domain";

describe('Add new city use case', () => {
    test('add city to repository when valid', async () => {
        const cityAdded: City = await new Promise(resolve => {
            // Given
            const cityRepository = new CityRepositoryBuilder()
                .withAddCity((city: City) => {
                    resolve(city)
                    return Promise.resolve()
                })
                .build()

            const useCase = new AddCityUseCase(cityRepository)

            // When
            const presenter = new AddCityPresentationBuilder().build();
            useCase.execute(new AddCityRequest("Pekin", "-2", "13"), presenter)
        });

        // Then
        expect(cityAdded.name).toBe("Pekin")
        expect(cityAdded.position.latitude).toBe(-2)
        expect(cityAdded.position.longitude).toBe(13)
    });

    test('do no add city to repository when invalid', async () => {
        // Given
        const citiesAdded: City[] = [];
        const cityRepository = new CityRepositoryBuilder()
            .withAddCity(city => {
                citiesAdded.push(city);
                return Promise.resolve()
            })
            .build()
        const useCase = new AddCityUseCase(cityRepository)

        // When
        const presenter = new AddCityPresentationBuilder().build();
        await useCase.execute(new AddCityRequest("Pekin", "", ""), presenter)

        // Then
        expect(citiesAdded).toHaveLength(0)
    });

    test('city with empty name display error', async () => {
        // Given
        const cityRepository = new CityRepositoryBuilder().build();
        const useCase = new AddCityUseCase(cityRepository)

        // When
        const errors: AddCityErrors = await new Promise(resolve => {
            const presentation = new AddCityPresentationBuilder()
                .withNotifyNewCityInvalid((err: AddCityErrors) => {
                    resolve(err)
                })
                .build();
            return useCase.execute(new AddCityRequest("", "-2", "13"), presentation);
        });

        // Then
        expect(errors.has(NewCityFields.cityName)).toBeTruthy()
        expect(errors.get(NewCityFields.cityName)).toBe("City name is required")
    });

    test('city with empty latitude display error', async () => {
        // Given
        const cityRepository = new CityRepositoryBuilder().build();
        const useCase = new AddCityUseCase(cityRepository)

        // When
        const errors: AddCityErrors = await new Promise(resolve => {
            const presentation = new AddCityPresentationBuilder()
                .withNotifyNewCityInvalid((err: AddCityErrors) => {
                    resolve(err)
                })
                .build();
            useCase.execute(new AddCityRequest("Fontaine", "", "5"), presentation);
        });

        // Then
        expect(errors.has(NewCityFields.latitude)).toBeTruthy()
        expect(errors.get(NewCityFields.latitude)).toBe("Latitude is required")
    });

    test('city with empty longitude display error', async () => {
        // Given
        const cityRepository = new CityRepositoryBuilder().build();
        const useCase = new AddCityUseCase(cityRepository)

        // When
        const errors: AddCityErrors = await new Promise(resolve => {
            const presentation = new AddCityPresentationBuilder()
                .withNotifyNewCityInvalid((err: AddCityErrors) => {
                    resolve(err)
                })
                .build();
            useCase.execute(new AddCityRequest("Fontaine", "45", ""), presentation);
        });

        // Then
        expect(errors.has(NewCityFields.longitude)).toBeTruthy()
        expect(errors.get(NewCityFields.longitude)).toBe("Longitude is required")
    });

    ["abc", "412", "-193.5"].forEach((input) => {

        test(`city with invalid longitude display error : ${input}`, async () => {
            // Given
            const cityRepository = new CityRepositoryBuilder().build();
            const useCase = new AddCityUseCase(cityRepository)

            // When
            const errors: AddCityErrors = await new Promise(resolve => {
                const presentation = new AddCityPresentationBuilder()
                    .withNotifyNewCityInvalid((err: AddCityErrors) => {
                        resolve(err)
                    })
                    .build();
                useCase.execute(new AddCityRequest("Fontaine", "45", input), presentation);
            });

            // Then
            expect(errors.has(NewCityFields.longitude)).toBeTruthy()
            expect(errors.get(NewCityFields.longitude)).toBe("Longitude must be an number between -180 and 180")
        });

    });

    ["abc", "412", "-193.5"].forEach((input) => {

        test(`city with invalid latitude display error : ${input}`, async () => {
            // Given
            const cityRepository = new CityRepositoryBuilder().build();
            const useCase = new AddCityUseCase(cityRepository)

            // When
            const errors: AddCityErrors = await new Promise(resolve => {
                const presentation = new AddCityPresentationBuilder()
                    .withNotifyNewCityInvalid((err: AddCityErrors) => {
                        resolve(err)
                    })
                    .build();
                useCase.execute(new AddCityRequest("Fontaine", input, "5"), presentation);
            });

            // Then
            expect(errors.has(NewCityFields.latitude)).toBeTruthy()
            expect(errors.get(NewCityFields.latitude)).toBe("Latitude must be an number between -180 and 180")
        });

    })

    test('notify city added on success', async () => {
        const cityAdded: City = await new Promise(resolve => {
            // Given
            const cityRepository = new CityRepositoryBuilder().build();
            const useCase = new AddCityUseCase(cityRepository)

            // When
            const presentation = new AddCityPresentationBuilder()
                .withNotifyCityAdded((city: City) => {
                    resolve(city)
                })
                .build()
            useCase.execute(new AddCityRequest("Pekin", "-2", "13"), presentation)
        });

        // Then
        expect(cityAdded).not.toBeNull()
    });
});
