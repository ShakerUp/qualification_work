import React from 'react';

import { AuthContext } from '../App';

import InfoBlock from '../components/InfoBlock/InfoBlock';

const Home = () => {
  const { user, checkAuth } = React.useContext(AuthContext);

  React.useEffect(() => {
    checkAuth();
  }, []);

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
          header={`Student's office`}
          desc={'Your own cabinet'}
          mainImg={'img/student.png'}
          link={'/user-cabinet'}
        />
        <InfoBlock
          header={`Teacher's posts`}
          desc={'Check your homework or tasks'}
          mainImg={'img/teacher.png'}
          link={'/teachers-posts'}
        />
        {user.role && user.role != 'user' && (
          <InfoBlock
            header={`Teacher's office`}
            desc={'Your own cabinet'}
            mainImg={'img/worker.png'}
            link={'/teacher-cabinet'}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
