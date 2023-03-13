import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MessageContainer = styled(Grid)(({ theme }) => ({
    height: '100%',
    overflow: 'auto',

    [theme.breakpoints.down('md')]: {
        // minHeight: '300px'
    }
}))
