import {CityRepository} from "../ports/repositories/CityRepository";
import {AddCityRequest} from "../ports/request/AddCityRequest";
import {AddNewCityPresenter, NewCityFields} from "../ports/presenters/AddNewCityPresenter";
import {City} from "../entities/City";
import {GeoPosition} from "../entities/GeoPosition";

export class AddNewCityUseCase {
    constructor(private cityRepository: CityRepository) {

    }

    async execute(addCityRequest: AddCityRequest, presenter: AddNewCityPresenter) {
        const errors = this.validate(addCityRequest, presenter);

        if (!errors.size) {
            const city: City = {
                name: addCityRequest.cityName,
                position: new GeoPosition(+addCityRequest.latitude, +addCityRequest.longitude)
            }
            await this.cityRepository.addCity(city)
        }
    }

    validate(addCityRequest: AddCityRequest, presenter: AddNewCityPresenter) {
        const errors = new Map<NewCityFields, string>();
        if (addCityRequest.cityName == null || !addCityRequest.cityName.length) {
            errors.set(NewCityFields.cityName, 'City name is required')
        }
        if (addCityRequest.latitude == null || !addCityRequest.latitude.length) {
            errors.set(NewCityFields.latitude, 'Latitude is required')
        } else if (GeoPosition.isLatitudeInvalid(addCityRequest.latitude)) {
            errors.set(NewCityFields.latitude, 'Latitude must be an number between -180 and 180')
        }
        if (addCityRequest.longitude == null || !addCityRequest.longitude.length) {
            errors.set(NewCityFields.longitude, 'Longitude is required')
        } else if (GeoPosition.isLongitudeInvalid(addCityRequest.longitude)) {
            errors.set(NewCityFields.longitude, 'Longitude must be an number between -180 and 180')
        }

        presenter.notifyNewCityInvalid(errors)
        return errors;
    }
}
