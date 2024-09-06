import * as React from 'react'
import TransparentButton from './TransparentButton'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export interface IDialogProps {
  handleClickOpen: boolean
  handleClose: (event: any, reason: any) => void
  title: string
  text: string
  fullscreen: boolean
  children: React.ReactNode
}

export const BaseDialog = ({
  handleClickOpen,
  handleClose,
  title,
  text,
  children,
  fullscreen,
}: IDialogProps) => {
  return (
    <React.Fragment>
      <Dialog
        open={handleClickOpen}
        onClose={handleClose}
        fullScreen={fullscreen}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <TransparentButton onClick={handleClose}>Cancel</TransparentButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
