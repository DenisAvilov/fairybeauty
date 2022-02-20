import React, { useEffect, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHttp } from './../../../hooks/http.hook'
import { useMessage } from "../../../hooks/message.hook";
import { useInitialization } from "../../../hooks/initialization.hook";
import { authAction } from "../../../toolkit/authSlice"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { Spiner } from "../../../componentsCurrent/Spiner";
import { Copyright } from "../../../componentsCurrent/Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative"
  },
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
}));

export const Login = () => {
  const dispatch = useDispatch()
  const stateLogo = useSelector((state) => state.isAuthReducer)
  console.log('stateLogo', stateLogo)
  //Hook запрос/ответ на сервер 
  const { loading, request, error, clearError } = useHttp()

  //Hook индификации, обрабатываем даннын из LocalStorige  
  const { login, token } = useInitialization()

  //Hook вывода сообщений 
  const message = useMessage()
  //Создаем объект состаяние формы
  const [form, setForm] = useState({
    email: '',
    password: '',
    subscription: null
  })

  //Наблюдаем за состоянием поле рендеринга компоненты
  useEffect(() => {
    // console.log('error: ',error) 
    message(error, true)
    clearError()
    // if(token){
    //   console.log('token:' ,token)
    //   dispatch(isAuthenticated({isAuthenticated : true}))
    // }


  }, [error, clearError, message])

  //Получаем данные с формы
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  //Функция отравляем запрос на сервер для входа в систему
  const loginHandler = async () => {
    try {
      const data = await request('/api/login', 'POST', { ...form })
      dispatch(authAction(stateLogo.data.login(data.token, data.userId)))
      message(data.message)
    }
    catch (e) { }
  }



  const classes = useStyles();
  return (
    <>
      {loading ? <Spiner /> : null}
      <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            Войти
          </Typography>
          {/* <form className={classes.form} onSubmit={loginHandler}> */}
          <Grid container spacing={2}>
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
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changeHandler}
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
            onClick={() => loginHandler()}
          >
            Войти
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/register" variant="body2">
                Нет аккаунта? Зарегистрироваться
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
  );
}




