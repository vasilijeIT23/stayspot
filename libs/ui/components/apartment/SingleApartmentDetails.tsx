import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { GET_APARTMENT } from '@stayspot/network/clients/apartments/queries'
import * as React from 'react'

export interface IShowApartmentDetails {
  apartmentId: number
}

const ShowApartmentDetails: React.FC<IShowApartmentDetails> = ({
  apartmentId,
}) => {
  const { data, loading, error } = useQuery(GET_APARTMENT, {
    variables: { apartmentId },
  })

  const [formState, setFormState] = useState({
    displayName: '',
    pricePerDay: 0,
    area: 0,
    sleepingUnits: 0,
    aptFloor: 0,
    aptNumber: 0,
    type: 'STUDIO',
  })

  useEffect(() => {
    if (data) {
      setFormState({
        displayName: data.apartment?.displayName || '',
        pricePerDay: data.apartment?.pricePerDay || 0,
        area: data.apartment?.area || 0,
        sleepingUnits: data.apartment?.sleepingUnits || 0,
        aptFloor: data.apartment?.aptFloor || 0,
        aptNumber: data.apartment?.aptNumber || 0,
        type: data.apartment?.type || 'STUDIO',
      })
    }
  }, [data])

  if (loading) return <Typography>Loading...</Typography>
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Apartment Details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          <strong>Hotel Name:</strong>
        </Typography>
        <Typography variant="body1">{formState.displayName}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          <strong>Price Per Day:</strong>
        </Typography>
        <Typography variant="body1">${formState.pricePerDay}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          <strong>Area:</strong>
        </Typography>
        <Typography variant="body1">{formState.area} sq m</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          <strong>Sleeping Units:</strong>
        </Typography>
        <Typography variant="body1">{formState.sleepingUnits}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          <strong>Floor:</strong>
        </Typography>
        <Typography variant="body1">{formState.aptFloor}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          <strong>Apartment Number:</strong>
        </Typography>
        <Typography variant="body1">{formState.aptNumber}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          <strong>Type:</strong>
        </Typography>
        <Typography variant="body1">{formState.type}</Typography>
      </Box>
    </Box>
  )
}

export default ShowApartmentDetails
