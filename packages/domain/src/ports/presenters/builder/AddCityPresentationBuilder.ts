import {AddCityErrors, AddCityPresentation, City} from "@grenoble-hands-on/domain";

const NOOP = () => {
};

export class AddCityPresentationBuilder {
    private notifyNewCityInvalid: (errors: AddCityErrors) => void = NOOP;
    private notifyCityAdded: (city: City) => void = NOOP;


    withNotifyCityAdded(notifyCityAdded: (city: City) => void) {
        this.notifyCityAdded = notifyCityAdded;
        return this;
    }

    withNotifyNewCityInvalid(notifyNewCityInvalid: (errors: AddCityErrors) => void) {
        this.notifyNewCityInvalid = notifyNewCityInvalid;
        return this
    }

    build(): AddCityPresentation {
        return {
            notifyNewCityInvalid: this.notifyNewCityInvalid,
            notifyCityAdded: this.notifyCityAdded
        }
    }
}