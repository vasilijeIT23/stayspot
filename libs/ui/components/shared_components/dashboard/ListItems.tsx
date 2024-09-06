import React, { useState } from 'react'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import {
  Apartment,
  Book,
  People as PeopleIcon,
  BarChart,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material'

const ListWithDropdowns = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    menuId: string,
  ) => {
    setAnchorEl(event.currentTarget)
    setOpenMenu(openMenu === menuId ? null : menuId) // Toggle menu open/close
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenMenu(null)
  }

  return (
    <List sx={{ marginTop: 2 }}>
      <ListItemButton onClick={(e) => handleClick(e, 'accommodations')}>
        <ListItemIcon>
          <Apartment />
        </ListItemIcon>
        <ListItemText primary="Accommodations" />
        {openMenu === 'accommodations' ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Menu
        anchorEl={anchorEl}
        open={openMenu === 'accommodations'}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Create Accomodation</MenuItem>
        <MenuItem onClick={handleClose}>See On Map</MenuItem>
      </Menu>

      <ListItemButton onClick={(e) => handleClick(e, 'bookings')}>
        <ListItemIcon>
          <Book />
        </ListItemIcon>
        <ListItemText primary="Bookings" />
        {openMenu === 'bookings' ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Menu
        anchorEl={anchorEl}
        open={openMenu === 'bookings'}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Booking Detail 1</MenuItem>
        <MenuItem onClick={handleClose}>Booking Detail 2</MenuItem>
      </Menu>

      <ListItemButton onClick={(e) => handleClick(e, 'customers')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
        {openMenu === 'customers' ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Menu
        anchorEl={anchorEl}
        open={openMenu === 'customers'}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Customer Detail 1</MenuItem>
        <MenuItem onClick={handleClose}>Customer Detail 2</MenuItem>
      </Menu>

      <ListItemButton onClick={(e) => handleClick(e, 'charts')}>
        <ListItemIcon>
          <BarChart />
        </ListItemIcon>
        <ListItemText primary="Charts" />
        {openMenu === 'charts' ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Menu
        anchorEl={anchorEl}
        open={openMenu === 'charts'}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Chart Detail 1</MenuItem>
        <MenuItem onClick={handleClose}>Chart Detail 2</MenuItem>
      </Menu>
    </List>
  )
}

export default ListWithDropdowns
