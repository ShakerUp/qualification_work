import React from 'react';
import axios from '../../../axios';

import styles from './UserCabinet.module.scss'; // Import the SCSS module

import Unauthorized from '../../../components/Unauthorized/Unauthorized';

import { AuthContext } from '../../../App';
import CabinetPopUp from '../../../components/CabinetPopUp/CabinetPopUp';

const UserCabinet = () => {
  const [userResults, setUserResults] = React.useState([]);
  const [userData, setUserData] = React.useState({});
  const [testsDone, setTestsDone] = React.useState(0);
  const { user } = React.useContext(AuthContext);
  const [correctAnswers, setCorrectAnswers] = React.useState({});
  const [isPopUpVisible, setPopUpVisible] = React.useState(false);

  React.useEffect(() => {
    if (user.isAuthenticated) {
      fetchUserResultsData();
    }
  }, [user]);

  const fetchUserResultsData = async () => {
    try {
      const response = await axios.get('/tests/user-results');
      setUserResults(response.data.userResults.reverse());
      setTestsDone(response.data.userResults.length);
      setUserData({ name: response.data.name, surname: response.data.surname });
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const fetchTestCorrectAnswers = async (testResultId) => {
    try {
      const response = await axios.get(`/tests/getCorrectAnswers/${testResultId}`);

      setCorrectAnswers(response.data);
      console.log(correctAnswers);
      setPopUpVisible(true);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handlePopUpClose = () => {
    setPopUpVisible(false);
  };

  const calculateAverageMark = () => {
    const totalPoints = userResults.reduce((sum, result) => sum + result.mark, 0);
    if (isNaN(totalPoints / testsDone)) {
      return 0;
    }
    return (totalPoints / testsDone).toFixed(1);
  };

  return user.isAuthenticated ? (
    <div className={styles.content}>
      <CabinetPopUp
        title={correctAnswers.testName}
        onClose={handlePopUpClose}
        opened={isPopUpVisible}
        questions={correctAnswers.questions}
      />
      <div className={styles.contentTop}>
        <div className={styles.contentTopBlock}>
          <span>{userData.name}</span>
          <span>{userData.surname}</span>
        </div>
        <div className={styles.contentTopBlock}>
          <span>Tests done: {testsDone}</span>
          <span>Average mark: {calculateAverageMark()}</span>
        </div>
      </div>
      <h2>Your results:</h2>
      {testsDone === 0 ? (
        <div className={styles.NoTest}>
          <h2>You haven`t done any tests yet :(</h2>
        </div>
      ) : (
        userResults.map((testResult) => (
          <div key={testResult._id} className={styles.resultBlock}>
            <div className={styles.resultBlockInfo}>
              <h3>{testResult.testName}</h3>
              <span>
                Your mark:{' '}
                {((testResult.correctAnswers / testResult.totalQuestions) * 12).toFixed(0)}/12
              </span>
            </div>
            <div className={styles.resultBlockInfo}>
              <span>{new Date(testResult.createdAt).toLocaleString()}</span>
              <button
                onClick={(id) => fetchTestCorrectAnswers(testResult._id)}
                className={styles.answersButton}>
                Correct answers
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  ) : (
    <Unauthorized />
  );
};

export default UserCabinet;
