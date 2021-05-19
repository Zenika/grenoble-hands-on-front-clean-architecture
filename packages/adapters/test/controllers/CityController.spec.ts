import {
    GeoPosition,
    GetCityPresentation,
    GetCityRequest,
    RetrieveDailyWeatherPresentation,
    RetrieveHourlyWeatherPresentation,
    RetrieveWeatherRequest,
    WeatherState
} from '@grenoble-hands-on/domain'
import { CityController, CityPresenter } from '@grenoble-hands-on/web-adapters'
import { GetCityUseCaseBuilder } from '../builder/GetCityUseCaseBuilder'
import { RetrieveCityDailyWeatherUseCaseBuilder } from '../builder/RetrieveCityDailyWeatherUseCaseBuilder'
import { RetrieveCityHourlyWeatherUseCaseBuilder } from '../builder/RetrieveCityHourlyWeatherUseCaseBuilder'

describe('CityController', () => {

    test('on display city weather update city vm', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder()
            .withExecute((request: GetCityRequest, presenter: GetCityPresentation) => {
                presenter.displayCity({
                    name: 'GRENOBLE',
                    position: new GeoPosition(45, 5)
                })
            })
            .build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder().build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()
        const controller = new CityController('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase, new CityPresenter())

        // When
        await controller.fetchCity()

        // Then
        expect(controller.vm.city?.name).toBe('GRENOBLE')
    })

    test('on display city daily weather update hourly weather vm', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) => {
                presenter.displayDailyWeather([
                    { type: 'daily', day: '12/01/2021', weather: WeatherState.sunny, temperatureMin: 9, temperatureMax: 19, unite: 'C' }
                ])
            })
            .build()
        const controller = new CityController('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase, new CityPresenter())
        controller.vm.mode = 'daily'

        // When
        await controller.fetchWeather()

        // Then
        expect(controller.vm.dailyWeather).toHaveLength(1)
        expect(controller.vm.dailyWeather?.[0].weather).toBe(WeatherState.sunny)
        expect(controller.vm.hourlyWeather).toBeUndefined()
    })

    test('display city hourly weather update daily weather vm', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveHourlyWeatherPresentation) => {
                presenter.displayHourlyWeather([
                    { type: 'hourly', time: '15:00', weather: WeatherState.sunny, temperature: 19, unite: 'C' }
                ])
            })
            .build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder().build()
        const controller = new CityController('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase, new CityPresenter())
        controller.vm.mode = 'hourly'

        // When
        await controller.fetchWeather()

        // Then
        expect(controller.vm.hourlyWeather).toHaveLength(1)
        expect(controller.vm.hourlyWeather?.[0].weather).toBe(WeatherState.sunny)
        expect(controller.vm.dailyWeather).toBeUndefined()
    })

    test('fetch daily weather with selected temperature unite F°', async () => {
        // Given
        const fetchRequest = await new Promise<RetrieveWeatherRequest>(resolve => {
            const cityUseCase = new GetCityUseCaseBuilder().build()
            const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder()
                .withExecute(request => resolve(request))
                .build()
            const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()
            const controller = new CityController('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase, new CityPresenter())
            controller.vm.temperatureUnite = 'F'

            // When
            controller.fetchWeather()
        })

        // Then
        expect(fetchRequest.unite).toBe('F')
    })

    test('display loading indicator when fetch daily weather', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder()
            .withExecute((request, presenter) => presenter.displayLoadingWeather())
            .build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()

        const controller = new CityController('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase, new CityPresenter())
        controller.vm.mode = 'daily'

        // When
        await controller.fetchWeather()

        // Then
        expect(controller.vm.loading).toBeTruthy()
    })

    test('display loading indicator when fetch hourly weather', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder().build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder()
            .withExecute((request, presenter) => presenter.displayLoadingWeather())
            .build()

        const controller = new CityController('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase, new CityPresenter())
        controller.vm.mode = 'hourly'

        // When
        await controller.fetchWeather()

        // Then
        expect(controller.vm.loading).toBeTruthy()
    })

    test('hide loading indicator on finished fetch weather', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) => presenter.displayDailyWeather([]))
            .build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()
        const controller = new CityController('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase, new CityPresenter())
        controller.vm.loading = true

        // When
        await controller.fetchWeather()

        // Then
        expect(controller.vm.loading).toBeFalsy()
    })

})
