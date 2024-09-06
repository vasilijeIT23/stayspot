import MapGl, { useMap } from 'react-map-gl'
import React, { useState } from 'react'
import { SearchBox } from '@mapbox/search-js-react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'

type MapProps = React.ComponentProps<typeof MapGl> & { height?: string }

export const Map = ({ height = 'calc(110vh - 4rem)', ...props }: MapProps) => {
  return (
    <>
      <MapGl
        {...props}
        projection={{ name: 'globe' }}
        mapStyle="mapbox://styles/albinocigan/clzs8ohc500dz01pffq4g7sg0"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ height }}
        scrollZoom={true}
      >
        <StyleMap />

        {props.children}
      </MapGl>
    </>
  )
}

export const StyleMap = () => {
  const { current } = useMap()

  current?.on('style.load', () => {
    current?.getMap().setFog({
      color: 'rgb(255, 255, 0)', //lower-atmosphere
      range: [1, 10],
      // @ts-ignore
      'high-color': 'rgb(50, 50, 50)', // upper-atmosphere
      'horizon-blend': 0.05, // atmosphere thickness
      'space-color': 'rgb(20, 20, 20)', // background color
      'star-intensity': 1, // background brightness
    })
  })
  return null
}
