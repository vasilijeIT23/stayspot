import { BaseContainer } from '../BaseContainer'
import { ReactNode } from 'react'
import { useAuth } from '@stayspot/util/hooks/authContext'
import Grid from '@mui/material/Grid'
import Button from '../Button'
import React from 'react'
import Title from './Title'
import Profile from './Profile'
import Company from './Company'
import ManagerOptions from './ManagerDashboardOptions'
import { useRouter } from 'next/navigation'
import { BaseDialog } from '../BaseDialog'
import BookingsTable from '../../booking/LoggedUserBookings'

export interface IDashboardProps {
  children: ReactNode
}

const Dashboard: React.FC = () => {
  const [managerOpen, setManagerOpen] = React.useState(false)
  const [customerOpen, setCustomerOpen] = React.useState(false)
  const [loggedUserBookingsOpen, setLoggedUserBookingsOpen] =
    React.useState(false)
  const { roles, uid } = useAuth()
  const { replace } = useRouter()

  const handleManagerOpen = () => {
    setManagerOpen(true)
  }

  const handleCustomerOpen = () => {
    setCustomerOpen(true)
  }

  const back = () => {
    setCustomerOpen(false)
    setManagerOpen(false)
  }

  const handleLoggedUserBookingsOpen = () => {
    setLoggedUserBookingsOpen(true)
  }

  const handleLoggedUserBookingsClose = () => {
    setLoggedUserBookingsOpen(false)
  }

  return (
    <>
      {!customerOpen && !managerOpen ? (
        <Grid container style={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            style={{
              marginLeft: 170,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BaseContainer>
              <div>
                <Title> Choose account </Title>
              </div>

              <div>
                {roles[1] != null ? (
                  <Button onClick={handleManagerOpen}> Manager </Button>
                ) : (
                  <>
                    {' '}
                    <div>
                      <Button
                        onClick={() => replace('/createCompany')}
                        sx={{ color: 'black' }}
                      >
                        Create your company
                      </Button>
                    </div>
                  </>
                )}
                {roles[2] != null ? (
                  <Button onClick={handleCustomerOpen}> Customer </Button>
                ) : (
                  <></>
                )}
              </div>
            </BaseContainer>
          </Grid>
        </Grid>
      ) : (
        <div style={{ marginTop: 100 }}>
          <Button onClick={back}>Back</Button>
        </div>
      )}

      {customerOpen ? (
        <Grid container spacing={1} style={{ height: '70vh' }}>
          {/* Left side - 70% width */}
          <Grid
            item
            xs={12}
            sm={7}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BaseContainer>
              <Button onClick={handleLoggedUserBookingsOpen}>
                See Bookings
              </Button>
              <BaseDialog
                handleClickOpen={loggedUserBookingsOpen}
                handleClose={handleLoggedUserBookingsClose}
                title="Bookings"
                text=""
                fullscreen={true}
              >
                <BookingsTable uid={uid} flag={0} />
              </BaseDialog>
            </BaseContainer>
          </Grid>

          {/* Right side - 30% width */}
          <Grid
            item
            xs={12}
            sm={5}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      {managerOpen ? (
        <Grid container spacing={1} style={{ width: '110vw', height: '50vh' }}>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Company />
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
            <ManagerOptions />
            <BaseContainer>
              <Button onClick={handleLoggedUserBookingsOpen}>
                See Bookings
              </Button>
              <BaseDialog
                handleClickOpen={loggedUserBookingsOpen}
                handleClose={handleLoggedUserBookingsClose}
                title="Bookings"
                text=""
                fullscreen={true}
              >
                <BookingsTable uid={uid} flag={1} />
              </BaseDialog>
            </BaseContainer>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  )
}

export default Dashboard
