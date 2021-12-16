import { computed, makeObservable } from "mobx";
import { IStaff } from "../../interfaces/staff.interface";
import { filterStaff } from "../../utils/table.utils";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";

export class StaffStore {
    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @computed get staffTableData(): IStaff[] {

        const { staff } = electronService.ipcRenderer.sendSync('retrieve-staff', '');

        return filterStaff(staff);
    }
}