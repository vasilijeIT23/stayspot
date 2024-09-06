import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Apartment, Book, Hotel } from '@mui/icons-material'
import Grid from '@mui/material/Grid'
import CreateBookingForm from './CreateBookingForm'

interface ICrateBookingDialog {
  apartmentId: number
  startDate: string
  endDate: string
  pricePerDay: number
}

const CreateBookingDialog: React.FC<ICrateBookingDialog> = ({
  apartmentId,
  startDate,
  endDate,
  pricePerDay,
}) => {
  // const [open, setOpen] = useState(false)

  // const handleClose = () => {
  //     setOpen(false)
  //   }

  //   const handleClickOpen = () => {
  //     setOpen(true)
  //   }
  return (
    <Grid container style={{ height: '70vh' }}>
      <Grid
        item
        xs={12}
        spacing={2}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Book />
        </Avatar>
      </Grid>

      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {' '}
          Book Apartment{' '}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CreateBookingForm
          apartmentId={apartmentId}
          startDate={startDate}
          endDate={endDate}
          pricePerDay={pricePerDay}
        />
      </Grid>
    </Grid>
  )
}

export default CreateBookingDialog
