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
    handleAddClass: Handler;
};

const AddOverview: React.FC<AddOverviewProps> = (
{open, toggleAddOverview, handleAddClass, handleAddStaff, handleAddStudent}: AddOverviewProps) => {
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
            <Divider/>
            <Box p={2}>
                <Grid container spacing={2}>
                    <>
                    {/* Button for Adding Classes */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddClass}
                        >
                            <Typography component="h4" fontWeight="bold">
                                Register Class
                            </Typography>
                        </Button>
                    </Grid>

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
                    </>
                </Grid>
            </Box>

        </Drawer>
    )
}

export default observer(AddOverview);
