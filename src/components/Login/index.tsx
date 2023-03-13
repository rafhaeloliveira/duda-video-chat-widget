import React from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';

interface Props {
    onLogin: (username: string) => void;
}

const Login = ({ onLogin }: Props) => {
    const [username, setUsername] = React.useState<string>('');

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleLogin = () => {
        onLogin(username);
    }

    return (
        <Grid container direction="column" wrap="nowrap" sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%' }}>
            <Grid item xs={12} p={2}>
                <Paper elevation={2} sx={{ height: '66%', padding: '20px' }}>
                    <Grid container direction="column" justifyContent="center" spacing={2} sx={{ height: '100%' }}>
                        <Grid item>
                            <Typography variant="body1" component="p" align='center'>Chat</Typography>
                        </Grid>
                        <Grid item>
                            <TextField label="Nome" fullWidth value={username} onChange={handleUsername}/>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' onClick={handleLogin} fullWidth>Entrar</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login;