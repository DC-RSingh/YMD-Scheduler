import React from 'react';
import { ColumnInstance } from 'react-table';
import clsx from 'clsx';

import { useStyles } from './ResizeHandle.styles';

// eslint-disable-next-line @typescript-eslint/ban-types
export const ResizeHandle = <T extends {}>({ column }: { column: ColumnInstance<T> }): JSX.Element => {
  const classes = useStyles();
  return (
    <div
      {...column.getResizerProps()}
      style={{ cursor: 'col-resize' }} // override the useResizeColumns default
      className={clsx({
        [classes.resizeHandle]: true,
        handleActive: column.isResizing,
      })}
    />
  );
};
