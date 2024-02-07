import React from 'react';
import axios from '../../../axios.js';
import { useParams } from 'react-router-dom';

import styles from './TestSheet.module.scss';
import ResultSheet from '../../../components/ResultSheet/ResultSheet.jsx';

const TestSheet = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = React.useState([]);
  const [testName, setTestName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [answers, setAnswers] = React.useState({});
  const [testResult, setTestResult] = React.useState({});
  const [isAnswerSent, setIsAnswerSent] = React.useState(false);
  const [timeLimit, setTimeLimit] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState(null);
  const [isTestStarted, setIsTestStarted] = React.useState(false);

  React.useEffect(() => {
    fetchTestDetails();
  }, [testId]);

  //Проверка начат ли тест уже при перезагрузки страницы или еще чегото
  React.useEffect(() => {
    const startTime = localStorage.getItem(`testStartTime_${testId}`);
    if (startTime) {
      setIsTestStarted(true);
    }
  }, [testId]);

  //Если есть лимит, то проверить начат ли тест, и поставить время которое нужно
  React.useEffect(() => {
    if (isTestStarted && timeLimit) {
      const startTime = localStorage.getItem(`testStartTime_${testId}`);
      if (!startTime) {
        localStorage.setItem(`testStartTime_${testId}`, Date.now());
        setTimeLeft(timeLimit * 60 * 1000);
        console.log('Запуск');
      } else {
        const elapsedTime = Date.now() - parseInt(startTime);
        const remainingTime = timeLimit * 60 * 1000 - elapsedTime;
        console.log('остаток времени калькуляция');
        if (remainingTime > 0) {
          setTimeLeft(remainingTime);
          console.log('остаток времени', remainingTime);
        } else {
          setTimeLeft(0);
        }
      }
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1000 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testId, isTestStarted, timeLimit]);

  React.useEffect(() => {
    console.log('Time left', timeLeft);
    if (timeLeft < 1000 && timeLeft > 0 && timeLeft != null) {
      setTimeLeft(0);
      handleSubmitAnswers();
    }
  }, [timeLeft]);

  const fetchTestDetails = async () => {
    try {
      const response = await axios.get(`/tests/${testId}/questions`);
      const { testName, description, questions, timeLimit } = response.data;
      setTestName(testName);
      setDescription(description);
      setQuestions(questions);
      setTimeLimit(timeLimit);
      initializeAnswers(questions);
    } catch (error) {
      console.error('Error fetching test details:', error);
    }
  };

  // Initialize answers based on question types
  const initializeAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach((question) => {
      initialAnswers[question._id] = [''];
    });
    setAnswers(initialAnswers);
  };

  // Start the test when user clicks on the start button
  const startTest = () => {
    setIsTestStarted(true);
    localStorage.setItem(`testStartTime_${testId}`, Date.now());
  };

  console.log(answers);

  // Handle changes in answer for multiple choice and open questions
  const handleAnswerChange = (questionId, newValue) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: [newValue],
    }));
  };

  // Handle changes in answer for multiple answer questions
  const handleCheckboxChange = (questionId, option) => {
    const newAnswers = { ...answers };
    if (newAnswers[questionId].includes(option)) {
      newAnswers[questionId] = newAnswers[questionId].filter((answer) => answer !== option);
    } else {
      newAnswers[questionId] = [...newAnswers[questionId], option];
    }
    setAnswers(newAnswers);
  };

  // Format the time left for display
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Submit answers to the server
  const handleSubmitAnswers = async (e) => {
    try {
      if (e) {
        e.preventDefault();
      }
      const response = await axios.post(`/tests/${testId}/submit`, { answers });
      setTestResult(response.data);
      setIsAnswerSent(true);
      setIsTestStarted(false);
      localStorage.removeItem(`testStartTime_${testId}`);
    } catch (error) {
      console.error('Error sending answers:', error);
    }
  };

  return isAnswerSent ? (
    <ResultSheet testResult={testResult} />
  ) : (
    <>
      {timeLimit !== null && !isTestStarted && (
        <div className={styles.testPageContainer}>
          <div className={styles.modalContent}>
            <img height={128} width={128} src="/img/clock.png" alt="Clock" />
            <h2>Time limit warning!</h2>
            <p>
              This test has a time limit of <strong> {timeLimit} </strong>minutes.
            </p>
            <p>Are you ready to start?</p>
            <button className={styles.startBtn} onClick={startTest}>
              <span>Start the test!</span>
              <svg
                width="34"
                height="34"
                viewBox="0 0 74 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="37" cy="37" r="35.5" stroke="black" strokeWidth="3"></circle>
                <path
                  d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                  fill="black"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      {(timeLimit === null || isTestStarted) && (
        <div className={styles.testPageContainer}>
          <div className={styles.testInfo}>
            <h2>{testName}</h2>
            {description && <p>{description}</p>}
            {timeLimit !== null && timeLeft > 0 && <p>Time Left: {formatTimeLeft()}</p>}
          </div>
          <form className={styles.formContainer}>
            {questions.map((question, index) => (
              <div key={question._id} className={styles.questionContainer}>
                <div className={styles.questionNumber}>{index + 1}</div>
                <p className={styles.questionText}>{question.questionText}</p>
                {question.questionType === 'multiplechoice' && (
                  <div className={styles.optionsContainer}>
                    {question.options.map((option) => (
                      <label key={option} className={styles.optionLabel}>
                        <input
                          type="radio"
                          name={question._id}
                          value={option}
                          checked={answers[question._id].includes(option)}
                          onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                          className={styles.optionInput}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
                {question.questionType === 'openquestion' && (
                  <div className={styles.answerContainer}>
                    <input
                      type="text"
                      value={answers[question._id]}
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      className={styles.openAnswerInput}
                    />
                  </div>
                )}
                {question.questionType === 'multipleanswer' && (
                  <div className={styles.optionsContainer}>
                    {question.options.map((option) => (
                      <label key={option} className={styles.optionLabel}>
                        <input
                          type="checkbox"
                          name={question._id}
                          value={option}
                          checked={answers[question._id].includes(option)}
                          onChange={() => handleCheckboxChange(question._id, option)}
                          className={styles.optionInput}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={handleSubmitAnswers} className={styles.submitButton}>
              Submit Answers
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default TestSheet;
