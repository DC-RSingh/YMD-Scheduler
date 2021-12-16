import { computed, makeObservable } from "mobx";
import { IRoom } from "../../interfaces/room.interface";
import { filterRooms } from "../../utils/table.utils";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";

export class RoomStore {
    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @computed get roomTableData(): IRoom[] {

        const { room } = electronService.ipcRenderer.sendSync('retrieve-room', '');

        return filterRooms(room);
    }
}