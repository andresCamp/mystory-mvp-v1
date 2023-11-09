'use client'
import { useState, useEffect, useRef } from 'react';
import { db, Video } from './db'; // Adjust the path as necessary

// Custom hook for handling video recording and database operations
function useVideoRecorder(currentQuestion: string) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoList, setVideoList] = useState<Video[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    fetchAllVideos();
  }, []);

  const fetchAllVideos = async () => {
    const allVideos = await db.videos.toArray();
    setVideoList(allVideos);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      let chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        await db.videos.add({ question: currentQuestion, blob }); // Replace with actual question or logic to get it
        fetchAllVideos();
        chunks = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const deleteVideo = async (id: number) => {
    await db.videos.delete(id);
    fetchAllVideos();
  };

  return {
    isRecording,
    videoList,
    startRecording,
    stopRecording,
    deleteVideo
  };
}

export default useVideoRecorder;
