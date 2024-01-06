import React from 'react';

import InfoBlock from '../components/InfoBlock/InfoBlock';

const Home = () => {
  return (
    <div className="content">
      <div className="home-items">
        <InfoBlock
          header={'Library'}
          desc={'Useful materials for practice '}
          mainImg={'img/book.png'}
          link={'/library'}
        />
        <InfoBlock
          header={'Test Centre'}
          desc={'Try your skills'}
          mainImg={'img/exam.png'}
          link={'/test-centre'}
        />
        <InfoBlock
          header={'User Cabinet'}
          desc={'Your own cabinet'}
          mainImg={'img/user_1.png'}
          link={'/user-cabinet'}
        />
        <InfoBlock
          header={`Teacher's posts`}
          desc={'Check your homework or tasks'}
          mainImg={'img/teacher.png'}
          link={'/teachers-posts'}
        />
           <InfoBlock
          header={`Teacher's cabinet`}
          desc={'Your own cabinet'}
          mainImg={'img/teacher.png'}
          link={'/teacher-cabinet'}
        />
      </div>
    </div>
  );
};

export default Home;
