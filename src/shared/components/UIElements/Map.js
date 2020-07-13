import React, { useRef, useEffect } from 'react';

import './Map.css';

function Map(props) {
  //mapRef tells google maps where to render the map using the useRef hook.
  const mapRef = useRef();
  const {center, zoom} = props;


  //useEffect allows you to register logic which will exeuctive when certain dependencies change (eg. when state changes for variable)
  //aka. when center or zoom changes, re run the logic below.
  //can be useful in pressing buttons which renders different lists.
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: props.center,
      zoom: props.zoom
    });
    new window.google.maps.Marker({position: props.center, map: map});
  }, [props.center, props.zoom])



  return (
    <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
  )
}

export default Map;
