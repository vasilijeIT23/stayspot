import TextField from '@mui/material/TextField'

export interface IImageProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const MultipleImageInput = ({ onChange }: IImageProps) => (
  <TextField
    helperText="Upload image here."
    margin="normal"
    required
    fullWidth
    id="images"
    name="images"
    type="file"
    autoFocus
    inputProps={{ accept: 'image/*', multiple: true }}
    onChange={onChange}
  />
)
