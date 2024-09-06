import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Person, Create, Email, LockOpen } from '@mui/icons-material'
import { CldImage } from 'next-cloudinary'
import { BaseContainer } from '../BaseContainer'
import { BaseDialog } from '../BaseDialog'
import ChangeCredentialsDialog from '../../updateCredentials/ChangeCredentialsDialog'
import { useAuth } from '@stayspot/util/hooks/authContext'
import { useQuery } from '@apollo/client'
import { USER } from '@stayspot/network/clients/users/queries'

const Profile: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const { uid } = useAuth()
  const { data, loading, error } = useQuery(USER, {
    variables: {
      getUserInput: {
        uid: uid,
      },
    },
  })

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  console.log(data)
  return (
    <BaseContainer>
      <Grid container spacing={2} marginLeft={17}>
        <Grid item xs={8} marginLeft={4.5}>
          <Typography variant="overline" fontSize={17}>
            Your Profile
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CldImage
            width="200"
            height="160"
            src={data?.findOne?.user?.image}
            sizes="100vw"
            alt="Profile image"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <List sx={{ marginTop: 2 }}>
          <ListItem disablePadding>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="overline">
                {data?.findOne?.user?.name}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="overline">
                {data?.findOne?.user?.createdAt}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
              <LockOpen />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="overline">Change Credentials</Typography>
            </ListItemText>
          </ListItemButton>
          <BaseDialog
            handleClickOpen={open}
            handleClose={handleClose}
            title="Change Credentials"
            text="Here you can change your credentials"
            fullscreen={false}
          >
            <ChangeCredentialsDialog
              email={data?.findOne?.user?.credentials?.email}
              password={data?.findOne?.user?.credentials?.password}
            />
          </BaseDialog>
        </ListItem>
      </Grid>
    </BaseContainer>
  )
}

export default Profile
