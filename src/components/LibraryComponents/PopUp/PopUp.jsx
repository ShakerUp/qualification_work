import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import styles from './PopUp.module.scss';

const PopUp = ({ title, description, onClose, opened }) => {
  return (
    <div className={`${styles.popupContainer} ${opened ? styles.popupContainerVisible : ''}`}>
      <div className={styles.popup}>
        <h2>{title}</h2>
        <img
          onClick={onClose}
          className={styles.popupCross}
          width={25}
          height={25}
          src='img/cross.svg'
          alt='Quit'
        />
        {/* <img
          src={topic.image}
          alt='Topic'
        /> */}
        <div className={styles.description}>
          <ReactMarkdown
            children={description}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
