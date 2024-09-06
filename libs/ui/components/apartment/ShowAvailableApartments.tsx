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

interface IShowApartmentProps {
  accomodationId: number
  startDate: string
  endDate: string
  apartments: number[]
}

const ShowAvailableApartments: React.FC<IShowApartmentProps> = ({
  accomodationId,
  startDate,
  endDate,
  apartments,
}) => {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [limit] = useState(6) // Number of items per page

  console.log(apartments, accomodationId)
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
  const filteredApartments =
    data?.paginationFilterApartments?.apartments.filter((apartment) =>
      apartments.includes(apartment.id),
    ) || []

  return (
    <div>
      <Grid container spacing={2}>
        {filteredApartments.length > 0 ? (
          filteredApartments.map((apartment, index) => (
            <Grid item key={apartment.id} xs={12} sm={6} md={4}>
              <ApartmentCard
                title={apartment.displayName}
                pricePerDay={apartment.pricePerDay}
                photo={'th-1049758360_kroko3'} // Replace with actual photo URL if available
                apartmentId={apartment.id}
                startDate={startDate}
                endDate={endDate}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p>No available apartments for the selected dates.</p>
          </Grid>
        )}
      </Grid>
      {filteredApartments.length > 0 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="secondary"
          sx={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </div>
  )
}

export default ShowAvailableApartments
