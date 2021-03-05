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
        const presenter = new CityPresenter('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)

        // When
        await presenter.fetchCity()

        // Then
        expect(presenter.vm.city?.name).toBe('GRENOBLE')
    })

    test('on display city daily weather update hourly weather vm', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) => {
                presenter.displayWeather([
                    { day: '12/01/2021', weather: 'sunny', temperatureMin: 9, temperatureMax: 19, unite: 'C' }
                ])
            })
            .build()
        const presenter = new CityPresenter('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)
        presenter.vm.mode = 'daily'

        // When
        await presenter.fetchWeather()

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
                    { time: '15:00', weather: 'sunny', temperature: 19, unite: 'C' }
                ])
            })
            .build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder().build()
        const presenter = new CityPresenter('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)
        presenter.vm.mode = 'hourly'

        // When
        await presenter.fetchWeather()

        // Then
        expect(presenter.vm.hourlyWeather).toHaveLength(1)
        expect(presenter.vm.hourlyWeather?.[0].weather).toBe('sunny')
        expect(presenter.vm.dailyWeather).toBeUndefined()
    })

    test('fetch daily weather with selected temperature unite F°', async () => {
        // Given
        const fetchRequest = await new Promise<RetrieveWeatherRequest>(resolve => {
            const cityUseCase = new GetCityUseCaseBuilder().build()
            const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder()
                .withExecute(request => resolve(request))
                .build()
            const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()
            const presenter = new CityPresenter('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)
            presenter.vm.temperatureUnite = 'F'

            // When
            presenter.fetchWeather()
        })

        // Then
        expect(fetchRequest.unite).toBe('F')
    })

    test('display loading indicator on pending request', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder().build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()

        const presenter = new CityPresenter('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)

        // When
        await presenter.fetchWeather()

        // Then
        expect(presenter.vm.loading).toBeTruthy()
    })

    test('hide loading indicator on finished fetch weather', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityDailyWeatherUseCase = new RetrieveCityDailyWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) => presenter.displayWeather([]))
            .build()
        const retrieveCityHourlyWeatherUseCase = new RetrieveCityHourlyWeatherUseCaseBuilder().build()
        const presenter = new CityPresenter('GRENOBLE', cityUseCase, retrieveCityDailyWeatherUseCase, retrieveCityHourlyWeatherUseCase)
        presenter.vm.loading = true

        // When
        await presenter.fetchWeather()

        // Then
        expect(presenter.vm.loading).toBeFalsy()
    })

})
