import { CityComponent } from '../../../src/app/modules/city/city.component'
import { CityController, CityControllerBuilder, CityControllerFactory, CityPresenterVM } from '@grenoble-hands-on/web-adapters'
import { RouterTestingModule } from '@angular/router/testing'
import { GeoPosition, WeatherState } from '@grenoble-hands-on/domain'
import { render, RenderResult } from '@testing-library/angular'

describe('CityComponent', () => {

    it('display header with city name', async () => {
        // Given
        const vm = new CityPresenterVM()
        vm.city = { name: 'Grenoble', position: new GeoPosition(45, 5) }

        // When
        const ui = await new CityComponentBuilder()
            .withController(new CityControllerBuilder(vm).build())
            .build()

        // Then
        const header = ui.getHeader()
        expect(header).toBe('Grenoble')
    })

    it('display daily weather with temperature', async () => {
        // Given
        const vm = new CityPresenterVM()
        vm.dailyWeather = [
            { type: 'daily', weather: WeatherState.sunny, temperatureMin: 8, temperatureMax: 15, day: '12/01/2021', unite: 'C' }
        ]

        // When
        const ui = await new CityComponentBuilder()
            .withController(new CityControllerBuilder(vm).build())
            .build()

        // Then
        const weather = await ui.getDailyWeather()
        expect(weather).toBeTruthy()
        expect(weather.date).toBe('12/01/2021')
        expect(weather.temperatureMax).toBe('15 C°')
        expect(weather.temperatureMin).toBe('8 C°')
    })

    it('display hourly weather with temperature', async () => {
        // Given
        const vm = new CityPresenterVM()
        vm.hourlyWeather = [
            { type: 'hourly', weather: WeatherState.sunny, temperature: 8, time: '12:00', unite: 'F' }
        ]

        // When
        const ui = await new CityComponentBuilder()
            .withController(new CityControllerBuilder(vm).build())
            .build()

        // Then
        const weather = await ui.getHourlyWeather()
        expect(weather).toBeTruthy()
        expect(weather.hour).toBe('12:00')
        expect(weather.temperature).toBe('8 F°')
    })

    test('fetch weather on init', async () => {
        const hasFetchDailyWeather = await new Promise(resolve => {
            // Given
            const controller = new CityControllerBuilder()
                .withFetchWeather(() => Promise.resolve().then(() => resolve(true)))
                .build()

            // When
            new CityComponentBuilder()
                .withController(controller)
                .build()
        })
        // Then
        expect(hasFetchDailyWeather).toBe(true)
    })

    test('update weather mode on hourly view select', async () => {
        const requestWithMode = await new Promise(resolve => {
            // Given
            const vm = new CityPresenterVM()
            vm.mode = 'daily'
            const controller = new CityControllerBuilder(vm)
                .withUpdateMode((mode) => resolve(mode))
                .build()

            // When
            new CityComponentBuilder()
                .withController(controller)
                .build()
                .then(ui => {
                    ui.selectHourlyMode()
                })
        })
        // Then
        expect(requestWithMode).toBe('hourly')
    })

    test('update weather mode on daily view select', async () => {
        const requestWithMode = await new Promise(resolve => {
            // Given
            const vm = new CityPresenterVM()
            vm.mode = 'hourly'
            const controller = new CityControllerBuilder(vm)
                .withUpdateMode((mode) => resolve(mode))
                .build()

            // When
            new CityComponentBuilder()
                .withController(controller)
                .build()
                .then(ui => {
                    ui.selectDailyMode()
                })
        })
        // Then
        expect(requestWithMode).toBe('daily')
    })

    test('update temperature unit on celsius select', async () => {
        const requestWithTemperature = await new Promise(resolve => {
            // Given
            const vm = new CityPresenterVM()
            vm.temperatureUnite = 'F'
            const controller = new CityControllerBuilder(vm)
                .withUpdateTemperatureUnit((temperatureUnit) => resolve(temperatureUnit))
                .build()

            // When
            new CityComponentBuilder()
                .withController(controller)
                .build()
                .then(ui => {
                    ui.selectCelsius()
                })
        })
        // Then
        expect(requestWithTemperature).toBe('C')
    })

    test('update temperature unit on fahrenheit select', async () => {
        const requestWithTemperature = await new Promise(resolve => {
            // Given
            const vm = new CityPresenterVM()
            vm.temperatureUnite = 'C'
            const controller = new CityControllerBuilder()
                .withUpdateTemperatureUnit((temperatureUnit) => resolve(temperatureUnit))
                .build()

            // When
            new CityComponentBuilder()
                .withController(controller)
                .build()
                .then(ui => {
                    ui.selectFahrenheit()
                })
        })
        // Then
        expect(requestWithTemperature).toBe('F')
    })
})



export class CityComponentBuilder {
    private controller!: CityController

    withController(controller: CityController) {
        this.controller = controller
        return this
    }

    async build() {
        const screen = await render(CityComponent, {
            providers: [
                {
                    provide: CityControllerFactory,
                    useValue: {
                        build: () => this.controller
                    }
                }
            ],
            imports: [
                RouterTestingModule
            ]
        })
        return new CityComponentWrapper(screen)
    }
}

class CityComponentWrapper {
    constructor(private readonly component: RenderResult<CityComponent>) {
    }

    getHeader() {
        return this.component.getByLabelText('city name').textContent
    }

    async getDailyWeather() {
        const weather = this.component.queryAllByRole('row')
        const weatherCol = Array.from(weather[1].querySelectorAll('td'))
        const date = weatherCol[0].textContent
        const temperatureMax = weatherCol[2].textContent
        const temperatureMin = weatherCol[3].textContent
        return { date, temperatureMax, temperatureMin }
    }

    async getHourlyWeather() {
        const weather = this.component.queryAllByRole('row')
        const weatherCol = Array.from(weather[1].querySelectorAll('td'))
        const hour = weatherCol[0].textContent
        const temperature = weatherCol[2].textContent
        return { hour, temperature }
    }

    selectHourlyMode() {
        this.component.getByRole('radio', { name: /detailed/i }).click()
    }

    selectDailyMode() {
        this.component.getByRole('radio', { name: /simple/i }).click()
    }

    selectCelsius() {
        this.component.getByRole('radio', { name: /C°/ }).click()
    }

    selectFahrenheit() {
        this.component.getByRole('radio', { name: /F°/ }).click()
    }
}
