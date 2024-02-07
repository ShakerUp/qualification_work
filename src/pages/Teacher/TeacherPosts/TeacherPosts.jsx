import React, { useState, useEffect } from 'react';
import axios from '../../../axios.js';
import Post from '../../../components/Post/Post.jsx';

const TeacherPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`/posts/delete/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts/teacher-posts');
      setPosts(response.data);
      console.log(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="contentPages">
      <h1>All Posts</h1>
      {posts.map((post) => (
        <Post key={post._id} post={post} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TeacherPosts;
