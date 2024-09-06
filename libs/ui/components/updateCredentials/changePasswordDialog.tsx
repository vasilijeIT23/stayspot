import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CHANGE_PASSWORD } from '@stayspot/network/clients/users/mutations'
import { useAuth } from '@stayspot/util/hooks/authContext'
import { toast, ToastContainer } from '../shared_components/message/Toast'
import { BaseContainer } from '../shared_components/BaseContainer'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { ChangePasswordForm } from '../shared_components/input_types/ChangePasswordInput'
import { IconPassword } from '@tabler/icons-react'

export interface IChangePasswordDialogProps {
  email: string
}

const ChangePasswordDialog: React.FC<IChangePasswordDialogProps> = ({
  email,
}) => {
  const { logout } = useAuth()
  const [formState, setFormState] = useState({
    password: '',
    repeatPassword: '',
    errors: {
      password: false,
    },
  })
  const [changePassword] = useMutation(CHANGE_PASSWORD)

  // Validate form inputs and set errors
  useEffect(() => {
    const newErrors = {
      password:
        formState.password.length <= 7 ||
        formState.password !== formState.repeatPassword,
    }
    setFormState((prevState) => ({
      ...prevState,
      errors: newErrors,
    }))
  }, [formState.password, formState.repeatPassword])

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
      const { data } = await changePassword({
        variables: {
          changePasswordInput: {
            email: email,
            newPassword: formState.password,
          },
        },
      })

      if (data) {
        toast('Password changed successfully!')
        logout()
      } else {
        toast('Invalid Input')
      }
    } catch (error) {
      toast('Error changing password: ' + error.message)
      console.error('Error changing password:', error)
    }
  }

  const { errors } = formState

  return (
    <>
      <BaseContainer>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <IconPassword />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>

        <ChangePasswordForm
          formState={formState}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          passwordError={errors.password}
        />
      </BaseContainer>
      <ToastContainer />
    </>
  )
}

export default ChangePasswordDialog
