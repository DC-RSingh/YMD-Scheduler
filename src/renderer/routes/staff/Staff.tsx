import { observer } from 'mobx-react-lite';
import React from 'react';
import StaffTableContainer from '../../components/staff-table/StaffTableContainer';

const Staff: React.FC = () => {

    return (
        <StaffTableContainer/>
    );
}

export default observer(Staff);
