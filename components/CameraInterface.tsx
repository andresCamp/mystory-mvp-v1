'use client';
import React, { useRef, useState } from 'react';

const CameraInterface = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Oops, camera not accessible:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };


//   const stopCamera = () => {
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach(track => track.stop());
//       if (videoRef.current) {
//         videoRef.current.srcObject = null;
//       }
//     }
//   };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1>MyStory</h1>
      <div className='h-1/2'>
        <video ref={videoRef} autoPlay={true} className="scale-x-[-1] h-full" />
      </div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
    </div>
  );
};

export default CameraInterface;
