import React from 'react';
import axios from 'axios';

import InfoBlock from '../../../components/InfoBlock/InfoBlock';

const TeacherCabinet = () => {
  return (
    <div className="content">
      <div className="home-items">
        <InfoBlock
          header={'My Tests'}
          desc={''}
          mainImg={'img/book.png'}
          link={'/teacher-cabinet/tests'}
        />
        <InfoBlock
          header={'My Posts'}
          desc={''}
          mainImg={'img/exam.png'}
          link={'/teacher-cabinet/posts'}
        />
        <InfoBlock
          header={'Students Results'}
          desc={''}
          mainImg={'img/user_1.png'}
          link={'/teacher-cabinet/results'}
        />
      </div>
    </div>
  );
};

export default TeacherCabinet;
