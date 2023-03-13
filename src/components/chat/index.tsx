import React from 'react';
import { Button, FormControl, Grid, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material';
import { default as LogoutIcon } from '@mui/icons-material/Logout';
import { default as SendIcon } from '@mui/icons-material/Send';
import Menssagem from '../Mensagem';
import { MessageContainer } from './Chat.styles';

const Chat = () => (
    <Grid container direction="column" wrap="nowrap" sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }}>
        <Grid item md={1} xs={1}>
            <Paper elevation={2} sx={{ borderRadius: 0, padding: '10px' }}>
                <Grid container alignItems="center"justifyContent="space-between" >
                    <Grid item>
                        <Typography variant='body1'>Chat</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' sx={{ marginLeft: 'auto'}} endIcon={<LogoutIcon />}>Sair</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>

        <Grid item md={11} xs={11} p={1} sx={{ maxHeight: '58%' }}>
            <Paper elevation={2} sx={{ height: '100%' }}>
                <Grid container direction="column" wrap='nowrap' sx={{ height: '100%' }}>
                    <MessageContainer item xs={10} sx={{ height: '100%' }}>
                        <Menssagem menssagem={{ id: 1, username: 'Rafhael', message: 'Teste 123'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                        <Menssagem menssagem={{ id: 1, username: 'Rafha', message: 'Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo Vende-se uno seminovo'}}/>
                    </MessageContainer>
                    <Grid item xs={2} p={1}>
                        <FormControl variant='outlined' fullWidth>
                            <OutlinedInput
                                id="input-message"
                                endAdornment={<SendIcon />}
                                fullWidth
                                label="Mensagem"
                            />
                            <InputLabel htmlFor="input-message">Menssagem</InputLabel>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
)

export default Chat;
