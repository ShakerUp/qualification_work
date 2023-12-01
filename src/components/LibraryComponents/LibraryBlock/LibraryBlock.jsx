import React from 'react';
import PopUp from '../PopUp/PopUp';

import styles from './LibraryBlock.module.scss';

const LibraryBlock = ({
  title,
  category,
  description,
  imageUrl,
  onPopupOpen,
  onPopupClose,
  isLoading,
}) => {
  const [isPopUpVisible, setPopUpVisible] = React.useState(false);

  const handlePopUpOpen = () => {
    setPopUpVisible(true);
    onPopupOpen();
  };

  const handlePopUpClose = () => {
    setPopUpVisible(false);
    onPopupClose();
  };

  return (
    <>
      <div onClick={handlePopUpOpen} className={styles.libraryBlock}>
        <span>{title}</span>
      </div>
      <PopUp
        title={title}
        description={description}
        onClose={handlePopUpClose}
        opened={isPopUpVisible}
      />
    </>
  );
};

export default LibraryBlock;
