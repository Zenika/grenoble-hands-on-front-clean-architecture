export class AddCityRequest {
    constructor(public cityName: string, public latitude: string, public longitude: string, public dryRun = false) {

    }

}
