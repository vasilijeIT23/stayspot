import Box from '@mui/material/Box'
import { EmailInput } from './EmailInput'
import { SubmitButton } from '../../shared_components/SubmitButton'
import { TextField } from '@mui/material'

interface FormState {
  oldEmail: string
  email: string
}

export interface IChangeEmailFormProps {
  formState: FormState
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  oldEmail: string
  newEmailError: boolean
}

export const ChangeEmailForm = ({
  formState,
  oldEmail,
  newEmailError,
  onChange,
  onSubmit,
}: IChangeEmailFormProps) => {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
      <TextField disabled={true} value={oldEmail} fullWidth />
      <EmailInput
        textField={formState.email}
        onChange={onChange}
        emailError={newEmailError}
      />
      <SubmitButton disabled={newEmailError}> Change Email </SubmitButton>
    </Box>
  )
}
