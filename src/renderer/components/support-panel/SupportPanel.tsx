import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper, { PopperProps } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HistoryIcon from '@mui/icons-material/History';
import { observer } from 'mobx-react-lite';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStores } from '../../store';
import useStyles from './SupportPanel.styles';

type SupportPanelProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} & Pick<PopperProps, 'anchorEl'>;

const SupportPanel = ({ isOpen = false, setIsOpen, anchorEl = null }: SupportPanelProps) => {
  const { uiStateStore } = useStores();

  const [isCreditsOpen, setIsCreditsOpen] = useState(false);    // For Credit Dialog when added
  const classes = useStyles();
  const { pathname } = useLocation();
  const isLoginRoute = pathname === '/login';
  const closeSupportPanel = useCallback(() => setIsOpen(false), [setIsOpen, isOpen]);

  const handleRetakeTourClick = () => {
    uiStateStore.setToolbarTourOpen(true);
    closeSupportPanel();
  };

  const handleCreditsClick = () => {
    setIsCreditsOpen((isCreditsOpen) => !isCreditsOpen);
    closeSupportPanel();
  };

  return (
    <>
      <Popper
        open={isOpen}
        anchorEl={anchorEl}
        placement="bottom-end"
        className={classes.popper}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper} elevation={8}>
              <ul className={classes.list}>
                {!isLoginRoute && (
                  <li className={classes.option} onClick={handleRetakeTourClick}>
                    <Typography variant="body2">{"Retake Tour"}</Typography>
                    <HistoryIcon className={classes.icon} />
                  </li>
                )}
                <div className={classes.separator} />
                <li className={classes.option} onClick={handleCreditsClick}>
                  <Typography variant="body2">{"Credits"}</Typography>
                  <CardGiftcardIcon className={classes.icon} />
                </li>
              </ul>
            </Paper>
          </Fade>
        )}
      </Popper>
      {/* Add Credit Dialog Here */}
    </>
  );
};

export default observer(SupportPanel);
