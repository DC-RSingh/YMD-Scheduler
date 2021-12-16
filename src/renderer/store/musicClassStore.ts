import { makeObservable } from "mobx";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";

export class MusicClassStore {
    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }
}