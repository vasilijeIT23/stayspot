import { useState, useCallback, useEffect } from 'react'
import { Map } from '../shared_components/map/Map'
import { Marker, ViewStateChangeEvent } from 'react-map-gl'
import styles from '../../styles/map.module.css'
import { SearchPlaceBox } from '../shared_components/map/SearchPlaceBox'
import { CurrentLocationButton } from '../shared_components/map/CurrentLocationButton'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import DatePickerComponent from '../shared_components/input_types/DatePicker'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import { FILTER_ACCOMODATIONS_BY_BOOKING_DATE } from '@stayspot/network/clients/apartments/queries'
import { useQuery } from '@apollo/client'
import { BaseDialog } from '../shared_components/BaseDialog'
import ShowSingleAccomodation from '../accmodation/ShowSingleAccomodation'

interface LngLat {
  lat: number
  lng: number
}

interface MarkerDragEvent {
  lngLat: LngLat
}

export const SearchPage = () => {
  const [open, setOpen] = useState(false)
  const [selectedAccomodation, setSelectedAccomodation] = useState<any>(null)
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-09-07'))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2024-09-08'))
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 10,
  })

  // Always call the useQuery hook
  const { data } = useQuery(FILTER_ACCOMODATIONS_BY_BOOKING_DATE, {
    variables: {
      dateInput: {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      },
    },
    skip: !startDate || !endDate || startDate > endDate, // Skip query if dates are not set
  })

  const availableAccomodations =
    data?.filterAccomodationsByDate?.accomodationToApartments

  const handleClose = () => {
    setOpen(false)
    setSelectedAccomodation(null) // Reset selected accommodation on close
  }

  const handleClickOpen = (accomodation: any) => {
    console.log('Clicked accommodation:', accomodation)
    setSelectedAccomodation(accomodation)
    console.log('State set to:', accomodation)
    setOpen(true)
  }

  console.log('Selected accommodation before dialog:', selectedAccomodation)

  useEffect(() => {
    console.log('Selected accommodation updated:', selectedAccomodation)
  }, [selectedAccomodation])

  const handleMapChange = useCallback(
    (target: ViewStateChangeEvent['target']) => {
      const bounds = target.getBounds()

      const locationFilter = {
        ne_lat: bounds?.getNorthEast().lat || 0,
        ne_lng: bounds?.getNorthEast().lng || 0,
        sw_lat: bounds?.getSouthWest().lat || 0,
        sw_lng: bounds?.getSouthWest().lng || 0,
      }
    },
    [],
  )

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Map
        onLoad={(e) => handleMapChange(e.target)}
        onDragEnd={(e) => handleMapChange(e.target)}
        onZoomEnd={(e) => handleMapChange(e.target)}
        initialViewState={viewState}
        style={{ width: '100%', height: '100%' }}
      >
        {availableAccomodations?.map((accomodation) => (
          <Marker
            key={accomodation.accomodation.id}
            longitude={accomodation.accomodation.address.lng}
            latitude={accomodation.accomodation.address.lat}
            anchor="bottom"
            onClick={() => handleClickOpen(accomodation)}
          >
            <AddLocationAltIcon sx={{ height: 50, width: 50 }} />
          </Marker>
        ))}
        {open && selectedAccomodation && (
          <BaseDialog
            handleClickOpen={open}
            handleClose={handleClose}
            title="Hotel Overview"
            text=""
            fullscreen={false}
          >
            <ShowSingleAccomodation
              accomodationId={selectedAccomodation.accomodation.id}
              address={selectedAccomodation.accomodation.address.address}
              displayName={selectedAccomodation.accomodation.displayName}
              description={selectedAccomodation.accomodation.description}
              images={selectedAccomodation.accomodation.images}
              startDate={startDate?.toISOString()}
              endDate={endDate?.toISOString()}
              apartments={selectedAccomodation.apartmentIds}
            />
          </BaseDialog>
        )}

        <div className={styles.mapoverlay}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: 500, width: 300 }}>
              <SearchPlaceBox />
            </div>
            <DatePickerComponent
              value={startDate}
              setValue={setStartDate}
              label="Start Date"
            />
            <DatePickerComponent
              value={endDate}
              setValue={setEndDate}
              label="End Date"
            />
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

// const [marker, setMarker] = React.useState({
//   latitude: 40,
//   longitude: -100,
// })

// const onMarkerDragStart = React.useCallback((event: MarkerDragEvent) => {
//   logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }))
// }, [])

// const onMarkerDrag = React.useCallback((event: MarkerDragEvent) => {
//   logEvents((_events) => ({ ..._events, onDrag: event.lngLat }))

//   setMarker({
//     longitude: event.lngLat.lng,
//     latitude: event.lngLat.lat,
//   })
// }, [])

// const onMarkerDragEnd = React.useCallback((event: MarkerDragEvent) => {
//   logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }))
// }, [])

// draggable
// onDragStart={onMarkerDragStart}
// onDrag={onMarkerDrag}
// onDragEnd={onMarkerDragEnd}
