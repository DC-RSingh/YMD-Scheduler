import { UserStore } from "./userStore";
import { CounterStore } from "./counterStore";
import { UiStateStore } from "./uiStateStore";
import { RouteStore } from "./routeStore";

export class RootStore {
    userStore: UserStore;
    counterStore: CounterStore;
    uiStateStore: UiStateStore;
    routeStore: RouteStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.counterStore = new CounterStore(this);
        this.uiStateStore = new UiStateStore(this);
        this.routeStore = new RouteStore(this);
    }
}