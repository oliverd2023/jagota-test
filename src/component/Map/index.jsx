import React, { useCallback, useState }                  from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

function SimpleMap() {
  const containerStyle          = { width: '100%', height: '100vh' };
  const apiKey                  = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const { longitude, latitude } = JSON.parse(localStorage.getItem('userLocation')) || { longitude: 0, latitude: 0 };
  const center                  = { lat: latitude, lng: longitude };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  })

  const [ map, setMap ] = useState({
    lng: longitude,
    lat: latitude
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const defaultsPosition = { lng: longitude, lat: latitude }
  const defaultsPlace    = 'VietNam'

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={ containerStyle }
      center={ center }
      zoom={ 8 }
      onLoad={ onLoad }
      onUnmount={ onUnmount }
    >
      <Marker position={ defaultsPosition }>
        <InfoWindow>
          <span style={ { color: 'black' } }>{ defaultsPlace }</span>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  ) : <></>
}

export default React.memo(SimpleMap)

