import React from 'react';
import { Link } from 'react-router-dom';

import styles from './InfoBlock.module.scss';

const InfoBlock = ({ header, desc, mainImg, link }) => {
  return (
    <Link to={link}>
      <div className={styles.infoBlock}>
        <div className={styles.infoBlockImg}>
          <img width={80} height={80} src={mainImg} alt="infoBlockImg" />
        </div>
        <div className={styles.infoBlockText}>
          <h2>{header}</h2>
          <span>{desc}</span>
        </div>
        <img className={styles.arrowImage} width={30} height={30} src="img/arrow.svg" alt="Arrow" />
      </div>
    </Link>
  );
};

export default InfoBlock;
