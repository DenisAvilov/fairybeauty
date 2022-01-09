import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from './routers/http.routers'
import { useInitialization } from './hooks/initialization.hook'
import { Spiner } from './componentsCurrent/Spiner'
import { authAction } from './toolkit/authSlice'
import MenuAppBar from './componentsCurrent/menu/Menu'
import { Container } from '@material-ui/core'



const App = () => {
  const { login, loginOut, token, userId, ready } = useInitialization()
  const dispatch = useDispatch()
  let isAuthenticated = !!token
  useEffect(() => {
    dispatch(authAction({
      login, loginOut, token, userId, ready, isAuthenticated
    }))
  }, [login, loginOut, token, userId, ready, dispatch, isAuthenticated])

  const testAuth = useSelector(state => state.isAuthReducer.data?.isAuthenticated)
  const routes = useRouter(testAuth)
  if (!ready) return <Spiner />
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="sm">
        {routes}
      </Container>
    </>
  )
}


export default React.memo(App)



