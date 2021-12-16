import sqlite3 from 'sqlite3';

class DBManager {
    db: sqlite3.Database;

    open (conn: string) {
        this.db = new sqlite3.Database(conn)
    }
}

export const manager = new DBManager();

export { getRooms } from './room';
export { getRoomId } from './room';
export { createRoom } from './room'; 
export { deleteRoom } from './room'; 
export { updateRoom } from './room';

export { getStudents } from './student';
export { getStudentId } from './student';
export { createStudent } from './student'; 
export { deleteStudent } from './student'; 
export { updateStudent } from './student';

export { getCredentials } from './credentials';
export { getCredentialId } from './credentials';
export { createCredential} from './credentials'; 
export { deleteCredential } from './credentials'; 
export { updateCredential } from './credentials';

export { getRestrictions } from './restrictions';
export { getRestrictionId } from './restrictions';
export { createRestriction} from './restrictions'; 
export { deleteRestriction } from './restrictions'; 
export { updateRestriction } from './restrictions';

export { getSkills } from './skill';
export { getSkillId } from './skill';
export { createSkill} from './skill'; 
export { deleteSkill } from './skill'; 
export { updateSkill } from './skill';

export { getMusicClasses } from './musicClass';
export { getMusicClassId } from './musicClass';
export { createMusicClass } from './musicClass'; 
export { deleteMusicClass } from './musicClass'; 
export { updateMusicClass } from './musicClass';

export { getRoomTypes } from './roomType';
export { getRoomTypeId } from './roomType';
export { createRoomType } from './roomType'; 
export { deleteRoomType } from './roomType'; 
export { updateRoomType } from './roomType';

export { getStaffAvailableDays, getStaffAvailableDaysId, createStaffAvailableDays, deleteStaffAvailableDays, updateStaffAvailableDays } from './staffAvailableDays';

export { getStaff, getStaffId, createStaff, deleteStaff, updateStaff, getStaffSchedule } from './staff';

export { getStaffTypes, getStaffTypeId, createStaffType, deleteStaffType, updateStaffType } from './staffType';

export { getStudentClassList, getStudentClassListId, createStudentClassList, deleteStudentClassList, updateStudentClassList } from './studentClassList';

export { getTimeSlots, getTimeSlotId } from './timeSlot';

export { getDays, getDayId } from './days';

