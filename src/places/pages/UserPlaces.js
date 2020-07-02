import React from 'react';
import { useParams} from 'react-router-dom';

import PlaceList from '../components/PlaceList'

function UserPlaces() {
  const DUMMY_PLACES = [
    {
      id: "p1",
      title: "The title",
      description: "The place",
      imageURL: "https://media-exp1.licdn.com/dms/image/C4E03AQGFl-WcfVNaKw/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=72jo394Yu130e4xplsWmA78aMGC8zrm_F0hWDHPeReg",
      address: "20 W 34th St, New York, NY 10001, United States",
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    },
    {
      id: "p2",
      title: "The title2",
      description: "The place2",
      imageURL: "https://media-exp1.licdn.com/dms/image/C4E03AQGFl-WcfVNaKw/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=72jo394Yu130e4xplsWmA78aMGC8zrm_F0hWDHPeReg",
      address: "20 W 34th St, New York, NY 10001, United States",
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u2'
    }
  ]

  // useParams() stores the dynamic segments set by parent class
  //In this case, in App.js,  our route path is "/:userId/places" meaning when we access this UserPlaces.js page, we can store the userId
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return (
    <PlaceList items={loadedPlaces} />
  )
}

export default UserPlaces;
