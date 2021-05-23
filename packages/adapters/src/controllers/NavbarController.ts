import { Controller } from './Controller'
import { NavbarPresenter, NavbarPresenterVM } from '../presenters/NavbarPresenter'

export class NavbarController extends Controller<NavbarPresenterVM> {

    constructor(private presenter: NavbarPresenter) {
        super(presenter)
    }

}
