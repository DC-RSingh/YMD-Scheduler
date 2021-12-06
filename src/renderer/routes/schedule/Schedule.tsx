import { observer } from 'mobx-react-lite';
import React from 'react';
import {
    Inject, 
    ScheduleComponent, 
    Day, 
    Week, 
    WorkWeek, 
    Month, 
    Agenda, 
} from '@syncfusion/ej2-react-schedule';

const Schedule: React.FC = () => {


    return (
        <ScheduleComponent>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
}

export default observer(Schedule);
