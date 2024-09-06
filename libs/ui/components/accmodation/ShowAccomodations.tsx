import React from 'react'
import { Grid, CircularProgress, Pagination, Button } from '@mui/material'
import { useQuery } from '@apollo/client'
import { PAGINATION } from '@stayspot/network/clients/accomodations/queries'
import { useState } from 'react'
import { AccomodationCard } from './AccomodationCard'
import CreateAccomodationDialog from './CreateAccomodationDialog'
import { BaseDialog } from '../shared_components/BaseDialog'
import { useAuth } from '@stayspot/util/hooks/authContext'
import TransparentButton from '../shared_components/TransparentButton'

const CardsGrid: React.FC = () => {
  const [page, setPage] = useState(1)
  const [createAccomodations, setCreateAccomodations] = React.useState(false)
  const [limit] = useState(6) // Number of items per page
  const { uid } = useAuth()

  const handleCreateAccomodationsClose = (event, reason) => {
    if (reason === 'backdropClick') return
    setCreateAccomodations(false)
  }

  const handleCreateAccomodationsOpen = () => {
    setCreateAccomodations(true)
  }

  const { data, loading, error } = useQuery(PAGINATION, {
    variables: {
      paginationInput: {
        skip: (page - 1) * limit,
        take: limit,
        uid: uid,
      },
    },
    pollInterval: 10000,
  })

  if (loading) {
    return <CircularProgress />
  }

  if (!data) {
    return <p>No accomodations to display.</p>
  }

  if (error && data) {
    console.error('Error fetching accommodations:', error)
    return <p>Error loading accommodations.</p>
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const totalPages = Math.ceil(data?.paginationFilter?.totalCount / limit)
  console.log(data)
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <TransparentButton onClick={handleCreateAccomodationsOpen}>
          Create Accomodation
        </TransparentButton>
      </div>
      <BaseDialog
        handleClickOpen={createAccomodations}
        handleClose={handleCreateAccomodationsClose}
        title={'Create Accomodation'}
        text=""
        fullscreen={false}
      >
        <CreateAccomodationDialog />
      </BaseDialog>
      <Grid container spacing={2}>
        {data?.paginationFilter?.accomodations.map(
          (
            accommodation: {
              id: number
              displayName: string
              description: string
              images: string[]
              address: {
                lat
                lng
              }
            },
            index: number,
          ) => (
            <Grid item key={index} xs={12} sm={2} md={2}>
              <AccomodationCard
                title={accommodation.displayName}
                text={accommodation.description}
                photo={accommodation.images[0]}
                id={accommodation.id}
                lat={accommodation.address.lat}
                lng={accommodation.address.lng} // Assuming the first image is to be used
              />
            </Grid>
          ),
        )}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="secondary"
        sx={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  )
}

export default CardsGrid
