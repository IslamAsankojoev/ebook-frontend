import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';

function GeolocationTracker() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let map = mapRef.current;
    if (typeof window !== 'undefined') {
      if (latitude && longitude) {
        if (map) {
          map.remove(); // Remove existing map
        }
        map = L.map('map').setView([latitude, longitude], 10);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        L.marker([latitude, longitude]).addTo(map);

        mapRef.current = map; // Save the new map reference
      }
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log('Ошибка геолокации: ' + error.code + ', ' + error.message);
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div>
      <p>Широта: {latitude}</p>
      <p>Долгота: {longitude}</p>
      <div id="map" style={{ width: '600px', height: '400px' }} ref={mapRef}></div>
    </div>
  );
}

export default GeolocationTracker;
