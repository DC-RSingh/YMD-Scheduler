import React from 'react';
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { observer } from 'mobx-react-lite';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Paper } from '@mui/material';
import { useStores } from '../../store';

const currentDate = '2018-11-01';

const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

const ScheduleContainer: React.FC = () => {
    const { roomStore } = useStores();

    return (
        <Paper>
            <Scheduler 
                data={schedulerData}
                data-tour-elem="scheduleArea"
            >
                <ViewState currentDate={currentDate}/>   
                <DayView startDayHour={9} endDayHour={14} />
                <Appointments />
            </Scheduler>
        </Paper>
    )
}

export default observer(ScheduleContainer);
