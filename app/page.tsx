import CameraInterface from '@/components/CameraInterface'
import RecordingInterfaceTest from '@/components/RecordingInterfaceTest'
import RecordingInterfaceTest2 from '@/components/RecordingInterfaceTest2'
import VideoList from '@/components/VideoList'
import VideoTest from '@/components/test3/VideoTest'

import React from 'react'

const page = () => {
  return (
    <div className=' h-screen flex flex-col justify-center items-center gap-8'>

      {/* <CameraInterface/> */}
      {/* <RecordingInterfaceTest/> */}
      {/* <RecordingInterfaceTest2/> */}
      {/* <VideoList/> */}
      <VideoTest/>

    </div>
  )
}

export default page
