import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX";

function App() {
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        console.log("API Response:", res.data);
        if (res.data.questions) {
          setQuiz(res.data.questions);
        } else {
          console.error("No questions found in response");
        }
      })
      .catch(err => console.error("Error fetching quiz:", err));
  }, []);



  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    setSelected(true);
    setTimeout(() => {
      setIndex(index + 1);
      setSelected(null);
      if (index + 1 === quiz.length) setFinished(true);
    }, 800);
  };

  return (
    <div className="app">
      {quiz.length === 0 ? (
        <p>Loading or No Quiz Data Available...</p>
      ) : finished ? (
        <div>
          <h2>Quiz Finished!</h2>
          <p>Your Score: {score} / {quiz.length}</p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      ) : (
        <div>
          <h2>{quiz[index]?.description || "No Question Available"}</h2>
          {quiz[index]?.options?.map((opt, i) => (
            <button
              key={i}
              className={selected ? (opt.is_correct ? "correct" : "wrong") : ""}
              onClick={() => handleAnswer(opt.is_correct)}
              disabled={selected}
            >
              {opt.description || "No Option"}
            </button>
          ))}

        </div>
      )}
    </div>
  );

}
export default App;
