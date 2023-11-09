'use client'
import React, { useState } from 'react';
import { openDB } from 'idb';

let recorder: MediaRecorder;
let chunks: any[] = [];

async function setupWebcam() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const videoElement = document.createElement("video");
  videoElement.srcObject = stream;
  videoElement.play();
  return { stream, videoElement };
}

function startRecording(stream: MediaStream) {
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = saveToIndexedDB;
  recorder.start();
}

function stopRecording() {
  recorder.stop();
}

async function saveToIndexedDB() {
  const blob = new Blob(chunks, { type: 'video/webm' });
  const db = await openDB('myDatabase', 1, {
    upgrade(db) {
      db.createObjectStore('videos');
    },
  });
  await db.put('videos', blob, 'myVideo');
}

const RecordingInterfaceTest: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  const toggleRecording = async () => {
    if (!recording) {
      const { stream, videoElement } = await setupWebcam();
      setStream(stream);
      setVideoElement(videoElement);
      document.body.appendChild(videoElement);
      startRecording(stream);
    } else {
      stopRecording();
      if (videoElement) {
        document.body.removeChild(videoElement);
      }
      if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
    setRecording(!recording);
  };

  return (
    <button onClick={toggleRecording}>
      {recording ? 'Stop Recording' : 'Start Recording'}
    </button>
  );
};

export default RecordingInterfaceTest;











{/* <div className='flex flex-col justify-center items-center h-screen'> */}
