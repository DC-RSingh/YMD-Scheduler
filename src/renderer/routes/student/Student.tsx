import { observer } from 'mobx-react-lite';
import React from 'react';
import StudentTableContainer from '../../components/student-table/StudentTableContainer';


const Student: React.FC = () => {

    return (
        <StudentTableContainer/>
    );
}

export default observer(Student);
