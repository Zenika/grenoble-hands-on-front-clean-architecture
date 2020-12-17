type Subscriber<T> = (vm: T) => void;

export abstract class Presenter<T> {

    protected subscriber: Subscriber<T> | undefined

    protected constructor(public vm: T) {
    }

    updateVM() {
        this.subscriber?.call(this.subscriber, this.vm)
    }

    onVmUpdate(subscriber: Subscriber<T>) {
        this.subscriber = subscriber
        this.subscriber(this.vm)
    }
}
