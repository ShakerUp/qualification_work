import React, { useState, useEffect } from 'react';
import axios from '../../../axios.js';

import CabinetPopUp from '../../../components/CabinetPopUp/CabinetPopUp.jsx';

import styles from './TeacherResults.module.scss';

const TeacherResults = () => {
  const [teacherResults, setTeacherResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isPopUpVisible, setPopUpVisible] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const [studentAnswers, setStudentAnswers] = React.useState([]);

  useEffect(() => {
    fetchTeacherResults();
  }, []);

  const fetchTeacherResults = async () => {
    try {
      // Make a request to your backend endpoint for teacher results
      const response = await axios.get('/tests/teachers-results');

      setTeacherResults(response.data.userResults);
    } catch (error) {
      console.error('Error fetching teacher results:', error);
    }
  };

  const convertDate = (date) => {
    const splited = date.split('T');
    return splited[0] + ' ' + splited[1].slice(0, -5);
  };

  const handlePopUpClose = () => {
    setPopUpVisible(false);
  };

  const fetchTestCorrectAnswers = async (resultId) => {
    try {
      const response = await axios.get(`/tests/getCorrectAnswers/${resultId}`);
      setCorrectAnswers(response.data);

      const selectedResult = await teacherResults.find((result) => result._id === resultId);
      setStudentAnswers(selectedResult.userAnswers);
      setPopUpVisible(true);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  console.log(teacherResults);

  return (
    <div className={styles.contentTop}>
      <div className={styles.libraryInfo}>
        <h1>Students Results</h1>
        <div className={styles.search}>
          <img width={20} height={20} src="img/add.png" alt="Search" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search for a topic..."
          />
        </div>
      </div>
      <div className={styles.content}>
        <CabinetPopUp
          title={correctAnswers.testName}
          onClose={handlePopUpClose}
          opened={isPopUpVisible}
          questions={correctAnswers.questions}
          studentName={correctAnswers.fullName}
          studentAnswers={studentAnswers}
        />
        {teacherResults
          .filter(
            (result) =>
              result.userName.toLowerCase().includes(searchValue.toLowerCase()) ||
              result.testName.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .map((result) => (
            <div
              key={result._id}
              onClick={(id) => fetchTestCorrectAnswers(result._id)}
              className={styles.resultBlock}>
              <div className={styles.resultBlockInfo}>
                <h3>{result.testName}</h3>
                <span>
                  Student: <strong> {result.userName}</strong>
                </span>
              </div>
              <div className={styles.resultBlockInfo}>
                <span>{convertDate(result.createdAt)}</span>
                <span>
                  Mark: <strong>{result.mark}/12</strong>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeacherResults;
