'use client'
import { db, Video } from '../StoryCaptureInterface/db';
import React, { useState, useRef, useEffect } from 'react';

const VideoTest: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [videoID, setVideoID] = useState<number | null>(null);
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const [videoList, setVideoList] = useState<Video[]>([]);

    const fetchAllVideos = async () => {
        const allVideos = await db.videos.toArray(); // This will retrieve all videos as an array
        setVideoList(allVideos);
      };

      useEffect(() => {
        fetchAllVideos();
      }, []);
      
        // Delete a video from IndexedDB
      const deleteVideo = async (id: number) => {
        await db.videos.delete(id);
        fetchAllVideos(); // Refresh the video list after deletion
      };
      
      
  
    // Cleanup function to release media stream when component unmounts
    useEffect(() => {
      return () => {
        mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
        if (videoURL) {
          URL.revokeObjectURL(videoURL);
        }
      };
    }, [videoURL]);
  
    // Start recording
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        let chunks: BlobPart[] = [];
  
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
  
        mediaRecorder.onstop = async () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const video: Video = {
              question: 'Your question here', // Replace with the actual question or logic to get it
              blob: blob
            };
            // Add the video to the IndexedDB and Dexie will automatically assign an ID.
            await db.videos.add(video);
            const videoURL = URL.createObjectURL(blob);
            setVideoURL(videoURL);
            // Clear the chunks array for the next recording
            chunks = [];
            await fetchAllVideos();
          };
  
        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };
  
    // Stop recording
    const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    };
  
    // Playback the recorded video from IndexedDB
    const playBackFromDB = async () => {
        if (videoURL) {
            const videoElement = document.createElement('video');
            videoElement.src = videoURL;
            videoElement.controls = true;
            videoElement.autoplay = true;
        
            // Append it to the body or a particular div you wish to show in
            document.body.appendChild(videoElement);
          }
    };

  return (
    
    <div className='flex flex-col gap-4 h-screen'>
        <div className='flex flex-row gap-4'>
        <button className='bg-green-400 rounded-lg p-2 hover:brightness-150 hover:scale-105' onClick={startRecording} disabled={isRecording}>Start Recording</button>
        <button className='bg-red-400 rounded-lg p-2 hover:brightness-150 hover:scale-105 ' onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
        {/* <button className='bg-blue-400 rounded-lg p-2 hover:brightness-150 hover:scale-105 ' onClick={playBackFromDB} disabled={!videoID}>Play Recorded Video</button> */}
        </div>

        <div className=''>
            {videoList.map((video, index) => (
                <div key={index}>
                    <p>Question: {video.question}</p>
                    <video src={URL.createObjectURL(video.blob)} controls/>
                    <button className='bg-blue-400 rounded-lg p-2 hover:brightness-150 hover:scale-105 ' onClick={() => video.id !== undefined && deleteVideo(video.id)}>Delete Video</button>

                </div>
            ))}
        </div>

    </div>

  );
};

export default VideoTest;
