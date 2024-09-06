import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@apollo/client'
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
} from '@stayspot/network/clients/users/mutations'
import { ChangeEmailForm } from '../../components/ChangeEmailInput'
import { useAuth } from '@stayspot/util/hooks/authContext'
import { toast, ToastContainer } from '../shared_components/message/Toast'
import { BaseContainer } from '../shared_components/BaseContainer'
import { Email, EmailRounded, LockOpen } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { ChangePasswordForm } from '../../components/ChangePasswordInput'
import { IconPassword } from '@tabler/icons-react'
import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { BaseDialog } from '../shared_components/BaseDialog'
import ChangeEmailDialog from './changeEmailForm'
import ChangePasswordDialog from './changePasswordDialog'
import { PasswordInput } from '../shared_components/input_types/PasswordInput'

export interface IChangeCredentialsDialogProps {
  email: string
  password: string
}

const ChangeCredentialsDialog: React.FC<IChangeCredentialsDialogProps> = ({
  email,
  password,
}) => {
  const [openEmail, setOpenEmail] = React.useState(false)
  const [openPassword, setOpenPassword] = React.useState(false)

  const handleCloseEmail = (event, reason) => {
    if (reason && reason === 'backdropClick') return
    setOpenEmail(false)
  }

  const handleClickOpenEmail = () => {
    setOpenEmail(true)
  }

  const handleClosePassword = (event, reason) => {
    if (reason && reason === 'backdropClick') return
    setOpenPassword(false)
  }

  const handleClickOpenPassword = () => {
    setOpenPassword(true)
  }

  return (
    <>
      <BaseContainer>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5">
          {' '}
          Change Credentials{' '}
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClickOpenEmail}>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="overline">Change Email</Typography>
              </ListItemText>
            </ListItemButton>
            <BaseDialog
              handleClickOpen={openEmail}
              handleClose={handleCloseEmail}
              title="Change Email"
              text="Here you can change your email"
              fullscreen={false}
            >
              <ChangeEmailDialog oldEmail={email} />
            </BaseDialog>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClickOpenPassword}>
              <ListItemIcon>
                <IconPassword />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="overline">Change Password</Typography>
              </ListItemText>
            </ListItemButton>
            <BaseDialog
              handleClickOpen={openPassword}
              handleClose={handleClosePassword}
              title="Change Password"
              text="Here you can change your password"
              fullscreen={false}
            >
              <ChangePasswordDialog email={email} />
            </BaseDialog>
          </ListItem>
        </List>
      </BaseContainer>
      <ToastContainer />
    </>
  )
}

export default ChangeCredentialsDialog
