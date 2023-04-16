import React from 'react';
import { Card } from '@mui/material';

function YoutubePlayer ({ videoId }) {
  return (
    <Card sx={{
      maxWidth: 600,
      minWidth: 240
    }}>
      <iframe
        title="YouTube Player"
        src={`https://www.youtube.com/embed/${videoId}`}
        width="100%"
        height="100%"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Card>
  );
}

export default YoutubePlayer
