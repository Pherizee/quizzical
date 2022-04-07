import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [allChosen, setAllChosen] = useState(false);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [optionClass, setOptionClass] = useState({
    correct: "",
    incorrect: "",
    wrong: "",
  });

  // parser to convert special characters into normal string
  const parseEntities = (txt) =>
    new DOMParser().parseFromString(txt, "text/html").body.innerText;

  useEffect(() => {
    fetchQuestions(props.url);
  }, []);

  useEffect(() => {
    const questions = Object.keys(answers);
    const compare = [];
    questions.forEach((question) => {
      answers[question].chosen ? compare.push(true) : compare.push(false);
    });
    if (!compare.some((comp) => comp === false)) {
      setAllChosen((prevChosen) => !prevChosen);
    }
  }, [answers]);

  // fetch and set state
  // I decided to set two states, questions and answers. This is due to the structure of the data response from the api. In the questions array, it is easy to pick out the quiz questions for display but not really so with displaying the options for each question and referencing the correct answers
  function fetchQuestions(apiUrl) {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const ans = {};
        setQuestions(data.results);

        // create answers object structure
        data.results.map((question) => {
          ans[question.question] = {
            chosen: "",
            correct: question.correct_answer,
            options: generateOptionsArray(
              question.correct_answer,
              question.incorrect_answers
            ),
          };
        });
        setAnswers(ans);
      });
  }

  // function to shuffle the options for each question
  function generateOptionsArray(correctOption, otherOptions) {
    let options = [correctOption, ...otherOptions];
    return options.sort(() => 0.5 - Math.random());
  }

  // handle change of selected options
  function handleChange(e) {
    const { name, value } = e.target;
    setAnswers((prevAns) => {
      return {
        ...prevAns,
        [name]: {
          ...prevAns[name],
          chosen: value,
        },
      };
    });
  }

  // handle submit of answers
  function handleSubmit(e) {
    // if the quiz answers have not been submitted
    if (!submitted) {
      const questions = Object.keys(answers);
      questions.forEach((question) => {
        if (answers[question].chosen === answers[question].correct) {
          setScore((prevScore) => prevScore + 1);
        }
      });
      setOptionClass({
        correct: "correct",
        incorrect: "incorrect",
        wrong: "wrong",
      });
      setSubmitted((prevPlay) => !prevPlay);
    }
    // if answers have been submitted, reset the game
    else {
      props.setGameSet((prevSet) => !prevSet);
    }
  }

  // template for each question section
  const questionElem = questions.map((question) => {
    const eachQuestion = question.question;

    return (
      <div className="question__container" key={nanoid()}>
        <h2 className="question">{parseEntities(eachQuestion)}</h2>
        <div className="options">
          {/* Here I am checking for the answers state then accessing the options from each answer object to display individual options*/}
          {Object.keys(answers).length &&
            answers[eachQuestion].options.map((option) => {
              return (
                <React.Fragment key={nanoid()}>
                  <input
                    type="radio"
                    id={question.question + option}
                    name={question.question}
                    value={option}
                    onChange={handleChange}
                    checked={
                      answers[eachQuestion].chosen === option ? true : false
                    }
                  />
                  <label
                    className={`option 
                      ${
                        option === answers[eachQuestion].correct
                          ? optionClass.correct
                          : ""
                      }
                      ${
                        option === answers[eachQuestion].chosen &&
                        option !== answers[eachQuestion].correct
                          ? optionClass.wrong
                          : ""
                      }
                      ${
                        option !== answers[eachQuestion].correct
                          ? optionClass.incorrect
                          : ""
                      }
                    `}
                    htmlFor={question.question + option}
                  >
                    {parseEntities(option)}
                  </label>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    );
  });

  return (
    <div className="questions__wrapper">
      {questionElem}

      <footer>
        {submitted && (
          <p>
            You scored {score}/{Object.keys(questions).length} correct answers
          </p>
        )}
        <button
          className="btn"
          onClick={handleSubmit}
          disabled={allChosen ? true : false}
        >
          {!submitted ? "Check Answer" : "Play Again"}
        </button>
      </footer>
    </div>
  );
};

export default Questions;
