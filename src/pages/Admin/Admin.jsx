// AdminPage.js
import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../App';

import styles from './Admin.module.scss';

const AdminPage = () => {
  const [users, setUsers] = React.useState([]);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const changeUserRole = async (userId, role) => {
    try {
      await axios.put(
        `http://localhost:5000/auth/users/${userId}/promote`,
        {
          newRole: role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      fetchUsers();
    } catch (error) {
      console.error('Error promoting user:', error);
    }
  };

  if (user.role !== 'admin') {
    return <Navigate to={'/'} />;
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Admin Panel</h1>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.role}
            {user.role === 'user' && (
              <button onClick={() => changeUserRole(user._id, 'teacher')}>
                Promote to Teacher
              </button>
            )}
            {user.role === 'teacher' && (
              <button onClick={() => changeUserRole(user._id, 'user')}>Demote to User</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
