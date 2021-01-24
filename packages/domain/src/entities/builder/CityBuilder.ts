import {GeoPositionBuilder} from "./GeoPositionBuilder";
import {GeoPosition} from "../GeoPosition";
import {City} from "../City";

export class CityBuilder {
    private name!: string;
    private position!: GeoPosition;

    withName(name: string) {
        this.name = name
        return this;
    }

    withPosition(position: GeoPosition) {
        this.position = position
        return this;
    }

    build(): City {
        return {
            name: this.name,
            position: this.position
        }
    }

    static example() {
        return new CityBuilder()
            .withName("Grenoble")
            .withPosition(new GeoPositionBuilder().build())
    }
}