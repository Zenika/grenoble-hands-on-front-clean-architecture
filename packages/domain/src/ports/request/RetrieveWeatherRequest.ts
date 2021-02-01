import { UniteDegree } from '../../entities/UniteDegree'

export class RetrieveWeatherRequest {
    constructor(public readonly city: string, public readonly unite: UniteDegree = 'C') {

    }

}
