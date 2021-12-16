import { computed, makeObservable } from "mobx";
import { IRoom } from "../../interfaces/room.interface";
import { filterRooms } from "../../utils/table.utils";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";
import { IType } from "../../interfaces/type.interface";

export class RoomStore {
    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @computed get roomTableData(): IRoom[] {

        const { rooms } = electronService.ipcRenderer.sendSync('retrieve-rooms', '');

        return filterRooms(rooms);
    }

    @computed get roomTypes(): IType[] {
        const { roomTypes } = electronService.ipcRenderer.sendSync('retrieve-roomTypes');

        return roomTypes;
    }

    getRoomTypeById(value: any): string {
        const { roomType } = electronService.ipcRenderer.sendSync('retrieve-roomType-by-id', value);

        return roomType[0].Type;
    }
}