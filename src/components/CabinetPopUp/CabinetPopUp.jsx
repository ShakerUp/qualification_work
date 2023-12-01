import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import styles from './CabinetPopUp.module.scss';

const CabinetPopUp = ({ title, onClose, opened, questions }) => {
  return (
    <div className={`${styles.popupContainer} ${opened ? styles.popupContainerVisible : ''}`}>
      <div className={styles.popup}>
        <h2>{title}</h2>
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
            <div key={question._id} className={styles.questionBlock}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CabinetPopUp;
