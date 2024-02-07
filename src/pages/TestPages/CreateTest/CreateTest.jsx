import React from 'react';
import axios from '../../../axios.js';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import styles from './CreateTest.module.scss';
import { AuthContext } from '../../../App';

const CreateTestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [testName, setTestName] = React.useState('');
  const [showCorrectAnswers, setShowCorrectAnswers] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [category, setCategory] = React.useState(null);
  const [description, setDescription] = React.useState('');
  const [isTestCreated, setIsTestCreated] = React.useState(false);
  const [timeLimitEnabled, setTimeLimitEnabled] = React.useState(false);
  const [timeLimit, setTimeLimit] = React.useState(null);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    setIsTestCreated(false);
  }, []);

  React.useEffect(() => {
    if (testId) {
      fetchTestDetails();
    }
  }, []);
  console.log(questions);
  const fetchTestDetails = async () => {
    try {
      const response = await axios.get(`/tests/${testId}/details`);
      const { testName, description, questions, timeLimit, category, showCorrectAnswers } =
        response.data;
      setTestName(testName);
      setDescription(description);
      setQuestions(questions);
      setTimeLimit(timeLimit);
      if (timeLimit != null) {
        setTimeLimitEnabled(true);
      }
      setCategory(category);
      setShowCorrectAnswers(showCorrectAnswers);
    } catch (error) {
      console.error('Error fetching test details:', error);
    }
  };

  const handleAddQuestion = (questionType) => {
    let newOptions;
    let newCorrectAnswers;

    if (questionType === 'multiplechoice') {
      newOptions = ['', '', '', ''];
      newCorrectAnswers = '';
    } else if (questionType === 'openquestion') {
      newOptions = [];
      newCorrectAnswers = '';
    } else if (questionType === 'multipleanswer') {
      newOptions = ['', '', '', '', '', ''];
      newCorrectAnswers = [];
    }
    const newQuestion = {
      questionType,
      questionText: '',
      options: newOptions,
      correctAnswer: newCorrectAnswers,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, field, value) => {
    console.log(index, field, value);
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (questionIndex, option) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];

    const newCorrectAnswers = question.correctAnswer.includes(option)
      ? question.correctAnswer.filter((ans) => ans !== option)
      : [...question.correctAnswer, option];

    question.correctAnswer = newCorrectAnswers;

    setQuestions(newQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSaveTest = async () => {
    try {
      if (testId) {
        const timeLimitValue = timeLimitEnabled ? timeLimit : null;
        const response = await axios.put(`tests/update/${testId}`, {
          testName,
          showCorrectAnswers,
          questions,
          category,
          description,
          timeLimit: timeLimitValue,
        });
        console.log('Test updated:', response.data);
        navigate(`/teacher-cabinet/tests`);
      } else {
        if (questions.length > 0) {
          const response = await axios.post('/tests/create-test', {
            testName,
            showCorrectAnswers,
            category,
            questions,
            description,
            timeLimit,
          });
          console.log('Test created:', response.data);
          setIsTestCreated(true);
        }
      }
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  console.log(category, typeof category);

  if (user.role === 'user') {
    return <Navigate to={'/'} />;
  }

  return isTestCreated ? (
    <>
      <div>Тест успешно создан!</div>
      <Link to="/create-test">
        <button>Создать следующий тест.</button>
      </Link>
      <Link to="/">
        <button>На главную</button>
      </Link>
    </>
  ) : (
    <div className={styles.createTestContainer}>
      <h1 className={styles.headingCenter}>{testId ? 'Edit Test' : 'Create Test'}</h1>
      <div className={styles.topInfo}>
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <textarea
              rows="1"
              id="title"
              required={true}
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className={styles.textarea}
            />
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <div className={styles.underline}></div>
          </div>
          <div className={styles.inputContainer}>
            <textarea
              rows="1"
              id="desc"
              required={true}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
            <label htmlFor="desc" className={styles.label}>
              Description
            </label>
            <div className={styles.underline}></div>
          </div>
        </div>
        <div className={styles.paramsGroup}>
          <div className={styles.dataGroup}>
            <label className={styles.materialCheckbox}>
              <input
                type="checkbox"
                checked={showCorrectAnswers}
                onChange={(e) => setShowCorrectAnswers(e.target.checked)}
              />
              <span className={styles.checkmark}></span>
              Show correct answers?
            </label>
          </div>
          <div className={styles.dataGroup}>
            <label className={styles.materialCheckbox}>
              <input
                type="checkbox"
                checked={timeLimitEnabled}
                onChange={(e) => setTimeLimitEnabled(e.target.checked)}
              />
              <span className={styles.checkmark}></span>
              Time limit?
            </label>

            {timeLimitEnabled && (
              <input
                type="number"
                value={timeLimit || ''}
                onChange={(e) => setTimeLimit(e.target.value ? parseInt(e.target.value) : null)}
              />
            )}
          </div>
          <div className={styles.dataGroup}>
            <div className={styles.radioButtonsContainer}>
              <div className={styles.radioButton}>
                <input
                  name="radio-group"
                  id="radio2"
                  className={styles.radioButtonInput}
                  type="radio"
                  value="1"
                  required={true}
                  checked={category === 1}
                  onChange={(e) => setCategory(Number(e.target.value))}
                />
                <label htmlFor="radio2" className={styles.radioButtonLabel}>
                  <span className={styles.radioButtonCustom}></span>
                  Grammar
                </label>
              </div>
              <div className={styles.radioButton}>
                <input
                  name="radio-group"
                  id="radio1"
                  className={styles.radioButtonInput}
                  type="radio"
                  value="2"
                  required={true}
                  checked={category === 2}
                  onChange={(e) => setCategory(Number(e.target.value))}
                />
                <label htmlFor="radio1" className={styles.radioButtonLabel}>
                  <span className={styles.radioButtonCustom}></span>
                  Vocabulary
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className={styles.headingCenter}>Questions:</h3>
      {questions.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          <span className={styles.questionNumber}>{`${index + 1}.`}</span>
          <div className={styles.questionText}>
            <input
              className={styles.questionTextInput}
              name="text"
              placeholder="Question..."
              type="search"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
            />
          </div>
          <br />
          {question.questionType === 'multiplechoice' && (
            <div>
              {question.options.map((option, optionIndex) => (
                <div className={styles.optionGroup} key={optionIndex}>
                  <input
                    type="radio"
                    checked={option && question.correctAnswer.includes(option)}
                    onChange={() => handleQuestionChange(index, 'correctAnswer', option)}
                  />
                  <input
                    className={styles.questionTextInput}
                    name="text"
                    placeholder="Enter an option..."
                    type="search"
                    value={option}
                    onChange={(e) =>
                      handleQuestionChange(optionIndex, 'options', [
                        ...question.options.slice(0, optionIndex),
                        e.target.value,
                        ...question.options.slice(optionIndex + 1),
                      ])
                    }
                  />
                  <img
                    className={styles.deleteOption}
                    height={16}
                    width={16}
                    src="/img/delete.png"
                    onClick={() => handleDeleteOption(index, optionIndex)}
                    alt="Delete question"
                  />
                </div>
              ))}
              <div className={styles.addOption} onClick={() => handleAddOption(index)}>
                + Add Option
              </div>
            </div>
          )}
          {question.questionType === 'openquestion' && (
            <div className={styles.questionText}>
              <input
                className={styles.questionTextInput}
                name="text"
                placeholder="Enter your answer..."
                type="search"
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
              />
            </div>
          )}
          {question.questionType === 'multipleanswer' && (
            <div>
              {question.options.map((option, optionIndex) => (
                <div className={styles.optionGroup} key={optionIndex}>
                  <input
                    type="checkbox"
                    checked={question.correctAnswer.includes(option)}
                    onChange={() => handleCheckboxChange(optionIndex, option)}
                  />
                  <input
                    className={styles.questionTextInput}
                    name="text"
                    placeholder="Enter an option..."
                    type="search"
                    value={option}
                    onChange={(e) =>
                      handleQuestionChange(optionIndex, 'options', [
                        ...question.options.slice(0, optionIndex),
                        e.target.value,
                        ...question.options.slice(optionIndex + 1),
                      ])
                    }
                  />
                  <img
                    className={styles.deleteOption}
                    height={16}
                    width={16}
                    src="/img/delete.png"
                    onClick={() => handleDeleteOption(index, optionIndex)}
                    alt="Delete question"
                  />
                </div>
              ))}
              <div className={styles.addOption} onClick={() => handleAddOption(index)}>
                + Add Option
              </div>
            </div>
          )}
          <img
            className={styles.deleteQuestion}
            height={16}
            width={16}
            src="/img/delete.png"
            onClick={() => handleDeleteQuestion(index)}
            alt="Delete question"
          />
        </div>
      ))}
      <div className={styles.addQuestionsButton}>
        <button onClick={() => handleAddQuestion('multiplechoice')}>+ Multiple Choice</button>
        <button onClick={() => handleAddQuestion('openquestion')}>+ Open Question</button>
        <button onClick={() => handleAddQuestion('multipleanswer')}>+ Multiple Answers</button>
      </div>
      <button className={styles.saveTest} onClick={handleSaveTest}>
        {testId ? 'Save Changes' : 'Create Test'}
      </button>
    </div>
  );
};

export default CreateTestPage;
