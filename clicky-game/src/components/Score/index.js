import React from "react";
import "./style.css";

function Score(props) {
  return <h3 className="score">{props.children}</h3>;
}

export default Score;