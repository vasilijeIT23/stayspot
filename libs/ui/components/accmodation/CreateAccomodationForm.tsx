import { useAuth } from '@stayspot/util/hooks/authContext'
import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { MANAGER } from '@stayspot/network/clients/managers/queries'
import { COMPANY } from '@stayspot/network/clients/companies/queries'
import { CREATE_ACCOMODATION } from '@stayspot/network/clients/accomodations/mutations'
import Box from '@mui/material/Box'
import { PlainTextInput } from '../shared_components/input_types/PlainTextInput'
import { MultipleImageInput } from '../shared_components/input_types/MultipleImageInput'
import { SubmitButton } from '../shared_components/SubmitButton'
import TransparentButton from '../shared_components/TransparentButton'
import { useCloudinaryUpload } from '@stayspot/util/hooks/cloudinary'
import { PickPlaceMap } from '../shared_components/map/PickPlaceMap'

const CreateAccomodationForm: React.FC = () => {
  const { uploading, upload, download } = useCloudinaryUpload()
  const { uid, roles } = useAuth()
  const [files, setFiles] = useState<File[]>([])
  const [imageURLs, setImageURLs] = useState<string[]>([])
  const [createAccommodation] = useMutation(CREATE_ACCOMODATION)
  const [formState, setFormState] = useState({
    displayName: '',
    description: '',
    address: '',
    images: [''],
    errors: {
      displayName: false,
      description: false,
      address: false,
    },
  })
  const manager = useQuery(MANAGER, {
    variables: { uid },
  })

  const company = useQuery(COMPANY, {
    variables: { companyId: manager?.data?.manager?.companyId },
  })

  const companyId = Number(company?.data?.company?.id)

  const [marker, setMarker] = useState({
    latitude: 45,
    longitude: 45,
  })

  useEffect(() => {
    // Validate form fields and update the errors in formState
    setFormState((prevState) => ({
      ...prevState,
      errors: {
        displayName: prevState.displayName.length <= 1,
        description: prevState.description.length <= 1,
        address: prevState.address.length <= 1,
      },
    }))
  }, [formState.displayName, formState.description, formState.address])

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
        images: uploadedImages,
      }

      const { data } = await createAccommodation({
        variables: {
          createAccomodationWithAddressInput: {
            displayName: newFormState.displayName,
            description: newFormState.description,
            images: newFormState.images,
            companyId: companyId,
            address: newFormState.address,
            lat: marker.latitude,
            lng: marker.longitude,
          },
        },
      })
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
        Create
      </SubmitButton>
    </Box>
  )
}

export default CreateAccomodationForm
