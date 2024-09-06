import Box from '@mui/material/Box'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'
import { SubmitButton } from '../../shared_components/SubmitButton'
import React from 'react'

interface FormState {
  email: string
  password: string
}

export interface ILoginFormProps {
  formState: FormState
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  emailError: boolean
  passwordError: boolean
}

export const LoginForm = ({
  formState,
  emailError,
  passwordError,
  onChange,
  onSubmit,
}: ILoginFormProps) => (
  <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
    <EmailInput
      textField={formState.email}
      onChange={onChange}
      emailError={emailError}
    />
    <PasswordInput
      textField={formState.password}
      onChange={onChange}
      passwordError={passwordError}
      id="password"
      label="Password"
    />
    <SubmitButton disabled={emailError || passwordError}>
      {' '}
      Sign In{' '}
    </SubmitButton>
  </Box>
)
