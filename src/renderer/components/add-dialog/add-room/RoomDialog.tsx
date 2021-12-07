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
import useStyles from './RoomDialog.styles';
import { IRoomForm } from './RoomDialogContainer';
import SaveIcon from '@mui/icons-material/Save';
import { AddDialogType } from '../../../store/uiStateStore';

type RoomDialogProps = {
  show: boolean;
  initialValues: IRoomForm;
  dialogType: AddDialogType;
  onClose: () => void;
  onSubmit: (registerRoom: IRoomForm) => void;
  handleRoomExists: (someIdentifier: string) => void;  // TODO: Make this some clear reproducable identifier
  handleClearError: () => void; // TODO: Instead of this, remember how errors are handled by the field components
  loading: boolean;
  roomError?: Error;
  roomExists?: boolean;
};

const RoomDialog = ({
  show,
  onClose,
  onSubmit,
  initialValues,
  roomError,
  roomExists,
  dialogType,
  handleRoomExists,
  handleClearError,
  loading,
}: RoomDialogProps) => {
  const roomes = useStyles();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
  });

  const getRoomExistsError = () => {
    switch (dialogType) {
      case 'Create':
        return roomExists !== undefined && roomExists
          ? "Error: Room already exists!"
          : undefined;
      case 'Edit':
        return roomExists !== undefined && !roomExists ? "Error: Invalid values!" : undefined;
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
            <DialogTitle>{`${dialogType} a Room`}</DialogTitle>
            <DialogContent>

                {/* First Name field */}
              <SimpleField
                name="firstName"
                type="text"
                label={"First Name"}
                placeholder={"Enter your First Name here"}
                handleBlur={handleRoomExists}
                required
                autoFocus
              />

            {/* Last Name Field */}
            <SimpleField
                name="lastName"
                type="text"
                label={"Last Name"}
                placeholder={"Enter your Last Name here"}
                handleBlur={handleRoomExists}
                required
                autoFocus
              />

            </DialogContent>
            
            <DialogActions className={roomes.dialogActions}>
              <Button onClick={onClose}>{"Close"}</Button>
              <LoadingButton
                type="submit"
                disabled={!isValid || getRoomExistsError() !== undefined}
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

export default observer(RoomDialog);
