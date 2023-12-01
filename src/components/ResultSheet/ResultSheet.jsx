import React from 'react';

import { Link } from 'react-router-dom';

import styles from './ResultSheet.module.scss'; 

const ResultSheet = ({ testResult }) => {
  const calculateProgress = () => {
    const progress = (testResult.correctAnswers / testResult.totalQuestions) * 100;
    return progress;
  };

  return (
    <div className={styles.resultContainer}>
      <h1 className={styles.resultTitle}>Test Result</h1>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${calculateProgress()}%` }} />
      </div>
      <p className={styles.scoreText}>
        Your score: {testResult.correctAnswers} / {testResult.totalQuestions}
      </p>
      <p className={styles.markText}>
        Your mark: {((testResult.correctAnswers / testResult.totalQuestions) * 12).toFixed(0)} / 12
      </p>
      <div className={styles.buttonContainer}>
        <Link to="/test-centre">
          <button className={styles.button}>Test Centre</button>
        </Link>
      </div>
    </div>
  );
};

export default ResultSheet;
