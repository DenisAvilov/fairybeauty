import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import {NavLink} from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import {useDispatch, useSelector} from 'react-redux'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    color: '#f9f9f98a'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
 
}))

export default function MenuAppBar() {
  const distpatch = useDispatch()

  // const isAuthenticated = useSelector(state => state.isAuthReducer.data.isAuthenticated)
  const isAuthenticated = useSelector(state => state.isAuthReducer.data?.isAuthenticated)
  // const isAuthenticated = true
  const isLoginOut = useSelector(state => state.isAuthReducer.data?.loginOut)
  // const isLoginOut = ()=> console.log('function out')

  console.log('Menu')

   
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl) 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div className={classes.root}>    
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              <NavLink to="/" className={classes.logo}> Zhuravka Juliy  </NavLink>
          </Typography>
          {isAuthenticated ? (
            <div>
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                >
                <NavLink to="/private"> <MenuItem onClick={handleClose}>Мой кабинет</MenuItem> </NavLink>
                <MenuItem onClick={ () => isLoginOut()}>
                  Выйти
                </MenuItem> 
                </Menu>
            </div>
          ): <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                <VpnKeyIcon/>
                </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                >
              <NavLink to="/login"> <MenuItem onClick={handleClose}>Войти</MenuItem> </NavLink>
              <NavLink to="/register"> <MenuItem onClick={handleClose}><p>Регистрация</p></MenuItem> </NavLink>
                </Menu>
              </div>}
        </Toolbar>
      </AppBar>
    </div>
  )
}