import React from 'react';
import axios from '../../../axios.js';
import Post from '../../../components/Post/Post.jsx';

import Unauthorized from '../../../components/Unauthorized/Unauthorized.jsx';
import { AuthContext } from '../../../App.js';

const UserPosts = () => {
  const [posts, setPosts] = React.useState([]);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    try {
      if (user.isAuthenticated) {
        fetchPosts();
      }
    } catch (error) {}
  }, [user]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts/user');
      setPosts(response.data.reverse());
      console.log(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  if (!user.isAuthenticated) {
    return <Unauthorized />;
  }

  return (
    <div className="contentPages">
      <h1>All Posts</h1>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
