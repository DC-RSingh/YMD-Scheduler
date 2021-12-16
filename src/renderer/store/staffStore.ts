import { action, computed, makeObservable, observable } from "mobx";
import { IStaff } from "../../interfaces/staff.interface";
import { filterStaff } from "../../utils/table.utils";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";
import { IType } from "../../interfaces/type.interface";
import { IStaffForm } from "../components/add-dialog/add-staff/StaffDialogContainer";
import { IAddTypesForm } from "../components/add-dialog/add-types/AddTypesDialogContainer";

export class StaffStore {
    @observable newStaffThisSession = 0;
    @observable newStaffTypesThisSession = 0;

    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @action incrementNewStaff(): void {
        this.newStaffThisSession++;
    }

    @action incrementNewStaffTypes(): void {
        this.newStaffTypesThisSession++;
    }

    @computed get staffTableData(): IStaff[] {

        const { staff } = electronService.ipcRenderer.sendSync('retrieve-staff', '');

        return filterStaff(staff);
    }

    staffTypes(): IType[] {

        const {staffTypes} = electronService.ipcRenderer.sendSync('retrieve-staffTypes')

        return staffTypes;
    }

    getStaffTypeById(value: any): string {
        const { staffType } = electronService.ipcRenderer.sendSync('retrieve-staffType-by-id', value);
        return staffType[0].Type; // FIXME: this is cryptic and needs to be changed from src/database/staffType.ts
    }

    insertStaff(staff: IStaffForm): void {
        electronService.ipcRenderer.invoke('create-staff', Object.values(staff)).then(() => {
            this.rootStore.uiStateStore.setCreatingStaff(false);
            this.rootStore.uiStateStore.setStaffDialogOpen(false);
            this.incrementNewStaff();
        })
    }

    insertStaffType(staffType: IAddTypesForm): void {
        electronService.ipcRenderer.invoke('create-staffType', Object.values(staffType)).then(() => {
            this.rootStore.uiStateStore.setCreatingType(false);
            this.rootStore.uiStateStore.setAddTypesDialogOpen(false);
            this.incrementNewStaffTypes();
        });
    }
}