import { IStudent } from "../interfaces/student.interface";
import { rootStore } from "../renderer/store";

// Might be able to remove this and just use prisma filtering 
export const filterStudents = (students: IStudent[]): IStudent[] => {
    if (students.length === 0) {
        return [];
    }
    const filterText = rootStore.uiStateStore.studentTableFilterText.toLowerCase();

    return students.filter((s) => {
        return s.FirstName.toLowerCase().includes(filterText) || s.LastName.toLowerCase().includes(filterText);
    });
};