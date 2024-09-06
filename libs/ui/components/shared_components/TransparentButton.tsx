import React from 'react'
import { Button as MuiButton } from '@mui/material'
import { styled } from '@mui/system'

// Define the styled MUI Button
const StyledButton = styled(MuiButton)(({ theme }) => ({
  color: '#252525', // Text color
  border: '2px solid #000000', // Black border
  backgroundColor: 'transparent', // Transparent background
  padding: '8px 16px',
  borderRadius: '4px',
  fontSize: '14px',
  transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth transitions
  '&:hover': {
    backgroundColor: '#666768', // Background color on hover
    color: '#333333', // Text color on hover
  },
}))

// Define the Button component
const TransparentButton = ({ onClick, children, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  )
}

export default TransparentButton
