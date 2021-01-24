import {AddCityUseCase} from "@grenoble-hands-on/domain";
import {AddCityPresenter} from "../AddCityPresenter";
import {Navigation} from "../../router/Navigation";

export class AddCityPresenterBuilder {

    private addNewCityUseCase!: AddCityUseCase
    private navigation!: Navigation

    withUseCase(addNewCityUseCase: AddCityUseCase) {
        this.addNewCityUseCase = addNewCityUseCase
        return this;
    }

    withNavigator(navigation: Navigation) {
        this.navigation = navigation
        return this;
    }

    build(): AddCityPresenter {
        return new AddCityPresenter(this.addNewCityUseCase, this.navigation)
    }
}
