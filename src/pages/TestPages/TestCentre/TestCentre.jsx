import React from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';

import styles from './TestCentre.module.scss';

import { AuthContext } from '../../../App';
import Unauthorized from '../../../components/Unauthorized/Unauthorized';

const TestCentre = () => {
  const [tests, setTests] = React.useState([]);
  const { user, checkAuth } = React.useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');

  const categories = ['All', 'Grammar', 'Vocabulary'];

  React.useEffect(() => {
    if (user.isAuthenticated) {
      fetchTests();
    }
  }, [user, selectedCategory]);

  const fetchTests = async () => {
    try {
      const response = await axios.get(
        `/tests/alltests${selectedCategory !== '0' ? `?category=${selectedCategory}` : ''}`,
      );
      setTests(response.data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  return user.isAuthenticated ? (
    <div className={styles.testСenterСontainer}>
      <div className={styles.contentTop}>
        <div className={styles.TestInfo}>
          <h1>Test Center</h1>
          <div className={styles.search}>
            <img width={20} height={20} src="img/search.png" alt="Search" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search for a test..."
            />
          </div>
          <div className={styles.categories}>
            <ul>
              {categories.map((category, index) => (
                <li
                  key={category}
                  className={selectedCategory === index ? styles.active : ''}
                  onClick={() => setSelectedCategory(index)}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <section className={styles.testItems}>
        {tests
          .filter((test) => test.testName.toLowerCase().includes(searchValue.toLowerCase()))
          .map((test) => (
            <Link key={test._id} to={`/test/${test._id}`} className={styles.testBlock}>
              <div className={styles.testBlockImage}></div>
              <div className={styles.testBlockContent}>
                <span>{test.testName}</span>
              </div>
            </Link>
          ))}
      </section>
    </div>
  ) : (
    <Unauthorized />
  );
};

export default TestCentre;
