import React, { useEffect, useState } from 'react';
import SimpleMap                      from "./component/Map/index.jsx";
import UserLocation                   from "./component/UserLocation/index.jsx";

const MyComponent = () => {
  const [ location, setLocation ] = useState({ lng: 0, lat: 0 });

  useEffect(() => {
    const getDataFromLocalStorage = async () => {
      const data = localStorage.getItem('userLocation');
      const obj  = JSON.parse(data);
      setLocation({ lng: obj.longitude, lat: obj.latitude })
    }
    getDataFromLocalStorage();
  }, [ location.lng, location.lat ]);

  return (
    <div>
      <UserLocation/>
      <SimpleMap/>
    </div>
  );
};


export default MyComponent;
