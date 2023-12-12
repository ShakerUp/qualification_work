// AdminPage.js
import React from 'react';
import axios from '../../axios';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../App';

import AdminBlock from '../../components/AdminBlock/AdminBlock';

import styles from './Admin.module.scss';

const AdminPage = () => {
  const [users, setUsers] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [selectedUserForm, setSelectedUserForm] = React.useState('');

  const formOptions = [
    '8A',
    '8B',
    '8V',
    '8G',
    '9A',
    '9B',
    '9V',
    '9G',
    '10A',
    '10B',
    '10V',
    '10G',
    '11A',
    '11B',
    '11V',
    '11G',
  ];

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/auth/getAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const changeUserRole = async (userId, role) => {
    try {
      await axios.put(`/auth/users/${userId}/promote`, {
        newRole: role,
      });

      fetchUsers();
    } catch (error) {
      console.error('Error promoting user:', error);
    }
  };

  if (user.role !== 'admin') {
    return <Navigate to={'/'} />;
  }

  // const assignFormToUser = async () => {
  //   try {
  //     await axios.put(`/auth/assignForm/${selectedUserId}`, {
  //       form: selectedUserForm,
  //     });
  //     fetchUsers();
  //     setSelectedUserId(null);
  //     setSelectedUserForm('');
  //   } catch (error) {
  //     console.error('Error assigning form to user:', error);
  //   }
  // };

  return (
    <div className={styles.adminContainer}>
      <h1>Admin Panel</h1>
      <ul className={styles.userList}>
        {users.map((user) => (
          <AdminBlock
            id={user._id}
            username={user.username}
            role={user.role}
            changeUserRole={changeUserRole}
          />
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
