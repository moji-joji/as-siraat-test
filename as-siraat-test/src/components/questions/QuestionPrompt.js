import React, { useEffect, useState } from "react";
import classes from "./QuestionPrompt.module.css";
import StarRatings from "react-star-ratings";
import OptionButton from "../ui/OptionButton";
const QuestionPrompt = (props) => {
  const [optionSelected, setOptionSelected] = useState(false);
  const [promptMessage, setPromptMessage] = useState(<div></div>);
  const [colorArray, setColorArray] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [score, setScore] = useState(0);

  if (optionSelected) {
    console.log("option selected");
  } else {
    console.log("option not selected");
  }

  const optionArray = [
    ...props.questionInfo.incorrect_answers,
    props.questionInfo.correct_answer,
  ];

  let revealedAnswer = optionArray.map((option) => {
    if (option === props.questionInfo.correct_answer) {
      return "btn-primary";
    } else {
      return "btn-outline-secondary";
    }
  });

  useEffect(() => {
    setOptionSelected(false);
    setPromptMessage(<div></div>);
    setColorArray(revealedAnswer);
  }, [props.qNumber]);

  //   console.log(optionArray);

  //   //   randomly shuffle the options
  //   for (let i = optionArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [optionArray[i], optionArray[j]] = [optionArray[j], optionArray[i]];
  //   }

  function optionButtonHandler(option) {
    // logic for checking if the option selected is correct
    console.log(option);
    if (option === props.questionInfo.correct_answer) {
      setScore((prevScore) => prevScore + 1);
      setPromptMessage(
        <h2 className="text-center text-success ">Correct !</h2>
      );
      console.log("correct answer, score: " + score);
    } else {
      revealedAnswer[optionArray.indexOf(option)] = "btn-danger";
      setColorArray(revealedAnswer);
      setPromptMessage(<h2 className="text-center text-danger">Sorry !</h2>);
      console.log("wrong answer");
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setOptionSelected(true);
  }

  const difficultyStars = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  return (
    <>
      <div className="progress">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{
            width: (currentQuestion / 20) * 100 + "%",
          }}
        ></div>
      </div>

      <div className={classes["heading-flex"]}>
        <span className={classes.category}>{props.questionInfo.category}</span>
        <div>
          <img
            src="https://img.icons8.com/windows/344/timer.png"
            width="20px"
          />
          <span className={classes.category + " mx-1"}>00:45</span>
        </div>
      </div>
      <div>
        <StarRatings
          className="star"
          rating={difficultyStars[props.questionInfo.difficulty]}
          starRatedColor="orange"
          numberOfStars={3}
          name="rating"
          starDimension="25px"
          starSpacing="5px"
        />
      </div>
      <p className={classes["question-heading"]}>
        Question {props.qNumber + 1} of {20}
      </p>
      <div class="card">
        <div class="card-body">{props.questionInfo.question}</div>
      </div>
      <div className="options">
        <div class="row">
          <div class="col">
            <OptionButton
              onClick={optionButtonHandler}
              option={optionArray[0]}
              clr={optionSelected ? colorArray[0] : null}
              isDisabled={optionSelected}
            />
          </div>
          <div class="col">
            <OptionButton
              onClick={optionButtonHandler}
              option={optionArray[1]}
              clr={optionSelected ? colorArray[1] : null}
              isDisabled={optionSelected}
            />
          </div>

          <div class=""></div>
          <div class="col">
            {optionArray.length > 2 && (
              <OptionButton
                onClick={optionButtonHandler}
                option={optionArray[2]}
                clr={optionSelected ? colorArray[2] : null}
                isDisabled={optionSelected}
              />
            )}
          </div>
          <div class="col">
            {optionArray.length > 3 && (
              <OptionButton
                onClick={optionButtonHandler}
                option={optionArray[3]}
                clr={optionSelected ? colorArray[3] : null}
                isDisabled={optionSelected}
              />
            )}
          </div>
        </div>
        {promptMessage}

        <div className="d-flex justify-content-center">
          {optionSelected ? (
            <button
              className="btn btn-primary btn-lg my-2"
              onClick={props.incrementQuestion}
            >
              {currentQuestion != 20 ? "Next Question" : "Finish Quiz"}
            </button>
          ) : null}
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-muted">
            Score:
            {!isNaN(((score / currentQuestion) * 100).toFixed(0))
              ? ((score / currentQuestion) * 100).toFixed(0)
              : 0}
            %
          </span>
          <span className="text-muted mx-2">
            Max Score: {((score + (20 - currentQuestion)) / 20) * 100}%
          </span>
        </div>
        <div className="progress rounded">
          <div
            className="progress-bar rounded-left bg-danger"
            role="progressbar"
            style={{ width: (score / 20) * 100 + "%" }}
            // aria-valuenow="15"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>

          <div
            className="progress-bar bg-warning rounded-right"
            role="progressbar"
            style={{
              width:
                ((score / currentQuestion) * 100).toFixed(0) -
                (score / 20) * 100 +
                "%",
            }}
            // aria-valuenow="20"
            // aria-valuemin="0"
            aria-valuemax="100"
          ></div>

          <div
            className="progress-bar bg-success rounded-right"
            role="progressbar"
            style={{
              width: ((score + (20 - currentQuestion)) / 20) * 100 + "%",
            }}
            // aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </>
  );
};

export default QuestionPrompt;
