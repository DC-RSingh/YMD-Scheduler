import { computed, makeObservable } from "mobx";
import { filterStudents } from "../../utils/table.utils";
import { IStudent } from "../../interfaces/student.interface";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";

export class StudentStore {
    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @computed get studentTableData(): IStudent[] {

        const { students } = electronService.ipcRenderer.sendSync('retrieve-students', '');

        return filterStudents(students);
    }
}