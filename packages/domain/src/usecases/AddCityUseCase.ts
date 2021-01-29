import { CityRepository } from '../ports/repositories/CityRepository'
import { AddCityRequest } from '../ports/request/AddCityRequest'
import { AddCityPresentation, NewCityFields } from '../ports/presenters/AddCityPresentation'
import { GeoPosition } from '../entities/GeoPosition'
import { CityBuilder } from '../entities/CityBuilder'
import { GeoPositionBuilder } from '../entities/GeoPositionBuilder'

export class AddCityUseCase {
  constructor(private cityRepository: CityRepository) {

  }

  async execute(addCityRequest: AddCityRequest, presenter: AddCityPresentation) {
    const errors = this.validate(addCityRequest, presenter);

    if (!errors.size) {
      const city = new CityBuilder()
        .withName(addCityRequest.cityName)
        .withPosition(new GeoPositionBuilder()
          .withLatitude(+addCityRequest.latitude)
          .withLongitude(+addCityRequest.longitude)
          .build()
        )
        .build();
      await this.cityRepository.addCity(city);
      presenter.notifyCityAdded(city);
    }
  }

  validate(addCityRequest: AddCityRequest, presenter: AddCityPresentation) {
    const errors = new Map<NewCityFields, string>();
    if (addCityRequest.cityName == null || !addCityRequest.cityName.length) {
      errors.set(NewCityFields.cityName, 'City name is required');
    }
    if (addCityRequest.latitude == null || !addCityRequest.latitude.length) {
      errors.set(NewCityFields.latitude, 'Latitude is required');
    } else if (GeoPosition.isLatitudeInvalid(addCityRequest.latitude)) {
      errors.set(NewCityFields.latitude, 'Latitude must be an number between -180 and 180');
    }
    if (addCityRequest.longitude == null || !addCityRequest.longitude.length) {
      errors.set(NewCityFields.longitude, 'Longitude is required');
    } else if (GeoPosition.isLongitudeInvalid(addCityRequest.longitude)) {
      errors.set(NewCityFields.longitude, 'Longitude must be an number between -180 and 180');
    }

    presenter.notifyNewCityInvalid(errors);
    return errors;
  }
}
