import { Presenter, Subscriber } from '../presenters/Presenter'

export abstract class Controller<T> {
    protected constructor(private abstractPresenter: Presenter<T>) {
    }

    subscribeVM(subscriber: Subscriber<T>) {
        this.abstractPresenter.subscribeVM(subscriber)
    }

    get vm() {
        return this.abstractPresenter.vm
    }
}
