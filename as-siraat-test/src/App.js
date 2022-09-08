import "./App.css";
import QuizCard from "./components/layout/QuizCard";
import GoldStar from "./icons/star-7207.svg";
import QuestionPrompt from "./components/questions/QuestionPrompt";
import { useEffect, useState } from "react";
// import quiz array
import questions from "./questions.js";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [quizArray, setQuizArray] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setQuizArray(questions);
    // fetch("./questions.json")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((result) => {
    //     setQuizArray(result);
    //     console.log(result);
    //     setIsLoading(false);
    //   });
    console.log(questions);
    setIsLoading(false);
  }, []);

  function setQuestionNumberHandler(optionDetails) {
    if (questionNumber <= quizArray.length - 1) {
      setQuestionNumber((prevNumber) => prevNumber + 1);
    }
  }

  if (questionNumber === quizArray.length && !isLoading) {
    return <div className="App">Quiz Completed</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <QuizCard>
          <QuestionPrompt
            questionInfo={quizArray[questionNumber]}
            qNumber={questionNumber}
            incrementQuestion={setQuestionNumberHandler}
          />
        </QuizCard>
      </div>
    );
  }
}

export default App;
