import React, { useState, useRef, useEffect } from 'react';

function VideoPlayer() {
  const [startTime, setStartTime] = useState(0); // Start time in seconds
  const [videoUrl, setVideoUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');
  const videoRef = useRef(null);

  // Set the video to start time whenever it changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime]);

  const handleStartTimeChange = (e) => {
    const newStartTime = parseFloat(e.target.value);
    setStartTime(newStartTime);
  };

  const handleJumpToTime = (seconds) => {
    setStartTime(seconds);
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Video Player with Start Time Control</h2>
      
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        width="100%"
        style={{ borderRadius: '8px', marginBottom: '20px' }}
      />

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Start Time (seconds):
          <input
            type="number"
            value={startTime}
            onChange={handleStartTimeChange}
            min="0"
            step="0.1"
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>

        <div style={{ marginTop: '10px' }}>
          <button onClick={handlePlay} style={{ marginRight: '10px', padding: '8px 16px' }}>
            Play
          </button>
          <button onClick={handlePause} style={{ marginRight: '10px', padding: '8px 16px' }}>
            Pause
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>Quick Jump:</p>
        <button onClick={() => handleJumpToTime(0)} style={{ marginRight: '10px', padding: '8px 16px' }}>
          0s
        </button>
        <button onClick={() => handleJumpToTime(5)} style={{ marginRight: '10px', padding: '8px 16px' }}>
          5s
        </button>
        <button onClick={() => handleJumpToTime(10)} style={{ marginRight: '10px', padding: '8px 16px' }}>
          10s
        </button>
        <button onClick={() => handleJumpToTime(15)} style={{ marginRight: '10px', padding: '8px 16px' }}>
          15s
        </button>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Video URL:
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '400px' }}
          />
        </label>
      </div>
    </div>
  );
}

export default VideoPlayer;