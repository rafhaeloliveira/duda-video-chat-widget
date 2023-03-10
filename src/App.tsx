import React from 'react';
import './App.css';

import Grid from '@mui/material/Grid';
import VideoJs from './components/videojs';
import Chat from './components/chat';

declare global {
  interface Window {
    duda_data: {
      config: {
        text1: string
      }
    }
  }
}

const dados = window.duda_data || {};

const App = () => {
  const { text1 } = dados?.config || {};

  return (
  <Grid container>
    {text1 && 
      <Grid item md={12}>
        <h1>{text1}</h1>
      </Grid>
    }
    <Grid item md={8} sx={{ backgroundColor: 'red'}}>
      <VideoJs options={{
        sources: [{
          src: 'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8',
          techOrder: ["AmazonIVS"]
        }]
      }} />
    </Grid>
    <Grid item md={4} sx={{ backgroundColor: 'green' }}>
      <Chat />
    </Grid>
  </Grid>
)}

export default App;
