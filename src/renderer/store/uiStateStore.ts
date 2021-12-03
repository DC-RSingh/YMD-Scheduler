import { makeObservable, observable, action } from "mobx";
import { RootStore } from "./rootStore";

export class UiStateStore {
    // #region LoginDialog States
    @observable loginError: Error | undefined = undefined;
    @observable loginAuthenticating = false;
    // #endregion

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
}