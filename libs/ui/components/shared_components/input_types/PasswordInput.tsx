import TextField from '@mui/material/TextField'

export interface IPasswordProps {
  textField: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  passwordError: boolean
  id: string
  label: string
}

export const PasswordInput = ({
  textField,
  onChange,
  passwordError,
  id,
  label,
}: IPasswordProps) => (
  <TextField
    error={passwordError}
    helperText="Password must contain at least 8 characters."
    margin="normal"
    required
    fullWidth
    id={id}
    label={label}
    name={id}
    type="password"
    autoFocus
    value={textField}
    onChange={onChange}
  />
)
