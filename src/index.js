/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

import "./index.css";

mapboxgl.accessToken = "MAPBOX_ACCESS_KEY";

const Application = () => {
  const [location, setLocation] = useState({
    lng: 5,
    lat: 34,
    zoom: 2,
  });
  let mapContainer = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [location.lng, location.lat],
      zoom: location.zoom,
    });
    map.on("move", () => {
      setLocation({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }, []);
  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {location.lng} | Latitude: {location.lat} | Zoom:{" "}
          {location.zoom}
        </div>
      </div>
      <div ref={(el) => (mapContainer = el)} className="mapContainer" />
    </div>
  );
};

ReactDOM.render(<Application />, document.getElementById("root"));
