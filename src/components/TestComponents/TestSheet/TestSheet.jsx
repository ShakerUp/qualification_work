import React from 'react';
import axios from '../../../axios.js';

import { useParams } from 'react-router-dom';

import styles from './TestSheet.module.scss';

import ResultSheet from '../../ResultSheet/ResultSheet';

const TestSheet = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = React.useState([]);
  const [testName, setTestName] = React.useState([]);
  const [description, setDescription] = React.useState([]);
  const [answers, setAnswers] = React.useState({});
  const [testResult, setTestResult] = React.useState({});
  const [isAnswerSent, setIsAnswerSent] = React.useState(false);

  React.useEffect(() => {
    setIsAnswerSent(false);
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/tests/${testId}/questions`);
        setQuestions(response.data.questions);
        setTestName(response.data.testName);
        setDescription(response.data.description);
        const initialAnswers = {};
        response.data.questions.forEach((question) => {
          if (
            question.questionType === 'multiplechoice' ||
            question.questionType === 'multipleanswer'
          ) {
            initialAnswers[question._id] = [];
          } else if (question.questionType === 'openquestion') {
            initialAnswers[question._id] = '';
          }
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [testId]);

  console.log(answers);

  const handleCheckboxChange = (questionId, option) => {
    const newAnswers = { ...answers };
    if (newAnswers[questionId].includes(option)) {
      newAnswers[questionId] = newAnswers[questionId].filter((answer) => answer !== option);
      console.log('1');
    } else {
      newAnswers[questionId] = [...newAnswers[questionId], option];
      console.log('2');
    }

    setAnswers(newAnswers);
  };

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/tests/${testId}/submit`, {
        answers,
      });
      setTestResult(response.data);
      setIsAnswerSent(true);
    } catch (error) {
      console.error('Error sending answers:', error);
    }
  };

  const handleAnswerChange = (questionId, newValue) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: newValue,
    }));
  };

  return isAnswerSent ? (
    <ResultSheet testResult={testResult} />
  ) : (
    <>
      <div className={styles.testPageContainer}>
        <div className={styles.testInfo}>
          <h2>{testName}</h2>
          <p>{description}</p>
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
                        checked={answers[question._id] === option}
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
    </>
  );
};

export default TestSheet;
