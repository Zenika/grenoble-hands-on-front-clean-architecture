import {AddCityUseCase} from "@grenoble-hands-on/domain";
import {AddCityPresenter} from "./AddCityPresenter";

export class AddCityPresenterFactory {

    constructor(private addNewCityUseCase: AddCityUseCase) {
    }

    createAddCityPresenter(): AddCityPresenter {
        return new AddCityPresenter(this.addNewCityUseCase)
    }
}
