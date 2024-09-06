import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { UPDATE_APARTMENT } from '@stayspot/network/clients/apartments/mutations'
import Box from '@mui/material/Box'
import { PlainTextInput } from '../shared_components/input_types/PlainTextInput'
import { SubmitButton } from '../shared_components/SubmitButton'
import { GET_APARTMENT } from '@stayspot/network/clients/apartments/queries'
import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { NumericInput } from '../shared_components/input_types/NumericInput'

export interface IUpdateApartmentProps {
  apartmentId: number
}

const UpdateApartmentForm: React.FC<IUpdateApartmentProps> = ({
  apartmentId,
}) => {
  const [updateApartment] = useMutation(UPDATE_APARTMENT)

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

  const [errors, setErrors] = useState({
    displayName: false,
    pricePerDay: false,
    area: false,
    sleepingUnits: false,
    aptFloor: false,
    aptNumber: false,
    type: false,
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

  useEffect(() => {
    const newErrors = {
      displayName: formState.displayName.trim() === '',
      pricePerDay: formState.pricePerDay <= 0,
      area: formState.area <= 0,
      sleepingUnits: formState.sleepingUnits <= 0,
      aptFloor: formState.aptFloor < 0,
      aptNumber: formState.aptNumber < 0,
      type: formState.type.trim() === '',
    }

    setErrors(newErrors)
  }, [formState])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const accomodationId = Number(data.apartment?.accomodationId)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const { data } = await updateApartment({
        variables: {
          updateApartmentInput: {
            id: apartmentId,
            displayName: formState.displayName,
            pricePerDay: Number(formState.pricePerDay),
            area: Number(formState.area),
            sleepingUnits: Number(formState.sleepingUnits),
            aptFloor: Number(formState.aptFloor),
            aptNumber: Number(formState.aptNumber),
            accomodationId: accomodationId,
            type: formState.type,
          },
        },
      })
      if (data) {
        console.log('Update Successful:', data)
      }
    } catch (err) {
      console.error('Error:', err)
      // Optionally, show user-friendly error messages here
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <PlainTextInput
        textField={formState.displayName}
        onChange={handleInputChange}
        textError={errors.displayName}
        id="displayName"
        label="Display Name"
      />

      <NumericInput
        textField={formState.pricePerDay}
        onChange={handleInputChange}
        textError={errors.pricePerDay}
        id="pricePerDay"
        label="Price per Day"
      />

      <NumericInput
        textField={formState.area}
        onChange={handleInputChange}
        textError={errors.area}
        id="area"
        label="Area"
      />

      <NumericInput
        textField={formState.sleepingUnits}
        onChange={handleInputChange}
        textError={errors.sleepingUnits}
        id="sleepingUnits"
        label="Sleeping Units"
      />

      <NumericInput
        textField={formState.aptFloor}
        onChange={handleInputChange}
        textError={errors.aptFloor}
        id="aptFloor"
        label="Apartment Floor"
      />

      <NumericInput
        textField={formState.aptNumber}
        onChange={handleInputChange}
        textError={errors.aptFloor}
        id="aptNumber"
        label="Apartment Number"
      />

      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          name="type"
          value={formState.type}
          label="Type"
          onChange={handleSelectChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'STUDIO'}>STUDIO</MenuItem>
          <MenuItem value={'ONE_BEDROOM'}>ONE_BEDROOM</MenuItem>
          <MenuItem value={'TWO_BEDROOM'}>TWO_BEDROOM</MenuItem>
          <MenuItem value={'THREE_BEDROOM'}>THREE_BEDROOM</MenuItem>
          <MenuItem value={'PENTHOUSE'}>PENTHOUSE</MenuItem>
        </Select>
      </FormControl>
      <SubmitButton disabled={Object.values(errors).some((error) => error)}>
        {' '}
        Update{' '}
      </SubmitButton>
    </Box>
  )
}

export default UpdateApartmentForm
