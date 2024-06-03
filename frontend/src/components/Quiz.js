import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
const Quiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [currQuesNo, setCurrQuesNo] = useState(0);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [quizEnded, setQuizEnded] = useState(false); 

  const fetchQuizData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/quiz", {
        withCredentials: true
      } );
      const data = response.data
      setQuizData(data);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const nextQuestion = async () => {
    setErrorMessage("");
    const userAns = Array.from(
      document.querySelectorAll("input[name=option]:checked")
    ).map((input) => input.value);
  
    if (userAns.length === 0) {
      setErrorMessage("Please select an option.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5001/quiz", {
        currentQuestion: currQuesNo,
        answers: userAns,
      });
      setScore(response.data.score);
      const inputFields = document.querySelectorAll(
        "input[name=option]:checked"
      );
      inputFields.forEach((inputField) => {
        inputField.checked = false;
      });
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  
    if (currQuesNo < quizData.length - 1) {
      setCurrQuesNo(currQuesNo + 1);
    } else {
      setQuizEnded(true);
    }
  };
  

  function reloadPage() {
    // window.location.reload();
    navigate('/login');
    document.cookie.replace("token", "")
  }

  return (
    <div className=" bg-gray-50 min-h-screen">
    <Navbar/>
    <div className="flex justify-center items-center pt-16 lg:pt-28 ">
      <div
        className={` ${
          currQuesNo < quizData.length && !quizEnded 
            ? "bg-white px-3 py-4 w-full md:w-1/2 lg:w-1/3 shadow-lg rounded-lg"
            : "hidden"
        } `}
      >
        <h1 className="text-green-500 text-center font-bold text-3xl mb-6">
          Question
        </h1>
        {quizData.length > currQuesNo && quizData[currQuesNo] && (
          <div>
            <div id="question" className="text-center mb-6">
              <h3 className="font-bold text-2xl ">
                <b>{quizData[currQuesNo].question}</b>
              </h3>
            </div>
            <div id="box" className="flex flex-col  mb-6">
              <div id="options">
                {quizData[currQuesNo].options.map((option, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type={
                        quizData[currQuesNo].answersQuantity === "multiple"
                          ? "checkbox"
                          : "radio"
                      }
                      name="option"
                      value={option}
                      id={option}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
              <p className="text-red-600 font-bold text-xl text-center">{errorMessage}</p>
            </div>
            <div className="flex items-end justify-end">
              <button
                className="bg-green-500 font-bold text-white px-4 text-left py-2 rounded"
                onClick={nextQuestion}
              >
                {currQuesNo === quizData.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={` ${
          quizEnded 
            ? "bg-white items-center px-3 py-4 w-full md:w-1/2 lg:w-1/3 shadow-lg rounded-lg"
            : "hidden"
        } `}
      >
        <h1 className="text-center text-xl font-bold text-green-500">
          Your Score: {score}/{quizData.length}
        </h1>
        <div className="flex justify-center">
          <button
            className="bg-green-500 mt-10 font-bold text-white px-4 text-left py-2 rounded"
            onClick={reloadPage}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Quiz;
