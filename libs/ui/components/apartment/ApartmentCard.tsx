import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import { CldImage } from 'next-cloudinary'
import { useState } from 'react'
import { BaseDialog } from '../shared_components/BaseDialog'
import { DELETE_APARTMENT } from '@stayspot/network/clients/apartments/mutations'
import { useMutation } from '@apollo/client'
import UpdateApartmentForm from './UpdateApartmentForm'
import ShowApartmentDetails from './SingleApartmentDetails'
import CreateBookingDialog from '../booking/CreateBookingDialog'
import TransparentButton from '../shared_components/TransparentButton'

interface ICardProps {
  title: string
  pricePerDay: number
  photo: string
  apartmentId: number
  role?: number
  startDate?: string
  endDate?: string
}

export const ApartmentCard: React.FC<ICardProps> = ({
  title,
  pricePerDay,
  photo,
  apartmentId,
  role,
  startDate,
  endDate,
}) => {
  const [deleteApartment] = useMutation(DELETE_APARTMENT)
  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const [openBooking, setOpenBooking] = useState(false)
  const handleBookingClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return
    setOpenBooking(false)
  }

  const handleBookingClickOpen = () => {
    setOpenBooking(true)
  }

  const handleDelete = () => {
    deleteApartment({
      variables: {
        removeApartmentId: apartmentId,
      },
    })
  }

  return (
    <Card sx={{ maxWidth: 300, height: '100%' }}>
      <CardActionArea sx={{ height: '83%' }}>
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
            {pricePerDay}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {role ? (
          <>
            <TransparentButton
              size="small"
              color="primary"
              onClick={handleClickOpen}
            >
              Update
            </TransparentButton>
            <BaseDialog
              handleClickOpen={open}
              handleClose={handleClose}
              title="Update Accomodation"
              text="Here you can update your Accomodation"
              fullscreen={false}
            >
              <UpdateApartmentForm apartmentId={apartmentId} />
            </BaseDialog>
            <TransparentButton
              size="small"
              color="primary"
              onClick={handleDelete}
            >
              Delete
            </TransparentButton>
          </>
        ) : (
          <>
            <TransparentButton
              size="small"
              color="primary"
              onClick={handleClickOpen}
            >
              See Details
            </TransparentButton>
            <BaseDialog
              handleClickOpen={open}
              handleClose={handleClose}
              title="Apartment"
              text=""
              fullscreen={false}
            >
              <ShowApartmentDetails apartmentId={apartmentId} />
            </BaseDialog>
            <TransparentButton
              size="small"
              color="primary"
              onClick={handleBookingClickOpen}
            >
              Book
            </TransparentButton>
            <BaseDialog
              handleClickOpen={openBooking}
              handleClose={handleBookingClose}
              title="Book This Apartment"
              text=""
              fullscreen={false}
            >
              <CreateBookingDialog
                apartmentId={apartmentId}
                startDate={startDate}
                endDate={endDate}
                pricePerDay={pricePerDay}
              />
            </BaseDialog>
          </>
        )}
      </CardActions>
    </Card>
  )
}
