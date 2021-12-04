import { makeObservable, observable, action } from "mobx";
import { persist } from "mobx-persist";
import { RootStore } from "./rootStore";

export class UiStateStore {
    // #region LoginDialog States
    @observable loginError: Error | undefined = undefined;
    @observable loginAuthenticating = false;
    // #endregion
    //#region NavigationMenu States
    @persist @observable sideNavOpen = false;
    //#endregion
    //#region AddOverview States
    @observable addOverviewOpen = false;
    //#endregion

    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    //#region LoginDialog Functions
    @action
    setLoginError(error: Error | undefined): void {
        this.loginError = error;
    }

    @action
    setLoginAuthenticating(authenticating: boolean): void {
        this.loginAuthenticating = authenticating;
    }
    //#endregion
    //#region NavigationMenu Functions
    @action
    toggleSideNav(open?: boolean): void {
        this.addOverviewOpen = false;
        this.sideNavOpen = open !== undefined ? open : !this.sideNavOpen;
    }
    //#endregion
    //#region AddOverview Functions
    @action
    toggleAddOverview(open?: boolean): void {
        this.sideNavOpen = false;
        this.addOverviewOpen = open !== undefined ? open : !this.addOverviewOpen;
    }
    //#endregion
}