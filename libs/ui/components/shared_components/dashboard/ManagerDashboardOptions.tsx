import React from 'react'
import { BaseContainer } from '../BaseContainer'
import { BaseDialog } from '../BaseDialog'
import { useAuth } from '@stayspot/util/hooks/authContext'
import { useQuery } from '@apollo/client'
import { MANAGER } from '@stayspot/network/clients/managers/queries'
import { COMPANY } from '@stayspot/network/clients/companies/queries'
import Button from '../Button'
import CreateAccomodationDialog from '../../accmodation/CreateAccomodationDialog'
import ShowAccomodations from '../../accmodation/ShowAccomodations'

const ManagerOptions: React.FC = () => {
  const [viewAccomodations, setViewAccomodations] = React.useState(false)
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

  const handleViewAccomodationsClose = (event, reason) => {
    if (reason === 'backdropClick') return
    setViewAccomodations(false)
  }

  const handleViewAccomodationsOpen = () => {
    setViewAccomodations(true)
  }

  // if (company?.data?.company?.loading || manager?.data?.manager?.loading)
  //   return <p>Loading...</p>
  // if (manager?.data?.manager?.error)
  //   return <p>Error: {manager?.data?.manager?.error?.message}</p>
  // if (company?.data?.company?.error)
  //   return <p>Error: {company?.data?.company?.error?.message}</p>

  return (
    //<Dashboard />

    <BaseContainer>
      <Button onClick={handleViewAccomodationsOpen}>View Accomodations</Button>
      <BaseDialog
        handleClickOpen={viewAccomodations}
        handleClose={handleViewAccomodationsClose}
        title={'Accomodations'}
        text=""
        fullscreen={true}
      >
        <ShowAccomodations />
      </BaseDialog>
    </BaseContainer>
  )
}

export default ManagerOptions
