import React, { Component } from "react";
import "./trivia.css";
import firebase from "../Firebase";

interface Props {}
interface State {}

class TriviaGame extends Component<Props, State> {
  render() {
    return (
      <div>
        <text className="text">QUESTION</text>
        <input defaultValue={"ANSWER"}></input>
        <button>Submit</button>
      </div>
    );
  }
}

export default TriviaGame;
