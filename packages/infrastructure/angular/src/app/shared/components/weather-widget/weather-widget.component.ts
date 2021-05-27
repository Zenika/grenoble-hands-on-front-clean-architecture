import { Component, Input, OnInit } from '@angular/core'
import { DailyWeather } from '@grenoble-hands-on/domain'

@Component({
    selector: 'app-weather-widget',
    templateUrl: './weather-widget.component.html',
    styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {

    @Input() weather!: DailyWeather

    constructor() {
    }

    ngOnInit(): void {
    }

}
