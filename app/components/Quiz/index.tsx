import React, { useState } from 'react'
import quizData from './data/index'

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleAnswerOptionClick = (option: string) => {
    const correctAnswer = quizData[currentQuestion].answer
    setSelectedAnswer(option)
    if (option === correctAnswer) {
      setScore(score + 1)
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }

    // Delay moving to the next question to allow the user to see feedback
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion)
        setIsCorrect(null) // Reset for the next question
        setSelectedAnswer('') // Reset selected answer
      } else {
        setShowScore(true)
      }
    }, 1000) // Adjust time as needed
  }

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='text-center font-semibold'>
          You scored {score} out of {quizData.length}
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-2 justify-between items-center'>
            <div className='font-semibold'>
              <span>Question {currentQuestion + 1}</span>/{quizData.length}
            </div>
            <div className='question-text'>{quizData[currentQuestion].question}</div>
          </div>
          <div className='flex mt-2 gap-4 justify-center items-center'>
            {quizData[currentQuestion].options.map((option) => (
              <button
                onClick={() => handleAnswerOptionClick(option)}
                key={option}
                className={`border-2 p-2 min-w-40 ${selectedAnswer === option ? (isCorrect ? 'bg-green-300' : 'bg-red-500') : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && <div className='mt-2 flex justify-center items-center'>{isCorrect ? 'Correct! 🎉' : 'Sorry, that’s not right. 😢'}</div>}
        </>
      )}
    </div>
  )
}

export default Quiz
