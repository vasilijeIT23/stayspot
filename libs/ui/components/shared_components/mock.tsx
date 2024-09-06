import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import { CldImage } from 'next-cloudinary'

interface ICardProps {
  title: string
  text: string
  photo: string
}

export const MultiActionAreaCard: React.FC<ICardProps> = ({
  title,
  text,
  photo,
}) => {
  return (
    <Card sx={{ maxWidth: 300, height: '100%' }}>
      <CardActionArea sx={{ height: '95%' }}>
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
            alt="Accommodation image"
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
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  )
}
