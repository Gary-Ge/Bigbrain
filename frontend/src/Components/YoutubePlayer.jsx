import React from 'react';
import { Card } from '@mui/material';

function YoutubePlayer ({ videoId, width = '100%', height = '100%' }) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Card sx={{ width, height }}>
      <iframe
        title="YouTube Player"
        src={videoUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Card>
  );
}

export default YoutubePlayer
