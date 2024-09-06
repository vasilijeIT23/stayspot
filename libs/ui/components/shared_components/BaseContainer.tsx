import { ReactNode } from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'

export interface IContainerProps {
  children: ReactNode
}

export const BaseContainer = ({ children }: IContainerProps) => (
  <Container component="main" maxWidth="sm">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Slightly more opaque for better visibility
        backdropFilter: 'blur(7px)',
        width: '100%', // Full width of the parent Container
        maxWidth: '400px', // Set a maximum width
        height: 'auto', // Adjust as needed
        padding: 3, // Add padding inside the Box
        borderRadius: 2, // Rounded corners
      }}
    >
      {children}
    </Box>
  </Container>
)
