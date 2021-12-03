import { UserStore } from "./userStore";
import { CounterStore } from "./counterStore";
import { UiStateStore } from "./uiStateStore";

export class RootStore {
    userStore: UserStore;
    counterStore: CounterStore;
    uiStateStore: UiStateStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.counterStore = new CounterStore(this);
        this.uiStateStore = new UiStateStore(this);
    }
}