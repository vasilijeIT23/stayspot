import Box from '@mui/material/Box'
import { SubmitButton } from '../../shared_components/SubmitButton'
import { PasswordInput } from './PasswordInput'

interface FormState {
  password: string
  repeatPassword: string
}

export interface IChangeEmailFormProps {
  formState: FormState
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  passwordError: boolean
}

export const ChangePasswordForm = ({
  formState,
  passwordError,
  onChange,
  onSubmit,
}: IChangeEmailFormProps) => {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
      <PasswordInput
        textField={formState.password}
        onChange={onChange}
        passwordError={passwordError}
        id="password"
        label="Password"
      />
      <PasswordInput
        textField={formState.repeatPassword}
        onChange={onChange}
        passwordError={passwordError}
        id="repeatPassword"
        label="Repeat Password"
      />
      <SubmitButton disabled={passwordError}> Change Password </SubmitButton>
    </Box>
  )
}
