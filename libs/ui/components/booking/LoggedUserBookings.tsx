import React from 'react'
import { useQuery, gql } from '@apollo/client'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'
import {
  GET_BOOKINGS,
  GET_BY_COMPANY,
} from '@stayspot/network/clients/bookings/queries'
import { useAuth } from '@stayspot/util/hooks/authContext'

// Define the component
const BookingsTable = ({ uid, flag }) => {
  const { roles } = useAuth()
  if (flag == 0) {
    const { loading, error, data } = useQuery(GET_BOOKINGS, {
      variables: { uid },
    })

    if (loading) return <Typography>Loading...</Typography>
    if (error)
      return <Typography color="error">Error: {error.message}</Typography>

    // Extract bookings data
    const bookings = data.findByUser

    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Your Bookings
        </Typography>
        {bookings.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(booking.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(booking.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${booking.totalPrice.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No bookings found.</Typography>
        )}
      </div>
    )
  }

  if (flag == 1) {
    const { loading, error, data } = useQuery(GET_BY_COMPANY, {
      variables: { uid },
    })

    if (loading) return <Typography>Loading...</Typography>
    if (error)
      return <Typography color="error">Error: {error.message}</Typography>

    // Extract bookings data
    const bookings = data.findBookingsByCompany

    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Your Bookings
        </Typography>
        {bookings.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(booking.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(booking.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${booking.totalPrice.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No bookings found.</Typography>
        )}
      </div>
    )
  }
}

export default BookingsTable
