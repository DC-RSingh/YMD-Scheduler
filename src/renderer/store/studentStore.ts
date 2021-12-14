import { computed, makeObservable } from "mobx";
import { filterStudents } from "../../utils/table.utils";
import { IStudent } from "../../interfaces/student.interface";
import { RootStore } from "./rootStore";
import STUDENT_DATA from './STUDENT_DATA.json';

export class StudentStore {
    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @computed get studentTableData(): IStudent[] {
        const students: IStudent[] = STUDENT_DATA;

        return filterStudents(students);
    }
}