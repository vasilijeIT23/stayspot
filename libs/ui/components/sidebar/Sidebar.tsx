import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import { Menu } from '@mui/icons-material'
import styles from '../../styles/header.module.css'
import { useAuth } from '@stayspot/util/hooks/authContext'
import { useRouter } from 'next/navigation'
import { mainListItems } from '../shared_components/dashboard/ListItems'
import Title from '../shared_components/dashboard/Title'
import { IconDoorExit } from '@tabler/icons-react'

export default function TemporaryDrawer() {
  const { token, logout, roles } = useAuth()
  const { replace } = useRouter()

  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box
      sx={{ height: 1200, width: 250, backgroundColor: 'lightgray' }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <>
        {roles[1] == null ? (
          <div className={styles.button}>
            <Button
              onClick={() => replace('/createCompany')}
              sx={{ color: 'black' }}
            >
              Create your company
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </>
      <Title>Manager Menu</Title>
      <List component="nav">
        {mainListItems}
        {/* <Divider sx={{ my: 1 }} />
        {secondaryListItems} */}
      </List>
      <div className={styles.buttonpos}></div>
      <div className={styles['auth-buttons']}>
        {token ? (
          <Button
            sx={{ color: 'black' }}
            className={`${styles.button} ${styles['button-primary']}`}
            onClick={logout}
          >
            <IconDoorExit /> Logout
          </Button>
        ) : (
          <></>
        )}
      </div>
    </Box>
  )

  return (
    <div>
      <Menu
        fontSize="large"
        className={`${styles.buttonsidebar} ${styles['button-primary']}`}
        onClick={toggleDrawer(true)}
      >
        Open drawer
      </Menu>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
