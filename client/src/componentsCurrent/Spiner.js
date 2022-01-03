import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#b9b2b36b',
        height: '100vh',
        zIndex: 2,
    },
    stack: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-16px, 0)',
    }
}))



export const Spiner = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Stack sx={{ color: 'grey.500' }} className={classes.stack} spacing={2} direction="row">
                <CircularProgress color="success" />
            </Stack>
        </div>
    );
}