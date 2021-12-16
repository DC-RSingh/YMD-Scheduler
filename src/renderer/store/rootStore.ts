import { UserStore } from "./userStore";
import { CounterStore } from "./counterStore";
import { UiStateStore } from "./uiStateStore";
import { RouteStore } from "./routeStore";
import { StudentStore } from "./studentStore";
import { StaffStore } from "./staffStore";

export class RootStore {

    /**
     * Stores state information related to the user.
     */
    userStore: UserStore;

    /**
     * Test Store, does nothing. Marked for removal.
     */
    counterStore: CounterStore;

    /**
     * Stores state information having to do with the User Interface.
     * Things like whether menus are opened or close, and state that other UI components
     * may be concerned with.
     */
    uiStateStore: UiStateStore;

    /** 
     * Stores route state, and is observed by Reaction Container. 
     * Do routeStore.redirect(path) when you want to go to a new route.
     **/
    routeStore: RouteStore;

    studentStore: StudentStore;

    staffStore: StaffStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.counterStore = new CounterStore(this);
        this.uiStateStore = new UiStateStore(this);
        this.routeStore = new RouteStore(this);
        this.studentStore = new StudentStore(this);
        this.staffStore = new StaffStore(this);
    }
}