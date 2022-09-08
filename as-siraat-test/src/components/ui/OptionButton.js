import React from "react";
import classes from "./OptionButton.module.css";

const OptionButton = (props) => {
  let btnColor = "btn-outline-secondary";
  if (props.clr) {
    btnColor = props.clr;
  }
  function selectOptionHandler() {
    props.onClick(props.option);
  }

  if (props.isDisabled) {
    return (
      <button
        className={
          "btn" + " " + btnColor + " btn-lg my-2" + " " + classes.widthcontrol
        }
        onClick={selectOptionHandler}
        disabled
      >
        {props.option}
      </button>
    );
  }

  return (
    <button
      className={
        "btn" + " " + btnColor + " btn-lg my-2" + " " + classes.widthcontrol
      }
      onClick={selectOptionHandler}
    >
      {props.option}
    </button>
  );
};

export default OptionButton;
