// 'use client'

// // VideoRecorder.tsx

// import { useState } from 'react';

// interface VideoRecorderProps {
//   question: string;
//   onVideoRecorded: (videoBlob: Blob, question: string) => void; 
// }

// export const VideoRecorder = ({ question, onVideoRecorded }: VideoRecorderProps) => {

//   const [recording, setRecording] = useState<MediaStream|null>(null);

//   const startRecording = () => {
//     const stream = navigator.mediaDevices.getUserMedia({ video: true }); 
//     setRecording(stream);
//   }

//   const stopRecording = () => {
//     if (recording) {
//       const tracks = recording.getTracks();
//       tracks.forEach(track => track.stop());
//       setRecording(null);

//       const videoBlob = new Blob(chunks, { type: 'video/webm' });
//       onVideoRecorded(videoBlob, question); 
//     }
//   }

//   return (
//     <div>
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={stopRecording}>Stop Recording</button>
//     </div>
//   );

// }

