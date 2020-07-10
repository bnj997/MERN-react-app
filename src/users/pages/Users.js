import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

function Users() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    //corresponds to -> router.get('/', usersControllers.getUsers ); 
    //No need to say its a get request since its a default.
    async function sendRequest() {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users');
        //You get back: 	res.json({users: users.map(user => user.toObject({ getters: true}))});
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setLoadedUsers(responseData.users);
      } catch(err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  function errorHandler() {
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers}/>} 
    </React.Fragment> 
  )
}

export default Users
