import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { CityPresenterBuilder, CityPresenterFactory, CityPresenterVM } from '@grenoble-hands-on/web-adapters'
import { City } from './City'
import { GeoPosition, WeatherState } from '@grenoble-hands-on/domain'

describe('CityComponent', () => {

    it('display header with city name', () => {
        // Given
        const vm = new CityPresenterVM()
        vm.city = { name: 'Grenoble', position: new GeoPosition(45, 5) }
        const presenter = new CityPresenterBuilder(vm).build()
        const presenterFactory = { build: (_: string) => presenter } as CityPresenterFactory

        // When
        render(<City cityPresenterFactory={presenterFactory} id={'Grenoble'}/>, { wrapper: MemoryRouter })

        // Then
        const header = screen.getByText('Grenoble')
        expect(header).toBeTruthy()
    })

    it('display daily weather with temperature', async () => {
        // Given
        const vm = new CityPresenterVM()
        vm.dailyWeather = [
            { weather: WeatherState.sunny, temperatureMin: 8, temperatureMax: 15, day: '12/01/2021', unite: 'C' }
        ]
        const presenter = new CityPresenterBuilder(vm).build()
        const presenterFactory = { build: (_: string) => presenter } as CityPresenterFactory

        // When
        render(<City cityPresenterFactory={presenterFactory} id={'Grenoble'}/>, { wrapper: MemoryRouter })

        // Then
        const weather = screen.queryAllByRole('row')
        const weatherCol = weather[1]
        const weatherDate = await within(weatherCol!).findByText('12/01/2021')
        const temperatureMax = await within(weatherCol!).findByText('15 C°')
        const temperatureMin = await within(weatherCol!).findByText('8 C°')
        expect(weatherDate).toBeTruthy()
        expect(temperatureMax).toBeTruthy()
        expect(temperatureMin).toBeTruthy()
    })

    it('display hourly weather with temperature', async () => {
        // Given
        const vm = new CityPresenterVM()
        vm.hourlyWeather = [
            { weather: WeatherState.sunny, temperature: 8, time: '12:00', unite: 'C' }
        ]
        const presenter = new CityPresenterBuilder(vm).build()
        const presenterFactory = { build: (_: string) => presenter } as CityPresenterFactory

        // When
        render(<City cityPresenterFactory={presenterFactory} id={'Grenoble'}/>, { wrapper: MemoryRouter })

        // Then
        const weather = screen.queryAllByRole('row')
        const weatherCol = weather[1]
        const weatherDate = await within(weatherCol!).findByText('12:00')
        const temperature = await within(weatherCol!).findByText('8 C°')
        expect(weatherDate).toBeTruthy()
        expect(temperature).toBeTruthy()
    })

    test('fetch weather on init', async () => {
        const hasFetchDailyWeather = await new Promise(resolve => {
            // Given
            const presenter = new CityPresenterBuilder()
                .withFetchWeather(() => Promise.resolve().then(() => resolve(true)))
                .build()
            const presenterFactory = { build: (_: string) => presenter } as CityPresenterFactory

            // When
            render(<City cityPresenterFactory={presenterFactory} id={'Grenoble'}/>, { wrapper: MemoryRouter })
        })
        // Then
        expect(hasFetchDailyWeather).toBe(true)
    })

    test('fetch city on init', async () => {
        const hasFetchCity = await new Promise(resolve => {
            // Given
            const presenter = new CityPresenterBuilder()
                .withFetchCity(() => Promise.resolve().then(() => resolve(true)))
                .build()
            const presenterFactory = { build: (_: string) => presenter } as CityPresenterFactory

            // When
            render(<City cityPresenterFactory={presenterFactory} id={'Grenoble'}/>, { wrapper: MemoryRouter })
        })
        // Then
        expect(hasFetchCity).toBe(true)
    })

    test('update weather mode on hourly view select', async () => {
        const requestWithMode = await new Promise(resolve => {
            // Given
            const vm = new CityPresenterVM()
            vm.mode = 'daily'
            const presenter = new CityPresenterBuilder(vm)
                .withUpdateMode((mode) => resolve(mode))
                .build()
            const presenterFactory = { build: (_: string) => presenter } as CityPresenterFactory

            // When
            render(<City cityPresenterFactory={presenterFactory} id={'Grenoble'}/>, { wrapper: MemoryRouter })
            screen.getByRole('radio', { name: /detailed/i }).click()
        })
        // Then
        expect(requestWithMode).toBe('hourly')
    })

    test('update weather mode on daily view select', async () => {
        const requestWithMode = await new Promise(resolve => {
            // Given
            const vm = new CityPresenterVM()
            vm.mode = 'hourly'
            const presenter = new CityPresenterBuilder(vm)
                .withUpdateMode((mode) => resolve(mode))
                .build()
            const presenterFactory = { build: (_: string) => presenter } as CityPresenterFactory

            // When
            render(<City cityPresenterFactory={presenterFactory} id={'Grenoble'}/>, { wrapper: MemoryRouter })
            screen.getByRole('radio', { name: /simple/i }).click()
        })
        // Then
        expect(requestWithMode).toBe('daily')
    })

    test('update temperature unit on celsius select', async () => {
        const requestWithTemperature = await new Promise(resolve => {
            // Given
            const vm = new CityPresenterVM()
            vm.temperatureUnite = 'F'
            const presenter = new CityPresenterBuilder(vm)
                .withUpdateTemperatureUnit((temperatureUnit) => resolve(temperatureUnit))
                .build()
            const presenterFactory = { build: (_: string) => presenter } as CityPresenterFactory

            // When
            render(<City cityPresenterFactory={presenterFactory} id={'Grenoble'}/>, { wrapper: MemoryRouter })
            screen.getByRole('radio', { name: /C°/ }).click()
        })
        // Then
        expect(requestWithTemperature).toBe('C')
    })

    test('update temperature unit on fahrenheit select', async () => {
        const requestWithTemperature = await new Promise(resolve => {
            // Given
            const vm = new CityPresenterVM()
            vm.temperatureUnite = 'C'
            const presenter = new CityPresenterBuilder()
                .withUpdateTemperatureUnit((temperatureUnit) => resolve(temperatureUnit))
                .build()
            const presenterFactory = { build: (_: string) => presenter } as CityPresenterFactory

            // When
            render(<City cityPresenterFactory={presenterFactory} id={'Grenoble'}/>, { wrapper: MemoryRouter })
            screen.getByRole('radio', { name: /F°/ }).click()
        })
        // Then
        expect(requestWithTemperature).toBe('F')
    })
})
