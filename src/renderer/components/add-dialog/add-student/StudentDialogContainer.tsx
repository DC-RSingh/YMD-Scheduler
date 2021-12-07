import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStores } from '../../../store'
import StudentDialog from './StudentDialog'

export interface IStudentForm {
    firstName: string;
    lastName: string;
}

const StudentDialogContainer: React.FC = () => {
    const { uiStateStore } = useStores();

    const initialValues: IStudentForm = {
        firstName: '',
        lastName: '',
    }

    const onSubmit = (student: IStudentForm) => {
        return;
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
