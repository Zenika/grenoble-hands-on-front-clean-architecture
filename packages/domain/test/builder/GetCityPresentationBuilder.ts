import { City, GetCityPresentation } from '@grenoble-hands-on/domain'

export class GetCityPresentationBuilder {
    private displayCity: (city: City) => void = () => null;

    withDisplayCity(displayCity: (city: City) => void) {
        this.displayCity = displayCity;
        return this;
    }

    build(): GetCityPresentation {
        return {
            displayCity: this.displayCity
        }
    }
}
