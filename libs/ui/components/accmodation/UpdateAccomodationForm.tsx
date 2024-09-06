import { useAuth } from '@stayspot/util/hooks/authContext'
import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { MANAGER } from '@stayspot/network/clients/managers/queries'
import { COMPANY } from '@stayspot/network/clients/companies/queries'
import {
  CREATE_ACCOMODATION,
  UPDATE_ACCOMODATION,
} from '@stayspot/network/clients/accomodations/mutations'
import Box from '@mui/material/Box'
import { PlainTextInput } from '../shared_components/input_types/PlainTextInput'
import { MultipleImageInput } from '../shared_components/input_types/MultipleImageInput'
import { SubmitButton } from '../shared_components/SubmitButton'
import { Button } from '@mui/material'
import { useCloudinaryUpload } from '@stayspot/util/hooks/cloudinary'
import { PickPlaceMap } from '../shared_components/map/PickPlaceMap'
import { GET_ACCOMODATION } from '@stayspot/network/clients/accomodations/queries'
import TransparentButton from '../shared_components/TransparentButton'

export interface IUpdateAccomodationProps {
  accomodationId: number
  lat: number
  lng: number
}

const UpdateAccomodationForm: React.FC<IUpdateAccomodationProps> = ({
  accomodationId,
  lat,
  lng,
}) => {
  const { uploading, upload } = useCloudinaryUpload()
  const { uid, roles } = useAuth()
  const [files, setFiles] = useState<File[]>([])
  const [imageURLs, setImageURLs] = useState<string[]>([])
  const [updateAccomodation] = useMutation(UPDATE_ACCOMODATION)

  const { data, loading, error } = useQuery(GET_ACCOMODATION, {
    variables: { accomodationId },
  })

  const [formState, setFormState] = useState({
    displayName: '',
    description: '',
    address: '',
    images: [],
    companyId: '',
    errors: {
      displayName: false,
      description: false,
      address: false,
    },
  })

  const [marker, setMarker] = useState({
    latitude: lat,
    longitude: lng,
  })

  useEffect(() => {
    if (data) {
      setFormState((prevState) => ({
        ...prevState,
        displayName: data.accomodation?.displayName || '',
        description: data.accomodation?.description || '',
        address: data.accomodation?.address?.address || '',
        images: data.accomodation?.images || [],
        companyId: data.accomodation?.companyId,
      }))
    }
  }, [data])

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      errors: {
        displayName: prevState.displayName.length <= 1,
        description: prevState.description.length <= 1,
        address: prevState.address.length <= 1,
      },
    }))
  }, [formState.displayName, formState.description, formState.address])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      const newFileURLs = newFiles.map((file) => URL.createObjectURL(file))

      setImageURLs((prevURLs) => [...prevURLs, ...newFileURLs])
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const clearImages = () => {
    setImageURLs([])
    setFiles([])
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      // Handle image uploads
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const result = await upload(file)
          return result.data.public_id
        }),
      )

      const newFormState = {
        ...formState,
        images: uploadedImages.length > 0 ? uploadedImages : formState.images,
      }

      const { data } = await updateAccomodation({
        variables: {
          updateAccomodationInput: {
            id: accomodationId,
            ...newFormState, // Include all necessary fields
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
        onChange={handleInputChange}
        textField={formState.displayName}
        textError={formState.errors.displayName}
        id="displayName"
        label="Accommodation Name"
      />
      <PlainTextInput
        onChange={handleInputChange}
        textField={formState.description}
        textError={formState.errors.description}
        id="description"
        label="Description"
      />
      <MultipleImageInput onChange={handleFileChange} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
          mt: 2,
        }}
      >
        {imageURLs.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded Preview ${index}`}
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
        ))}
      </Box>
      <TransparentButton onClick={clearImages}>Clear</TransparentButton>
      <div style={{ marginTop: 20 }}></div>
      <PlainTextInput
        onChange={handleInputChange}
        textField={formState.address}
        textError={formState.errors.address}
        id="address"
        label="Address"
      />
      <PickPlaceMap marker={marker} setMarker={setMarker} />
      <SubmitButton
        disabled={Object.values(formState.errors).some((error) => error)}
      >
        Update
      </SubmitButton>
    </Box>
  )
}

export default UpdateAccomodationForm
