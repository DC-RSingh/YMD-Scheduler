import { IStudent } from "../interfaces/student.interface";
import { rootStore } from "../renderer/store";

export const filterStudents = (students: IStudent[]): IStudent[] => {
    if (students.length === 0) {
        return [];
    }
    const filterText = rootStore.uiStateStore.studentTableFilterText.toLowerCase();

    return students.filter((s) => {
        return s.firstName.toLowerCase().includes(filterText) || s.lastName.toLowerCase().includes(filterText);
    });
};