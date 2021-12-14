import { computed, makeObservable } from "mobx";
import { filterStudents } from "../../utils/table.utils";
import { IStudent } from "../../interfaces/student.interface";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";
import STUDENT_DATA from './STUDENT_DATA.json';

export class StudentStore {
    constructor(private rootStore: RootStore) {
        makeObservable(this);

        electronService.ipcRenderer.invoke('retrieve-students').then((result) => {
            result;
        });

    }

    @computed get studentTableData(): IStudent[] {
        const students: IStudent[] = STUDENT_DATA;
        // electronService.ipcRenderer.invoke('retrieve-students').then((result) => {
        //     students = result;
        // });

        return filterStudents(students);
    }
}