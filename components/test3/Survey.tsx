// 'use client'

// // Survey.tsx

// import { VideoRecorder } from './VideoRecorder';

// interface SurveyProps {
//   questions: string[];
// }

// export const Survey = ({ questions }: SurveyProps) => {

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const handleVideoRecorded = (videoBlob: Blob, question: string) => {
//     // Save videoBlob to database, indexed by question
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div>
//       <VideoRecorder 
//         question={currentQuestion}
//         onVideoRecorded={handleVideoRecorded} 
//       />

//       <button
//         onClick={() => setCurrentQuestionIndex(i => i + 1)}
//         disabled={currentQuestionIndex === questions.length - 1}  
//       >
//         Next Question
//       </button>
//     </div>
//   );

// }