import Box from '@mui/material/Box'
import { SubmitButton } from '../../shared_components/SubmitButton'
import { PlainTextInput } from './PlainTextInput'

interface FormState {
  displayName: string
  description: string
}

export interface ICompanyInputProps {
  formState: FormState
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  nameError: boolean
  descError: boolean
}

export const CompanyInput = ({
  formState,
  nameError,
  descError,
  onChange,
  onSubmit,
}: ICompanyInputProps) => (
  <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
    <PlainTextInput
      textField={formState.displayName}
      onChange={onChange}
      textError={nameError}
      id="displayName"
      label="Company Name"
    />
    <PlainTextInput
      textField={formState.description}
      onChange={onChange}
      textError={descError}
      id="description"
      label="Description"
    />
    <SubmitButton disabled={nameError || descError}>
      {' '}
      Create Company{' '}
    </SubmitButton>
  </Box>
)
