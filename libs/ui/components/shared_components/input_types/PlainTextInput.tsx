import TextField from '@mui/material/TextField'

export interface IPlainTextInputProps {
  textField: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  textError: boolean
  id: string
  label: string
}

export const PlainTextInput = ({
  textField,
  onChange,
  textError,
  id,
  label,
}: IPlainTextInputProps) => (
  <TextField
    error={textError}
    helperText="Field cannot be empty!"
    name={id}
    required
    fullWidth
    id={id}
    label={label}
    autoFocus
    value={textField}
    onChange={onChange}
  />
)
