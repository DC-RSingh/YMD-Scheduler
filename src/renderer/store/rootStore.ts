import { UserStore } from "./userStore";
import { CounterStore } from "./counterStore";

export class RootStore {
    userStore: UserStore;
    counterStore: CounterStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.counterStore = new CounterStore(this);
    }
}