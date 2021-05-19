import { AddCityUseCase } from '@grenoble-hands-on/domain'
import { Navigation } from '../../router/Navigation'
import { AddCityController } from '../AddCityController'
import { AddCityPresenter } from '../../presenters/AddCityPresenter'

export class AddCityControllerFactory {

    constructor(
        private addNewCityUseCase: AddCityUseCase,
        private navigation: Navigation) {
    }

    build(): AddCityController {
        return new AddCityController(this.addNewCityUseCase, new AddCityPresenter(this.navigation))
    }
}
