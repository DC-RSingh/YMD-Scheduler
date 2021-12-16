import { Box, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react';
import * as Yup from 'yup';
import { useStores } from '../../../store';
import useStyles from './StaffTableFilter.styles';

export type TableFilterProps = {
  handleFilter: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  clearFilter: () => void;
};

const StaffTableFilter = ({ handleFilter, clearFilter }: TableFilterProps) => {
  const { uiStateStore } = useStores();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      searchText: uiStateStore.staffTableFilterText,
    },

    onSubmit: (): void => {
      /* do nothing */
    },

    validationSchema: Yup.object().shape({
      searchText: Yup.string().max(100),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        margin="dense"
        variant="outlined"
        size="small"
        onChange={(e) => {
          formik.handleChange(e);
          handleFilter(e);
        }}
        name="searchText"
        placeholder={"Search staff..."}
        className={classes.searchField}
        value={formik.values.searchText}
        InputProps={{
          classes: {
            input: classes.inputField,
          },
          startAdornment: (
            <Box mr={1} display="flex" justifyContent="center" alignItems="center">
              <SearchIcon />
            </Box>
          ),
          endAdornment: (
            <>
              {formik.values.searchText !== '' && (
                <IconButton
                  aria-label="help"
                  title={"Clear search field"}
                  className={classes.clearIcon}
                  edge="start"
                  size="small"
                  onClick={() => {
                    formik.setFieldValue('searchText', '');
                    clearFilter();
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </>
          ),
        }}
      />
    </form>
  );
};

export default observer(StaffTableFilter);
