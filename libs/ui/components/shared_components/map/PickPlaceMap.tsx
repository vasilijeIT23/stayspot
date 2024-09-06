'use client'

import { Map } from './Map'
import { Marker, ViewStateChangeEvent } from 'react-map-gl'
import { useCallback, useState, useEffect } from 'react'
import React from 'react'
import styles from '../../../styles/map.module.css'
import { SearchPlaceBox } from './SearchPlaceBox'
import { CurrentLocationButton } from './CurrentLocationButton'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'

interface LngLat {
  lat: number
  lng: number
}

interface MarkerDragEvent {
  lngLat: LngLat
}

interface Marker {
  latitude: number
  longitude: number
}

interface IPickPlaceMapProps {
  marker: Marker
  setMarker: React.Dispatch<React.SetStateAction<Marker>>
}

export const PickPlaceMap: React.FC<IPickPlaceMapProps> = ({
  marker,
  setMarker,
}) => {
  const [viewState, setViewState] = useState({
    latitude: marker.latitude,
    longitude: marker.longitude,
    zoom: 10,
  })

  //   const [mapBounds, setMapBounds] = useState({
  //     ne_lat: 0,
  //     ne_lng: 0,
  //     sw_lat: 0,
  //     sw_lng: 0,
  //   });

  const [mapCenter, setMapCenter] = useState({
    center_lat: 0,
    center_lng: 0,
  })

  const [events, logEvents] = React.useState<Record<string, LngLat>>({})

  const onMarkerDragStart = React.useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }))
  }, [])

  const onMarkerDrag = React.useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }))

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    })
  }, [])

  const onMarkerDragEnd = React.useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }))
  }, [])

  const handleMapChange = useCallback(
    (target: ViewStateChangeEvent['target']) => {
      //   const bounds = target.getBounds()
      const center = target.getCenter()

      //   if (bounds) {
      //     setMapBounds({
      //       ne_lat: bounds.getNorthEast().lat,
      //       ne_lng: bounds.getNorthEast().lng,
      //       sw_lat: bounds.getSouthWest().lat,
      //       sw_lng: bounds.getSouthWest().lng,
      //     });
      //   }
      if (center) {
        setMapCenter({
          center_lat: center.lat,
          center_lng: center.lng,
        })
      }
    },
    [],
  )

  useEffect(() => {
    setMarker({
      latitude: mapCenter.center_lat,
      longitude: mapCenter.center_lng,
    })
  }, [mapCenter])

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Map
        onLoad={(e) => handleMapChange(e.target)}
        onDragEnd={(e) => handleMapChange(e.target)}
        onZoomEnd={(e) => handleMapChange(e.target)}
        initialViewState={viewState}
        style={{ width: '100%', height: '100%' }}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          draggable
          anchor="bottom"
          onClick={(e) => {
            console.log(mapCenter)
          }}
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <AddLocationAltIcon
            sx={{ height: 50, width: 50 }}
          ></AddLocationAltIcon>
        </Marker>
        <div className={styles.mapoverlay}>
          <div style={{ width: 300 }}>
            <SearchPlaceBox></SearchPlaceBox>
          </div>
        </div>
        <div className={styles.current}>
          <CurrentLocationButton />
          <div>Go to your location</div>
        </div>
      </Map>
    </div>
  )
}
