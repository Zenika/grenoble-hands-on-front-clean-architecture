import { GeoPosition } from './GeoPosition'

export class GeoPositionBuilder {
    private latitude!: number;
    private longitude!: number;

    withLongitude(longitude: number) {
        this.longitude = longitude;
        return this;
    }

    withLatitude(latitude: number) {
        this.latitude = latitude;
        return this;
    }

    build(): GeoPosition {
        return new GeoPosition(this.latitude, this.longitude)
    }
}
