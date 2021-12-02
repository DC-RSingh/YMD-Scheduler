import { makeObservable, observable, action } from "mobx";
import { RootStore } from "./rootStore";

/**
 * Literally a Test Store.
 */
export class CounterStore {
    @observable count = 0;

    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @action
    incrementCount(): void {
        this.count++;
    }
}