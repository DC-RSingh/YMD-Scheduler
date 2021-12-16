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
import { IType } from '../../../../interfaces/type.interface';
import { ISelectOption } from '../../../../interfaces/select-option.interface';

type StaffDialogProps = {
  show: boolean;
  initialValues: IStaffForm;
  dialogType: AddDialogType;
  staffTypes: IType[];
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
  staffTypes,
  handleStaffExists,
  handleClearError,
  loading,
}: StaffDialogProps) => {
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required('First Name is required'),
    LastName: Yup.string().required('Last Name is required'),
    Gender: Yup.string().required('Gender is required'),
    DateOfBirth: Yup.date().required('Date of Birth is required'),
    Email: Yup.string().length(255, 'Max 255 Characters.').required('Email is required.'),
    Telephone: Yup.string().length(10, 'Max 10 characters. Only enter the number.').required('Telephone Number is required'),
    MaxHoursPerWeek: Yup.number().positive().required('Max Hours per Week is required'),
    Type: Yup.number().required('Staff Type is required.'),
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
                name="FirstName"
                type="text"
                label={"First Name"}
                placeholder={"Enter your First Name here"}
                handleBlur={handleStaffExists}
                required
                autoFocus
            />

            {/* Last Name Field */}
            <SimpleField
                name="LastName"
                type="text"
                label={"Last Name"}
                placeholder={"Enter your Last Name here"}
                handleBlur={handleStaffExists}
                required
            />

            {/* Gender Field */}
            <SelectField 
                name="Gender"
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

            {/* Staff Type Field */}
            {/* To be replaced with special dropdown component */}
            <SelectField
                name="Type"
                label="Staff Type"
                options={staffTypes?.map((r) => {
                    return {
                        id: r.Id.toString(),
                        value: r.Id,
                        label: r.Type,
                    } as ISelectOption
                })}
            />

            {/* Staff Date of Birth Field */}
            <DatePickerField 
                name="DateOfBirth"
                label="Date Of Birth"
            />

            {/* Staff Email Field */}
            <SimpleField
                name="Email"
                type="text"
                label={"Email"}
                placeholder={"Enter Staff Contact Email here"}
                handleBlur={handleStaffExists}
                required
            />

            {/* Staff Telephone Field */}
            <SimpleField
                name="Telephone"
                type="text"
                label={"Telephone"}
                placeholder={"Enter Staff Contact Telephone here"}
                handleBlur={handleStaffExists}
                required
            />

            {/* Staff Max Hours Field */}
            <SimpleField
                name="MaxHoursPerWeek"
                type="number"
                label={"Max Hours per Week"}
                placeholder={"Enter Staff Max Hours here"}
                handleBlur={handleStaffExists}
                required
            />

            {/* Staff Available Days Field */}
            {/* To be replaced with special dropdown component */}
            <SelectField
                name="AvailableDays"
                label="Staff Available Days"
                required
            />
            
            {/* Staff Skills Field */}
            {/* To be replaced with special dropdown component */}
            <SelectField
                name="Skills"
                label="Staff Skills"
            />

            {/* Staff Credentials Field */}
            {/* To be replaced with special dropdown component */}
            <SelectField
                name="Credentials"
                label="Staff Credentials"
            />

            {/* Staff Restrictions Field */}
            {/* To be replaced with special dropdown component */}
            <SelectField
                name="Restrictions"
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
