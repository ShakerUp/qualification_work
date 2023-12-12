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
          desc={'You own cabinet'}
          mainImg={'img/user_1.png'}
          link={'/user-cabinet'}
        />
        <InfoBlock
          header={`Teacher's posts`}
          desc={'Check your homework or tasks'}
          mainImg={'img/teacher.png'}
          link={'/teachers-posts'}
        />
      </div>
    </div>
  );
};

export default Home;
