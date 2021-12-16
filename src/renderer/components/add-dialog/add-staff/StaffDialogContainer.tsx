import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react'
import { useStores } from '../../../store'
import StaffDialog from './StaffDialog'

export interface IStaffForm {
    Type:               number;
    FirstName:          string;
    LastName:           string;
    Gender:             string;
    DateOfBirth:        Date;
    Email:              string;
    Telephone:          string;
    MaxHoursPerWeek:    number;
    // AvailableDays:      [];
    // Skills:             [];
    // Credentials:        [];
    // Restrictions:       [];
}

const StaffDialogContainer: React.FC = () => {
    const { uiStateStore, staffStore } = useStores();

    let staffTypes = staffStore.staffTypes();
    // const staffTypes = useMemo(() => types, [types]);

    useEffect(() => {
        staffTypes = staffStore.staffTypes();
        console.log(staffStore.newStaffTypesThisSession)
    }, [staffStore.newStaffTypesThisSession]);

    const initialValues: IStaffForm = {
        Type:  0,        
        FirstName: '',  
        LastName: '',    
        Gender: '',        
        DateOfBirth: null, 
        Email: '',         
        Telephone: '',     
        MaxHoursPerWeek: 0,
        // AvailableDays: [],
        // Skills: [],        
        // Credentials: [],   
        // Restrictions: [],   
    }

    const onSubmit = (staff: IStaffForm) => {
        uiStateStore.setCreatingStaff(true);
        staffStore.insertStaff(staff);
    }

    return (
        <StaffDialog
            show={uiStateStore.staffDialogOpen}
            onClose={() => uiStateStore.setStaffDialogOpen(false)}
            onSubmit={(staff: IStaffForm) => onSubmit(staff)}
            initialValues={initialValues}
            dialogType={uiStateStore.staffDialogType}
            staffTypes={staffTypes}
            handleStaffExists={null}
            handleClearError={null}
            loading={uiStateStore.creatingStaff}
        />
    )
}

export default observer(StaffDialogContainer);
