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
import CheckboxField from '../../checkbox-field/CheckboxField';
import { IType } from '../../../../interfaces/type.interface';
import { ISelectOption } from '../../../../interfaces/select-option.interface';

type RoomDialogProps = {
  show: boolean;
  initialValues: IRoomForm;
  dialogType: AddDialogType;
  onClose: () => void;
  onSubmit: (registerRoom: IRoomForm) => void;
  handleRoomExists: (someIdentifier: string) => void;  // TODO: Make this some clear reproducable identifier
  handleClearError: () => void; // TODO: Instead of this, remember how errors are handled by the field components
  loading: boolean;
  roomTypes: IType[];
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
  roomTypes,
  handleRoomExists,
  handleClearError,
  loading,
}: RoomDialogProps) => {
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    Type: Yup.number().required('Type is required'),
    RoomSize: Yup.number().required('Room Size is required').positive(),
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

                {/* Room Name field */}
                <SimpleField
                    name="Name"
                    type="text"
                    label={"Room Name"}
                    placeholder={"Enter the Room Name here"}
                    handleBlur={handleRoomExists}
                    required
                    autoFocus
                />

                {/* Room Size Field */}
                <SimpleField
                    name="RoomSize"
                    type="number"
                    label={"Room Size"}
                    placeholder={"Enter the Room Size here"}
                    handleBlur={handleRoomExists}
                    required
                />

                {/* Room Type Field */}
                {/* To be replaced with special dropdown component */}
                <SelectField
                    name="Type"
                    label="Room Type"
                    options={roomTypes?.map((r) => {
                        return {
                            id: r.Id.toString(),
                            value: r.Id,
                            label: r.Type,
                        } as ISelectOption
                    })}
                />

                {/* Has Piano Field */}
                <CheckboxField 
                    name="hasPiano"
                    label="Has Piano?"
                />

                </DialogContent>
                
                <DialogActions className={classes.dialogActions}>
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
