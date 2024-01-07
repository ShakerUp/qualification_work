import React from 'react';
import styles from './Post.module.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Post = ({ post }) => {
  const { title, text, createdAt, user, userId } = post;

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <div className={styles.userInfo}>
          <img width={20} height={20} src="/img/user.png" />
          <span className={styles.userName}>{userId && `${userId.name} ${userId.surname}`}</span>
        </div>
        <div className={styles.postDateTime}>{new Date(createdAt).toLocaleString()}</div>
      </div>
      <div className={styles.postContent}>
        <h2 className={styles.postTitle}>{title}</h2>
        <p className={styles.postText}>
          <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
        </p>
      </div>
    </div>
  );
};

export default Post;
