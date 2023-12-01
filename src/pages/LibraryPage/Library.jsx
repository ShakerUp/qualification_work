import React from 'react';
import axios from '../../axios';

import styles from './Library.module.scss';

import LibraryBlock from '../../components/LibraryComponents/LibraryBlock/LibraryBlock';
import Unauthorized from '../../components/Unauthorized/Unauthorized';
import { AuthContext } from '../../App';
import LibrarySkeleton from '../../components/LibraryComponents/LibrarySkeleton';

const Library = () => {
  const [topics, setTopics] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const categories = ['All', 'Grammar', 'Vocabulary'];

  React.useEffect(() => {
    try {
      if (user.isAuthenticated) {
        fetchLibraryData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [user, selectedCategory]);

  const fetchLibraryData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/library/books${selectedCategory !== '0' ? `?category=${selectedCategory}` : ''}`,
      );

      setTopics(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.error('Произошла ошибка:', error);
    }
  };

  const handlePopUpOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopUpClose = () => {
    setIsPopupOpen(false);
  };

  if (!user.isAuthenticated) {
    return <Unauthorized />;
  }

  return (
    <div className={`${styles.content} ${isPopupOpen ? styles.disableScroll : ''}`}>
      <div className={styles.contentTop}>
        <div className={styles.libraryInfo}>
          <h1>Library</h1>
          <div className={styles.search}>
            <img width={20} height={20} src="img/search.png" alt="Search" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search for a topic..."
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
      <section className={styles.libraryItems}>
        {isLoading
          ? [...Array(25)].map((item, index) => <LibrarySkeleton key={index} />)
          : topics
              .filter((topic) => topic.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((topic) => (
                <LibraryBlock
                  key={topic._id}
                  {...topic}
                  onPopupOpen={handlePopUpOpen}
                  onPopupClose={handlePopUpClose}
                  isLoading={isLoading}
                />
              ))}
      </section>
    </div>
  );
};

export default Library;
