import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Create, Business } from '@mui/icons-material'
import { BaseContainer } from '../BaseContainer'
import { useAuth } from '@stayspot/util/hooks/authContext'
import { useQuery } from '@apollo/client'
import { MANAGER } from '@stayspot/network/clients/managers/queries'
import { COMPANY } from '@stayspot/network/clients/companies/queries'

const Company: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const { uid, roles } = useAuth()
  const manager = useQuery(MANAGER, {
    variables: {
      uid: uid,
    },
  })
  const company = useQuery(COMPANY, {
    variables: {
      companyId: manager?.data?.manager?.companyId,
    },
  })

  // const handleClose = () => {
  //   setOpen(false)
  // }

  // const handleClickOpen = () => {
  //   setOpen(true)
  // }
  if (company?.data?.company?.loading || manager?.data?.manager?.loading)
    return <p>Loading...</p>
  if (manager?.data?.manager?.error)
    return <p>Error: {manager?.data?.manager?.error?.message}</p>
  if (company?.data?.company?.error)
    return <p>Error: {company?.data?.company?.error?.message}</p>

  return (
    <BaseContainer>
      <Grid container spacing={2} marginLeft={5}>
        <Grid item xs={8} marginLeft={10}>
          <Typography variant="overline" fontSize={17}>
            Your Company
          </Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <CldImage
            width="200"
            height="160"
            src={data?.findOne?.user?.image}
            sizes="100vw"
            alt="Profile image"
          />
        </Grid> */}
      </Grid>
      <Grid item xs={12}>
        <List
          sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2 }}
        >
          <ListItem
            disablePadding
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="overline">
                {company?.data?.company?.displayName}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="overline">
                {company?.data?.company?.createdAt}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        {/* <ListItem disablePadding>
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
              <Crede />
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
          >
            <ChangeCredentialsDialog
              email={data?.findOne?.user?.credentials?.email}
              password={data?.findOne?.user?.credentials?.password}
            />
          </BaseDialog>
        </ListItem> */}
      </Grid>
    </BaseContainer>
  )
}

export default Company
