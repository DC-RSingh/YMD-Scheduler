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

export { getCredentials } from './credential';
export { getCredentialId } from './credential';
export { createCredential} from './credential'; 
export { deleteCredential } from './credential'; 
export { updateCredential } from './credential';

export { getRestrictions } from './restriction';
export { getRestrictionId } from './restriction';
export { createRestriction} from './restriction'; 
export { deleteRestriction } from './restriction'; 
export { updateRestriction } from './restriction';

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

export { getStaffAvailableDays, getStaffAvailableDaysId, createStaffAvailableDays, deleteStaffAvailableDays, updateStaffAvailableDays } from './staffAvailableDay';

export { getStaff, getStaffId, createStaff, deleteStaff, updateStaff, getStaffSchedule } from './staff';

export { getStaffTypes, getStaffTypeId, createStaffType, deleteStaffType, updateStaffType } from './staffType';

export { getStudentClassList, getStudentClassListId, createStudentClassList, deleteStudentClassList, updateStudentClassList } from './studentClassList';

export { getTimeSlots, getTimeSlotId } from './timeSlot';

export { getDays, getDayId } from './day';

export { getStaffSkills, getStaffSkillId, createStaffSkill, deleteStaffSkill, updateStaffSkill } from './staffSkill';

export { getStaffCredentials, getStaffCredentialId, createStaffCredential, deleteStaffCredential, updateStaffCredential } from './staffCredential';


export { getStaffRestrictions, getStaffRestrictionId, createStaffRestriction, deleteStaffRestriction, updateStaffRestriction } from './staffRestriction';