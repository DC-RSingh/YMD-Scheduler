import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import * as Yup from 'yup';
import SimpleField from '../../simple-field/SimpleField';
import SelectField from '../../select-field/SelectField';
import useStyles from './StaffDialog.styles';
import { IStaffForm } from './StaffDialogContainer';
import SaveIcon from '@mui/icons-material/Save';
import { AddDialogType } from '../../../store/uiStateStore';
import DatePickerField from '../../datepicker-field/DatePickerField';

type StaffDialogProps = {
  show: boolean;
  initialValues: IStaffForm;
  dialogType: AddDialogType;
  onClose: () => void;
  onSubmit: (staff: IStaffForm) => void;
  handleStaffExists: (someIdentifier: string) => void;  // TODO: Make this some clear reproducable identifier
  handleClearError: () => void; // TODO: Instead of this, remember how errors are handled by the field components
  loading: boolean;
  staffError?: Error;
  staffExists?: boolean;
};

const StaffDialog = ({
  show,
  onClose,
  onSubmit,
  initialValues,
  staffError,
  staffExists,
  dialogType,
  handleStaffExists,
  handleClearError,
  loading,
}: StaffDialogProps) => {
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
  });

  const getStaffExistsError = () => {
    switch (dialogType) {
      case 'Create':
        return staffExists !== undefined && staffExists
          ? "Error: Staff already exists!"
          : undefined;
      case 'Edit':
        return staffExists !== undefined && !staffExists ? "Error: Invalid values!" : undefined;
      default:
        return undefined;
    }
  };

  return (
    <Dialog open={show} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ isValid, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle>{`${dialogType} a Staff Member`}</DialogTitle>
            <DialogContent>

            {/* First Name field */}
            <SimpleField
                name="firstName"
                type="text"
                label={"First Name"}
                placeholder={"Enter your First Name here"}
                handleBlur={handleStaffExists}
                required
                autoFocus
            />

            {/* Last Name Field */}
            <SimpleField
                name="lastName"
                type="text"
                label={"Last Name"}
                placeholder={"Enter your Last Name here"}
                handleBlur={handleStaffExists}
                required
            />

            {/* Gender Field */}
            <SelectField 
                name="gender"
                label="Select Staff Gender"
                options={
                    [
                        {id: 'male', value: 'M', label: 'Male'},
                        {id: 'female', value: 'F', label: 'Female'},
                        {id: 'other', value: 'O', label: 'Other'}
                    ]
                }
                required
            />

            {/* Staff Date of Birth Field */}
            <DatePickerField 
                name="dateOfBirth"
                label="Date Of Birth"
            />

            {/* Staff Email Field */}
            <SimpleField
                name="email"
                type="text"
                label={"Contact Email"}
                placeholder={"Enter Student Contact Email here"}
                handleBlur={handleStaffExists}
                required
            />

            {/* Staff Telephone Field */}
            <SimpleField
                name="telephone"
                type="text"
                label={"Contact Telephone"}
                placeholder={"Enter Student Contact Telephone here"}
                handleBlur={handleStaffExists}
                required
            />

            {/* Staff Max Hours Field */}
            <SimpleField
                name="maxHours"
                type="number"
                label={"Max Hours per Week"}
                placeholder={"Enter Staff Max Hours here"}
                handleBlur={handleStaffExists}
                required
            />

            {/* Staff Type Field */}
            {/* To be replaced with special dropdown component */}
            <SelectField
                name="staffType"
                label="Staff Type"
                required
            />

            {/* Staff Skills Field */}
            {/* To be replaced with special dropdown component */}
            <SelectField
                name="staffSkills"
                label="Staff Skills"
            />

            {/* Staff Credentials Field */}
            {/* To be replaced with special dropdown component */}
            <SelectField
                name="staffCredentials"
                label="Staff Credentials"
            />

            {/* Staff Restrictions Field */}
            {/* To be replaced with special dropdown component */}
            <SelectField
                name="staffRestrictions"
                label="Staff Restrictions"
            />

            </DialogContent>
            
            <DialogActions className={classes.dialogActions}>
              <Button onClick={onClose}>{"Close"}</Button>
              <LoadingButton
                type="submit"
                disabled={!isValid || getStaffExistsError() !== undefined}
                color="primary"
                variant="contained"
                loading={loading}
                loadingPosition="end"
                endIcon={<SaveIcon />}
              >
                {dialogType}
              </LoadingButton>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default observer(StaffDialog);
