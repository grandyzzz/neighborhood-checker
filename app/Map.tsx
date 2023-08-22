"use client";
import React, { useState } from "react";
import {
  DrawingManager,
  GoogleMap,
  Libraries,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 45.4640976,
  lng: 9.1919265,
};

const libraries: Libraries = ["drawing"];

interface MapProps {
  editable: boolean;
  mode: string;
}

function Map({ editable, mode }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    setPolygons([...polygons, polygon]);
    console.log('polygon complete');
    // setEditable(false);
    console.log(polygon);
    
  };

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    const transitLayer = new google.maps.TransitLayer();

    transitLayer.setMap(map);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
     options={{
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: false,
        zoomControl: true,
        // zoomControlOptions: {
        //   position: window.google.maps.ControlPosition.RIGHT_CENTER,
        // },
     }}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={console.log}
    >
      <DrawingManager
        onPolygonComplete={onPolygonComplete}
        // drawingMode={window.google.maps.drawing.OverlayType.POLYGON}
        drawingMode={editable ? window.google.maps.drawing.OverlayType.POLYGON : null}
        options={{
          drawingControl: true,
          drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
          },
          polygonOptions: {
            fillColor: mode === 'allowed' ? '#00FF00' : '#FF0000',
            fillOpacity: 0.5,
            strokeWeight: 2,
            // clickable: true,
            // editable: true,
            geodesic: true,
            zIndex: 1,
          },
        }}
      />
      {polygons.map((polygon, index) => (
        <Polygon key={index} path={polygon.getPath()} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
