import TextField from '@mui/material/TextField'

export interface INumericInputProps {
  textField: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  textError: boolean
  id: string
  label: string
}

export const NumericInput = ({
  textField,
  onChange,
  textError,
  id,
  label,
}: INumericInputProps) => (
  <TextField
    error={textError}
    type="number"
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
