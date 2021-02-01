import { TestBed } from '@angular/core/testing'

import { CityComponent } from '../../../src/app/modules/city/city.component'
import { CityPresenter, CityPresenterFactory, CityPresenterVM } from '@grenoble-hands-on/web-adapters'
import { RouterTestingModule } from '@angular/router/testing'
import { GeoPosition } from '@grenoble-hands-on/domain'
import { By } from '@angular/platform-browser'
import { CityPresenterBuilder } from '../../builders/CityPresenterBuilder'

describe('CityComponent', () => {

    it('display header with city name', () => {
        // Given
        const vm = new CityPresenterVM()
        vm.city = { name: 'Grenoble', position: new GeoPosition(45, 5) }
        const presenter = new CityPresenterBuilder(vm).build()

        // When
        const { fixture } = new CityComponentBuilder().withPresenter(presenter).build()

        // Then
        const header = fixture.debugElement.query(By.css('h2')).nativeElement.textContent
        expect(header).toBe('Grenoble')
    })

    it('display daily weather with temperature', () => {
        // Given
        const vm = new CityPresenterVM()
        vm.dailyWeather = [
            { weather: 'sunny', temperatureMin: 8, temperatureMax: 15, day: '12/01/2021',  unite: 'C' }
        ]

        // When
        const { fixture } = new CityComponentBuilder().withPresenter(new CityPresenterBuilder(vm).build()).build()

        // Then
        const weather = fixture.debugElement.queryAll(By.css('#daily-weather tr:not(:first-child)'))
        const weatherCol = weather[0].queryAll(By.css('td'))
        expect(weather.length).toBe(1)
        expect(weatherCol[0].nativeElement.textContent).toBe('12/01/2021')
        expect(weatherCol[2].nativeElement.textContent).toBe('15')
        expect(weatherCol[3].nativeElement.textContent).toBe('8')
    })

    it('display hourly weather with temperature', () => {
        // Given
        const vm = new CityPresenterVM()
        vm.hourlyWeather = [
            { weather: 'sunny', temperature: 8, time: '12:00', unite: 'C' }
        ]

        // When
        const { fixture } = new CityComponentBuilder().withPresenter(new CityPresenterBuilder(vm).build()).build()

        // Then
        const weather = fixture.debugElement.queryAll(By.css('#hourly-weather tr:not(:first-child)'))
        const weatherCol = weather[0].queryAll(By.css('td'))
        expect(weather.length).toBe(1)
        expect(weatherCol[0].nativeElement.textContent).toBe('12:00')
        expect(weatherCol[2].nativeElement.textContent).toBe('8')
    })

    test('fetch daily weather on init', async () => {
        const hasFetchCityWeather = await new Promise(resolve => {
            // Given
            const presenter = new CityPresenterBuilder()
                .withFetchCityWithWeather(() => Promise.resolve().then(() => resolve(true)))
                .build()

            // When
            new CityComponentBuilder().withPresenter(presenter).build()
        })
        // Then
        expect(hasFetchCityWeather).toBe(true)
    })

    test('fetch hourly weather on hourly view select', async () => {
        const hasFetchCityWeather = await new Promise(resolve => {
            // Given
            const presenter = new CityPresenterBuilder()
                .withFetchCityWithWeather((city, mode) => {
                    if (mode === 'hourly') {
                        return Promise.resolve().then(() => resolve(true))
                    } else {
                        return Promise.resolve()
                    }
                })
                .build()

            // When
            const { fixture } = new CityComponentBuilder().withPresenter(presenter).build()
            fixture.debugElement.query(By.css('#select-hourly-view')).nativeElement.click()
        })
        // Then
        expect(hasFetchCityWeather).toBe(true)
    })

    test.todo('fetch daily weather on daily view select')
})


export class CityComponentBuilder {
    private presenter!: CityPresenter

    withPresenter(presenter: CityPresenter) {
        this.presenter = presenter
        return this
    }

    build() {
        TestBed.configureTestingModule({
            declarations: [CityComponent],
            providers: [
                {
                    provide: CityPresenterFactory,
                    useValue: {
                        build: () => this.presenter
                    }
                }
            ],
            imports: [
                RouterTestingModule
            ]
        }).compileComponents().then()
        const fixture = TestBed.createComponent(CityComponent)
        const component = fixture.componentInstance
        fixture.detectChanges()
        return { component, fixture }
    }
}
