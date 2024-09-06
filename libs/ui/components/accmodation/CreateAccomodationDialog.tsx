import { useState } from 'react'
import CreateAccomodationForm from './CreateAccomodationForm'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Hotel } from '@mui/icons-material'
import Grid from '@mui/material/Grid'

const CreateAccomodationDialog: React.FC = () => {
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
          <Hotel />
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
          Create Accomodation{' '}
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
        <CreateAccomodationForm />
      </Grid>
    </Grid>
  )
}

export default CreateAccomodationDialog
