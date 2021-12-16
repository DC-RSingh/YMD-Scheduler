import { observer } from 'mobx-react-lite';
import React from 'react';
import ScheduleContainer from '../../components/scheduler/ScheduleContainer';

const Schedule: React.FC = () => {

    return (
        <ScheduleContainer />
    );
}

export default observer(Schedule);
