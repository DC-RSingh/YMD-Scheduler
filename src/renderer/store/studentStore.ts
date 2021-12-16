import { computed, makeObservable } from "mobx";
import { filterStudents } from "../../utils/table.utils";
import { IStudent } from "../../interfaces/student.interface";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";
import { IStudentForm } from "../components/add-dialog/add-student/StudentDialogContainer";

export class StudentStore {
    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @computed get studentTableData(): IStudent[] {

        const { students } = electronService.ipcRenderer.sendSync('retrieve-students', '');

        return filterStudents(students);
    }

    insertStudent(student: IStudentForm): void {
        electronService.ipcRenderer.invoke('create-student', Object.values(student)).then(() => {
            this.rootStore.uiStateStore.setCreatingStudent(false);
            this.rootStore.uiStateStore.setStudentDialogOpen(false);
        });
    }
}