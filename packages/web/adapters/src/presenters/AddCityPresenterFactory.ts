import {AddNewCityUseCase} from "@grenoble-hands-on/domain";
import {AddCityPresenter} from "./AddCityPresenter";

export class AddCityPresenterFactory {

    constructor(private addNewCityUseCase: AddNewCityUseCase) {
    }

    createAddCityPresenter(): AddCityPresenter {
        return new AddCityPresenter(this.addNewCityUseCase)
    }
}
