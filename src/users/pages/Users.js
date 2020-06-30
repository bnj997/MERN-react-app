import React from 'react';
import UsersList from '../components/UsersList';

function Users() {
  const DUMMY_USERS = [
    {
      id: "u1",
      name: "meepo",
      image:
        "https://media-exp1.licdn.com/dms/image/C4E03AQGFl-WcfVNaKw/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=72jo394Yu130e4xplsWmA78aMGC8zrm_F0hWDHPeReg",
      places: 3
    }
  ];

  return <UsersList items={DUMMY_USERS} />
}

export default Users
