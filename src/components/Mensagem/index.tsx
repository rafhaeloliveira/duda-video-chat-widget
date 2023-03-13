import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Text, Username } from './Menssagem';

interface Props {
    menssagem: {
        id: string | number,
        message: string,
        username: string
    }
}

const Menssagem = ({ menssagem }: Props) => {
    return (
        <Grid container direction="column" p={1} sx={{}}>
            <Grid item>
                <Typography sx={Username} variant="body1" component="p">
                    {menssagem.username}
                </Typography>
            </Grid>

            <Grid item>
                <Typography sx={Text} variant="body1" component="p">
                    {menssagem.message}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Menssagem;