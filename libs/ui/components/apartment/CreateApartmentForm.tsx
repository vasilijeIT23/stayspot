import { useAuth } from '@stayspot/util/hooks/authContext'
import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { CREATE_APARTMENT } from '@stayspot/network/clients/apartments/mutations'
import Box from '@mui/material/Box'
import { PlainTextInput } from '../shared_components/input_types/PlainTextInput'
import { NumericInput } from '../shared_components/input_types/NumericInput'
import { SubmitButton } from '../shared_components/SubmitButton'
import { Button } from '@mui/material'
import { useCloudinaryUpload } from '@stayspot/util/hooks/cloudinary'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'

interface ICreateApartmentProps {
  accomodationId: number
}

const CreateApartmentForm: React.FC<ICreateApartmentProps> = ({
  accomodationId,
}) => {
  const { uploading, upload, download } = useCloudinaryUpload()
  const { uid, roles } = useAuth()
  const [files, setFiles] = useState<File[]>([])
  const [imageURLs, setImageURLs] = useState<string[]>([])
  const [createApartment] = useMutation(CREATE_APARTMENT)

  const [formState, setFormState] = useState({
    displayName: '',
    pricePerDay: 0,
    area: 0,
    sleepingUnits: 0,
    aptFloor: 0,
    aptNumber: 0,
    type: 'STUDIO',
    errors: {
      displayName: false,
      pricePerDay: false,
      area: false,
      sleepingUnits: false,
      aptFloor: false,
      aptNumber: false,
      type: false,
    },
  })

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

    setFormState((prevState) => ({
      ...prevState,
      errors: newErrors,
    }))
  }, [
    formState.displayName,
    formState.pricePerDay,
    formState.area,
    formState.sleepingUnits,
    formState.aptFloor,
    formState.aptNumber,
    formState.type,
  ])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const { data } = await createApartment({
        variables: {
          createApartmentInput: {
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
        console.log('Creation Successful:', data)
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
        textError={formState.errors.displayName}
        id="displayName"
        label="Display Name"
      />

      <NumericInput
        textField={formState.pricePerDay}
        onChange={handleInputChange}
        textError={formState.errors.pricePerDay}
        id="pricePerDay"
        label="Price per Day"
      />

      <NumericInput
        textField={formState.area}
        onChange={handleInputChange}
        textError={formState.errors.area}
        id="area"
        label="Area"
      />

      <NumericInput
        textField={formState.sleepingUnits}
        onChange={handleInputChange}
        textError={formState.errors.sleepingUnits}
        id="sleepingUnits"
        label="Sleeping Units"
      />

      <NumericInput
        textField={formState.aptFloor}
        onChange={handleInputChange}
        textError={formState.errors.aptFloor}
        id="aptFloor"
        label="Apartment Floor"
      />

      <NumericInput
        textField={formState.aptNumber}
        onChange={handleInputChange}
        textError={formState.errors.aptNumber}
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
        <FormHelperText error={formState.errors.type}>
          Type is required
        </FormHelperText>
      </FormControl>

      <SubmitButton
        disabled={Object.values(formState.errors).some((error) => error)}
      >
        Create
      </SubmitButton>
    </Box>
  )
}

export default CreateApartmentForm
