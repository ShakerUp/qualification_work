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
      setTests(response.data.tests.reverse());
    } catch (err) {
      setError('Error fetching tests');
    }
  };

  const handleDelete = async (testId) => {
    try {
      const response = await axios.delete(`/tests/delete/${testId}`);
      console.log(response);
      // If successful, update the state to reflect the changes
      setTests((prevTests) => prevTests.filter((test) => test._id !== testId));
    } catch (err) {
      console.error('Error deleting test:', err);
      setError('Error deleting test');
    }
  };

  const handleCopyLink = (testId) => {
    const testLink = `${window.location.origin}/test/${testId}`;
    navigator.clipboard.writeText(testLink).then(
      () => {
        console.log('Link copied to clipboard:', testLink);
        // Optionally, you can show a success message or perform any other action.
      },
      (err) => {
        console.error('Error copying link to clipboard:', err);
        // Optionally, you can show an error message or perform any other action.
      },
    );
  };

  if (!user.isAuthenticated || user.role === 'user') {
    return <Unauthorized />;
  }

  return (
    <div className={styles.content}>
      <h1>The tests you created:</h1>
      {error && <p>{error}</p>}
      <ul>
        {tests.map((test) => (
          <div key={test._id} className={styles.resultBlock}>
            <img
              className={styles.copy}
              onClick={() => handleCopyLink(test._id)}
              width={20}
              height={20}
              src="/img/copy.png"
              alt="Delete"
            />
            <Link to={`/test/${test._id}`}>
              <div className={`${styles.resultBlockInfo} ${styles.pointer}`}>
                <h3>{test.testName}</h3>
                <span>
                  Number of questions: <strong>{test.numberOfQuestions}</strong>
                </span>
              </div>
            </Link>
            <Link to={`/teacher-cabinet/tests/update/${test._id}`}>
              <img className={styles.edit} width={20} height={20} src="/img/edit.png" alt="Edit" />
            </Link>
            <div className={styles.resultBlockInfo}>
              <div>
                <span>{new Date(test.createdAt).toLocaleString()}</span>
                <img
                  className={styles.delete}
                  onClick={() => handleDelete(test._id)}
                  width={20}
                  height={20}
                  src="/img/delete.png"
                  alt="Delete"
                />
              </div>
              <span>
                This test was done <strong>{test.timesDone}</strong> times.
              </span>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TeacherTests;
