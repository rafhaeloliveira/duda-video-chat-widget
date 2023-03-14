import React, { useState } from 'react';
import './App.css';

import Grid from '@mui/material/Grid';
import VideoJs from './components/videojs';
import Chat, { LoginProps } from './components/chat';
import { createTheme, ThemeProvider } from '@mui/material';
import Login from './components/Login';

declare global {
  interface Window {
    duda_data: {
      config: {
        text1: string
      }
    }
  }
}

// const dados = window.duda_data || {};

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = () => {
  const [login, setLogin] = useState<LoginProps>({ username: '' });

  const handleLogin = (username: string) => {
    setLogin({ username })
  }

  const videoElement = document.getElementById("vjs_video_3");

  return (
    <ThemeProvider theme={darkTheme}>
        <Grid container sx={{ backgroundColor: "#181818", overflow: "hidden" }}>
          <Grid item md={8} sm={12} xs={12}>
            <VideoJs options={{
              sources: [{
                src: 'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8',
              }]      
            }} />
          </Grid>
          <Grid item md={4} sm={12} xs={12} sx={{ maxHeight: videoElement?.clientHeight }}>
            {Boolean(login.username) ?        
              <Chat username={login.username} />
              : <Login onLogin={handleLogin} />
            }
          </Grid>
        </Grid>
    </ThemeProvider>
)}

export default App;
