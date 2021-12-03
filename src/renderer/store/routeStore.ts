import {action, makeObservable, observable } from 'mobx';

import { RootStore } from './rootStore';

export class RouteStore {
    @observable redirectedTo: string | undefined = undefined;

    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @action
    redirect(path: string): void {
        if (this.redirectedTo !== path) {
            this.redirectedTo = path;
        }
    }
}