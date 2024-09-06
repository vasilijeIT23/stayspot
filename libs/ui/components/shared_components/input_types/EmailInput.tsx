import TextField from '@mui/material/TextField'

export interface IEmailProps {
  textField: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  emailError: boolean
}

export const EmailInput = ({
  textField,
  onChange,
  emailError,
}: IEmailProps) => (
  <TextField
    error={emailError}
    helperText="Please enter valid email."
    margin="normal"
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    type="email"
    autoComplete="email"
    autoFocus
    value={textField}
    onChange={onChange}
  />
)
