import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import { CldImage } from 'next-cloudinary'
import { useState } from 'react'
import { BaseDialog } from './BaseDialog'
import UpdateAccomodationForm from '../accmodation/UpdateAccomodationForm'
import { DELETE_ACCOMODATION } from '@stayspot/network/clients/accomodations/mutations'
import { useMutation } from '@apollo/client'

interface ICardProps {
  title: string
  text: string
  photo: string
  id: number
  lat: number
  lng: number
}

export const MultiActionAreaCard: React.FC<ICardProps> = ({
  title,
  text,
  photo,
  id,
  lat,
  lng,
}) => {
  const [deleteAccomodation] = useMutation(DELETE_ACCOMODATION)
  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleDelete = () => {
    deleteAccomodation({
      variables: {
        removeAccomodationId: id,
      },
    })
  }

  console.log(id)
  return (
    <Card sx={{ maxWidth: 300, height: '100%' }}>
      <CardActionArea sx={{ height: '88%' }}>
        <CardMedia
          component="div"
          sx={{
            height: 200, // Fixed height for the image
            width: '100%', // Full width
            overflow: 'hidden', // Ensure content does not overflow
          }}
        >
          <CldImage
            width="300"
            height="200"
            src={photo}
            sizes="100vw"
            alt="Image"
            style={{
              objectFit: 'cover', // Ensure image covers the container
              width: '100%',
              height: '100%',
            }}
          />
        </CardMedia>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          Update
        </Button>
        <BaseDialog
          handleClickOpen={open}
          handleClose={handleClose}
          title="Update Accomodation"
          text="Here you can update your Accomodation"
          fullscreen={false}
        >
          <UpdateAccomodationForm accomodationId={id} lat={lat} lng={lng} />
        </BaseDialog>
        <Button size="small" color="primary" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}
