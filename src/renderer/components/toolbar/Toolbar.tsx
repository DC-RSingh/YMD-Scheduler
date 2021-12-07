import { AppBar, Badge, Grid, IconButton, Tooltip } from '@mui/material';
import MuiToolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import React, { useState } from 'react';
import useStyles from './Toolbar.styles';
import ToolbarStepperContainer from '../toolbar-stepper/ToolbarStepperContainer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SupportPanel from '../support-panel/SupportPanel';
import HelpIcon from '@mui/icons-material/Help';
import StaffDialogContainer from '../add-dialog/add-staff/StaffDialogContainer';
import StudentDialogContainer from '../add-dialog/add-student/StudentDialogContainer';
import ClassDialogContainer from '../add-dialog/register-class/ClassDialogContainer';

type ToolbarProps = {
    sideNavOpened: boolean;
    addOverviewOpened: boolean;
    toggleAddOverview: () => void;
    handleNotificationsOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    sideNavOpened, 
    addOverviewOpened, 
    toggleAddOverview,
    handleNotificationsOpen
}: ToolbarProps) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: any) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <>
          <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                  [classes.appBarShift]: sideNavOpened || addOverviewOpened,
                  [classes.fromLeft]: sideNavOpened,
                  [classes.fromRight]: addOverviewOpened,
              })}
          >
              <ToolbarStepperContainer/>
              <MuiToolbar className={clsx(classes.toolbar, { [classes.baseMargin]: !sideNavOpened })}>
                  <Grid
                      container
                      alignItems="center"
                      justifyContent="flex-end"
                      className={classes.toolbarGrid}
                  >
                      {/* Add Button on Toolbar */}
                      <Grid item className={classes.addArea} data-tour-elem="addArea">
                      <Tooltip title="Add Records" placement="bottom">
                          <span>
                          <IconButton
                              onClick={() => toggleAddOverview()}
                              aria-label="add"
                              aria-haspopup="true"
                              className={clsx(classes.iconButton)}
                              size="large"
                          >
                              <AddCircleIcon fontSize="small" />
                          </IconButton>
                          </span>
                      </Tooltip>
                      </Grid>

                      {/* Divider */}
                      <Grid item className={classes.divider} />

                      {/* Area for Notifications and Support Panel */}
                      <Grid item className={classes.miscArea}>

                          {/* Notifications */}
                          <Tooltip title="Notifications" placement="bottom">
                              <span>
                                  <IconButton
                                      data-tour-elem="notificationList"
                                      onClick={handleNotificationsOpen}
                                      aria-label="add"
                                      aria-haspopup="true"
                                      className={clsx(classes.iconButton)}
                                      size="large"
                                  >
                                      <Badge
                                          max={9}
                                          badgeContent={
                                            undefined   // temporary until notifications are setup
                                          }
                                          classes={{badge: classes.badge }}
                                      >
                                          <NotificationsIcon fontSize="small" />
                                      </Badge>
                                  </IconButton>
                              </span>
                          </Tooltip>

                          {/* Support Panel */}
                          <Tooltip title="Support" placement="bottom">
                              <span>
                                  <IconButton
                                    data-tour-elem="supportPanel"
                                    onClick={handleClick}
                                    aria-label="support"
                                    aria-haspopup="true"
                                  >
                                    <HelpIcon className={classes.support} />   
                                  </IconButton>
                              </span>         
                          </Tooltip>
                          <SupportPanel isOpen={isOpen} anchorEl={anchorEl} setIsOpen={setIsOpen} />
                      </Grid>
                  </Grid>
              </MuiToolbar>
          </AppBar>
          {/* Add Dialog Containers for the Add Stuff Here */}
          <StaffDialogContainer />
          <StudentDialogContainer />
          <ClassDialogContainer />
        </>
    )
}

export default observer(Toolbar);
