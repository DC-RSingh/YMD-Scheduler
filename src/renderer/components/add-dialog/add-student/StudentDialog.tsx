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
import useStyles from './StudentDialog.styles';
import { IStudentForm } from './StudentDialogContainer';
import SaveIcon from '@mui/icons-material/Save';
import { AddDialogType } from '../../../store/uiStateStore';

type StudentDialogProps = {
  show: boolean;
  initialValues: IStudentForm;
  dialogType: AddDialogType;
  onClose: () => void;
  onSubmit: (student: IStudentForm) => void;
  handleStudentExists: (someIdentifier: string) => void;  // TODO: Make this some clear reproducable identifier
  handleClearError: () => void; // TODO: Instead of this, remember how errors are handled by the field components
  loading: boolean;
  studentError?: Error;
  studentExists?: boolean;
};

const StudentDialog = ({
  show,
  onClose,
  onSubmit,
  initialValues,
  studentError,
  studentExists,
  dialogType,
  handleStudentExists,
  handleClearError,
  loading,
}: StudentDialogProps) => {
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
  });

  const getStudentExistsError = () => {
    switch (dialogType) {
      case 'Create':
        return studentExists !== undefined && studentExists
          ? "Error: Student already exists!"
          : undefined;
      case 'Edit':
        return studentExists !== undefined && !studentExists ? "Error: Invalid values!" : undefined;
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
            <DialogTitle>{`${dialogType} a Student`}</DialogTitle>
            <DialogContent>

                {/* First Name field */}
              <SimpleField
                name="firstName"
                type="text"
                label={"First Name"}
                placeholder={"Enter your First Name here"}
                handleBlur={handleStudentExists}
                required
                autoFocus
              />

            {/* Last Name Field */}
            <SimpleField
                name="lastName"
                type="text"
                label={"Last Name"}
                placeholder={"Enter your Last Name here"}
                handleBlur={handleStudentExists}
                required
                autoFocus
              />

            </DialogContent>
            
            <DialogActions className={classes.dialogActions}>
              <Button onClick={onClose}>{"Close"}</Button>
              <LoadingButton
                type="submit"
                disabled={!isValid || getStudentExistsError() !== undefined}
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

export default observer(StudentDialog);
