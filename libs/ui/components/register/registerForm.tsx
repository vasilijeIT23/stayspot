'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '@stayspot/network/clients/users/mutations'

import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { BaseContainer } from '../shared_components/BaseContainer'
import { SubmitButton } from '../shared_components/SubmitButton'
import { RegisterInputForm } from '../../components/shared_components/input_types/RegisterInput'
import { useCloudinaryUpload } from '@stayspot/util/hooks/cloudinary'
import Box from '@mui/material/Box'
import React from 'react'
import { ImageInput } from '../shared_components/input_types/ImageInput'

const RegisterForm: React.FC = () => {
  const defaultImage = '../../../apps/web/public/name.png'
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
    image: defaultImage,
    errors: {
      email: false,
      password: false,
      firstName: false,
      lastName: false,
    },
  })
  const [file, setFile] = useState<File | null>(null)
  const { uploading, upload, download } = useCloudinaryUpload()
  const [registerUser] = useMutation(REGISTER_USER)
  const { replace } = useRouter()

  useEffect(() => {
    const newErrors = {
      email:
        !formState.email.includes('@') || !formState.email.includes('.com'),
      password:
        formState.password.length <= 7 ||
        formState.password !== formState.repeatPassword,
      firstName: formState.firstName.length <= 1,
      lastName: formState.lastName.length <= 1,
    }

    setFormState((prevState) => ({
      ...prevState,
      errors: newErrors,
    }))
  }, [
    formState.email,
    formState.password,
    formState.repeatPassword,
    formState.firstName,
    formState.lastName,
  ])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile)
      setFormState((prevState) => ({
        ...prevState,
        image: fileURL,
      }))
      setFile(selectedFile)
    }
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
      const cloudImage = upload(file)
      const id = (await cloudImage).data.public_id
      const { data } = await registerUser({
        variables: {
          registerUserInput: {
            email: formState.email,
            password: formState.password,
            name: formState.firstName + ' ' + formState.lastName,
            image: id, // Adjust as needed
          },
        },
      })
      console.log('User registered successfully:', data)
      replace('/login')
    } catch (error) {
      console.error('Error registering user:', error)
      // Provide user feedback for the error
    }
  }

  const { errors } = formState

  return (
    <>
      <div style={{ marginTop: 150 }}></div>
      <BaseContainer>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <RegisterInputForm
            formState={formState}
            emailError={errors.email}
            passwordError={errors.password}
            firstNameError={errors.firstName}
            lastNameError={errors.lastName}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
          <Grid item xs={12}>
            <ImageInput image={formState.image} onChange={handleFileChange} />
            {formState.image && (
              <img
                src={formState.image}
                alt="Selected or Default"
                style={{ width: '345px', height: '300px' }}
              />
            )}
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <SubmitButton disabled={Object.values(errors).some((error) => error)}>
            Sign Up
          </SubmitButton>
        </Box>
      </BaseContainer>
    </>
  )
}

export default RegisterForm
