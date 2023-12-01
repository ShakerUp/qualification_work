import React from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

import styles from './CreateTest.module.scss';
import { AuthContext } from '../../App';

const CreateTestPage = () => {
  const [testName, setTestName] = React.useState('');
  const [showCorrectAnswers, setShowCorrectAnswers] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isTestCreated, setIsTestCreated] = React.useState(false);
  const { user } = React.useContext(AuthContext);


  React.useEffect(() => {
    setIsTestCreated(false);
  }, []);

  const handleAddQuestion = (questionType) => {
    const newQuestion = {
      questionType,
      questionText: '',
      options: questionType === 'multiplechoice' ? ['', '', '', ''] : [],
      correctAnswer: questionType === 'multiplechoice' ? '' : '',
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSaveTest = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/tests/create-test',
        {
          testName, // Make sure testName is set
          showCorrectAnswers, // Make sure showCorrectAnswers is set
          category, // Make sure category is set
          questions,
          description, // Add description if needed
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      console.log('Test created:', response.data);
      setIsTestCreated(true);
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  if (user.role !== 'admin') {
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
      <h1>Create Test</h1>
      <label>
        Test Name:
        <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} />
      </label>
      <br />
      <label>
        Show Correct Answers:
        <input
          type="checkbox"
          checked={showCorrectAnswers}
          onChange={(e) => setShowCorrectAnswers(e.target.checked)}
        />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <br />
      <button onClick={() => handleAddQuestion('multiplechoice')}>+ Multiple Choice</button>
      <button onClick={() => handleAddQuestion('openquestion')}>+ Open Question</button>
      <h2>Questions:</h2>
      {questions.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          <label>
            Question Type:
            <select
              value={question.questionType}
              onChange={(e) => handleQuestionChange(index, 'questionType', e.target.value)}>
              <option value="multiplechoice">Multiple Choice</option>
              <option value="openquestion">Open Question</option>
            </select>
          </label>
          <br />
          <label>
            Question Text:
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
            />
          </label>
          <br />
          {question.questionType === 'multiplechoice' && (
            <div>
              <label>Options:</label>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleQuestionChange(index, 'options', [
                        ...question.options.slice(0, optionIndex),
                        e.target.value,
                        ...question.options.slice(optionIndex + 1),
                      ])
                    }
                  />
                  <input
                    type="radio"
                    checked={question.correctAnswer === option}
                    onChange={() => handleQuestionChange(index, 'correctAnswer', option)}
                  />
                </div>
              ))}
            </div>
          )}
          {question.questionType === 'openquestion' && (
            <div>
              <label>
                Correct Answer:
                <input
                  type="text"
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                />
              </label>
            </div>
          )}
          <br />
        </div>
      ))}
      <button onClick={handleSaveTest}>Save Test</button>
    </div>
  );
};

export default CreateTestPage;
