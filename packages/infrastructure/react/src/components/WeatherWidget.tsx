import { DailyWeather } from '@grenoble-hands-on/domain'
import React, { Fragment } from 'react'

export function WeatherWidget(props: { weather: DailyWeather }) {
    return <Fragment>
        <img src={'https://ssl.gstatic.com/onebox/weather/32/' + props.weather.weather + '.png'} alt={props.weather?.weather}/>
        <div>{props.weather.temperatureMax} {props.weather.unite}° / {props.weather.temperatureMin} {props.weather.unite}°</div>
    </Fragment>
}
