import { action, computed, makeObservable, observable } from "mobx";
import { IRoom } from "../../interfaces/room.interface";
import { filterRooms } from "../../utils/table.utils";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";
import { IType } from "../../interfaces/type.interface";
import { IRoomForm } from "../components/add-dialog/add-room/RoomDialogContainer";
import { IAddTypesForm } from "../components/add-dialog/add-types/AddTypesDialogContainer";

export class RoomStore {
    @observable newRoomsThisSession = 0;
    @observable newRoomTypesThisSession = 0;

    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @action incrementNewRooms(): void {
        this.newRoomsThisSession++;
    }

    @action incrementNewRoomTypes(): void {
        this.newRoomTypesThisSession++;
    }

    @computed get roomTableData(): IRoom[] {

        const { rooms } = electronService.ipcRenderer.sendSync('retrieve-rooms', '');

        return filterRooms(rooms);
    }

    // Can be computed later, too much work
    roomTypes(): IType[] {
        const { roomTypes } = electronService.ipcRenderer.sendSync('retrieve-roomTypes');

        return roomTypes;
    }

    getRoomTypeById(value: any): string {
        const { roomType } = electronService.ipcRenderer.sendSync('retrieve-roomType-by-id', value);

        return roomType[0].Type;
    }

    getRoomById(value: any): IRoom {
        const { room } = electronService.ipcRenderer.sendSync('retrieve-room-by-id', value);

        return room[0];
    }

    insertRoom(room: IRoomForm): void {
        electronService.ipcRenderer.invoke('create-room', Object.values(room)).then(() => {
            this.rootStore.uiStateStore.setCreatingRoom(false);
            this.rootStore.uiStateStore.setRoomDialogOpen(false);
            this.incrementNewRooms();
        })
    }

    insertRoomType(roomType: IAddTypesForm): void {
        electronService.ipcRenderer.invoke('create-roomType', Object.values(roomType)).then(() => {
            this.rootStore.uiStateStore.setCreatingType(false);
            this.rootStore.uiStateStore.setAddTypesDialogOpen(false);
            this.incrementNewRoomTypes();
        });
    }
}