import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Divider, Drawer, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent } from 'react';
import useStyles from './AddOverview.styles';

type Handler = (event: MouseEvent<HTMLElement>) => void;

type AddOverviewProps = {
    open: boolean;
    toggleAddOverview: () => void;
    handleAddStudent: Handler;
    handleAddStaff: Handler;
    handleAddRoom: Handler;
    handleAddStaffType: Handler;
    handleAddRoomType: Handler;
    handleAddSkill: Handler;
    handleAddCredential: Handler;
    handleAddRestriction: Handler;
};

const AddOverview: React.FC<AddOverviewProps> = (
{
    open, 
    toggleAddOverview, 
    handleAddRoom, 
    handleAddStaff, 
    handleAddStudent,
    handleAddCredential,
    handleAddRestriction,
    handleAddRoomType,
    handleAddSkill,
    handleAddStaffType
}: AddOverviewProps) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            color="secondary"
            open={open}
            transitionDuration={0.2}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={() => toggleAddOverview()} size="large">
                    {theme.direction !== 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>

            {/* Main Add Section */}
            <Divider/>
            <Box p={2}>
                <Grid container spacing={2}>
                    <>

                    {/* Button for Adding Staff */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddStudent}
                        >
                            <Typography component="h4" fontWeight="bold">
                                Add Student
                            </Typography>
                        </Button>
                    </Grid>

                    {/* Button for Adding Staff */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddStaff}
                        >
                            <Typography component="h4" fontWeight="bold">
                                Add Staff
                            </Typography>
                        </Button>
                    </Grid>

                    {/* Button for Adding Rooms */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddRoom}
                        >
                            <Typography component="h4" fontWeight="bold">
                                Add Room
                            </Typography>
                        </Button>
                    </Grid>
                    </>
                </Grid>
            </Box>

            {/* Add Types */}
            <Divider/>
            <Box p={2}>
                <Grid container spacing={2}>
                    <>

                    {/* Button for Adding Staff Types */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddStaffType}
                        >
                            <Typography component="h4" fontWeight="bold">
                                Add Staff Type
                            </Typography>
                        </Button>
                    </Grid>

                    {/* Button for Adding Room Types */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddRoomType}
                        >
                            <Typography component="h4" fontWeight="bold">
                                Add Room Type
                            </Typography>
                        </Button>
                    </Grid>
                    </>
                </Grid>
            </Box>

            {/* Add Credentials, Skills and Restrictions */}
            <Divider/>
            <Box p={2}>
                <Grid container spacing={2}>
                    <>

                    {/* Button for Adding Skills */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddSkill}
                        >
                            <Typography component="h4" fontWeight="bold">
                                Add Skill
                            </Typography>
                        </Button>
                    </Grid>

                    {/* Button for Adding Credentials */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddCredential}
                        >
                            <Typography component="h4" fontWeight="bold">
                                Add Credential
                            </Typography>
                        </Button>
                    </Grid>

                    {/* Button for Adding Restrictions */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddRestriction}
                        >
                            <Typography component="h4" fontWeight="bold">
                                Add Restriction
                            </Typography>
                        </Button>
                    </Grid>
                    </>
                </Grid>
            </Box>

        </Drawer>
    )
}

/**
 * Drawer opening from the right providing buttons to bring up dialogs that add records to the database. 
 */
export default observer(AddOverview);
