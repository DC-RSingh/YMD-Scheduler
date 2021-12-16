import { computed, makeObservable } from "mobx";
import { IStaff } from "../../interfaces/staff.interface";
import { filterStaff } from "../../utils/table.utils";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";
import { IType } from "../../interfaces/type.interface";
import { IStaffForm } from "../components/add-dialog/add-staff/StaffDialogContainer";

export class StaffStore {
    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @computed get staffTableData(): IStaff[] {

        const { staff } = electronService.ipcRenderer.sendSync('retrieve-staff', '');

        return filterStaff(staff);
    }

    @computed get staffTypes(): IType[] {

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
        })
    }
}