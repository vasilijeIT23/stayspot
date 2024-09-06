import { useState } from 'react'
import CreateApartmentForm from './CreateApartmentForm'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Apartment, Hotel } from '@mui/icons-material'
import Grid from '@mui/material/Grid'

interface ICrateApartmentDialog {
  accomodationId: number
}

const CreateApartmentDialog: React.FC<ICrateApartmentDialog> = ({
  accomodationId,
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
          <Apartment />
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
          Create Apartment{' '}
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
        <CreateApartmentForm accomodationId={accomodationId} />
      </Grid>
    </Grid>
  )
}

export default CreateApartmentDialog
