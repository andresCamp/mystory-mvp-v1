'use client'
import React, { useRef, useState } from 'react';
import { openDB } from 'idb';

const VideoRecorder: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  const [recordedChunks, setRecordedChunks] = useState<any[]>([]);
  
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const recorder = new MediaRecorder(stream);
    
    recorder.ondataavailable = (e: any) => {
      setRecordedChunks((prev) => prev.concat(e.data));
    };
    
    recorder.onstop = async () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const db = await openDB('myDatabase', 1);
      const count = await db.count('videos');
      await db.add('videos', blob, count);
      setRecordedChunks([]);
    };
    
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    
    setMediaRecorder(recorder);
    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
    if (videoRef.current && videoRef.current.srcObject) {
      let stream = videoRef.current.srcObject as MediaStream;
      let tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      {recording ? (
        <button onClick={stopRecording}>Stop</button>
      ) : (
        <button onClick={startRecording}>Start</button>
      )}
    </div>
  );
};

export default VideoRecorder;


// import React, { useState } from 'react';
// import { openDB } from 'idb';

// let recorder: MediaRecorder;
// let chunks: any[] = [];

// async function setupWebcam() {
//   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//   const videoElement = document.createElement("video");
//   videoElement.srcObject = stream;
//   videoElement.play();
//   return { stream, videoElement };
// }

// function startRecording(stream: MediaStream) {
//   recorder = new MediaRecorder(stream);
//   recorder.ondataavailable = (e) => chunks.push(e.data);
//   recorder.onstop = saveToIndexedDB;
//   recorder.start();
// }

// function stopRecording() {
//   recorder.stop();
// }

// async function saveToIndexedDB() {
//   const blob = new Blob(chunks, { type: 'video/webm' });
//   const db = await openDB('myDatabase', 1, {
//     upgrade(db) {
//       db.createObjectStore('videos');
//     },
//   });

//   // Fetch existing videos
//   let existingVideos = await db.getAll('videos');

//   // Add new video to existing array
//   existingVideos.push(blob);

//   // Save updated video list
//   await db.put('videos', existingVideos, 'myVideoList');
// }

// const RecordingInterfaceTest: React.FC = () => {
//   const [recording, setRecording] = useState(false);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

//   const toggleRecording = async () => {
//     if (!recording) {
//       const { stream, videoElement } = await setupWebcam();
//       setStream(stream);
//       setVideoElement(videoElement);
//       document.body.appendChild(videoElement);
//       startRecording(stream);
//     } else {
//       stopRecording();
//       if (videoElement) {
//         document.body.removeChild(videoElement);
//       }
//       if (stream) {
//         let tracks = stream.getTracks();
//         tracks.forEach(track => track.stop());
//       }
//     }
//     setRecording(!recording);
//   };

//   return (
//     <button onClick={toggleRecording}>
//       {recording ? 'Stop Recording' : 'Start Recording'}
//     </button>
//   );
// };

// export default RecordingInterfaceTest;





// // 'use client'
// // // 'use client'
// // import React, { useState, useRef, useEffect } from 'react';
// // import { openDB } from 'idb';

// // let recorder: MediaRecorder;
// // let chunks: any[] = [];

// // async function setupWebcam() {
// //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //   return stream;
// // }

// // function startRecording(stream: MediaStream) {
// //   recorder = new MediaRecorder(stream);
// //   recorder.ondataavailable = (e) => chunks.push(e.data);
// //   recorder.onstop = saveToIndexedDB;
// //   recorder.start();
// // }

// // function stopRecording() {
// //   recorder.stop();
// // }

// // async function saveToIndexedDB() {
// //   const blob = new Blob(chunks, { type: 'video/webm' });
// //   const db = await openDB('myDatabase', 1, {
// //     upgrade(db) {
// //       db.createObjectStore('videos');
// //     },
// //   });
// //   await db.put('videos', blob, 'myVideo');
// // }

// // const RecordingInterfaceTest2: React.FC = () => {
// //   const [recording, setRecording] = useState(false);
// //   const videoRef = useRef<HTMLVideoElement>(null);

// //   const toggleRecording = async () => {
// //     if (!recording) {
// //       const stream = await setupWebcam();
// //       if (videoRef.current) {
// //         videoRef.current.srcObject = stream;
// //         videoRef.current.play();
// //       }
// //       startRecording(stream);
// //     } else {
// //       stopRecording();
// //       if (videoRef.current && videoRef.current.srcObject) {
// //         const stream = videoRef.current.srcObject as MediaStream;
// //         const tracks = stream.getTracks();
// //         tracks.forEach(track => track.stop());
// //       }
// //     }
// //     setRecording(!recording);
// //   };

// //   return (
// //     <div className='flex flex-col justify-center items-center '>
// //       <video ref={videoRef} style={{ height: '400px' }}></video>
// //       <button onClick={toggleRecording}>
// //         {recording ? 'Stop Recording' : 'Start Recording'}
// //       </button>
// //     </div>
// //   );
// // };

// // export default RecordingInterfaceTest2;
