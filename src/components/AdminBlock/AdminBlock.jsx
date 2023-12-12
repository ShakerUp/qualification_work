import React from 'react';

const AdminBlock = ({ id, username, role, changeUserRole }) => {
  return (
    <li key={id}>
      {username} - {role}
      {role === 'user' && (
        <>
          <button onClick={() => changeUserRole(id, 'teacher')}>Promote to Teacher</button>
        </>
      )}
      {role === 'teacher' && (
        <button onClick={() => changeUserRole(id, 'user')}>Demote to User</button>
      )}
    </li>
  );
};

export default AdminBlock;
