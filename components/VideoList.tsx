'use client'
import React, { useEffect, useState } from 'react';
import { openDB } from 'idb';

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Blob[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = await openDB('myDatabase', 1);
      const videoKeys = await db.getAllKeys('videos');
      const videoData: Blob[] = [];

      for (let key of videoKeys) {
        const video = await db.get('videos', key);
        videoData.push(video);
      }
      setVideos(videoData);
    };
    fetchData();
  }, []);

  const playVideo = (videoBlob: Blob) => {
    const videoElement = document.createElement('video');
    const url = URL.createObjectURL(videoBlob);
    videoElement.src = url;
    videoElement.controls = true;
    videoElement.play();
    document.body.appendChild(videoElement);
  };

  const deleteVideo = async (index: number) => {
    const db = await openDB('myDatabase', 1);
    await db.delete('videos', index);
    setVideos(videos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Recorded Videos:</h2>
      <ul className='flex flex-col gap-8'>
        {videos.map((video, index) => (
          <li key={index} className='flex flex-row gap-3 items-center p-1 ring-8 rounded-md'>
            <h3 className=' text-lg font-bold'>Video {index + 1}</h3>
            <button className='flex p-3 rounded-2xl bg-green-500' onClick={() => playVideo(video)}>Play</button>
            <button className='flex p-3 rounded-2xl bg-red-500' onClick={() => deleteVideo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;









// 'use client'

// import React, { useEffect, useState } from 'react';
// import { openDB } from 'idb';

// const VideoList: React.FC = () => {
//   const [videos, setVideos] = useState<Blob[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const db = await openDB('myDatabase', 1);
//       const videoKeys = await db.getAllKeys('videos');
//       const videoData: Blob[] = [];

//       for (let key of videoKeys) {
//         const video = await db.get('videos', key);
//         videoData.push(video);
//       }
//       setVideos(videoData);
//     };
//     fetchData();
//   }, []);

//   const playVideo = (videoBlob: Blob) => {
//     const videoElement = document.createElement('video');
//     const url = URL.createObjectURL(videoBlob);
//     videoElement.src = url;
//     videoElement.controls = true;
//     videoElement.play();
//     document.body.appendChild(videoElement);
//   };

//   return (
//     <div>
//       <h2>Recorded Videos:</h2>
//       <ul>
//         {videos.map((video, index) => (
//           <li key={index} onClick={() => playVideo(video)}>
//             Video {index + 1}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default VideoList;
