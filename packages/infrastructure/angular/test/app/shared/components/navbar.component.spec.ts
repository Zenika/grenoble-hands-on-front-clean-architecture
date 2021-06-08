import { NavbarController, NavbarControllerFactory, NavbarPresenterVM, NavbarControllerBuilder } from '@grenoble-hands-on/web-adapters'
import { DailyWeatherBuilder } from '@grenoble-hands-on/domain'
import { render, RenderResult } from '@testing-library/angular'
import { RouterTestingModule } from '@angular/router/testing'
import { NavbarComponent } from '../../../../src/app/shared/components/navbar/navbar.component'
import { WeatherWidgetComponent } from '../../../../src/app/shared/components/weather-widget/weather-widget.component'

describe('NavbarComponent', () => {

    test('display bookmark city weather when has city bookmarked', async () => {
        // Given
        const vm = new NavbarPresenterVM()
        vm.bookmarkCityWeather = DailyWeatherBuilder.sunny()

        // When
        const ui = await new NavbarComponentBuilder()
            .withController(new NavbarControllerBuilder(vm).build())
            .build()

        // Then
        const hasWeatherDisplay = ui.hasWeatherDisplay()
        expect(hasWeatherDisplay).toBeTruthy()
    })

    test('display no bookmark city message when has no city bookmarked', async () => {
        // Given
        const vm = new NavbarPresenterVM()
        const noCityBookmarkedMsg = 'No city bookmarked'
        vm.bookmarkCityWeatherMessage = noCityBookmarkedMsg

        // When
        const ui = await new NavbarComponentBuilder()
            .withController(new NavbarControllerBuilder(vm).build())
            .build()

        // Then
        expect(ui.noWeatherDisplay()).toBe(noCityBookmarkedMsg)
    })

})


class NavbarComponentBuilder {
    private controller!: NavbarController

    withController(navbarController: NavbarController) {
        this.controller = navbarController
        return this
    }

    async build() {
        const screen = await render(NavbarComponent, {
            providers: [
                {
                    provide: NavbarControllerFactory,
                    useValue: {
                        build: () => this.controller
                    }
                }
            ],
            imports: [
                RouterTestingModule
            ],
            declarations: [WeatherWidgetComponent]
        })
        return new NavbarComponentWrapper(screen)
    }
}

class NavbarComponentWrapper {
    constructor(private readonly component: RenderResult<NavbarComponent>) {
    }

    hasWeatherDisplay() {
        const el = this.component.getByText('25 C° / 12 C°')
        return el !== null
    }

    noWeatherDisplay() {
        return this.component.getByLabelText('weather not display').textContent
    }
}
