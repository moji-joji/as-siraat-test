import React from "react";
import classes from "./QuizCard.module.css";

const QuizCard = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default QuizCard;
