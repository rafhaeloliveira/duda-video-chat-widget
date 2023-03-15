import React from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { LoginInput } from './Login.styles';

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
        <Grid container direction="column" wrap="nowrap">
            <Grid item xs={12} p={2}>
                <Paper elevation={2} sx={{ padding: '20px' }}>
                    <Grid container direction="column" justifyContent="center" wrap="nowrap" spacing={2} sx={{ height: '100%' }}>
                        <Grid item>
                            <Typography variant="body1" component="p" align='center'>Chat</Typography>
                        </Grid>
                        <Grid item>
                            <TextField label="Nome" sx={LoginInput} fullWidth value={username} onChange={handleUsername}/>
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