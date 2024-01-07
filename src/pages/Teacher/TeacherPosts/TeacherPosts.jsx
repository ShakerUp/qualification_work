import React, { useState, useEffect } from 'react';
import axios from '../../../axios.js';
import Post from '../../../components/Post/Post.jsx';

const TeacherPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts/teacher-posts');
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default TeacherPosts;
