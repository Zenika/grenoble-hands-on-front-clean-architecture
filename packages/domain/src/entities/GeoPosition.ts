export class GeoPosition {
    constructor(public latitude: number, public longitude: number) {

    }

    static isLongitudeInvalid(longitude: string) {
        return (isNaN(+longitude) || +longitude < -180 || +longitude > 180)
    }

    static isLatitudeInvalid(latitude: string) {
        return (isNaN(+latitude) || +latitude < -180 || +latitude > 180)
    }
}
