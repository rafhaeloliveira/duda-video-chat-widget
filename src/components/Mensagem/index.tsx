import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Message } from '../chat/handleMessages';
import { Text, Username } from './Menssagem';

interface Props {
    menssagem: Message
}

const Menssagem = ({ menssagem }: Props) => {
    const userColor = `#${menssagem.userId.slice(-6) || 'FFFFFF'}`;

    return (
        <Grid container direction="column" p={1} sx={{}} key={menssagem.id}>
            <Grid item>
                <Typography sx={{...Username, color: userColor}} variant="body1" component="p">
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