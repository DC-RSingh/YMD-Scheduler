import { Box, Grid, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, default as React, useMemo, useState } from 'react';
import {
  TableInstance,
  useColumnOrder,
  useFilters,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { useStores } from '../../store';
import { primaryLighter, statusColors } from '../../../assets/themes/ymd-theme';
import { useLocalStorage } from '../../../hooks/use-local-storage';
import { defaultColumn } from '../table-wrapper/DefaultColumn';
import TableWrapper from '../table-wrapper/TableWrapper';
import StaffTableFilter from './staff-table-filter/StaffTableFilter';
import StaffTableColumns from './StaffTableColumns';

export const staffTableFilterSpacing = 2;

const useStyles = makeStyles((theme: Theme) => ({
  staffTableFilter: {},
  actionArea: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  placeholder: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
  inlineIcon: {
    color: primaryLighter,
  },
  warning: {
    color: statusColors.warning,
  },
  noStaffPlaceholder: {
    color: theme.palette.primary.light,
  },
  warningIcon: {
    color: statusColors.warning,
    marginLeft: theme.spacing(2),
  },
}));

const StaffTableContainer = () => {
  const { uiStateStore, staffStore } = useStores();
  const classes = useStyles();

  const tableName = 'staff-table';
  const [initialState, setInitialState] = useLocalStorage(`tableState:${tableName}`, {
    pageSize: 25,
  });

  const staff = staffStore.staffTableData;
  const data = useMemo(() => staff, [staff])

  // eslint-disable-next-line @typescript-eslint/ban-types
  const [instance] = useState<TableInstance<object>>(
    useTable(
      {
        columns: StaffTableColumns,
        defaultColumn,
        data: data,
        initialState,
      },
      useColumnOrder,
      useFilters,
      useSortBy,
      useFlexLayout,
      useResizeColumns,
      usePagination,
      (hooks) => {
        hooks.allColumns.push((columns) => [...columns]);
      }
    )
  );

  // FIXME: add useEffect() to clear timeout on dismounting
  let timer: NodeJS.Timeout | undefined = undefined;

  const handleFilter = (
    event?: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    searchText?: string
  ) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(
      () => {
        let text = '';

        if (event) {
          text = event.target.value.toLowerCase();
        }

        if (searchText) {
          text = searchText;
        }

        uiStateStore.setStaffTableFilterText(text);
      },
      event ? 500 : 0
    );
  };

  return (
    <>
      <Box mb={staffTableFilterSpacing} className={classes.staffTableFilter}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item md={7}>
            <Grid container direction="row" spacing={2} alignItems="center">
              <Grid item md={6}>
                <StaffTableFilter
                  handleFilter={handleFilter}
                  clearFilter={() => handleFilter(undefined, '')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <TableWrapper instance={instance} setInitialState={setInitialState} />
    </>
  );
};

export default observer(StaffTableContainer);
