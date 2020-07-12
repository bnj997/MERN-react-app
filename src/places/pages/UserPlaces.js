import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';

import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

function UserPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  //useParams() stores the dynamic segments set by parent class
  //In this case, in App.js,  our route path is "/:userId/places" meaning when we access this UserPlaces.js page, we can store the userId
  const userId = useParams().userId;

  //Send request when this component renders but not rerendered
  useEffect(() => {
    //users-controller in backend - res.json({places: places.map(place => place.toObject({getters: true})) });
    async function fetchPlaces() {
      try {
        //users-route in backend - router.get('/user/:uid', placesControllers.getPlacesByUserId );
        //Just a GETTER so no need for other params dictated by sendRequest
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        //we are receiving an array called "places" which is sent from users-controller in backend. so use responseData.places to access
        setLoadedPlaces(responseData.places)
      } catch(err) {}
    }
    fetchPlaces();
  }, [sendRequest, userId]);

  function placeDelete(deletedPlaceId) {
    setLoadedPlaces(prevPlaces => 
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  }


  //note that empty arrays of loadedplaces are handled by PlaceList
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDelete} />}
    </React.Fragment>
  )
}

export default UserPlaces;
