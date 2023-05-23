import React, { useEffect, useState } from "react";
import { useGeolocated }              from "react-geolocated";

const UserLocation = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: false, },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (coords && coords.latitude && coords.longitude) {
      const userLocation = { latitude: coords.latitude, longitude: coords.longitude }
      localStorage.setItem('userLocation', JSON.stringify(userLocation));
    }
  }, [ coords ]);

  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation.</div>;
  }

  if (!isGeolocationEnabled) {
    return <div>Please enable Geolocation in your browser to retrieve your location.</div>;
  }

  if (coords && coords.latitude && coords.longitude) {
    return (
      <div>
        Latitude: { coords.latitude } <br/>
        Longitude: { coords.longitude }
      </div>
    );
  }
  return <div style={ { width: '100%' } }>Retrieving location...</div>;
};
export default UserLocation;
