import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useLocation } from 'react-router';
import useStyles from './NavigationMenu.styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

type NavigationMenuProps = {
    open: boolean;
    toggleSideNav: () => void;
    handleRedirect: (path: string) => void;
  };

const NavigationMenu: React.FC<NavigationMenuProps> = ({open, toggleSideNav: toggleSideNav, handleRedirect}: NavigationMenuProps) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        // Classname strings made dynamic with clsx, different style depending on drawer open status
        <Drawer
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx(classes.drawerPaper, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
            variant="permanent"
            anchor="left"
            color="secondary"
            open={open}
            transitionDuration={0.2}
        >
            <div className={clsx(classes.drawerHeader, { [classes.drawerHeaderOpen]: open })}>
                {/* Dynamic Chevron changes whether drawer is open or closed */}
                <IconButton onClick={() => toggleSideNav()} size="large">
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>

            {/* Add Divider after the Drawer Open/Close chevron */}
            <Divider/>

            <List>

                {/* Navigate to Schedule Route */}
                <ListItem
                    button
                    key="schedule"
                    selected={location.pathname === '/schedule'}
                    onClick={() => handleRedirect('/schedule')}
                    data-tour-elem="scheduleView"
                >

                    <ListItemIcon>
                        <Tooltip title={"Schedule" || ''} placement="right">
                            <DateRangeIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Schedule" />
                </ListItem>

                {/* Navigate to Student Route */}
                <ListItem
                    button
                    key="student"
                    selected={location.pathname === '/student'}
                    onClick={() => handleRedirect('/student')}
                    data-tour-elem="studentView"
                >

                    <ListItemIcon>
                        <Tooltip title={"Student" || ''} placement="right">
                            <SchoolIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Student" />
                </ListItem>

                {/* Navigate to Staff Route */}
                <ListItem
                    button
                    key="staff"
                    selected={location.pathname === '/staff'}
                    onClick={() => handleRedirect('/staff')}
                    data-tour-elem="staffView"
                >

                    <ListItemIcon>
                        <Tooltip title={"Staff" || ''} placement="right">
                            <BadgeIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Staff" />
                </ListItem>

                {/* Navigate to Room Route */}
                <ListItem
                    button
                    key="room"
                    selected={location.pathname === '/room'}
                    onClick={() => handleRedirect('/room')}
                    data-tour-elem="roomView"
                >

                    <ListItemIcon>
                        <Tooltip title={"Room" || ''} placement="right">
                            <MeetingRoomIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Room" />
                </ListItem>

                {/* Navigate to Settings Route */}
                <ListItem
                    button
                    key="settings"
                    selected={location.pathname === '/settings'}
                    onClick={() => handleRedirect('/settings')}
                    data-tour-elem="settingsView"
                >
                    <Typography className={classes.new}>WIP</Typography>
                    <ListItemIcon>
                        <Tooltip title={"Settings" || ''} placement="right">
                            <SettingsIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>

                {/* Navigate to Logout Route */}
                <ListItem
                    button
                    key="logout"
                    selected={location.pathname === '/logout'}
                    onClick={() => handleRedirect('/logout')}
                    data-tour-elem="logoutView"
                >

                    <ListItemIcon>
                        <Tooltip title={"Logout" || ''} placement="right">
                            <ExitToAppIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>

            </List>
        </Drawer>
    )
}

/** Menu Sidebar with Navigation Buttons */
export default observer(NavigationMenu);
