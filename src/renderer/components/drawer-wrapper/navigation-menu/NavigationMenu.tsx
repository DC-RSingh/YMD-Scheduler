import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
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
import ClassIcon from '@mui/icons-material/Class';

type NavigationMenuProps = {
    open: boolean;
    toggleSidenav: () => void;
    handleRedirect: (path: string) => void;
  };

const NavigationMenu: React.FC<NavigationMenuProps> = ({open, toggleSidenav, handleRedirect}) => {
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
                <IconButton onClick={() => toggleSidenav()} size="large">
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
                    // data-tour-elem="scheduleView"
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
                >

                    <ListItemIcon>
                        <Tooltip title={"Staff" || ''} placement="right">
                            <BadgeIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Staff" />
                </ListItem>

                {/* Navigate to Register-Class Route */}
                <ListItem
                    button
                    key="register-class"
                    selected={location.pathname === '/register-class'}
                    onClick={() => handleRedirect('/register-class')}
                >

                    <ListItemIcon>
                        <Tooltip title={"Register Class" || ''} placement="right">
                            <ClassIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Register Class" />
                </ListItem>

                {/* Navigate to Logout Route */}
                <ListItem
                    button
                    key="logout"
                    selected={location.pathname === '/logout'}
                    onClick={() => handleRedirect('/logout')}
                >

                    <ListItemIcon>
                        <Tooltip title={"Logout" || ''} placement="right">
                            <ClassIcon/>
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
