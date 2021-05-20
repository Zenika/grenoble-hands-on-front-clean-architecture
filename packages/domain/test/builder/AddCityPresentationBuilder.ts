import { AddCityErrors, AddCityPresentation, City } from '@grenoble-hands-on/domain'

export class AddCityPresentationBuilder {
    private notifyNewCityInvalid: (errors: AddCityErrors) => void = () => null;
    private notifyCityAdded: (city: City) => void = () => null;


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
