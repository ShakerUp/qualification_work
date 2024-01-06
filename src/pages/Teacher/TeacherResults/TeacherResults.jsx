// In your TeacherResults.jsx

import React, { useState, useEffect } from 'react';
import axios from '../../../axios.js';
import styles from './TeacherResults.module.scss';

const TeacherResults = () => {
  const [teacherResults, setTeacherResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');

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
        {teacherResults
          .filter((result) => result.userName.toLowerCase().includes(searchValue.toLowerCase()))
          .map((result) => (
            <div key={result._id} className={styles.resultBlock}>
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
