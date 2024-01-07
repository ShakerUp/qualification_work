import React from 'react';
import styles from './CabinetPopUp.module.scss';

const CabinetPopUp = ({ title, onClose, opened, questions, studentName, studentAnswers }) => {
  console.log(studentAnswers);
  console.log(questions);

  function arraysEqual(arr1, arr2) {
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    return (
      sortedArr1.length === sortedArr2.length &&
      sortedArr1.every((value, index) => value === sortedArr2[index])
    );
  }

  return (
    <div className={`${styles.popupContainer} ${opened ? styles.popupContainerVisible : ''}`}>
      <div className={styles.popup}>
        <h2>
          {title} {studentName ? `- ${studentName}` : ''}
        </h2>
        <img
          onClick={onClose}
          className={styles.popupCross}
          width={25}
          height={25}
          src="img/cross.svg"
          alt="Quit"
        />
        <div className={styles.questionsContainer}>
          {questions?.map((question, index) => (
            <div
              key={question._id}
              className={`${styles.questionBlock} ${
                studentAnswers && studentAnswers[question._id] !== undefined
                  ? studentAnswers &&
                    question._id &&
                    arraysEqual(studentAnswers[question._id], question.correctAnswer)
                    ? styles.green
                    : styles.red
                  : ''
              }`}>
              <div className={styles.questionNumber}>{index + 1}. </div>
              <div>
                <div className={styles.text}>
                  <h4>Question:</h4>
                  <span>{question.questionText}</span>
                </div>
                <div className={styles.text}>
                  <h4>Correct Answer:</h4>
                  <span>{question.correctAnswer}</span>
                </div>
                {studentAnswers && studentAnswers[question._id] !== undefined && (
                  <div className={styles.text}>
                    <h4>Student Answer:</h4>
                    <span>{studentAnswers[question._id]}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CabinetPopUp;
