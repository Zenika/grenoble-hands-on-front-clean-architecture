import { Presenter } from './Presenter'

export class NavbarPresenterVM {
}

export class NavbarPresenter extends Presenter<NavbarPresenterVM> {

    constructor() {
        super(new NavbarPresenterVM())
    }
}
