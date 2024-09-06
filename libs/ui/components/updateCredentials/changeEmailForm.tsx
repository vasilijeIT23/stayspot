import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { CHANGE_EMAIL } from '@stayspot/network/clients/users/mutations'
import { ChangeEmailForm } from '../shared_components/input_types/ChangeEmailInput'
import { useAuth } from '@stayspot/util/hooks/authContext'
import { toast, ToastContainer } from '../shared_components/message/Toast'
import { BaseContainer } from '../shared_components/BaseContainer'
import { EmailRounded } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

export interface IChangeEmailDialogProps {
  oldEmail: string
}

const ChangeEmailDialog: React.FC<IChangeEmailDialogProps> = ({ oldEmail }) => {
  const { logout } = useAuth()
  const [formState, setFormState] = useState({
    email: '',
    oldEmail: oldEmail,
    errors: {
      email: false,
    },
  })
  const [changeEmail] = useMutation(CHANGE_EMAIL)
  const { replace } = useRouter()

  // Validate form inputs and set errors
  useEffect(() => {
    const newErrors = {
      email:
        !formState.email.includes('@') || !formState.email.includes('.com'),
    }
    setFormState((prevState) => ({
      ...prevState,
      errors: newErrors,
    }))
  }, [formState.email])

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
      const { data } = await changeEmail({
        variables: {
          changeEmailInput: {
            email: formState.oldEmail,
            newEmail: formState.email,
          },
        },
      })

      if (data) {
        toast('Email changed successfully!')
        logout()
        replace('/login')
      } else {
        toast('Invalid Input')
      }
    } catch (error) {
      toast('Error changing email: ' + error.message)
      console.error('Error changing email:', error)
    }
  }

  const { errors } = formState

  return (
    <>
      <BaseContainer>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <EmailRounded />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Email
        </Typography>

        <ChangeEmailForm
          formState={formState}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          oldEmail={oldEmail}
          newEmailError={errors.email}
        />
      </BaseContainer>
      <ToastContainer />
    </>
  )
}

export default ChangeEmailDialog
