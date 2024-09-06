import { LocationInfo, ViewState } from '@stayspot/util/tools/types'
import { useMap } from 'react-map-gl'
import { Autocomplete, TextField } from '@mui/material'
import { useSearchLocation } from '@stayspot/util/hooks/location'
import { majorCitiesLocationInfo } from '@stayspot/util/tools/constants'
import styles from '../../../styles/map.module.css'
import { CssTextField } from '../StyledTextField'

export const SearchPlaceBox = ({
  onLocationChange,
}: {
  onLocationChange?: (location: ViewState) => void
}) => {
  const { current: map } = useMap()
  const { loading, locationInfo, searchText, setLoading, setSearchText } =
    useSearchLocation()

  return (
    <Autocomplete<LocationInfo>
      options={locationInfo}
      className={styles.searchbox}
      isOptionEqualToValue={(option, value) =>
        option.placeName === value.placeName
      }
      loadingText={searchText ? 'Loading...' : 'Type something...'}
      noOptionsText={searchText ? 'No options.' : 'Type something...'}
      getOptionLabel={(x) => x.placeName}
      renderInput={(params) => (
        <CssTextField
          className={styles.textbox}
          {...params}
          label="Search..."
        />
      )}
      onInputChange={(_, v) => {
        setLoading(true)
        setSearchText(v)
      }}
      loading={loading}
      onChange={async (_, v) => {
        if (v) {
          console.log('Map instance:', map) // Debugging line
          const { latLng, placeName } = v
          await map?.jumpTo({
            center: { lat: latLng[0], lng: latLng[1] },
            zoom: 12,
          })
          if (onLocationChange) {
            onLocationChange({ latitude: latLng[0], longitude: latLng[1] })
          }
        }
      }}
    />
  )
}
