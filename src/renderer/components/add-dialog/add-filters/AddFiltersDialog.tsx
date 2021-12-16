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
import useStyles from './AddFiltersDialog.styles';
import { IAddFiltersForm } from './AddFiltersDialogContainer';
import SaveIcon from '@mui/icons-material/Save';
import { AddFiltersDialogType } from '../../../store/uiStateStore';

type AddFiltersDialogProps = {
  show: boolean;
  initialValues: IAddFiltersForm;
  dialogType: AddFiltersDialogType;
  onClose: () => void;
  onSubmit: (registerAddFilters: IAddFiltersForm) => void;
  handleAddFiltersExists: (someIdentifier: string) => void;  // TODO: Make this some clear reproducable identifier
  handleClearError: () => void; // TODO: Instead of this, remember how errors are handled by the field components
  loading: boolean;
  addFiltersError?: Error;
  addFiltersExists?: boolean;
};

const AddFiltersDialog = ({
  show,
  onClose,
  onSubmit,
  initialValues,
  addFiltersError,
  addFiltersExists,
  dialogType,
  handleAddFiltersExists,
  handleClearError,
  loading,
}: AddFiltersDialogProps) => {
  const addFilterses = useStyles();

  let validationSchema;

  switch (dialogType) {
      case 'Credential':
        validationSchema = Yup.object().shape({
            Credential: Yup.string().required('Credential is required'),
          });
          break;
      case 'Skill':
        validationSchema = Yup.object().shape({
            Skill: Yup.string().required('Skill is required'),
          });
          break;
      case 'Restriction':
        validationSchema = Yup.object().shape({
            Restriction: Yup.string().required('Restriction is required'),
          });
          break;
      default:
        validationSchema = Yup.object().shape({
        });
  }

  const getAddFiltersExistsError = () => {
    // switch (dialogType) {
    //   case 'Staff':
    //     return addFiltersExists !== undefined && addFiltersExists
    //       ? "Error: AddFilters already exists!"
    //       : undefined;
    //   case 'Room':
    //     return addFiltersExists !== undefined && !addFiltersExists ? "Error: Invalid values!" : undefined;
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
            <DialogTitle>{`Create a ${dialogType}`}</DialogTitle>
            <DialogContent>

                {/* The filter field */}
                <SimpleField
                    name={`${dialogType}`}
                    type="text"
                    label={`${dialogType}`}
                    placeholder={`Enter the ${dialogType} Name here`}
                    handleBlur={handleAddFiltersExists}
                    required
                    autoFocus
                />

                </DialogContent>
                
                <DialogActions className={addFilterses.dialogActions}>
                <Button onClick={onClose}>{"Close"}</Button>
                <LoadingButton
                    type="submit"
                    disabled={!isValid || getAddFiltersExistsError() !== undefined}
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

export default observer(AddFiltersDialog);
