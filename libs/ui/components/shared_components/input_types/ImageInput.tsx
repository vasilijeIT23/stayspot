import TextField from '@mui/material/TextField'

export interface IImageProps {
  image: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ImageInput = ({ image, onChange }: IImageProps) => (
  <TextField
    helperText="Upload image here."
    margin="normal"
    required
    fullWidth
    id="image"
    name="image"
    type="file"
    autoFocus
    inputProps={{ accept: 'image/*' }}
    onChange={onChange}
  />
)
