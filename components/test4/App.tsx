// App.tsx
'use client'
import { useState, useRef } from 'react';
import { saveVideo } from './indexedDB';

const questions = ['What is your name?', 'How old are you?'];

export const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  let mediaRecorder: any; // You should find a type for this
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };
      videoRef.current!.srcObject = stream;
      mediaRecorder.start();
    });
  };

  const stopRecording = async () => {
    mediaRecorder.stop();
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    await saveVideo(questions[currentQuestionIndex], blob);
    setRecordedChunks([]);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto">
      <h1>{questions[currentQuestionIndex]}</h1>
      <video ref={videoRef} autoPlay className="transform scale-x--1"></video>
      <button onClick={startRecording}>Record</button>
      <button onClick={stopRecording}>Stop</button>
      <button onClick={nextQuestion}>Next</button>
    </div>
  );
};
