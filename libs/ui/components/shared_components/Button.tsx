import React from 'react'
import { Button as MuiButton } from '@mui/material'
import { styled } from '@mui/system'

// Define the styled MUI Button
const StyledButton = styled(MuiButton)(({ theme, variant }) => ({
  color: variant === 'outlined' ? '#252525' : '#ffffff',
  border: variant === 'outlined' ? '2px solid #000000' : 'none',
  backgroundColor: variant === 'outlined' ? 'transparent' : '#2e2d2d',
  padding: '8px 16px',
  margin: '10px 10px 10px 10px',
  borderRadius: '4px',
  fontSize: '14px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: variant === 'outlined' ? '#666768' : '#979797',
    color: variant === 'outlined' ? '#333333' : '#ffffff',
  },
}))

// Define the Button component
const Button = ({ onClick, children, variant = 'contained', ...props }) => {
  return (
    <StyledButton variant={variant} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
