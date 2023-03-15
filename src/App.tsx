import React, { useState } from 'react';
import './App.css';

import Grid from '@mui/material/Grid';
import VideoJs from './components/videojs';
import Chat, { LoginProps } from './components/chat';
import { Box, createTheme, Hidden, IconButton, ThemeProvider } from '@mui/material';
import Login from './components/Login';
import {default as ChatIcon} from '@mui/icons-material/Chat';
import { default as ClosedChatIcon } from '@mui/icons-material/SpeakerNotesOff';
import { API_URL, CHAT_ROOM_ID, PLAYBACK_URL } from './config';

declare global {
  interface Window {
    duda_data: {
      config: {
        url_video: string
        chat_api_url: string
        chat_room_id: string
      }
    }
  }
}

const dados = window.duda_data || {
  config: {
    url_video: PLAYBACK_URL,
    chat_api_url: API_URL,
    chat_room_id: CHAT_ROOM_ID
  }
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = () => {
  const { url_video } = dados.config || {};

  const [login, setLogin] = useState<LoginProps>({ username: '' });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogin = (username: string) => {
    setLogin({ username })
  }

  const handleLogout = () => {
    setLogin({ username: '' })
  }

  const videoElement = document.getElementById("vjs_video_3");

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    setLogin({ username: '' })
  }

  if (!url_video) {
    return (<div>Sem vídeo!</div>)
  }

  return (
    <ThemeProvider theme={darkTheme}>
        <Grid container justifyContent="center" sx={{ maxHeight: '700px', backgroundColor: "#181818", overflow: "hidden" }}>
          <Grid item md={isCollapsed ? 11.5 : 8} sm={12} xs={12}>
            <VideoJs options={{
              sources: [{
                src: url_video,
              }]      
            }} />
          </Grid>
          <Grid
            item md={isCollapsed ? 0.5 : 4}
            sm={12}
            xs={12}
            sx={{ 
              maxHeight: videoElement?.clientHeight, 
              transition: 'all 1s'
            }}            
          >
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <Hidden mdDown> 
                <IconButton
                  sx={{ borderRadius: '0' }}
                  onClick={handleCollapse}          
                >
                  {isCollapsed ? 
                    <ChatIcon />
                  : <ClosedChatIcon />}
                </IconButton>
              </Hidden>

              {isCollapsed ? <></> : 
                Boolean(login.username) ?        
                  <Chat username={login.username} onLogout={handleLogout} />
                  : <Login onLogin={handleLogin} />                
              }

            </Box>
          </Grid>
        </Grid>
    </ThemeProvider>
)}

export default App;
