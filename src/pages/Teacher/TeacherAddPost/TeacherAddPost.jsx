// TeacherAddPost.jsx
import React, { useState } from 'react';
import axios from '../../../axios.js';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './TeacherAddPost.module.scss';

const TeacherAddPost = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const handleAddPost = async () => {
    try {
      const response = await axios.post('/posts/create', {
        title,
        text,
        imageUrl,
      });

      if (response.data.success) {
        // Redirect to the posts page after successful post creation
        console.log('Post created successfully');
      } else {
        console.error('Unable to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  return (
    <div className={styles.content}>
      <h1>Add Post</h1>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Text:
        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      </label>
      <br />
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
};

export default TeacherAddPost;
