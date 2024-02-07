import React, { useState, useEffect } from 'react';
import axios from '../../../axios.js';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './TeacherAddPost.module.scss';

const TeacherAddPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedForms, setSelectedForms] = useState([]);

  const formOptions = [
    '8А',
    '8Б',
    '8В',
    '8Г',
    '9А',
    '9Б',
    '9В',
    '9Г',
    '10А',
    '10Б',
    '10В',
    '10Г',
    '11А',
    '11Б',
    '11В',
    '11Г',
  ];

  const options = React.useMemo(
    () => ({
      spellChecker: true,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Your text...',
      status: false,
    }),
    [],
  );

  useEffect(() => {
    if (postId) {
      // Fetch post details for editing
      fetchPostDetails();
    }
  }, [postId]);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`posts/${postId}`);
      const post = response.data;

      setTitle(post.title);
      setText(post.text);
      setImageUrl(post.imageUrl);
      setSelectedForms(post.forms);
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  console.log(selectedForms);

  const handleAddPost = async () => {
    try {
      if (postId) {
        // If postId exists, update the post (edit mode)
        const response = await axios.put(`/posts/update/${postId}`, {
          title,
          text,
          imageUrl,
          forms: selectedForms,
        });
        if (response.data.success) {
          console.log('Post updated successfully');
          navigate(`/teacher-cabinet/posts`);
        } else {
          console.error('Unable to update post');
        }
      } else {
        // Otherwise, create a new post (add mode)
        const response = await axios.post('/posts/create', {
          title,
          text,
          imageUrl,
          forms: selectedForms,
        });
        console.log(response.data);
        if (response.data.title) {
          console.log('Post created successfully');
          navigate(`/teacher-cabinet/posts`);
        } else {
          console.error('Unable to create post');
        }
      }
    } catch (error) {
      console.error('Error processing post:', error);
    }
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const handleFormChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedForms(selectedOptions);
  };

  return (
    <div className={styles.content}>
      <h1>{postId ? 'Edit Post' : 'Add Post'}</h1>
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
      <label>
        Choose Forms:
        <select multiple value={selectedForms} onChange={handleFormChange}>
          {formOptions.map((form, index) => (
            <option key={index} value={form}>
              {form}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={handleAddPost}>{postId ? 'Update Post' : 'Add Post'}</button>
    </div>
  );
};

export default TeacherAddPost;
