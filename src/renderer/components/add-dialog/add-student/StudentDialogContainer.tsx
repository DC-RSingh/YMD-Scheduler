import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../../store';
import StudentDialog from './StudentDialog';

export interface IStudentForm {
    FirstName: string;
    LastName: string;
    Gender: string;
    DateOfBirth: string;
    ContactEmail: string;
    ContactTelephone: string;
    PaymentMethod: string;
}

const StudentDialogContainer: React.FC = () => {
    const { uiStateStore, studentStore } = useStores();

    const initialValues: IStudentForm = {
        FirstName: '',
        LastName: '',
        Gender: '',
        DateOfBirth: '',
        ContactEmail: '',
        ContactTelephone: '',
        PaymentMethod: '',
    }

    const onSubmit = (student: IStudentForm) => {
        uiStateStore.setCreatingStudent(true);
        studentStore.insertStudent(student);
    }

    return (
        <StudentDialog
            show={uiStateStore.studentDialogOpen}
            onClose={() => uiStateStore.setStudentDialogOpen(false)}
            onSubmit={(student: IStudentForm) => onSubmit(student)}
            initialValues={initialValues}
            dialogType={uiStateStore.studentDialogType}
            handleStudentExists={null}
            handleClearError={null}
            loading={uiStateStore.creatingStudent}
        />
    )
}

export default observer(StudentDialogContainer);
