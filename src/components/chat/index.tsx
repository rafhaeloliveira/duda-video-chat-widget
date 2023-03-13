import React, { useEffect, useState } from 'react';
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material';
import { default as LogoutIcon } from '@mui/icons-material/Logout';
import { default as SendIcon } from '@mui/icons-material/Send';
import { MessageContainer } from './Chat.styles';

import { ChatRoom, SendMessageRequest } from 'amazon-ivs-chat-messaging';
import { CHAT_REGION } from '../../config';
import { tokenProvider } from './utils';
import HandleMessages from './handleMessages';

export interface LoginProps {
    username: string
}

const Chat = ({ username }: LoginProps) => {
    const [chatRoom, setChatRoom] = useState<ChatRoom>();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const room = new ChatRoom({
            regionOrUrl: CHAT_REGION,
            tokenProvider: () => tokenProvider(username)
        })

        setChatRoom(room);

        room.connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sendMessage = async () => {
        if(!!message) {
            const content = `${message.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}`;
            const request = new SendMessageRequest(content);

            try {
                await chatRoom?.sendMessage(request);
              } catch (error) {
                console.log('Error:', error);
              }

            setMessage('');
        }
    }

    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    useEffect(() => {
        console.log("chatRoom ==>", chatRoom)
    }, [chatRoom])

    return (
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
                            {HandleMessages({ chatRoom })}
                        </MessageContainer>
                        <Grid item xs={2} p={1}>
                            <FormControl variant='outlined' fullWidth onSubmit={sendMessage}>
                                <OutlinedInput
                                    disabled={Boolean(chatRoom?.state !== 'connected')}
                                    id="input-message"
                                    fullWidth
                                    label="Mensagem"
                                    value={message}
                                    onChange={handleMessage}
                                    onKeyDown={handleKeyDown}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton onClick={sendMessage} disabled={Boolean(chatRoom?.state !== 'connected')}>
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <InputLabel htmlFor="input-message">{Boolean(chatRoom?.state !== 'connected') ? 'Conectando...' : 'Menssagem'}</InputLabel>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Chat;
