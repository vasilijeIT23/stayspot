import { useState } from 'react'
import Box from '@mui/material/Box'
import { CldImage } from 'next-cloudinary'
import React from 'react'
import { Typography, Grid } from '@mui/material'
import { BaseDialog } from '../shared_components/BaseDialog'
import ShowAvailableApartments from '../apartment/ShowAvailableApartments'
import TransparentButton from '../shared_components/TransparentButton'

export interface IUpdateAccomodationProps {
  accomodationId: number
  address: string
  displayName: string
  description: string
  images: string[]
  startDate: string
  endDate: string
  apartments: number[]
}

const ShowSingleAccomodation: React.FC<IUpdateAccomodationProps> = ({
  accomodationId,
  address,
  displayName,
  description,
  images,
  startDate,
  endDate,
  apartments,
}) => {
  const formState: IUpdateAccomodationProps = {
    accomodationId: accomodationId,
    address: address,
    displayName: displayName,
    description: description,
    images: images,
    startDate: startDate,
    endDate: endDate,
    apartments: apartments,
  }
  console.log(formState.accomodationId)
  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Hotel Name</Typography>
          <Typography variant="body1" color="textSecondary">
            {formState.displayName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1" color="textSecondary">
            {formState.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Address</Typography>
          <Typography variant="body1" color="textSecondary">
            {formState.address}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h6">Images</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
          mt: 2,
        }}
      >
        {formState.images.map((url, index) => (
          <CldImage
            width="300"
            height="200"
            src={url}
            sizes="100vw"
            alt="Image"
            style={{
              objectFit: 'cover', // Ensure image covers the container
              width: '100%',
              height: '100%',
            }}
          />
        ))}
      </Box>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <TransparentButton onClick={handleClickOpen}>
          Show Apartments
        </TransparentButton>
      </div>
      <BaseDialog
        handleClickOpen={open}
        handleClose={handleClose}
        text=""
        title="Apartments"
        fullscreen={true}
      >
        <ShowAvailableApartments
          startDate={formState.startDate}
          endDate={formState.endDate}
          accomodationId={formState.accomodationId}
          apartments={formState.apartments}
        />
      </BaseDialog>
    </Box>
  )
}

export default ShowSingleAccomodation
