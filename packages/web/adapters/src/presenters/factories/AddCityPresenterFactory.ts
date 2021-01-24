import {AddCityUseCase} from "@grenoble-hands-on/domain";
import {AddCityPresenter} from "../AddCityPresenter";
import {Navigation} from "../../router/Navigation";

export class AddCityPresenterFactory {

    constructor(
        private addNewCityUseCase: AddCityUseCase,
        private navigation: Navigation) {
    }

    build(): AddCityPresenter {
        return new AddCityPresenter(this.addNewCityUseCase, this.navigation)
    }
}
