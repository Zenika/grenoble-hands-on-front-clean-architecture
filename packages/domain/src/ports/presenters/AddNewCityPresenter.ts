export enum NewCityFields {cityName = 'cityName', latitude = 'latitude', longitude = 'longitude'}

export interface AddNewCityPresenter {
    notifyNewCityInvalid(errors: Map<NewCityFields, string>): void
}

