import {Outlet,Navigate} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoutes() {
  const {currentUser} = useAuth();
  console.log(currentUser)
  // let auth = {'token':false}
  let auth = {'token':currentUser}
  return (
    // auth.token?<Outlet/>:<Navigate to='/login'/>
    currentUser?<Outlet/>:<Navigate to='/login'/>
  )
}
