import { IStudent } from "../interfaces/student.interface";
import { IStaff } from "../interfaces/staff.interface";
import { IRoom } from "../interfaces/room.interface";
import { rootStore } from "../renderer/store";

export const filterStudents = (students: IStudent[]): IStudent[] => {
    if (students.length === 0) {
        return [];
    }
    const filterText = rootStore.uiStateStore.studentTableFilterText.toLowerCase().trim();

    return students.filter((s) => {
        const firstName = s.FirstName.toLowerCase();
        const lastName = s.LastName.toLowerCase();
        return `${firstName} ${lastName}`.includes(filterText);
    });
};

export const filterStaff = (staff: IStaff[]): IStaff[] => {
    if (staff.length === 0) {
        return [];
    }
    const filterText = rootStore.uiStateStore.staffTableFilterText.toLowerCase().trim();

    return staff.filter((s) => {
        const firstName = s.FirstName.toLowerCase();
        const lastName = s.LastName.toLowerCase();
        return `${firstName} ${lastName}`.includes(filterText);
    });
};

export const filterRooms = (room: IRoom[]): IRoom[] => {
    if (room.length === 0) {
        return [];
    }
    const filterText = rootStore.uiStateStore.roomTableFilterText.toLowerCase().trim();

    return room.filter((r) => {
        return r.Name.includes(filterText);
    });
};