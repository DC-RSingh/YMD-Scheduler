import React from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type VisibilityIconProps = {
  visible: boolean;
  position: 'start' | 'end';
  handleClickShowIcon: () => void;
  handleMouseDownIcon: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const VisibilityIcon: React.FC<VisibilityIconProps> = ({
  visible,
  position,
  handleClickShowIcon,
  handleMouseDownIcon,
}: VisibilityIconProps) => {

  return (
    <InputAdornment position={position}>
      <IconButton
        title="Show Hide"
        onClick={handleClickShowIcon}
        onMouseDown={handleMouseDownIcon}
        edge="start"
        size="small"
      >
        {visible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

export default VisibilityIcon;
