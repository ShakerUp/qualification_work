import React, { useContext, useEffect, useState } from 'react';
import axios from '../../../axios.js';
import Unauthorized from '../../../components/Unauthorized/Unauthorized.jsx';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../App';

import styles from './TeacherTests.module.scss';

const TeacherTests = () => {
  const { user } = useContext(AuthContext);
  const [tests, setTests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (user.isAuthenticated) {
        fetchTests();
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const fetchTests = async () => {
    try {
      const response = await axios.get(`/tests/teachers-test`);
      console.log(response);
      setTests(response.data.tests);
    } catch (err) {
      setError('Error fetching tests');
    }
  };

  if (!user.isAuthenticated || user.role === 'user') {
    return <Unauthorized />;
  }

  const convertDate = (date) => {
    const splited = date.split('T');
    return splited[0] + ' ' + splited[1].slice(0, -5);
  };

  return (
    <div className={styles.content}>
      <h1>The tests you created:</h1>
      {error && <p>{error}</p>}
      <ul>
        {tests.map((test) => (
          <Link to={`/test/${test._id}`}>
            <div key={test._id} className={styles.resultBlock}>
              <div className={styles.resultBlockInfo}>
                <h3>{test.testName}</h3>
                <span>
                  Number of questions: <strong>{test.numberOfQuestions}</strong>
                </span>
              </div>
              <div className={styles.resultBlockInfo}>
                <span>{convertDate(test.createdAt)}</span>
                <span>
                  This test was done <strong>{test.timesDone}</strong> times.
                </span>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TeacherTests;
