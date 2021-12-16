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
import useStyles from './AddTypesDialog.styles';
import { IAddTypesForm } from './AddTypesDialogContainer';
import SaveIcon from '@mui/icons-material/Save';
import { AddTypesDialogType } from '../../../store/uiStateStore';

type AddTypesDialogProps = {
  show: boolean;
  initialValues: IAddTypesForm;
  dialogType: AddTypesDialogType;
  onClose: () => void;
  onSubmit: (registerAddTypes: IAddTypesForm) => void;
  handleAddTypesExists: (someIdentifier: string) => void;  // TODO: Make this some clear reproducable identifier
  handleClearError: () => void; // TODO: Instead of this, remember how errors are handled by the field components
  loading: boolean;
  addTypesError?: Error;
  addTypesExists?: boolean;
};

const AddTypesDialog = ({
  show,
  onClose,
  onSubmit,
  initialValues,
  addTypesError,
  addTypesExists,
  dialogType,
  handleAddTypesExists,
  handleClearError,
  loading,
}: AddTypesDialogProps) => {
  const addTypeses = useStyles();

  const validationSchema = Yup.object().shape({
    Type: Yup.string().required('Type is required'),
  });

  const getAddTypesExistsError = () => {
    // switch (dialogType) {
    //   case 'Staff':
    //     return addTypesExists !== undefined && addTypesExists
    //       ? "Error: AddTypes already exists!"
    //       : undefined;
    //   case 'Room':
    //     return addTypesExists !== undefined && !addTypesExists ? "Error: Invalid values!" : undefined;
    //   default:
    //     return undefined;
    // }
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
            <DialogTitle>{`Create a ${dialogType} Type`}</DialogTitle>
            <DialogContent>

                {/* Type field */}
                <SimpleField
                    name="Type"
                    type="text"
                    label={`${dialogType} Type`}
                    placeholder={`Enter the ${dialogType} Type Name here`}
                    handleBlur={handleAddTypesExists}
                    required
                    autoFocus
                />

                </DialogContent>
                
                <DialogActions className={addTypeses.dialogActions}>
                <Button onClick={onClose}>{"Close"}</Button>
                <LoadingButton
                    type="submit"
                    disabled={!isValid || getAddTypesExistsError() !== undefined}
                    color="primary"
                    variant="contained"
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<SaveIcon />}
                >
                    Create
                </LoadingButton>
                </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default observer(AddTypesDialog);
