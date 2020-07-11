import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

function Users() {

  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();


  //As soon as User.js renders, fetch() runs. But fetch() would also run on each rerender of page which happens when you get response and update list. Creates infinite loop
  //UseEffect allows us to run code only when certain dependancies change
  //if dependancies empty, only run once and never rerun
  useEffect(() => {
    //corresponds to -> router.get('/', usersControllers.getUsers ); 
    //No need to say its a get request since its a default.
    async function fetchUsers() {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');
        setLoadedUsers(responseData.users);
      } catch(err) {

      }
    };
    fetchUsers();
  }, [sendRequest]);


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
