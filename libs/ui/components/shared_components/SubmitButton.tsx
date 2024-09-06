import Button from '@mui/material/Button'
import { ReactNode } from 'react'

export interface ISubmitButtonProps {
  children: ReactNode
  disabled: boolean
}

export const SubmitButton = ({ disabled, children }: ISubmitButtonProps) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    disabled={disabled}
    sx={{
      mt: 3,
      mb: 2,
      backgroundColor: 'black',
      '&:hover': { backgroundColor: 'lightgray' },
    }}
  >
    {children}
  </Button>
)
