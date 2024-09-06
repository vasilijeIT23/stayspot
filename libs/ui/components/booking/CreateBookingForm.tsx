import { CreateBookingInput } from '@stayspot/network/clients/bookings/types'
import { loadStripe } from '@stripe/stripe-js'

import { useAuth } from '@stayspot/util/hooks/authContext'
import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { CREATE_APARTMENT } from '@stayspot/network/clients/apartments/mutations'
import Box from '@mui/material/Box'
import { PlainTextInput } from '../shared_components/input_types/PlainTextInput'
import { MultipleImageInput } from '../shared_components/input_types/MultipleImageInput'
import { SubmitButton } from '../shared_components/SubmitButton'
import { Button, TextField } from '@mui/material'
import { useCloudinaryUpload } from '@stayspot/util/hooks/cloudinary'
import { NumericInput } from '../shared_components/input_types/NumericInput'
import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'

function calculateDateDifferenceInDays(dateStr1, dateStr2) {
  // Parse the date strings into Date objects
  const date1 = new Date(dateStr1)
  const date2 = new Date(dateStr2)

  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(date2 - date1)

  // Convert milliseconds to days
  const msPerDay = 24 * 60 * 60 * 1000 // Number of milliseconds in a day
  const diffInDays = Math.round(diffInMs / msPerDay)

  return diffInDays
}

interface ICreateBookingProps {
  apartmentId: number
  startDate: string
  endDate: string
  pricePerDay: number
}

const CreateBookingForm: React.FC<ICreateBookingProps> = ({
  apartmentId,
  startDate,
  endDate,
  pricePerDay,
}) => {
  const { uid } = useAuth()
  const [booking, setBooking] = useState(false)
  const [days, setDays] = useState(
    calculateDateDifferenceInDays(startDate, endDate),
  )
  const total = days * pricePerDay
  const [formState, setFormState] = useState({
    totalPrice: total,
    phoneNumber: '000000000',
  })

  const [errors, setErrors] = useState({
    totalPrice: false,
    phoneNumber: false,
  })

  useEffect(() => {
    const newErrors = {
      totalPrice: formState.totalPrice < 0,
      phoneNumber: formState.phoneNumber.length <= 8,
    }
    setErrors(newErrors)
  }, [formState])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const bookingData = {
      pricePerDay: pricePerDay,
      totalPrice: formState.totalPrice,
      startDate: startDate,
      endDate: endDate,
      phoneNumber: formState.phoneNumber,
      apartmentId: apartmentId,
      customerId: uid,
    }

    try {
      setBooking(true)
      const res = await createBookingSession(
        uid!,
        formState.totalPrice,
        bookingData,
      )
      console.log(res)
      setBooking(false)
    } catch (err) {
      console.error('Error:', err)
      // Optionally, show user-friendly error messages here
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Booking Details
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">
            <strong>Start Date</strong>
          </Typography>
          <Typography variant="body1">{startDate}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">
            <strong>End Date</strong>
          </Typography>
          <Typography variant="body1">{endDate}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">
            <strong>Price Per Day:</strong>
          </Typography>
          <Typography variant="body1">${pricePerDay}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">
            <strong>TotalPrice:</strong>
          </Typography>
          <Typography variant="body1">{formState.totalPrice} sq m</Typography>
        </Box>
      </Box>

      <PlainTextInput
        textField={formState.phoneNumber}
        onChange={handleInputChange}
        textError={errors.phoneNumber}
        id="phoneNumber"
        label="Phone Number"
      />

      <SubmitButton disabled={Object.values(errors).some((error) => error)}>
        {' '}
        Book{' '}
      </SubmitButton>
    </Box>
  )
}

export default CreateBookingForm

export const createBookingSession = async (
  uid: string,
  totalPrice: number,
  bookingData: CreateBookingInput,
) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPrice,
        uid,
        bookingData,
      }),
    })
    const checkoutSession = await response.json()

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    const stripe = await loadStripe(publishableKey || '')
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.sessionId,
    })

    return result
  } catch (error) {
    console.error('Error creating booking session:', error)
    throw error
  }
}
