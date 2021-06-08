import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WeatherWidgetComponent } from './weather-widget.component'
import { DailyWeatherBuilder } from '@grenoble-hands-on/domain'

describe('WeatherWidgetComponent', () => {
    let component: WeatherWidgetComponent
    let fixture: ComponentFixture<WeatherWidgetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WeatherWidgetComponent]
        })
                     .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(WeatherWidgetComponent)
        component = fixture.componentInstance
        component.weather = DailyWeatherBuilder.sunny()
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
