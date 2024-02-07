import React from 'react';
import axios from '../../axios';
import styles from './Post.module.scss';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../App';

const Post = ({ post, handleDelete }) => {
  const { title, text, createdAt, updatedAt, userId, _id, updated } = post;
  const { user } = React.useContext(AuthContext);

  return (
    <div className={styles.postContainer}>
      {user.role != 'user' ? (
        <>
          <Link to={`/teacher-cabinet/posts/edit/${_id}`}>
            <img className={styles.edit} width={20} height={20} src="/img/edit.png" alt="Edit" />
          </Link>
          <img
            className={styles.delete}
            onClick={() => handleDelete(_id)}
            width={20}
            height={20}
            src="/img/delete.png"
            alt="Delete"
          />{' '}
        </>
      ) : (
        <></>
      )}
      <div className={styles.postHeader}>
        <div className={styles.userInfo}>
          <img width={20} height={20} src="/img/user.png" alt="User" />
          <span className={styles.userName}>{userId && `${userId.name} ${userId.surname}`}</span>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.dateBlock}>
            <div className={styles.postDateTime}>{`Created at: ${new Date(
              createdAt,
            ).toLocaleString()}`}</div>
            {updated && (
              <div className={styles.postDateTime}>{`Updated at: ${new Date(
                updatedAt,
              ).toLocaleString()}`}</div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.postContent}>
        <h2 className={styles.postTitle}>{title}</h2>
        <p className={styles.postText}>
          <ReactMarkdown children={text} />
        </p>
      </div>
    </div>
  );
};

export default Post;
