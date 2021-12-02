import { RootStore } from "./rootStore";
import {action, makeObservable, observable} from 'mobx';

type Details = {
    username: string,
    password: string
}

export class UserStore {
    @observable username = "Admin";
    @observable password = "password";

    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @action
    Login(details: Details): void {
        console.log(details);
        return;
    }
}