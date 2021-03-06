import React, { useEffect, useState } from "react"
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useHttp } from './../../../hooks/http.hook'
import { useMessage } from "../../../hooks/message.hook"
import { NavLink } from "react-router-dom"
import { Spiner } from "../../../componentsCurrent/Spiner"
import { Copyright } from "../../../componentsCurrent/Copyright"
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from "../../../toolkit/authSlice"




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    marginBottom: '20px'
  }
}))

export const Register = () => {

  const [checked, setChecked] = React.useState(false);
  const { loading, request, error, clearError } = useHttp()
  const dispatch = useDispatch()
  const registration = useSelector((state) => state.isAuthReducer.data.login)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    subscription: false
  })

  const message = useMessage()

  useEffect(() => {
    console.log('error: ', error)
    message(error)
    clearError()
  }, [error, clearError, message])



  const changeHandler = event => {

    setForm({ ...form, [event.target.name]: event.target.name === 'subscription' ? event.target.checked : event.target.value })


  }


  //?????????????? ?????? ??????????????????????
  const registerHandler = async () => {
    // debugger    
    console.log('form reg', form)
    try {
      const data = await request('/register', 'POST', { ...form })
      dispatch(authAction(registration(data.token, data.userId)))
      message(data.message)
      console.log('response Register', data)

    }
    catch (e) { console.log('error', e) }
  }


  const classes = useStyles()

  return (
    <>
      {loading ? <Spiner /> : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            ??????????????????????
          </Typography>
          {/* <form className={classes.form} onSubmit={registerHandler}> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                // required
                fullWidth
                id="firstName"
                label="??????"
                autoFocus
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                id="lastName"
                label="??????????????"
                name="lastName"
                autoComplete="lname"
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="????????????"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" onChange={changeHandler} name="subscription" />}
                label="?? ???????? ???????????????? ???? ?????????? ?????????????????? ?????????????????????? ?? ???????????? ???????????????? ???????????????????? ?????? ????????."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            onClick={() => registerHandler()}
          >
            ???????????? ???????????? ????????
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login" variant="body2">
                ?????? ???????? ??????????????? ??????????
              </NavLink>
            </Grid>
          </Grid>
          {/* </form> */}
          {/* {flag ? message(error): ''} */}

        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}



