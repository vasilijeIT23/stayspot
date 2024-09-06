import React from 'react'
import { Grid, CircularProgress, Pagination, Button } from '@mui/material'
import { useQuery } from '@apollo/client'
import { PAGINATION } from '@stayspot/network/clients/apartments/queries'
import { useState } from 'react'
import { MultiActionAreaCard } from '../shared_components/CardComponent'
import { ApartmentCard } from './ApartmentCard'
import { number } from 'zod'
import { BaseDialog } from '../shared_components/BaseDialog'
import CreateApartmentDialog from './CreateApartmentDialog'
import TransparentButton from '../shared_components/TransparentButton'

interface IShowApartmentProps {
  accomodationId: number
}

const ShowApartments: React.FC<IShowApartmentProps> = ({ accomodationId }) => {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [limit] = useState(6) // Number of items per page

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const { data, loading, error } = useQuery(PAGINATION, {
    variables: {
      paginationInput: {
        skip: (page - 1) * limit,
        take: limit,
        accomodationId: accomodationId,
      },
    },
    pollInterval: 10000,
  })

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    console.error('Error fetching accommodations:', error)
    return <p>Error loading accommodations.</p>
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const totalPages = Math.ceil(
    data?.paginationFilterApartments?.totalCount / limit,
  )
  console.log(data)
  return (
    <div>
      <div>
        <div style={{ textAlign: 'center' }}>
          <TransparentButton onClick={handleClickOpen}>
            {' '}
            Add new appartment{' '}
          </TransparentButton>
        </div>
        <div style={{ marginTop: 20 }}></div>
        <BaseDialog
          text=""
          title="Create appartment"
          handleClickOpen={open}
          handleClose={handleClose}
          fullscreen={false}
        >
          <CreateApartmentDialog accomodationId={accomodationId} />
        </BaseDialog>
      </div>
      <Grid container spacing={2}>
        {data?.paginationFilterApartments?.apartments.map(
          (
            apartment: {
              id: number
              displayName: string
              pricePerDay: number
              type: string
              //   images: string[]
              //   address: {
              //     lat
              //     lng
              //   }
            },
            index: number,
          ) => (
            <Grid item key={index} xs={12} sm={2} md={2}>
              <ApartmentCard
                title={apartment.displayName}
                pricePerDay={apartment.pricePerDay}
                photo={'th-1049758360_kroko3'}
                apartmentId={apartment.id}
                role={1}
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

export default ShowApartments
