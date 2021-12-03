import { RootStore } from "./rootStore";
import {action, makeObservable, observable} from 'mobx';

type Details = {
    username: string,
    password: string,
    remember: boolean
}

// Temporary Constants for Login Info
const CORRECT_USERNAME = "admin";
const CORRECT_PASSWORD = "password;"

export class UserStore {
    @observable username = "";
    @observable password = "";
    @observable remember = false;
    @observable authenticated = false;

    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @action
    login(details: Details): void {
        this.rootStore.uiStateStore.setLoginAuthenticating(true);

        this.username = details.username.trim();
        this.password = details.password.trim();
        this.remember = details.remember;
        console.log("Authenticating...");

        if(this.authenticate()) {
            console.log("Authentication Success!");
            this.authenticateSuccess();
        }
        else {
            this.authenticateFail();
        }

        return;
    }

    @action
    authenticate(): boolean {
        return this.username == CORRECT_USERNAME && this.password == CORRECT_PASSWORD;
    }

    @action
    authenticateSuccess(): void {
        this.authenticated = true;
        this.rootStore.uiStateStore.setLoginAuthenticating(false);
    }

    @action
    authenticateFail(): void {
        this.authenticated = false;
        this.rootStore.uiStateStore.setLoginAuthenticating(false);
        this.rootStore.uiStateStore.setLoginError(new Error("Username and Password combination not recognized."));
    }

    @action
    getAuthenticationStatus(): boolean {
        return this.authenticated;
    }
    
}