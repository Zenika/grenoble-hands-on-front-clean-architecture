import {City, GetCitiesPresentation} from "@grenoble-hands-on/domain";

export class GetCitiesPresentationBuilder {
    private displayCities: (city: City[]) => void = () => null;

    withDisplayCities(displayCities: (city: City[]) => void) {
        this.displayCities = displayCities;
        return this;
    }

    build(): GetCitiesPresentation {
        return {
            displayCities: this.displayCities
        }
    }
}