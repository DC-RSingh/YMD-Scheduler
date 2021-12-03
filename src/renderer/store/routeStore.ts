import {action, makeObservable, observable } from 'mobx';

import { RootStore } from './rootStore';

export class RouteStore {
    @observable redirectedTo: string | undefined = undefined;

    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @action
    redirect(path: string, loginError?: string): void {
        if (this.redirectedTo !== path) {
            if (loginError) {
                // something happens
            }
            this.redirectedTo = path;
        }
    }
}