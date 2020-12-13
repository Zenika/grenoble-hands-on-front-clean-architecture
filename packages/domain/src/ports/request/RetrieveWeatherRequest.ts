import {GeoPosition} from "../../entities/GeoPosition";

export class RetrieveWeatherRequest {
    constructor(public readonly position: GeoPosition) {

    }

}
