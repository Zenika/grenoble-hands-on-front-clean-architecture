import {
    GeoPosition,
    GetCityPresentation,
    GetCityRequest,
    RetrieveDailyWeatherPresentation, RetrieveHourlyWeatherPresentation,
    RetrieveWeatherRequest
} from '@grenoble-hands-on/domain'
import { CityPresenter } from '@grenoble-hands-on/web-adapters'
import { GetCityUseCaseBuilder } from '../builder/GetCityUseCaseBuilder'
import { RetrieveCityDailyWeatherUseCaseBuilder } from '../builder/RetrieveCityDailyWeatherUseCaseBuilder'
import { RetrieveCityHourlyWeatherUseCaseBuilder } from '../builder/RetrieveCityHourlyWeatherUseCaseBuilder'

describe('CityPresenter', () => {

    test('display city weather update city vm', async () => {
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
        const presenter = new CityPresenter(cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)

        // When
        await presenter.fetchCityWithWeather('GRENOBLE')

        // Then
        expect(presenter.vm.city?.name).toBe('GRENOBLE')
    })

    test('display city daily weather update hourly weather vm', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) => {
                presenter.displayWeather([
                    { day: '12/01/2021', weather: 'sunny', temperatureMin: 9, temperatureMax: 19 }
                ])
            })
            .build()
        const presenter = new CityPresenter(cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)

        // When
        await presenter.fetchCityWithWeather('GRENOBLE', 'daily')

        // Then
        expect(presenter.vm.dailyWeather).toHaveLength(1)
        expect(presenter.vm.dailyWeather?.[0].weather).toBe('sunny')
        expect(presenter.vm.hourlyWeather).toBeUndefined()
    })

    test('display city hourly weather update daily weather vm', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveHourlyWeatherPresentation) => {
                presenter.displayWeather([
                    { time: '15:00', weather: 'sunny', temperature: 19 }
                ])
            })
            .build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder().build()
        const presenter = new CityPresenter(cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)

        // When
        await presenter.fetchCityWithWeather('GRENOBLE', 'hourly')

        // Then
        expect(presenter.vm.hourlyWeather).toHaveLength(1)
        expect(presenter.vm.hourlyWeather?.[0].weather).toBe('sunny')
        expect(presenter.vm.dailyWeather).toBeUndefined()
    })

    test('display loading indicator on pending request', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder().build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()

        const presenter = new CityPresenter(cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)

        // When
        await presenter.fetchCityWithWeather('GRENOBLE')

        // Then
        expect(presenter.vm.loading).toBeTruthy()
    })

    test('hide loading indicator on finished fetch daily weather', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) => presenter.displayWeather([]))
            .build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()
        const presenter = new CityPresenter(cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)
        presenter.vm.loading = true

        // When
        await presenter.fetchCityWithWeather('GRENOBLE', 'daily')

        // Then
        expect(presenter.vm.loading).toBeFalsy()
    })

    test('hide loading indicator on finished fetch hourly weather', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder().build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder()
            .withExecute((request, presenter) => presenter.displayWeather([]))
            .build()
        const presenter = new CityPresenter(cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)
        presenter.vm.loading = true

        // When
        await presenter.fetchCityWithWeather('GRENOBLE', 'hourly')

        // Then
        expect(presenter.vm.loading).toBeFalsy()
    })
})
